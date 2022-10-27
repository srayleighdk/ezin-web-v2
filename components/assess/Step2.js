// Shortcut for kich-hoat
import React, { useState } from "react";
import {
  Upload,
  message,
  Form,
  Typography,
  Row,
  Col,
  Button,
  Input,
  Radio,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadAssess } from "../../pages/api";
import { IMAGE_TYPES } from "./constants";
const Step2 = ({ onNext, onPrev, data }) => {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [listFiles, setListFiles] = useState({});

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chụp ảnh</div>
    </div>
  );

  const onSubmit = async () => {
    setProcessing(true);

    if (Object.keys(listFiles).length == 0) {
      message.error("Vui lòng chụp ảnh");
      return;
    }
    message.info(
      "Ezin đang tiến hành đánh giá, vui lòng chờ trong giây lát..."
    );
    const formData = new FormData();
    formData.append("id", data._id);
    for (let [type, value] of Object.entries(IMAGE_TYPES)) {
      console.log("type", type, listFiles[type]);
      formData.append(type, listFiles[type]);
    }
    try {
      const res = await uploadAssess(formData);
      if (res?.data?.success) {
        onNext(res?.data?.data);
      } else {
        message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    } catch (ex) {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
    setProcessing(false);
  };
  const setFile = (name, value) => {
    console.log("name", name, value);
    listFiles = {
      ...listFiles,
      [name]: value,
    };
    setListFiles({ ...listFiles });
  };
  console.log("list", listFiles);
  return (
    <>
      <Row gutter={[8, 10]}>
        <Col xs={24} sm={24}>
          <h3>2. Chụp ảnh xe</h3>
        </Col>
        <Col xs={24} sm={24}>
          <p className="ml-0 mb-0">
            Mã giám định của bạn là: <b>{data?._id}</b>
          </p>
        </Col>
        {Object.entries(IMAGE_TYPES).map(([type, value]) => (
          <Col xs={12} sm={12} key={type}>
            <p className="ml-0 mb-0">{value?.title}</p>
            <div style={{ width: 120, height: 120 }}>
              <Upload
                name={type}
                beforeUpload={(file) => setFile(type, file)}
                onRemove={(file) => setFile(type, null)}
                listType="picture-card"
                className="avatar-uploader"
              >
                {!listFiles[type] && uploadButton}
              </Upload>
            </div>
          </Col>
        ))}
        {/* <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">1. Ảnh trước xe</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imgFront"
                            beforeUpload={(file) => setImageFront(file)}
                            onRemove={(file) => setImageFront(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageFront && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">2. Ảnh sau xe</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageBack"
                            beforeUpload={(file) => setImageBack(file)}
                            onRemove={(file) => setImageBack(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageBack && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">3. Ảnh trái xe</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageLeft"
                            beforeUpload={(file) => setImageLeft(file)}
                            onRemove={(file) => setImageLeft(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageLeft && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">4. Ảnh phải xe</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageRight"
                            beforeUpload={(file) => setImageRight(file)}
                            onRemove={(file) => setImageRight(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageRight && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">5. Ảnh chéo trước trái</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageFrontLeft"
                            beforeUpload={(file) => setImageFrontLeft(file)}
                            onRemove={(file) => setImageFrontLeft(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageFrontLeft && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">6. Ảnh chéo trước phải</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageFrontRight"
                            beforeUpload={(file) => setImageFrontRight(file)}
                            onRemove={(file) => setImageFrontRight(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageFrontRight && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">7. Ảnh chéo sau trái</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageBackLeft"
                            beforeUpload={(file) => setImageBackLeft(file)}
                            onRemove={(file) => setImageBackLeft(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageBackLeft && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">8. Ảnh chéo sau phải</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageBackRight"
                            beforeUpload={(file) => setImageBackRight(file)}
                            onRemove={(file) => setImageBackRight(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageBackRight && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">9. Hình táp lô khi máy nổ</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageTaplo"
                            beforeUpload={(file) => setImageTaplo(file)}
                            onRemove={(file) => setImageTaplo(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageTaplo && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={12} sm={12}>
                    <p className="ml-0 mb-0">10. Hình Tem đăng kiểm</p>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="imageRegister"
                            beforeUpload={(file) => setImageRegister(file)}
                            onRemove={(file) => setImageRegister(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {!imageRegister && uploadButton}
                        </Upload>
                    </div>
                </Col> */}
        <Col xs={12} sm={12}>
          <Button
            type="secondary"
            className="w-100 p-10"
            size="large"
            onClick={onPrev}
          >
            Quay lại
          </Button>
        </Col>
        <Col xs={12} sm={12}>
          <Button
            loading={processing}
            type="primary"
            className="w-100 p-10"
            size="large"
            onClick={onSubmit}
          >
            Tiếp tục
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Step2;
