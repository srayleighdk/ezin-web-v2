import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Typography,
  Divider,
  Space,
  Spin,
  Alert,
  Image,
  Modal,
  Steps,
  Progress,
} from "antd";
import Head from "next/head";
import { voteDamage } from "../api";
import { detectCorner, detectCar, detectDamage } from "../api";
import React, { useState } from "react";
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

  const submitDetectCar = async (formData) => {
    const res = await detectCar(formData);
    let data = res?.data?.data;
    // kiem tra ket qua tra ve
    data.answer1 = data?.num_cars > 0;
    data.answer2 = data?.area > MIN_AREA;
    setResult1(data);
    return data;
  };
  const submitDetectCorner = async (formData) => {
    const res = await detectCorner(formData);
    const data = res?.data?.data;
    setResult2(data);
    return data;
  };
  const submitDetectDamage = async (formData, result1) => {
    let form = formData;
    // formData.append('xOriginal', result1?.xOriginal)
    console.log("result1?.area", result1?.area, MAX_AREA);
    // if (result1?.area < MAX_AREA) {
    if (result1?.xmaxLocation) {
      form.append("xmaxLocation", result1?.xmaxLocation);
      form.append("xminLocation", result1?.xminLocation);
      // formData.append('yOriginal', result1?.yOriginal)
      form.append("ymaxLocation", result1?.ymaxLocation);
      form.append("yminLocation", result1?.yminLocation);
    }
    // }
    const res = await detectDamage(form);
    const data = res?.data?.data;
    setResult3(data);
    return data;
  };
  const onSubmit = async () => {
    setProcessing(true);
    setMsg("Vui lòng chờ trong giây lát...");
    setResult1(null);
    setResult2(null);
    setResult3(null);
    setStep(0);
    setStatus("PROCESSING");
    let formData = new FormData();
    formData.append("file", file);
    formData.append("request_id", file.uid);

    try {
      const res1 = await submitDetectCar(formData);
      setStep((step) => step + 1);
      // if (!(res1.answer1 && res1.answer2)) {
      if (false) {
        setStatus("FAILED");
      } else {
        const res2 = await submitDetectCorner(formData);
        setStep((step) => step + 1);
        const res3 = await submitDetectDamage(formData, res1);
        setStep((step) => step + 1);
        setStatus("DONE");
        message.success(
          "Your picture has been processed successfully! Please see the result below."
        );
        setMsg("Sẵn sàng");
      }
      setProcessing(false);
    } catch (ex) {
      console.log("ex", ex);
      setProcessing(false);
    }
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
  const info = `Please upload your picture and press Submit`;
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
      <div className="main">
        <Spin spinning={processing} size="large" tip="Please wait...">
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
        </Spin>
        <Divider />
        <Title level={4}>Kết quả</Title>
        <Progress
          status={status == "FAILED" ? "exception" : "active"}
          percent={step < 3 ? 33 * step : 100}
        />
        <Steps current={step - 1} direction="horizontal">
          <Step
            title="Picture quality?"
            description={
              result1 ? (
                <>
                  <div>
                    <Image
                      src={`data:image/png;base64,${result1?.img}`}
                      width={250}
                    />
                  </div>
                  <div title={`${round(result1.scores * 100)}% sure`}>
                    {result1?.answer1 ? okIcon : failIcon} Car in pic?{" "}
                    {result1?.answer1 ? "Yes" : "No"}
                  </div>
                  {result1?.answer1 && (
                    <small>({round(result1?.scores * 100)}% sure)</small>
                  )}
                  <div title={`${round(result1.area)}% of the pic`}>
                    {result1?.answer2 ? okIcon : failIcon} Car large enough?{" "}
                    {result1?.answer2 ? "Yes" : "No"}
                  </div>
                  {result1?.answer2 && (
                    <small>({round(result1?.area)}% area of the pic)</small>
                  )}
                  <div>
                    {okIcon} Time: {round(result1?.time / 1000)}s
                  </div>
                </>
              ) : (
                <>Processing</>
              )
            }
          />
          <Step
            title="Corner detection"
            description={
              result2 ? (
                <>
                  <div>
                    <Image
                      src={`data:image/png;base64,${result1?.img}`}
                      width={250}
                    />
                  </div>
                  <div>
                    {okIcon} Corner: {result2?.corner}
                  </div>
                  <div>
                    {okIcon} Time: {round(result2?.time / 1000)}s
                  </div>
                </>
              ) : (
                <>Processing</>
              )
            }
          />
          <Step
            title="Physical damage detection"
            description={
              result3 ? (
                <>
                  <div>
                    <Image
                      src={`data:image/png;base64,${result3?.img}`}
                      width={250}
                    />
                  </div>
                  <div>
                    {okIcon}{" "}
                    {result3?.classes?.length == 0
                      ? "Không tìm tìm thấy tổn thất"
                      : `Accuracy: ${round(result3?.scores)}%`}
                  </div>
                  <div>
                    {okIcon} Time: {round(result3?.time / 1000)}s
                  </div>
                </>
              ) : (
                <>Processing</>
              )
            }
          />
        </Steps>
      </div>
    </>
  );
}
