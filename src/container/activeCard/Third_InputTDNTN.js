import { Button, Col, Form, Upload, message, Row, Select, Typography, Checkbox } from 'antd';
import CustomSelect from '../../../components/Select';
import moment from 'moment';
import { getAccountMembers } from '../../../pages/api';
import React, { useEffect, useState, useRef } from 'react';
import cityData from '../../resource/city';
import districtData from '../../resource/district';
import wardData from '../../resource/ward';
import slugify from 'slugify';
import { getDistrictData, getWardtData, requireRule, validateDOB, validateLegalId } from '../../../utils/helpers';
import { getCities, getWards, getDistricts } from '../../../pages/api';
import { PlusOutlined } from '@ant-design/icons';
import DatePicker from 'react-mobile-datepicker';
import EzinDatePicker from '../../../components/EzinDatePicker';
import { useMediaQuery } from 'react-responsive';
const { Text, Title } = Typography;
import useAuth from '../auth-wrapper/auth.context';
import Field from './Field';
import Image from 'next/image';
import NewIcon from '../../../public/images/new-icon.gif';
import { detectVehicleRegistration } from '../../../pages/api';

const layout = {
  wrapperCol: { span: 24 },
};

export default function Third_InputTDNTN({ onPrevStep, onNextStep, cardInfo }) {
  const [form] = Form.useForm();
  // const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [district_ben, setDistrictBen] = useState([]);
  const [ward_ben, setWardBen] = useState([]);
  const [listName, setListName] = useState([]);
  const [currentName, setCurrentName] = useState(null);
  const [open, setOpen] = useState(false);
  const [openValidDate, setOpenValidDate] = useState(false);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cities1, setCities1] = useState([]);
  const [districts1, setDistricts1] = useState([]);
  const [wards1, setWards1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [image1, setImage1] = useState(null);

  const { user } = useAuth();
  const name_ref = useRef(null);
  let dobValue = form.getFieldValue('dob') ? moment(form.getFieldValue('dob'), 'DD/MM/YYYY') : moment();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const minDate = moment().subtract(200, 'years').startOf('day').toDate();
  const maxDate = moment().subtract(1, 'years').endOf('day').toDate();

  // current active card day is tomorrow
  const valid_from_delay = cardInfo.package_id.product_id.valid_from_delay;
  const nextDay = moment().add(valid_from_delay, 'days').startOf('day');

  const getInitData = async () => {
    const [res1] = await Promise.all([
      getCities(),
    ]);
    setCities(res1?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code, group: e.type })))
    setCities1(res1?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code, group: e.type })))
  }

  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    const getDataCardInfo = async () => {
      if(cardInfo) {
        const resDistricts = await getDistricts(cardInfo?.city);
        const resWards = await getWards(cardInfo?.district);
        setDistricts(resDistricts?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
        setWards(resWards?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
        setDistricts1(resDistricts?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
        setWards1(resWards?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
      }
    }
    getDataCardInfo();
  }, [cardInfo])

  const loadDistricts = async (value, clear = false) => {
    const res = await getDistricts(value)
    setDistricts(res?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
    if (clear) {
      form.setFieldsValue({
        district: null,
        ward: null
      })
    }
  }
  const loadWards = async (value, clear = false) => {
    const res = await getWards(value)
    setWards(res?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
    if (clear) {
      form.setFieldsValue({
        ward: null
      })
    }
  }
  const loadDistricts1 = async (value, clear = false) => {
    const res = await getDistricts(value)
    setDistricts1(res?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
    if (clear) {
      form.setFieldsValue({
        district_ben: null,
        ward_ben: null
      })
    }
  }
  const loadWards1 = async (value, clear = false) => {
    const res = await getWards(value)
    setWards1(res?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
    if (clear) {
      form.setFieldsValue({
        ward_ben: null
      })
    }
  }

  const onPrev = (params) => {
    onPrevStep(params);
  };

  const onFinishFailed = (errorInfo) => {
    const msg = errorInfo.errorFields.map(e => e.errors.join(". ")).join(". ")
    message.error(msg);
  };
  const onFinish = (values) => {
    let { dob, ...rest } = values;
    const date = moment(dob, 'DD/MM/YYYY');
    if (!date.isValid()) {
      message.error('Ngày tháng năm sinh không hợp lệ, vui lòng chọn lại');
      return;
    }
    const dateOfBirth = moment(date).format('DDMMYYYY');
    const valid_from = moment.isMoment(values.valid_from) ? moment(values.valid_from).format('DD/MM/YYYY') : values.valid_from;
    let body = {
      ...rest,
      dob: dateOfBirth,
      valid_from: valid_from,
      main_account: true
    };
    const age = moment().diff(date, 'years', true);
    if (cardInfo?.package_id && age) {
      const { age_min, age_max } = cardInfo?.package_id;
      if ((age_min && age < age_min) || (age_max && age > age_max)) {
        message.error(`Rất tiếc độ tuổi của bạn không phù hợp với gói bảo hiểm này (từ ${age_min} - ${age_max} tuổi)`);
        return;
      }
    }
    onNextStep(body);
  };

  const onReset = () => {
    if (confirm('Tất cả thông tin bạn đã nhập sẽ bị mất, bạn có chắc muốn thực hiện?')) {
      form.resetFields();
      setTimeout(() => name_ref?.current?.focus(), 0)
    }
  };

  // const onSelectCity = (value, option) => {
  //   setDistrict(getDistrictData(Object.values(districtData), option.key));
  //   form.resetFields(['district', 'ward']);
  // };

  // const onSelectDistrict = (val, option) => {
  //   setWard(getWardtData(Object.values(wardData), option.key));
  //   form.resetFields(['ward']);
  // };

  // const onSelectCityBen = (value, option) => {
  //   setDistrictBen(getDistrictData(Object.values(districtData), option.key));
  //   form.resetFields(['district_ben', 'ward_ben']);
  // };

  // const onSelectDistrictBen = (val, option) => {
  //   setWardBen(getWardtData(Object.values(wardData), option.key));
  //   form.resetFields(['ward_ben']);
  // };

  const getDoBField = (value) => {
    // 631126800000 is time stamp of 1/1/1990
    let strDate;
    if (value == 'Invalid date' || value == '') {
      strDate = moment().format('DDMMYYYY');
    } else if (typeof value === 'string' && value.length == 8) {
      strDate = value;
    } else {
      strDate = moment(value).format('DDMMYYYY');
    }
    return { dob: moment(strDate, 'DDMMYYYY').format('DD/MM/YYYY') }
    //return { dob: isMobile? moment(strDate, 'DDMMYYYY').format('DD/MM/YYYY'): moment(moment(strDate, 'DDMMYYYY'))}
  };

  const onSelectUser = (val) => {
    if (val !== -1) {
      setCurrentName(val - 1);
      let currentClient = listName[val - 1];
      if (!currentClient.phone) {
        currentClient.phone = user.username?.replace('+84', '0');
      }


      form.setFieldsValue({
        ...currentClient,
        ...getDoBField(currentClient.dob),
        valid_from: form.getFieldValue('valid_from')
      });
      loadDistricts(form.getFieldValue('city'))
      loadWards(form.getFieldValue('district'))
    } else {
      setCurrentName(val);
      form.resetFields();
      form.setFieldsValue({
        ...getDoBField(),
        phone: user.username?.replace('+84', '0'),
      });
      setTimeout(() => name_ref?.current?.focus(), 0)

    }
  };

  const loadListName = async () => {
    let listName = await getAccountMembers();//await getListName();
    if (cardInfo.newListName) {
      const newList = cardInfo.newListName.map(a => {
        return {
          ...a,
          dob: moment(a.dob, "DDMMYYYY"),
          valid_from: moment(a.valid_from, "DD/MM/YYYY")
        }
      });
      setListName(newList);
    } else {
      if (listName && listName.data && listName.data.data && listName.data.data.length > 0) {
        setListName((listName?.data?.data).slice(0,5));
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
          phone: user.phone?.replace('+84', '0'),
          sex: user.gender,
          ward: user.ward,
          ward_name: user.ward_name
        }
        setListName([currentMember]);
      }
    }
  };



  const handleSelect = (time) => {
    setOpen(false);
    form.setFieldsValue({
      dob: moment(time).format('DD/MM/YYYY')
    });
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleOpenDate = () => {
    setOpen(true);
  }

  const handleSelectValidDate = (time) => {
    setOpenValidDate(false);
    form.setFieldsValue({
      valid_from: moment(time).format('DD/MM/YYYY')
    });
  }

  const handleCancelValidDate = () => {
    setOpenValidDate(false)
  }

  const handleOpenValidDate = () => {
    setOpenValidDate(true);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chụp ảnh</div>
    </div>
  );
  const handleUpload = async (file) => {
    setImage1(file);
    setUpLoading(true)
    // setTimeout(() => {
    //   message.info('Xin vui lòng chờ trong giây lát...');
    // }, 1)
    const formData = new FormData();
    // TODO: phai append 2 mat
    formData.append('files[]', file);
    formData.append('files[]', file);
    const detectType = 'submit-card';
    try {
      const res = await detectVehicleRegistration(formData, detectType);
      if (res?.data?.success) {
        const infos = res?.data?.data?.data
        console.log('infos', infos)
        if (infos && infos.length > 0) {
          const back = infos.find(e => ['chip_id_card_back', '12_id_card_back', '9_id_card_back'].includes(e.type))?.info
          const front = infos.find(e => ['chip_id_card_front', '12_id_card_front', '9_id_card_front'].includes(e.type))?.info
          if (!back && !front) {
            message.warning('Rất tiếc Ezin không nhận dạng được thông tin giấy tờ của bạn. Bạn vui lòng chụp lại hoặc có thể điền bằng tay!')
            return;
          }
          form.setFieldsValue({
            full_name: front?.name,
            legal_id: front?.id,
            address: front?.address,
            dob: front?.dob,
            sex: front?.gender == 'nam' ? 0 : 1
          })

        }

        message.success('Ezin đã điền thông tin cho bạn, vui lòng kiểm tra lại')
      }
    } catch (ex) {
      message.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
    }

    setUpLoading(false)
  };
  useEffect(() => {
    if (!form.getFieldValue('email') && user?.email) {
      form.setFieldsValue({
        email: user?.email
      })
    }
    if (!form.getFieldValue('full_name') && user?.full_name) {
      form.setFieldsValue({
        full_name: user.full_name
      })
    }
    if (!form.getFieldValue('phone') && user?.username) {
      form.setFieldsValue({
        phone: user.username.replace('+84', '0')
      })
    }
    if (cardInfo?.valid_from) {
      form.setFieldsValue({
        ...cardInfo,
        ...getDoBField(cardInfo.dob),
        valid_from: moment(cardInfo.valid_from, 'D/M/YYYY'),
      });
    } else {
      form.setFieldsValue({
        ...cardInfo,
        ...getDoBField(cardInfo.dob),
      });
    }
    if (cardInfo?.city) {
      console.log('run city 1', getDistrictData(Object.values(districtData), cardInfo?.city));
      setDistricts(getDistrictData(Object.values(districtData), cardInfo?.city));
    }
    if (cardInfo?.district) {
      console.log('run district 1', getWardtData(Object.values(wardData), cardInfo?.district))
      setWards(getWardtData(Object.values(wardData), cardInfo?.district));
    }

    loadListName();
  }, [cardInfo, user]);

  // useEffect(() => {
  //   if (listName && listName.length > 0) {
  //     let mainAccIndex = Math.max(0, listName.findIndex(e => e.main_account));

  //     console.log('mainAccIndex', mainAccIndex, listName)
  //     if (mainAccIndex >= 0) {
  //       // form.setFieldsValue({
  //       //   user: mainAccIndex + 1
  //       // });
  //       setCurrentName(mainAccIndex)
  //       onSelectUser(mainAccIndex + 1)
  //     }
  //   }
  // }, [listName]);

  const handleEzinDatePicker = (type, value) => {
    form.setFieldsValue({
      [type]: value
    });
  }

  const handleFieldChange = (type, value) => {
    form.setFieldsValue({
      [type]: value
    });
  }
  const onAddressCheck = (e) => {
    if (e.target.checked) {
      // setDistrictBen(district);
      // setWardBen(ward);
      form.setFieldsValue({
        city_ben: form.getFieldValue('city'),
        district_ben: form.getFieldValue('district'),
        ward_ben: form.getFieldValue('ward'),
        address_ben: form.getFieldValue('address'),
      })
      loadDistricts1(form.getFieldValue('city'));
      loadWards1(form.getFieldValue('district'))
    } else {
      form.resetFields(['city_ben', 'district_ben', 'ward_ben', 'address_ben'])
    }
  }
  return (
    <div className="step-wrapper" style={{ maxWidth: 800, margin: '0px auto' }}>
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
              NHẬP THÔNG TIN CÁ NHÂN
            </Title>
            <p>{cardInfo?.package_id?.name}</p>
            <Text className="text-primary">
              Vui lòng nhập thông tin đầy đủ và chính xác để đảm bảo quyền lợi
              bảo hiểm. <br />
              Nhập Tiếng Việt có dấu.
            </Text>
          </div>
          <Row gutter={[8, 8]} className="mt-3">
            <Col span={24}>
              <div className="flex flex-row align-items-center text-primary" href="#">
                <div className='mr-1'>
                  <Image alt="Tính năng mới" src={NewIcon} width={50} height={37} />
                </div>
                <div>
                  Bạn có thể điền thông tin nhanh hơn bằng cách chụp ảnh giấy tờ cá nhân
                </div>
              </div>
              <div style={{ width: 120, height: 120 }}>
                <Upload
                  name="img1"
                  beforeUpload={(file) => { handleUpload(file) }}
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
              <p className="ml-0 mb-0">Chọn người được áp dụng bảo hiểm (hoặc nhấn dấu + để thêm mới)</p>
              {listName.map((item, index) => (
                <Button
                  type="second"
                  className={`text-11 text-white mr-1 mt-1 ${index == currentName ? 'bg-primary' : 'bg-dark'}`}
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
                onClick={() => onSelectUser(-1)} >
                Thêm người mới
              </Button>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Field type="select" name="sex" required={true} title="Danh xưng" datasource={[{ value: 0, label: 'Ông' }, { value: 1, label: 'Bà' }]} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Field type="text" name="full_name" title="Họ và tên" autoFocus={true} required={true} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Field type="text" name="legal_id" title="CMND/CCCD/Hộ chiếu" required={true} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Field type="date"
                required={true}
                handleOpenDate={handleOpenDate}
                name="dob"
                title="Ngày sinh"
                onChange={handleFieldChange}
                onFieldChange={handleFieldChange}
                rules={[
                  {
                    validator: validateDOB
                  }
                ]}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Field type="text" name="phone" title="Điện thoại" required={true} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Field type="text" name="email" title="Email"
                rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Field type="text" required={true} name="address" title="Địa chỉ chỗ ở hiện tại" />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Field type="select" groups={{ 'thanh-pho': 'Thành phố', 'tinh': 'Tỉnh' }} required={true} name="city" title="Tỉnh thành" datasource={cities} onChange={(value) => loadDistricts(value, true)} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Field type="select" required={true} name="district" title="Quận huyện" datasource={districts} onChange={(value) => loadWards(value, true)} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Field type="select" required={true} name="ward" title="Phường xã" datasource={wards} />
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Checkbox onChange={onAddressCheck}>Đây cũng là địa chỉ được bảo hiểm</Checkbox>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Field type="text" required={true} name="address_ben" title="Địa chỉ được bảo hiểm" />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Field type="select" required={true} groups={{ 'thanh-pho': 'Thành phố', 'tinh': 'Tỉnh' }} name="city_ben" title="Tỉnh thành" datasource={cities1} onChange={(value) => loadDistricts1(value, true)} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Field type="select" required={true} name="district_ben" title="Quận huyện" datasource={districts1} onChange={(value) => loadWards1(value, true)} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Field type="select" required={true} name="ward_ben" title="Phường xã" datasource={wards1} />
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Field type="date"
                label="Hiệu lực từ ngày"
                required={true}
                handleOpenDate={handleOpenValidDate}
                initialValue={isMobile ? nextDay?.format('DD/MM/YYYY') : nextDay}
                name="valid_from"
                defaultValue={nextDay}
                title="Hiệu lực từ" onChange={handleFieldChange}
                minDate={new Date(nextDay.year(), nextDay.month(), nextDay.date())}
                onFieldChange={handleFieldChange}
                withPortal={true}
              />
            </Col>
          </Row>
        </div>
        <div className="my-4 d-flex justify-content-around">
          <Button
            type="second"
            onClick={() => {
              onPrev(form.getFieldsValue());
            }}
            style={{ width: '42%', paddingTop: '1rem', paddingBottom: '2rem' }}
          >
            Trở về
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '42%', paddingTop: '1rem', paddingBottom: '2rem' }}
          >
            Tiếp tục
          </Button>
        </div>
        <div className="text-center">
          <Button type="danger" htmlType="button" onClick={onReset}>
            Làm lại
          </Button>
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
        theme={isMobile ? 'ios' : 'default'}
        showHeader={true}
        dateConfig={
          {
            'date': {
              format: 'DD',
              caption: 'Ngày',
              step: 1,
            },
            'month': {
              format: 'MM',
              caption: 'Tháng',
              step: 1,
            },
            'year': {
              format: 'YYYY',
              caption: 'Năm',
              step: 1,
            },
          }
        }
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
        theme={isMobile ? 'ios' : 'default'}
        showHeader={true}
        dateConfig={
          {
            'date': {
              format: 'DD',
              caption: 'Ngày',
              step: 1,
            },
            'month': {
              format: 'MM',
              caption: 'Tháng',
              step: 1,
            },
            'year': {
              format: 'YYYY',
              caption: 'Năm',
              step: 1,
            },
          }
        }
      />
    </div>
  );
}
