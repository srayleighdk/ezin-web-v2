// Shortcut for kich-hoat
import React, { useState } from "react";
import { Upload, message, Form, Typography } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { baseURL } from "../../../utils/config";
import Step1 from "../../../components/assess/Step1";
import Step2 from "../../../components/assess/Step2";
import Step3 from "../../../components/assess/Step3";
import Step4 from "../../../components/assess/Step4";
import Link from "next/link";
import { Steps } from "antd";
const { Step } = Steps;
const { Dragger } = Upload;

const UploadOto = ({}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [step, setStep] = useState(0);

  const [result, setResult] = useState(null);
  const [answer1, setAnswer1] = useState("Y");
  const [answer1_comment, setAnswer1Comment] = useState("");
  const [answer2, setAnswer2] = useState("Y");
  const [answer2_comment, setAnswer2Comment] = useState("");

  const props = {
    name: "file",
    multiple: false,
    action: `${baseURL}/damage/process`,
    accept: "image/*",
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        setResult(info?.file?.response?.data);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {},
    beforeUpload(e) {
      setResult(null);
    },
  };
  const onFinish = async (values) => {};
  const onFinishFailed = () => {
    console.log("failed");
  };
  const onSetData = (newData) => {
    if (newData) {
      setData({
        ...data,
        ...newData,
      });
    }
  };
  const onNext = (newData) => {
    onSetData(newData);
    setStep(step + 1);
  };
  const onPrev = () => {
    setStep(step - 1);
  };
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step1 onNext={onNext} onPrev={onPrev} form={form} data={data} />
        );
      case 1:
        return (
          <Step2 onNext={onNext} onPrev={onPrev} form={form} data={data} />
        );
      case 2:
        return (
          <Step3
            onNext={onNext}
            onPrev={onPrev}
            form={form}
            data={data}
            onSetData={onSetData}
          />
        );
      default:
        return (
          <Step4 onNext={onNext} onPrev={onPrev} form={form} data={data} />
        );
    }
  };
  return (
    <>
      <Head>
        <title>Giám định xe ô tô | Ezin</title>
      </Head>
      <div
        className="step-wrapper mt-5 mb-5"
        style={{ maxWidth: 1000, margin: "0px auto" }}
      >
        <Typography.Title level={3} className="text-primary text-center">
          Giám định xe ô tô
        </Typography.Title>
        <div className="text-center">
          <Link href="/oto/assess/search" className="text-center">
            Tìm kiếm thông tin giám định
          </Link>
        </div>

        <div className="ezin-card-flat">
          <div>
            <Steps current={step} percent={50} size="small">
              <Step
                title="Giấy tờ xe"
                description="Nhập hoặc chụp ảnh giấy tờ xe"
              />
              <Step title="Hình ảnh xe" description="Chụp 10 ảnh của xe" />
              <Step title="Kết quả" description="Ezin đánh giá tổn thất" />
              <Step title="Hoàn tất" />
            </Steps>
            <hr />
          </div>
          <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
            {renderStep()}
          </Form>
        </div>
      </div>
    </>
  );
};

export default UploadOto;
