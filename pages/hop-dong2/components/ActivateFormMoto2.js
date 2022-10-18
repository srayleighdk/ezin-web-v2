import NewIcon from "../../../public/images/new-icon.gif";
import Image from "next/image";
import { useState } from "react";
import {
  CloseCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Descriptions,
  Form,
  message,
  Row,
  Spin,
  Tag,
  Typography,
  Upload,
} from "antd";

export default function ActivateFormMoto() {
  const [image1, setImage1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chụp ảnh giấy đăng ký xe</div>
    </div>
  );

  const handleUpload = async (file) => {
    setImage1(file);
    setUpLoading(true);
    // setTimeout(() => {
    //   message.info('Xin vui lòng chờ trong giây lát...');
    // }, 1)
    const formData = new FormData();
    // TODO: phai append 2 mat
    formData.append("files[]", file);
    formData.append("files[]", file);
    const detectType = "submit-registrations";
    try {
      const res = await detectVehicleRegistration(formData, detectType);
      if (res?.data?.success) {
        const infos = res?.data?.data?.data;
        console.log("infos", infos);
        if (infos && infos.length > 0) {
          const back = infos.find(
            (e) => e.type == "vehicle_registration_back"
          )?.info;
          const front = infos.find(
            (e) => e.type == "vehicle_registration_front"
          )?.info;
          if (!back && !front) {
            message.warning(
              "Rất tiếc Ezin không nhận dạng được thông tin giấy đăng ký của bạn. Bạn vui lòng chụp lại hoặc có thể điền bằng tay!"
            );
            return;
          }
          console.log("back?.plate", back?.plate);
        //   form.setFieldsValue({
        //     licenseNumber: back?.plate,
        //     engineNumber: back?.engine,
        //     chassisNumber: back?.chassis,
        //     full_name: back?.name,
        //     address: back?.address,
        //   });
        //   if (back?.engine || back?.chassis) {
        //     setShowEngineNumber(true);
        //   }
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

  return (
    <>
      <h3 className="text-center text-info fs-3 mb-0 ">Thông tin bảo hiểm</h3>
      <div className="d-flex flex-row align-items-center text-primary" href="#">
        <div className="mr-1">
          <Image alt="Tính năng mới" src={NewIcon} width={50} height={37} />
        </div>
        <div>
          Bạn có thể điền thông tin nhanh hơn bằng cách chụp ảnh giấy đăng ký xe
        </div>
      </div>
      <div className={`w-100 ${!image1 && "border-dashed"} text-center py-4 mt-1 mb-3`}>
        <Upload
          name="img1"
          beforeUpload={(file) => {
            handleUpload(file);
          }}
          onRemove={() => setImage1(null)}
          listType="picture-card"
          className="avatar-uploader"
          accept={"image/*"}
        >
          {!image1 && uploadButton}
        </Upload>
      </div>
      <form id="contactForm">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                required
                placeholder="Your Name"
              />
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                required
                placeholder="Your Email"
              />
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            <div className="form-group">
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                required
                className="form-control"
                placeholder="Your Phone"
              />
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            <div className="form-group">
              <input
                type="text"
                name="msg_subject"
                id="msg_subject"
                className="form-control"
                required
                placeholder="Your Subject"
              />
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <textarea
                name="message"
                className="form-control"
                id="message"
                cols="30"
                rows="5"
                required
                placeholder="Your Message"
              ></textarea>
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <button type="submit" className="default-btn btn-two">
              <span className="label">Send Message</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
