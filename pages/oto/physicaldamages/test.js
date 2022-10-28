// Shortcut for kich-hoat
import React, { useState } from "react";
import { Upload, message, Form, Typography, Button, Input, Radio } from "antd";
import Head from "next/head";
import { InboxOutlined } from "@ant-design/icons";
import { submitDamage } from "../../api";
import { useRouter } from "next/router";
import baseURL from "../../../utils/baseUrl";

const { Dragger } = Upload;

const DamageTest = ({}) => {
  const router = useRouter();

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
  const onFinish = async (values) => {
    const body = {
      ...values,
      id: result.id,
    };
    const res = await submitDamage(body);
    if (res?.data?.success) {
      router.push("/oto/physicaldamages/thank-you");
    } else {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  };
  const onFinishFailed = () => {};
  return (
    <>
      <Head>
        <title>Công cụ phát hiện lỗi xe ô tô | Ezin</title>
      </Head>
      <div
        className="step-wrapper mt-5 mb-5"
        style={{ maxWidth: 1000, margin: "0px auto" }}
      >
        <Typography.Title level={3} className="text-primary text-center">
          Công cụ phát hiện lỗi xe ô tô
        </Typography.Title>
        <div className="ezin-card-flat">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Nhấn hoặc kéo thả ảnh vào đây để upload
            </p>
            <p className="ant-upload-hint">
              Vui lòng upload ảnh định dạng PNG, JPG
            </p>
          </Dragger>
          {result && (
            <>
              <hr />
              <div className="flex flex-row">
                <div className="flex-1 mr-1">
                  <b>Ảnh gốc</b>
                  <img src={result?.input} />
                </div>
                <div className="flex-1 ml-1">
                  <b>Ảnh đã xử lý</b>
                  <img src={result?.output} />
                </div>
              </div>
              <hr />
              <h3>Nhận xét kết quả</h3>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div className="flex flex-row">
                  <div className="w-50 flex-1 mr-1">
                    <p>Lỗi có đúng không?</p>
                    <Form.Item
                      name="answer1"
                      initialValue="Y"
                      rules={[
                        { required: true, message: "Vui lòng chọn 1 kết quả" },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value={"Y"}>Có</Radio>
                        <Radio value={"N"}>Không</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name="answer1_comment"
                      // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input placeholder="Nhận xét của bạn" />
                    </Form.Item>
                  </div>
                  <div className="w-50 flex-1 ml-1">
                    <p>Lỗi có thiếu không?</p>
                    <Form.Item
                      name="answer2"
                      initialValue="Y"
                      rules={[
                        { required: true, message: "Vui lòng chọn 1 kết quả" },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value={"Y"}>Có</Radio>
                        <Radio value={"N"}>Không</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name="answer2_comment"

                      // rules={[{ required: true, message: 'Vui lòng chọn 1 kết quả' }]}
                    >
                      <Input placeholder="Nhận xét của bạn" />
                    </Form.Item>
                  </div>
                </div>
                <div className="mt-5">
                  <Button type="primary" htmlType="submit">
                    Gửi kết quả
                  </Button>
                </div>
              </Form>
            </>
          )}
        </div>
        <Form className="form-ezin"></Form>
      </div>
    </>
  );
};

export default DamageTest;
