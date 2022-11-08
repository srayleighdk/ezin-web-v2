import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Upload,
  Typography,
  Divider,
  Space,
  Spin,
  Alert,
  Steps,
  Image,
  Col,
  Row,
} from "antd";
import Head from "next/head";
import { detectVideo } from "../api";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { getImageUrl } from "../../utils/helpers";
const { Title, Text } = Typography;
const { Step } = Steps;

const MIN_AREA = 0.37;
const MAX_AREA = 0.97;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const round = (number) => {
  return Math.round(number * 100) / 100;
};

// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }

//   const isLt2M = file.size / 1024 / 1024 < 2;

//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }

//   return isJpgOrPng && isLt2M;
// };
const okIcon = <CheckCircleOutlined style={{ color: "green" }} />;
const failIcon = <CloseCircleOutlined style={{ color: "red" }} />;
const METHODS = [
  { value: 1, label: "Car in pic detection" },
  { value: 2, label: "Car size calculation" },
  // { value: 2, label: 'Kiểm tra xe bẩn/sạch' },
  { value: 3, label: "Corner detection" },
  { value: 4, label: "Physical damage detection" },
  { value: 5, label: "Make-model-year detection", disabled: true },
  { value: 6, label: "Price estimation", disabled: true },
  // { value: 5, label: 'Định giá' },
];
function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}
export default function DemoPage(props) {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [result3, setResult3] = useState(null);
  const [status, setStatus] = useState("");
  const [vote, setVote] = useState(null);
  const [step, setStep] = useState(0);
  const [methods, setMethods] = useState([1, 2, 3, 4]);
  const [votes, setVotes] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  console.log("thumbnails", getImageUrl(video));

  const beforeUpload = async (file) => {
    setFile(file);
    console.log("before upload", file);
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        console.log("info.file", info.file);
        setLoading(false);
        setVideoInfo(info.file);
      });
    }
  };

  const submitDetectVideo = async (formData) => {
    const res = await detectVideo(formData);
    let data = res?.data?.data;
    // kiem tra ket qua tra ve
    // data.answer1 = data?.num_cars > 0;
    // data.answer2 = data?.area > MIN_AREA;
    // setResult1(data);
    // setThumbnails(data)
    setVideo(data);
    return data;
  };
  const onSubmit = async () => {
    console.log("file", file);
    setProcessing(true);
    setVideo(null);
    setMsg("Vui lòng chờ trong giây lát...");

    setStatus("PROCESSING");
    let formData = new FormData();
    formData.append("file", file);
    formData.append("request_id", file.uid);

    try {
      const res1 = await submitDetectVideo(formData);
      setProcessing(false);
    } catch (ex) {
      console.log("ex", ex);
      setProcessing(false);
    }
  };
  const onVote = async (index, vote) => {
    console.log("onVote", index, vote);
    const newVotes = votes;
    newVotes[index] = vote;
    setVotes([...newVotes]);
    // if (!file) {
    //     message.error('Vui lòng upload hình ảnh')
    //     return;
    // }
    // setVote(vote)
    // const res = await voteDamage({ request_id: file.uid, vote })
    // if (res?.data?.success) {
    // Modal.destroyAll();
    // Modal.info({
    //     title: 'Xin cảm ơn sự đóng góp của bạn',
    //     content: 'Chúng tôi sẽ cải tiến để ngày càng tốt hơn.',
    //     okText: 'Thử lại với ảnh khác',
    //     onOk: () => {
    //         setFile(null);
    //         setImageUrl(null)
    //         setResult1(null)
    //         setResult2(null)
    //         setResult3(null)
    //         setVote(null)
    //     }
    // });
    // }
  };

  const toggleMethod = (method) => {
    let newMethods = methods;
    if (newMethods.indexOf(method) >= 0) {
      newMethods = newMethods.filter((e) => e != method);
    } else {
      newMethods.push(method);
    }
    newMethods.sort();
    console.log("newMethods", newMethods);
    setMethods([...newMethods]);
  };

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
  // const info = loading
  // ? `Vui lòng chờ trong giây lát, Ezin đang tiến hành giám định tổn thất xe...`
  // : `Vui lòng upload hình ảnh xe của bạn, Ezin sẽ tiến hành giám định tổn thất cho bạn`
  const info = `Please upload your video and press Submit`;
  console.log("status", status);
  return (
    <>
      <Head>
        <title key="title">{`AI Demo page | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`AI Demo page | Ezin`}
        />
        <meta
          property="og:description"
          key="og-description"
          content={"AI Demo page"}
        />
        <meta
          name="keywords"
          content={`ezin;ezin insurtech;bảo hiểm số;bảo hiểm cá nhân;sống an toàn;hạnh phúc;bình an`}
        />
      </Head>
      <div className="main" id="demo">
        <Spin spinning={processing} size="large" tip="Please wait...">
          {/* <Space direction="vertical"> */}
          <Alert
            style={{ marginBottom: 10 }}
            showIcon
            type={"info"}
            message={info}
          ></Alert>
          <h3>1. Upload your video</h3>
          <div className="full-w">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              accept="video/*"
            >
              {videoInfo ? (
                <div>
                  <strong>{videoInfo.name}</strong> -{" "}
                  {formatSizeUnits(videoInfo.size)}
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className="mt-5">
            <Space>
              <Button
                disabled={!file || loading}
                loading={processing}
                onClick={onSubmit}
                type="primary"
              >
                Process video now!
              </Button>
              {/* <Text style={{ fontSize: 13 }} type={msg == 'Sẵn sàng' ? 'success' : 'secondary'}>{msg}</Text> */}
            </Space>
          </div>
          <Divider />
          <h3>2. Result</h3>
          <Row gutter={[16, 16]}>
            {video && (
              <Space direction="vertical">
                <div>
                  <a rel="noreferrer" target="_blank" href={getImageUrl(video)}>
                    Download Video
                  </a>
                </div>
                <ReactPlayer url={getImageUrl(video)} controls={true} />
              </Space>
            )}
          </Row>
        </Spin>
      </div>
    </>
  );
}
