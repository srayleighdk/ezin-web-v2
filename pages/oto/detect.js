import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Card,
  Col,
  Row,
  Upload,
  Typography,
  Divider,
  Space,
  Spin,
  Alert,
  Image,
  Tag,
  Modal,
} from "antd";
import Head from "next/head";
import { voteDamage } from "../api";
import { detectDamage1, detectDamage2, detectDamage3 } from "../api";
import React, { useState } from "react";
const { Title, Text } = Typography;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
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

export default function DetectPage(props) {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [result3, setResult3] = useState(null);
  const [vote, setVote] = useState(null);

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
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const submitMethod1 = async (formData) => {
    const res = await detectDamage1(formData);
    setResult1(res?.data?.data);
  };
  const submitMethod2 = async (formData) => {
    const res = await detectDamage2(formData);
    setResult2(res?.data?.data);
  };
  const submitMethod3 = async (formData) => {
    const res = await detectDamage3(formData);
    const data = res?.data?.data;
    if (data?.rc == "01") {
      // message.error(data?.msg);
      Modal.destroyAll();
      Modal.warning({
        title: "Không tìm thấy ảnh xe oto",
        content:
          "Chúng tôi không tìm thấy xe oto trong ảnh của bạn, vui lòng thử lại với ảnh khác",
        okText: "Thử lại",
        onOk: () => {
          setFile(null);
          setImageUrl(null);
          setResult1(null);
          setResult2(null);
          setResult3(null);
          setVote(null);
        },
      });
      return;
    }
    message.success(
      "Thông báo: quy trình giám định của Ezin đã hoàn tất! Vui lòng xem kết quả bên dưới"
    );
    setResult3(data);
  };
  const onSubmit = async () => {
    setProcessing(true);
    setMsg("Vui lòng chờ trong giây lát...");
    // setResult1(null)
    // setResult2(null)
    setResult3(null);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("request_id", file.uid);
    try {
      await Promise.all([
        // submitMethod1(formData),
        // submitMethod2(formData),
        submitMethod3(formData),
      ]);
    } catch (ex) {
      console.log("ex", ex);
    }

    setProcessing(false);
    setMsg("Sẵn sàng");
  };
  const onVote = async (vote) => {
    if (!file) {
      message.error("Vui lòng upload hình ảnh");
      return;
    }
    setVote(vote);
    const res = await voteDamage({ request_id: file.uid, vote });
    if (res?.data?.success) {
      Modal.destroyAll();
      Modal.info({
        title: "Xin cảm ơn sự đóng góp của bạn",
        content: "Chúng tôi sẽ cải tiến để ngày càng tốt hơn.",
        okText: "Thử lại với ảnh khác",
        onOk: () => {
          setFile(null);
          setImageUrl(null);
          setResult1(null);
          setResult2(null);
          setResult3(null);
          setVote(null);
        },
      });
    }
  };

  const noImage = `data:image/png;base64,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`;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // const info = loading
  // ? `Vui lòng chờ trong giây lát, Ezin đang tiến hành giám định tổn thất xe...`
  // : `Vui lòng upload hình ảnh xe của bạn, Ezin sẽ tiến hành giám định tổn thất cho bạn`
  const info = `Vui lòng upload hình ảnh xe của bạn và nhấn nút Submit, Ezin sẽ tiến hành giám định tổn thất cho bạn`;
  return (
    <>
      <Head>
        <title key="title">{`Giám định tổn thất | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`Giám định tổn thất | Ezin`}
        />
        <meta
          property="og:description"
          key="og-description"
          content={"Giám định tổn thất"}
        />
        <meta
          name="keywords"
          content={`ezin;ezin insurtech;bảo hiểm số;bảo hiểm cá nhân;sống an toàn;hạnh phúc;bình an`}
        />
      </Head>
      <div className="main">
        <Spin
          spinning={processing}
          size="large"
          tip="Xin vui lòng chờ trong giây lát..."
        >
          <Space direction="vertical">
            <Alert showIcon type={"info"} message={info}></Alert>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              accept="image/*"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <Space>
              <Button
                disabled={!file || loading}
                loading={processing}
                onClick={onSubmit}
                type="primary"
              >
                Submit
              </Button>
              {/* <Text style={{ fontSize: 13 }} type={msg == 'Sẵn sàng' ? 'success' : 'secondary'}>{msg}</Text> */}
            </Space>
          </Space>
          <Divider />
          {/* <Progress percent={70} /> */}
          <Title level={4}>Kết quả giám định tổn thất</Title>
          {/* <Divider/> */}
          {result3 && (
            <Space className="mb-1">
              <Text>Vui lòng đánh giá kết quả</Text>
              <Tag
                className="pointer"
                color={"green"}
                onClick={() => onVote("Y")}
              >
                Hài lòng
              </Tag>
              <Tag
                className="pointer"
                color={"red"}
                onClick={() => onVote("N")}
              >
                Không hài lòng
              </Tag>
              {/* <Tag color={vote==3?'#2db7f5':''} onClick={() => onVote(3)}>3</Tag> */}
            </Space>
          )}

          <Row gutter={16}>
            {/* <Col xs={24} sm={12} md={8} lg={8}>
                            <Card
                                loading={processing}
                                title={(
                                    <>
                                        <small>Kết quả 1</small>
                                        <Divider type="vertical" />
                                        <small>Độ chính xác: {Math.round(result1?.scores, 2)}%</small>
                                        <Divider type="vertical" />
                                        <small>Thời gian: {result1?.time / 1000}s</small>
                                    </>
                                )}
                                cover={
                                    <Image
                                        // width={200}
                                        src={
                                            result1?.img ? `data:image/png;base64,${result1?.img}`
                                                : noImage
                                        }
                                    />
                                }
                            >
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <Card
                                loading={processing}
                                title={(
                                    <>
                                        <small>Kết quả 2</small>
                                        <Divider type="vertical" />
                                        <small>Độ chính xác: {Math.round(result2?.scores, 2)}%</small>
                                        <Divider type="vertical" />
                                        <small>Thời gian: {result2?.time / 1000}s</small>
                                    </>
                                )}
                                cover={
                                    <Image
                                        src={
                                            result2?.img ? `data:image/png;base64,${result2?.img}`
                                                : noImage
                                        }
                                    />
                                }
                            >
                            </Card>
                        </Col> */}
            <Col xs={24} sm={12} md={8} lg={8}>
              <Card
                loading={processing}
                title={
                  result3?.img ? (
                    <>
                      {/* <sm/all>Kết quả 3</small> */}
                      {/* <Divider type="vertical" /> */}
                      {/* <small>Độ chính xác: {Math.round(result3?.scores, 2)}%</small> */}
                      {/* <Divider type="vertical" /> */}
                      <small>Thời gian xử lý: {result3?.time / 1000}s</small>
                    </>
                  ) : (
                    <>Vui lòng upload hình ảnh xe oto</>
                  )
                }
                cover={
                  <Image
                    src={
                      result3?.img
                        ? `data:image/png;base64,${result3?.img}`
                        : noImage
                    }
                  />
                }
              ></Card>
            </Col>
          </Row>
        </Spin>
      </div>
    </>
  );
}
