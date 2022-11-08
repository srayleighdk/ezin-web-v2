import {
  Button,
  Col,
  Form,
  Checkbox,
  message,
  Row,
  Typography,
  Radio,
  Upload,
} from "antd";
import moment from "moment";
import {
  getAccountMembers,
  getVehicleBrands,
  getVehicleModels,
  getCities,
  getWards,
  getDistricts,
} from "../../../pages/api";
import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import DatePicker from "react-mobile-datepicker";
import { useMediaQuery } from "react-responsive";
import NewIcon from "../../../public/images/new-icon.gif";

const { Title } = Typography;
import useAuth from "../../container/auth-wrapper/auth.context";
import Field from "./Field";
import Image from "next/image";
import { detectVehicleRegistration } from "../../../pages/api";
import ButtonEzin from "../../../components/Common/Button";

const layout = {
  wrapperCol: { span: 24 },
};

export default function Third({ onPrevStep, onNextStep, cardInfo }) {
  const [form] = Form.useForm();
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [district_ben, setDistrictBen] = useState([]);
  const [ward_ben, setWardBen] = useState([]);
  const [listName, setListName] = useState([]);
  const [licenseType, setLicenseType] = useState("license");
  const [currentName, setCurrentName] = useState(null);
  const [open, setOpen] = useState(false);
  const [openValidDate, setOpenValidDate] = useState(false);
  const [showEngineNumber, setShowEngineNumber] = useState(false);
  const [showBrand, setShowBrand] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [showYearUse, setShowYearUse] = useState(false);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [districts1, setDistricts1] = useState([]);
  const [wards1, setWards1] = useState([]);
  const [ownerCity, setOwnerCity] = useState(null);
  const [ownerDistrict, setOwnerDistrict] = useState(null);
  const [type, setType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [image1, setImage1] = useState(null);

  const { user } = useAuth();

  const name_ref = useRef(null);
  let dobValue = form.getFieldValue("dob")
    ? moment(form.getFieldValue("dob"), "DD/MM/YYYY")
    : moment();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const minDate = moment().subtract(200, "years").startOf("day").toDate();
  const maxDate = moment().subtract(1, "years").endOf("day").toDate();

  const getInitData = async () => {
    const [res1] = await Promise.all([getCities()]);
    setCities(
      res1?.data?.data?.map((e) => ({
        label: e.name_with_type,
        value: e.code,
        group: e.type,
      }))
    );
  };

  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    const getDataCardInfo = async () => {
      if (cardInfo) {
        const resDistricts = await getDistricts(cardInfo.city);
        const resWards = await getWards(cardInfo.district);
        setDistricts(
          resDistricts?.data?.data?.map((e) => ({
            label: e.name_with_type,
            value: e.code,
          }))
        );
        setWards(
          resWards?.data?.data?.map((e) => ({
            label: e.name_with_type,
            value: e.code,
          }))
        );
      }
    }
    getDataCardInfo();
  }, [cardInfo]);

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
  const loadVehicleModels = async (value) => {
    const res = await getVehicleModels(value);
    setModels(res?.data?.data?.map((e) => ({ label: e.name, value: e.code })));
  };
  // current active card day is tomorrow
  // const nextDay = moment().add(1, 'days').startOf('day');
  const valid_from_delay = cardInfo.package_id.product_id.valid_from_delay;
  const nextDay = moment().add(valid_from_delay, "days").startOf("day");

  const onPrev = (params) => {
    onPrevStep(params);
  };

  const onFinishFailed = (errorInfo) => {
    let msg = errorInfo.errorFields.map((e) => e.errors.join("\n")).join("\n");

    if (errorInfo?.errorFields?.length > 1) {
      msg = "Vui lòng nhập đầy đủ thông tin";
    }
    message.error(msg);
  };

  const onFinish = (values) => {
    let { dob, ...rest } = values;
    const valid_from = moment.isMoment(values.valid_from)
      ? moment(values.valid_from).format("DD/MM/YYYY")
      : values.valid_from;
    let body = {
      ...rest,
      valid_from: valid_from,
      main_account: true,
    };

    // const age = moment().diff(date, 'years', true);
    // if (cardInfo?.package_id && age) {
    //   const { age_min, age_max } = cardInfo?.package_id;
    //   if ((age_min && age < age_min) || (age_max && age > age_max)) {
    //     message.error(`Rất tiếc độ tuổi của bạn không phù hợp với gói bảo hiểm này (từ ${age_min} - ${age_max} tuổi)`);
    //     return;
    //   }
    // }

    if (!(body.licenseNumber || (body.engineNumber && body.chassisNumber))) {
      message.error(
        `Vui lòng nhập biển số xe (hoặc số máy/số khung nếu xe mua bảo hiểm chưa đăng kiểm)`
      );
      return;
    }
    onNextStep(body);
  };

  const onReset = () => {
    if (
      confirm(
        "Tất cả thông tin bạn đã nhập sẽ bị mất, bạn có chắc muốn thực hiện?"
      )
    ) {
      form.resetFields();
      setTimeout(() => name_ref?.current?.focus(), 0);
    }
  };

  const getDoBField = (value) => {
    // 631126800000 is time stamp of 1/1/1990
    var strDate;
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
      const currentClient = listName[val - 1];
      if (!currentClient.phone) {
        currentClient.phone = user.username?.replace("+84", "0");
      }

      form.setFieldsValue({
        ...currentClient,
        // ...getDoBField(currentClient.dob),
        valid_from: form.getFieldValue("valid_from"),
      });
      loadDistricts(form.getFieldValue("city"));
      loadWards(form.getFieldValue("district"));
    } else {
      setCurrentName(val);
      form.resetFields([
        "full_name",
        "email",
        "legal_id",
        "dob",
        "city",
        "ward",
        "district",
        "address",
        "owner_name",
        "owner_address",
        "owner_city",
        "owner_ward",
        "owner_district",
      ]);
      form.setFieldsValue({
        // ...getDoBField(),
        // phone: user.username,
        phone: user.username?.replace("+84", "0"),
      });

      setTimeout(() => name_ref?.current?.focus(), 0);
    }
  };

  const loadListName = async () => {
    const listName = await getAccountMembers(); //await getListName();
    if (cardInfo.newListName) {
      const newList = cardInfo.newListName.map((a) => {
        return {
          ...a,
          // dob: moment(a.dob, "DDMMYYYY"),
          valid_from: moment(a.valid_from, "DD/MM/YYYY"),
        };
      });
      setListName(newList);
    } else {
      setListName((listName?.data?.data).slice(0, 5));
    }
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

  useEffect(() => {
    if (!form.getFieldValue("email") && user?.email) {
      form.setFieldsValue({
        email: user.email,
      });
    }
    if (!form.getFieldValue("full_name") && user?.full_name) {
      form.setFieldsValue({
        full_name: user?.full_name,
      });
    }
    if (!form.getFieldValue("phone") && user?.username) {
      form.setFieldsValue({
        phone: user.username.replace("+84", "0"),
      });
    }
    if (cardInfo?.valid_from) {
      form.setFieldsValue({
        ...cardInfo,
        // ...getDoBField(cardInfo.dob),
        valid_from: moment(cardInfo.valid_from, "D/M/YYYY"),
        // licenseType: cardInfo.licenseType || 'license'
      });
    }
    // else {
    //   form.setFieldsValue({
    //     ...cardInfo,
    //     ...getDoBField(cardInfo.dob),
    //     licenseType: cardInfo.licenseType || 'license'
    //   });
    // }
    // if (cardInfo?.city) {
    //   setDistrict(getDistrictData(Object.values(districtData), cardInfo?.city));
    // }
    // if (cardInfo?.district) {
    //   setWard(getWardtData(Object.values(wardData), cardInfo?.district));
    // }
    loadListName();
    // setLicenseType(cardInfo.licenseType)
  }, [cardInfo, user]);

  useEffect(() => {
    // if (listName && listName.length > 0) {
    //   let mainAccIndex = Math.max(0, listName.findIndex(e => e.main_account));
    //   if (mainAccIndex >= 0) {
    //     setCurrentName(mainAccIndex)
    //     onSelectUser(mainAccIndex + 1)
    //   }
    // }
  }, [listName]);

  const handleFieldChange = (type, value) => {
    form.setFieldsValue({
      [type]: value,
    });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chụp ảnh</div>
    </div>
  );
  const handleUpload = async (file) => {
    // message.info('Xin vui lòng chờ trong giây lát...');
    setImage1(file);
    setUpLoading(true);
    const formData = new FormData();
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
          form.setFieldsValue({
            licenseNumber: back?.plate,
            engineNumber: back?.engine,
            chassisNumber: back?.chassis,
            full_name: back?.name,
            address: back?.address,
          });
          if (back?.engine || back?.chassis) {
            setShowEngineNumber(true);
          }
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
    <div className="step-wrapper" style={{ maxWidth: 800, margin: "0px auto" }}>
      <Form
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form-ezin"
        form={form}
      >
        <div className="p-2 ezin-card">
          <div className="text-center">
            <Title level={2} className="text-primary mb-4">
              NHẬP THÔNG TIN XE
            </Title>
            <p>{cardInfo?.package_id?.name}</p>
            <p className="text-primary text-11">
              Vui lòng nhập thông tin đầy đủ và chính xác để đảm bảo quyền lợi
              bảo hiểm. <br />
              Nhập Tiếng Việt có dấu.
            </p>
          </div>
          <Row gutter={[8, 8]} className="mt-3">
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
                  Bạn có thể điền thông tin nhanh hơn bằng cách chụp ảnh giấy
                  đăng ký xe
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
            <Col span={24}>
              <h3 className="ml-0 mb-1">
                <b>Thông tin xe được bảo hiểm</b>
              </h3>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Field
                type="text"
                name="licenseNumber"
                title="Biển số xe"
                autoFocus={true}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value &&
                        !getFieldValue("chassisNumber") &&
                        !getFieldValue("engineNumber")
                      ) {
                        return Promise.reject(
                          new Error(
                            "Vui lòng nhập biển số hoặc số khung và số máy"
                          )
                        );
                      }
                      if (value) {
                        const tmp = value.trim().replace("-", "");
                        if (tmp.length < 7 || tmp.length > 12) {
                          return Promise.reject(
                            new Error(
                              "Biển kiểm soát không hợp lệ, vui lòng nhập lại"
                            )
                          );
                        }
                        if (!/[a-zA-Z]/.test(tmp)) {
                          return Promise.reject(
                            new Error(
                              "Biển kiểm soát không hợp lệ, vui lòng nhập lại"
                            )
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              />
            </Col>

            <Col span={24}>
              <Button
                type={showEngineNumber ? "danger" : "primary"}
                className="full-w text-left text-11"
                onClick={() => {
                  if (showEngineNumber) {
                    form.resetFields(["engineNumber", "chassisNumber"]);
                  }
                  setShowEngineNumber(!showEngineNumber);
                }}
              >
                {!showEngineNumber
                  ? `+ Thêm số máy/số khung/số chỗ ngồi`
                  : `- Bỏ số máy/số khung/số chỗ ngồi`}
              </Button>
            </Col>
            {showEngineNumber && (
              <>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Field type="text" name="engineNumber" title="Số máy" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Field type="text" name="chassisNumber" title="Số khung" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Field
                    type="text"
                    name="capacity"
                    title="Số chỗ ngồi"
                    initialValue={
                      cardInfo?.program_id?.capacity_options[0]?.value
                    }
                  />
                </Col>
              </>
            )}
            {/*
            <Col span={24}>
              <Button type={showBrand ? 'danger' : 'primary'} className="full-w text-left text-11" onClick={() => setShowBrand(!showBrand)}>{!showBrand ? `+ Thêm hãng xe` : `- Bỏ hãng xe`}</Button>
            </Col>
            {
              showBrand && (
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field type="select" name="brand" title="Hãng xe" datasource={brands}
                    onChange={(value) => loadVehicleModels(value)}
                  />
                </Col>
              )
            }

            <Col span={24}>
              <Button type={showModel ? 'danger' : 'primary'} className="full-w text-left text-11" onClick={() => setShowModel(!showModel)}>{!showModel ? `+ Thêm dòng xe` : `- Bỏ dòng xe`}</Button>
            </Col>
            {showModel && (
              <>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field type="select" name="model" title="Dòng xe" datasource={models} />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field type="text" name="capacity" title="Số chỗ ngồi" />
                </Col>
              </>
            )}
            <Col span={24}>
              <Button type={showYearUse ? 'danger' : 'primary'} className="full-w text-left text-11" onClick={() => setShowYearUse(!showYearUse)}>{!showYearUse ? `+ Thêm năm sản xuất` : `- Bỏ năm sản xuất`}</Button>
            </Col>
            {showYearUse && (
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Field type="text" name="year_use" title="Năm sản xuất" />
              </Col>
            )} */}
            <Col span={24}>
              <h3>Thông tin chủ xe & người liên hệ</h3>
            </Col>
            <Col span={24}>
              <label>Đây là xe</label>
              <Radio.Group
                className="ml-2"
                onChange={(e) => {
                  setType(e.target.value);
                  loadDistricts1(form.getFieldValue("owner_city"));
                  loadWards1(form.getFieldValue("owner_district"));
                }}
                value={type}
              >
                <Radio value={1}>Cá nhân</Radio>
                <Radio value={2}>Công ty / Tổ chức</Radio>
              </Radio.Group>
            </Col>
            {type == "1" && (
              <>
                <Col span={24}>
                  <p className="ml-0 mb-0 text-11">
                    Chọn chủ xe (hoặc nhấn dấu + để thêm mới)
                  </p>
                  {listName.map((item, index) => (
                    <Button
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
                    type="primary"
                    className={`text-11 text-white mr-1 mt-1`}
                    icon={<PlusOutlined />}
                    title="Thêm người mới"
                    onClick={() => onSelectUser(-1)}
                  >
                    Thêm chủ xe
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
                    type="text"
                    required={true}
                    name="full_name"
                    title="Họ tên"
                    desc="Họ và tên của bạn như trên Cà Vẹc xe"
                  />
                </Col>
                {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Field type="text" name="legal_id" title="CMND/CCCD/Hộ chiếu" />
                  </Col> */}
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field
                    type="text"
                    required={true}
                    name="phone"
                    title="Điện thoại"
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field
                    type="text"
                    name="email"
                    title="Email"
                    desc="Email dùng để nhận giấy chứng nhận BH"
                    rules={[{ type: "email", message: "Email không hợp lệ" }]}
                    required={true}
                  />
                </Col>
                {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Field type="date" name="dob" title="Ngày sinh" onFieldChange={handleFieldChange} />
                  </Col> */}
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <Field
                    type="text"
                    required={true}
                    name="address"
                    title="Địa chỉ chỗ ở hiện tại"
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
              </>
            )}
            {type == "2" && (
              <>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <Field
                    type="text"
                    required={true}
                    name="owner_name"
                    title="Tên công ty / tổ chức"
                    desc="Tên doanh nghiệp của bạn như trên Cà Vẹc xe"
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <Field
                    type="text"
                    required={true}
                    name="owner_address"
                    title="Địa chỉ công ty / tổ chức"
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Field
                    type="select"
                    required={true}
                    name="owner_city"
                    groups={{ "thanh-pho": "Thành phố", tinh: "Tỉnh" }}
                    title="Tỉnh thành"
                    datasource={cities}
                    onChange={(value) => loadDistricts1(value, true)}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Field
                    type="select"
                    required={true}
                    name="owner_district"
                    title="Quận huyện"
                    datasource={districts1}
                    onChange={(value) => loadWards1(value, true)}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Field
                    type="select"
                    required={true}
                    name="owner_ward"
                    title="Phường xã"
                    datasource={wards1}
                  />
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <h4 className="font-weight-bold">Người liên hệ</h4>
                </Col>
                <Col span={24}>
                  <p className="ml-0 mb-0 text-11">
                    Chọn người liên hệ (hoặc nhấn dấu + để thêm mới)
                  </p>
                  {listName.map((item, index) => (
                    <Button
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
                    Thêm người liên hệ
                  </Button>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field
                    type="select"
                    required={true}
                    name="sex"
                    title="Danh xưng"
                    datasource={[
                      { value: 0, label: "Ông" },
                      { value: 1, label: "Bà" },
                    ]}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field
                    type="text"
                    required={true}
                    name="full_name"
                    title="Họ tên"
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field type="text" name="phone" title="Số điện thoại" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Field
                    type="text"
                    name="email"
                    title="Email"
                    desc="Email dùng để nhận giấy chứng nhận BH"
                    rules={[{ type: "email", message: "Email không hợp lệ" }]}
                  />
                </Col>
              </>
            )}

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
            {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Field type="date" name="valid_to" title="Đến" disabled value={{}} />
            </Col> */}
          </Row>
        </div>
        <div className="my-4 d-flex justify-content-around">
          <ButtonEzin
            types="default"
            onClick={() => {
              onPrev(form.getFieldsValue());
            }}
            className="btn-kichhoat"
          >
            Trở về
          </ButtonEzin>
          <ButtonEzin
            types="primary"
            htmlType="submit"
            className="btn-kichhoat"
          >
            Tiếp tục
          </ButtonEzin>
        </div>
        <div className="text-center">
          <ButtonEzin types="default" className="btn-kichhoat bg-danger" htmlType="button" onClick={onReset}>
            Làm lại
          </ButtonEzin>
        </div>
      </Form>
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
    </div>
  );
}
