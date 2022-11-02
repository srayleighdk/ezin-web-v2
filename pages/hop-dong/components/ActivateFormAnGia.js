import { Button, Col, Form, Row, Checkbox, message, Upload } from "antd";
import ButtonEzin from "../../../components/Common/Button";
import React, { useState, useEffect } from "react";
import { formatVND, validateDOB } from "../../../utils/helpers";
import Field from "../../../src/container/activeCard/Field";
import DatePicker from "react-mobile-datepicker";
import { useMediaQuery } from "react-responsive";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import useAuth from 'container/auth-wrapper/auth.context';
import moment from "moment";
import {
  getCities,
  getWards,
  getDistricts,
  getAccountMembers,
} from "../../api";
import NewIcon from "../../../public/images/new-icon.gif";
import Image from "next/image";
import { detectVehicleRegistration } from "../../api";
import { createStructuredSelector } from "reselect";
import { makeSelectAuth } from "../../../src/store/selector";
import { useSelector } from "react-redux";

const layout = {
  wrapperCol: { span: 24 },
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

export default function ActivateForm({ data, initData, onNext }) {
  const [form] = Form.useForm();
  const [openValidDate, setOpenValidDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cities1, setCities1] = useState([]);
  const [districts1, setDistricts1] = useState([]);
  const [wards1, setWards1] = useState([]);
  const [listName, setListName] = useState([]);
  const [currentName, setCurrentName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [image1, setImage1] = useState(null);
  const valid_from_delay = data?.product_id?.valid_from_delay;
  const nextDay = moment().add(valid_from_delay, "days").startOf("day");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  let dobValue = form.getFieldValue("dob")
    ? moment(form.getFieldValue("dob"), "DD/MM/YYYY")
    : moment();
  const minDate = moment().subtract(200, "years").startOf("day").toDate();
  const maxDate = moment().subtract(1, "years").endOf("day").toDate();
  // const { user } = useAuth();
  const { auth: user } = useSelector(mapStateToProps);

  const getInitData = async () => {
    const [res1] = await Promise.all([getCities()]);
    console.log("run1", res1);
    setCities(
      res1?.data?.data?.map((e) => ({
        label: e.name_with_type,
        value: e.code,
        group: e.type,
      }))
    );
    setCities1(
      res1?.data?.data?.map((e) => ({
        label: e.name_with_type,
        value: e.code,
        group: e.type,
      }))
    );
  };

  useEffect(() => {
    getInitData();
    loadListName();
  }, [data?._id]);

  useEffect(() => {
    const getDistricCity = async () => {
      if (initData) {
        const resDistricts1 = await getDistricts(initData?.city_ben);
        const resWards1 = await getWards(initData?.district_ben);
        // console.log('resWards1', resWards1)
        setDistricts1(
          resDistricts1?.data?.data?.map((e) => ({
            label: e.name_with_type,
            value: e.code,
          }))
        );
        setWards1(
          resWards1?.data?.data?.map((e) => ({
            label: e.name_with_type,
            value: e.code,
          }))
        );
      }
    }
    getDistricCity();
  }, [initData]);

  useEffect(() => {
    if (initData) {
      form.setFieldsValue(initData);
      loadDistricts(initData?.city);
      loadWards(initData?.district);
    } else if (listName && listName.length > 0) {
      let mainAccIndex = Math.max(
        0,
        // listName.findIndex(e => e.main_account)
        currentName
      );
      if (mainAccIndex >= 0) {
        setCurrentName(mainAccIndex);
        onSelectUser(mainAccIndex + 1);
      }
    }
  }, [listName?.length]);

  const getDoBField = (value) => {
    // 631126800000 is time stamp of 1/1/1990
    let strDate;
    if (value == "Invalid date" || value == "") {
      strDate = moment().format("DDMMYYYY");
    } else if (typeof value === "string" && value.length == 8) {
      strDate = value;
    } else {
      strDate = moment(value).format("DDMMYYYY");
    }
    return { dob: moment(strDate, "DDMMYYYY").format("DD/MM/YYYY") };
    //return { dob: isMobile? moment(strDate, 'DDMMYYYY').format('DD/MM/YYYY'): moment(moment(strDate, 'DDMMYYYY'))}
  };

  const onSelectUser = (val) => {
    if (val !== -1) {
      setCurrentName(val - 1);
      let currentClient = listName[val - 1];
      if (!currentClient.phone) {
        currentClient.phone = user?.username?.replace("+84", "0");
      }
      form.setFieldsValue({
        ...currentClient,
        ...getDoBField(currentClient.dob),
        valid_from: form.getFieldValue("valid_from"),
      });
      loadDistricts(form.getFieldValue("city"));
      loadWards(form.getFieldValue("district"));
    } else {
      setCurrentName(val);
      form.resetFields();
      form.setFieldsValue({
        ...getDoBField(),
        phone: user?.username?.replace("+84", "0"),
      });
      // setTimeout(() => name_ref?.current?.focus(), 0)
    }
  };
  const loadListName = async () => {
    let listName = await getAccountMembers(); //await getListName();
    if (
      listName &&
      listName.data &&
      listName.data.data &&
      listName.data.data.length > 0
    ) {
      setListName(listName?.data?.data.slice(0, 5));
    } else {
      const currentMember = {
        address: user.address,
        city: user.city,
        city_name: user.city_name,
        district: user.district,
        district_name: user.district_name,
        dob: user.dob,
        email: user.email,
        full_name: user.full_name,
        legal_id: user.legal_id,
        main_account: true,
        phone: user?.phone?.replace("+84", "0"),
        sex: user.gender,
        ward: user.ward,
        ward_name: user.ward_name,
      };
      setListName([currentMember]);
    }
  };

  const loadDistricts = async (value, clear = false) => {
    const res = await getDistricts(value);
    setDistricts(
      res?.data?.data?.map((e) => ({ label: e.name_with_type, value: e.code }))
    );
    if (clear) {
      form.setFieldsValue({
        district: null,
        ward: null,
      });
    }
  };

  const loadWards = async (value, clear = false) => {
    const res = await getWards(value);
    setWards(
      res?.data?.data?.map((e) => ({ label: e.name_with_type, value: e.code }))
    );
    if (clear) {
      form.setFieldsValue({
        ward: null,
      });
    }
  };

  const loadDistricts1 = async (value, clear = false) => {
    const res = await getDistricts(value);
    setDistricts1(
      res?.data?.data?.map((e) => ({ label: e.name_with_type, value: e.code }))
    );
    if (clear) {
      form.setFieldsValue({
        district_ben: null,
        ward_ben: null,
      });
    }
  };

  const loadWards1 = async (value, clear = false) => {
    const res = await getWards(value);
    setWards1(
      res?.data?.data?.map((e) => ({ label: e.name_with_type, value: e.code }))
    );
    if (clear) {
      form.setFieldsValue({
        ward_ben: null,
      });
    }
  };

  const handleSelectValidDate = (time) => {
    setOpenValidDate(false);
    form.setFieldsValue({
      valid_from: moment(time).format("DD/MM/YYYY"),
    });
  };

  const handleCancelValidDate = () => {
    setOpenValidDate(false);
  };

  const handleOpenValidDate = () => {
    setOpenValidDate(true);
  };

  const handleSelect = (time) => {
    setOpen(false);
    form.setFieldsValue({
      dob: moment(time).format("DD/MM/YYYY"),
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenDate = () => {
    setOpen(true);
  };

  const onFinish = (values) => {
    onNext(values);
  };
  const handleFieldChange = (name, value) => {
    form.setFieldsValue({
      [name]: value,
    });
  };

  const onAddressCheck = (e) => {
    if (e.target.checked) {
      // setDistrictBen(district);
      // setWardBen(ward);
      form.setFieldsValue({
        city_ben: form.getFieldValue("city"),
        district_ben: form.getFieldValue("district"),
        ward_ben: form.getFieldValue("ward"),
        address_ben: form.getFieldValue("address"),
      });
      // console.log('loadDistricts1', districts)
      loadDistricts1(form.getFieldValue("city"));
      loadWards1(form.getFieldValue("district"));
    } else {
      form.resetFields(["city_ben", "district_ben", "ward_ben", "address_ben"]);
    }
  };
  const onFinishFailed = (errorInfo) => {
    let msg = errorInfo.errorFields.map((e) => e.errors.join("\n")).join("\n");

    if (errorInfo?.errorFields?.length > 1) {
      msg = "Vui lòng nhập đầy đủ thông tin";
    }
    message.error(msg);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chụp ảnh</div>
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
    const detectType = "submit-card";
    try {
      const res = await detectVehicleRegistration(formData, detectType);
      if (res?.data?.success) {
        const infos = res?.data?.data?.data;
        if (infos && infos.length > 0) {
          const back = infos.find((e) =>
            ["chip_id_card_back", "12_id_card_back", "9_id_card_back"].includes(
              e.type
            )
          )?.info;
          const front = infos.find((e) =>
            [
              "chip_id_card_front",
              "12_id_card_front",
              "9_id_card_front",
            ].includes(e.type)
          )?.info;
          if (!back && !front) {
            message.warning(
              "Rất tiếc Ezin không nhận dạng được thông tin giấy tờ của bạn. Bạn vui lòng chụp lại hoặc có thể điền bằng tay!"
            );
            return;
          }
          form.setFieldsValue({
            full_name: front?.name,
            legal_id: front?.id,
            address: front?.address,
            dob: front?.dob,
            sex: front?.gender == "nam" ? 0 : 1,
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

  return (
    <div>
      <Form
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form-ezin"
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <div
              className="flex flex-row align-items-center text-primary"
              href="#"
            >
              <div className="mr-1">
                <Image
                  alt="Tính năng mới"
                  src={NewIcon}
                  width={50}
                  height={37}
                />
              </div>
              <div>
                Bạn có thể điền thông tin nhanh hơn bằng cách chụp ảnh giấy tờ
                cá nhân
              </div>
            </div>
            <div style={{ width: 120, height: 120 }}>
              <Upload
                name="img1"
                beforeUpload={(file) => {
                  handleUpload(file);
                }}
                onRemove={(file) => setImage1(null)}
                listType="picture-card"
                className="avatar-uploader"
                accept={"image/*"}
              >
                {!image1 && uploadButton}
              </Upload>
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <h3>Thời hạn bảo hiểm {data?.period} năm</h3>
            <Row gutter={[8, 8]}>
              <Col xs={{ span: 24 }} md={{ span: 24 }}>
                <Field
                  type="date"
                  label="Hiệu lực từ ngày"
                  required={true}
                  handleOpenDate={handleOpenValidDate}
                  initialValue={
                    isMobile ? nextDay?.format("DD/MM/YYYY") : nextDay
                  }
                  name="valid_from"
                  defaultValue={nextDay}
                  title="Hiệu lực từ"
                  onChange={handleFieldChange}
                  minDate={
                    new Date(nextDay.year(), nextDay.month(), nextDay.date())
                  }
                  onFieldChange={handleFieldChange}
                />
              </Col>
              {/* <Col span={12}><Field name="valid_to" type="date" title="Ngày kết thúc" autoFocus={true} setFormValue={setFormValue} /></Col> */}
            </Row>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <h3>Người được bảo hiểm</h3>
          </Col>
          <Col span={24}>
            <p className="ml-0 mb-0 text-11">
              Chọn người được bảo hiểm (hoặc nhấn dấu + để thêm mới)
            </p>
            {listName.map((item, index) => (
              <Button
                key={index}
                type="primary"
                className={`text-11 text-white mr-1 mt-1 ${
                  index == currentName ? "bg-primary" : "bg-gray"
                }`}
                onClick={() => onSelectUser(index + 1)}
              >
                {item.full_name || item.username}
              </Button>
            ))}
            <Button
              type="link"
              className={`text-12 mr-1 mt-1`}
              icon={<PlusOutlined />}
              title="Thêm người mới"
              onClick={() => onSelectUser(-1)}
            >
              Thêm người
            </Button>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Field
              type="select"
              name="sex"
              required={true}
              title="Danh xưng"
              datasource={[
                { value: 0, label: "Ông" },
                { value: 1, label: "Bà" },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Field
              name="full_name"
              type="text"
              title="Họ tên"
              autoFocus={true}
              required={true}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Field name="legal_id" type="text" title="CMND/CCCD/Hộ chiếu" />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Field
              type="date"
              required={true}
              handleOpenDate={handleOpenDate}
              name="dob"
              title="Ngày sinh"
              onChange={handleFieldChange}
              onFieldChange={handleFieldChange}
              rules={[
                {
                  validator: validateDOB,
                },
              ]}
            />
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Field
              name="phone"
              type="text"
              title="Số điện thoại"
              required={true}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Field
              name="email"
              type="text"
              title="Email"
              rules={[{ type: "email", message: "Email không hợp lệ" }]}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Field
              name="address"
              type="text"
              title="Địa chỉ chỗ ở hiện tại"
              required={true}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Field
              type="select"
              groups={{ "thanh-pho": "Thành phố", tinh: "Tỉnh" }}
              required={true}
              name="city"
              title="Tỉnh thành"
              datasource={cities}
              onChange={(value) => loadDistricts(value, true)}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Field
              type="select"
              required={true}
              name="district"
              title="Quận huyện"
              datasource={districts}
              onChange={(value) => loadWards(value, true)}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Field
              type="select"
              required={true}
              name="ward"
              title="Phường xã"
              datasource={wards}
            />
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Checkbox onChange={onAddressCheck}>
              Đây cũng là địa chỉ được bảo hiểm
            </Checkbox>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <h3>Địa chỉ được bảo hiểm</h3>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Field
              type="select"
              groups={{ "thanh-pho": "Thành phố", tinh: "Tỉnh" }}
              required={true}
              name="city_ben"
              title="Tỉnh thành"
              datasource={cities1}
              onChange={(value) => loadDistricts1(value, true)}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Field
              type="select"
              required={true}
              name="district_ben"
              title="Quận huyện"
              datasource={districts1}
              onChange={(value) => loadWards1(value, true)}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Field
              type="select"
              required={true}
              name="ward_ben"
              title="Phường xã"
              datasource={wards1}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Field
              name="address_ben"
              type="text"
              title="Địa chỉ được bảo hiểm"
              required={true}
            />
          </Col>
        </Row>
        <div>
          <div
            className={`fee ${
              data?.promotion_fee && data?.promotion_fee != data?.fee
                ? "strike"
                : ""
            }`}
          >
            Tổng tiền: {formatVND(data?.fee)}
          </div>
          {data?.promotion_fee && data?.promotion_fee != data?.fee && (
            <div className="fee">
              Ezin tài trợ chỉ còn: {formatVND(data?.promotion_fee)}
            </div>
          )}
          <ButtonEzin
            types="primary"
            className="btn-full-width"
            htmlType="submit"
            id="btn-next-step2"
          >
            Tiếp tục
          </ButtonEzin>
        </div>
      </Form>
      <DatePicker
        // isPopup={true}
        min={nextDay?.toDate()}
        // max={maxDate}
        value={nextDay?.toDate()}
        isOpen={openValidDate}
        onSelect={handleSelectValidDate}
        onCancel={handleCancelValidDate}
        confirmText="Chọn"
        cancelText="Đóng"
        headerFormat="Ngày: DD/MM/YYYY"
        theme={isMobile ? "ios" : "default"}
        showHeader={true}
        dateConfig={{
          date: {
            format: "DD",
            caption: "Ngày",
            step: 1,
          },
          month: {
            format: "MM",
            caption: "Tháng",
            step: 1,
          },
          year: {
            format: "YYYY",
            caption: "Năm",
            step: 1,
          },
        }}
      />
      <DatePicker
        // isPopup={true}
        min={minDate}
        // max={maxDate}
        value={dobValue.toDate()}
        isOpen={open}
        onSelect={handleSelect}
        onCancel={handleCancel}
        confirmText="Chọn"
        cancelText="Đóng"
        headerFormat="Ngày: DD/MM/YYYY"
        theme={isMobile ? "ios" : "default"}
        showHeader={true}
        dateConfig={{
          date: {
            format: "DD",
            caption: "Ngày",
            step: 1,
          },
          month: {
            format: "MM",
            caption: "Tháng",
            step: 1,
          },
          year: {
            format: "YYYY",
            caption: "Năm",
            step: 1,
          },
        }}
      />
    </div>
  );
}
