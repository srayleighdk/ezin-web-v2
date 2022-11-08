// Shortcut for kich-hoat
import React, { useState, useEffect } from "react";
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
import { detectVehicleRegistration, submitAssess } from "../../pages/api";
import { requireRule } from "../../utils/helpers";
import { IMAGE_TYPES } from "./constants";
const Step1 = ({ form, onNext, onPrev }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [location, setLocation] = useState(null);
  const [detectType, setDetectType] = useState("submit-registrations");

  const showPosition = (location) => {
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      accuracy: location.coords.accuracy,
      altitudeAccuracy: location.coords.altitudeAccuracy,
    });
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chụp ảnh</div>
    </div>
  );
  const handleUpload = async (file) => {
    setUpLoading(true);
    const formData = new FormData();
    formData.append("files[]", file);
    if (detectType == "submit-registrations") {
      formData.append("files[]", file);
    }
    try {
      const res = await detectVehicleRegistration(formData, detectType);
      if (res?.data?.success) {
        const infos = res?.data?.data?.data;
        console.log("infos", infos);
        if (detectType == "submit-registrations") {
          const back = infos.find(
            (e) => e.type == "vehicle_registration_back"
          )?.info;
          const front = infos.find(
            (e) => e.type == "vehicle_registration_front"
          )?.info;
          form.setFieldsValue({
            ...back,
            ...front,
          });
        } else {
          let info = infos.info;
          form.setFieldsValue({
            ...info,
            plate: info?.registration_number,
            chassis: info?.chassis_number,
            engine: info?.engine_number,
            brand: info?.mark,
            model: info?.model_code,
            first_issue_date: info?.regis_date,
          });
        }
        message.success(
          "Ezin đã điền thông tin cho bạn, vui lòng kiểm tra lại"
        );
      }
    } catch (ex) {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }

    setUpLoading(false);
  };
  const onSubmit = async () => {
    setUpLoading(true);

    let values = form.getFieldsValue();
    if (!values.plate) {
      message.error("Vui lòng nhập biển số xe");
    } else {
      values = {
        ...values,
        location,
      };
      try {
        const res = await submitAssess(values);
        if (res?.data?.success) {
          onNext(res?.data?.data);
        } else {
          message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
        }
      } catch (ex) {
        message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    }

    setUpLoading(false);
  };
  return (
    <>
      <Row gutter={[8, 10]}>
        <Col xs={24} sm={24}>
          <h3>1. Nhập thông tin giấy đăng ký xe</h3>
        </Col>
        <Col xs={24} sm={24}>
          <p>
            <i>(hoặc chụp ảnh giấy đăng ký, Ezin sẽ giúp bạn điền)</i>
          </p>
          <div>
            <p>Vui lòng chọn đúng loại giấy tờ, sau đó chụp ảnh:</p>
            <Radio.Group
              value={detectType}
              onChange={(e) => setDetectType(e.target.value)}
            >
              <Radio value="submit-registrations">Đăng ký xe</Radio>
              <Radio value="vehicle_inspection">Đăng kiểm xe</Radio>
            </Radio.Group>
          </div>
        </Col>
        <Col xs={12} sm={12}>
          <div style={{ width: 120, height: 120 }}>
            <Upload
              name="img1"
              beforeUpload={(file) => {
                setImage1(file);
                handleUpload(file);
              }}
              onRemove={(file) => setImage1(null)}
              listType="picture-card"
              className="avatar-uploader"
            >
              {!image1 && uploadButton}
            </Upload>
          </div>
        </Col>
        <Col xs={24} sm={24}>
          <div>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={!image1}
              loading={uploading}
              // style={{ marginTop: 16 }}
            >
              {/* {uploading ? 'Uploading' : 'Start Upload'} */}
              Tự điền thông tin
            </Button>
          </div>
        </Col>
        <Col xs={24} sm={24}></Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Biển số xe (*)</p>
          <Form.Item
            name="plate"
            rules={[{ required: true, message: "Vui lòng nhập biển số xe" }]}
          >
            <Input placeholder={"Biển số xe"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Tên chủ xe</p>
          <Form.Item name="name">
            <Input placeholder={"Tên chủ xe"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Số máy</p>
          <Form.Item name="engine">
            <Input placeholder={"Số máy"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Số khung</p>
          <Form.Item name="chassis">
            <Input placeholder={"Số khung"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Địa chỉ</p>
          <Form.Item name="address">
            <Input placeholder={"Địa chỉ"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Nhãn hiệu</p>
          <Form.Item name="brand">
            <Input placeholder={"Nhãn hiệu"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Số loại</p>
          <Form.Item name="model">
            <Input placeholder={"Số loại"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Năm sản xuất</p>
          <Form.Item name="manufactured_year">
            <Input placeholder={"Năm sản xuất"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Số chỗ ngồi</p>
          <Form.Item name="permissible_no">
            <Input placeholder={"Số chỗ ngồi"} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <p className="ml-0 mb-0">Ngày đăng ký</p>
          <Form.Item name="first_issue_date">
            <Input placeholder={"Ngày đăng ký"} />
          </Form.Item>
        </Col>
        {/* <Col xs={12} sm={12}>
                </Col> */}
        <Col xs={12} sm={12}>
          <Button
            type="primary"
            loading={uploading}
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

export default Step1;
