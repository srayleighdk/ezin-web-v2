import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { detectPlateNumber } from "../../pages/api";

const {
  Upload,
  Spin,
  Alert,
  Space,
  Button,
  Divider,
  Typography,
  Modal,
} = require("antd");
const { useState } = require("react");
const { Text } = Typography;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const round = (number) => {
  return Math.round(number * 100) / 100;
};

const PlateDetection = () => {
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <Text strong>Upload</Text>
      </div>
      <div>
        <Text>Click or drag file to this area to upload</Text>
      </div>
    </div>
  );
  const beforeUpload = async (file) => {
    setFile(file);
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onSubmit = async () => {
    setResult(null);
    setProcessing(true);
    let formData = new FormData();
    formData.append("img", file);
    // formData.append('request_id', file.uid)
    const res = await detectPlateNumber(formData);
    console.log("res", res?.data);
    if (res?.data?.success) {
      setResult(res?.data?.data?.data[0]);
    }
    setProcessing(false);
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <>
      <Spin spinning={processing} size="large" tip="Please wait...">
        <Alert
          style={{ marginBottom: 10 }}
          showIcon
          type={"info"}
          message={"Please upload your car picture with plate number"}
        ></Alert>
        <h3>1. Upload your picture</h3>
        <div className="full-w">
          <Upload
            name="avatar"
            listType="picture-card"
            // className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            accept="image/*"
            onPreview={handlePreview}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  height: "100px",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <Modal
            open={previewOpen}
            title={"Xem ảnh"}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={imageUrl}
            />
          </Modal>
          <Text>Plate number: {result?.plate}</Text>
        </div>
        <div className="mt-5">
          <Space>
            <Button
              disabled={!file || loading}
              loading={processing}
              onClick={onSubmit}
              type="primary"
            >
              Submit now!
            </Button>
          </Space>
        </div>
      </Spin>
    </>
  );
};

export default PlateDetection;
