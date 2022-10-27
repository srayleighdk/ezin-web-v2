import React, { useState } from "react";
import { Modal, message, Form, Typography, Button, Input, Table } from "antd";
import Head from "next/head";
import { searchAssess } from "../../api";
import moment from "moment";
import { getImageUrl } from "../../../utils/helpers";
import { IMAGE_TYPES } from "../../../components/assess/constants";
const SearchAssets = ({}) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Thông tin xe",
      dataIndex: "plate",
      key: "plate",
      render: (text, record, index) => (
        <>
          <div>Ngày giám định: {record.added_at}</div>
          <div>
            <a href="#" onClick={() => openImagePopup(record)}>
              Xem hình ảnh
            </a>
          </div>
          <div>
            Vị trí:{" "}
            <a
              rel="noreferrer"
              href={`http://maps.google.com/?ie=UTF8&hq=&ll=${record.location}&z=13`}
              target="_blank"
            >
              {record.location}
            </a>
          </div>
        </>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const dataSource = data.map((e, index) => ({
    key: index + 1,
    plate: e.plate,
    added_at: moment(e.added_at).format("DD/MM/YYYY HH:mm"),
    location: `${e?.location?.latitude}, ${e?.location?.longitude}`,
    images: e.images,
  }));
  const openImagePopup = (record) => {
    console.log("record", record);
    Modal.info({
      content: (
        <>
          <b>Hình ảnh</b>
          <br />
          <br />
          {record.images &&
            Object.entries(record.images).map(([key, value]) =>
              key != "img_registration" ? (
                <>
                  <p>{IMAGE_TYPES[key]?.title}</p>
                  <img src={getImageUrl(value?.result)} width="100%" />
                  <hr />
                </>
              ) : null
            )}
        </>
      ),
      okText: "Đóng",
      onOk: () => {
        // inputSeri.current.focus();
      },
    });
  };
  const onFinish = async (values) => {
    console.log("body", { plate: values?.plate });
    const res = await searchAssess({ plate: values?.plate });
    if (res?.data?.success) {
      setData(res?.data?.data);
    } else {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <>
      <Head>
        <title>Thông tin giám định xe ô tô | Ezin</title>
      </Head>
      <div
        className="step-wrapper mt-5 mb-5"
        style={{ maxWidth: 1000, margin: "0px auto" }}
      >
        <Typography.Title level={3} className="text-primary text-center">
          Thông tin giám định xe ô tô
        </Typography.Title>

        <div className="ezin-card-flat">
          <p>Tìm theo biển số xe</p>
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="plate">
              <Input placeholder={"Biển số xe"} autoFocus={true} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="mt-2">
              Tìm kiếm
            </Button>
          </Form>
          <hr />
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  );
};
export default SearchAssets;
