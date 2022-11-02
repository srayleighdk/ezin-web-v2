import React, { useState, useRef } from 'react';
import { Button, Form, Typography, Row, Col, Checkbox, message } from 'antd';
import cityData from '../../resource/city.json';
import districtData from '../../resource/district.json';
import wardData from '../../resource/ward.json';
import { normalizeTotalFee, getDistrictData } from '../../../utils/helpers';
import { FastBackwardOutlined } from '@ant-design/icons';
import moment from 'moment';
import ButtonEzin from '../../../components/Common/Button';
// import Modal from 'antd/lib/modal/Modal';

const { Text, Title } = Typography;

const layout = {
  wrapperCol: { span: 24 },
};

// VALUES;

let DATA = [
  { id: 'full_name', label: 'Họ và tên' },
  { id: 'email', label: 'Email' },
  { id: 'legal_id', label: 'CMND/Hộ chiếu/CCCD' },
  { id: 'dob', label: 'Ngày sinh' },
];

let DATA_LICENSE = [
  { id: 'licenseNumber', label: 'Biển kiểm soát', licenseType: 'license' },
  { id: 'chassisNumber', label: 'Số khung', licenseType: 'engine' },
  { id: 'engineNumber', label: 'Số máy', licenseType: 'engine' },
];

let DATA_ADDRESS = [
  { id: 'address', label: 'Địa chỉ' },
  {
    id: 'ward',
    label: 'Phường / Xã',
    getValue: (item) => wardData[item.ward]?.name,
  },
  {
    id: 'district',
    label: 'Quận / Huyện',
    getValue: (item) => districtData[item.district]?.name,
  },
  {
    id: 'city',
    label: 'Tỉnh / Thành phố',
    getValue: (item) => cityData[item.city]?.name_with_type,
  },
];
const DATA_ADDRESS_BEN = [
  { id: 'address_ben', label: 'Địa chỉ' },
  {
    id: 'ward_ben',
    label: 'Phường / Xã',
    getValue: (item) => wardData[item.ward_ben]?.name,
  },
  {
    id: 'district_ben',
    label: 'Quận / Huyện',
    getValue: (item) => districtData[item.district_ben]?.name,
  },
  {
    id: 'city_ben',
    label: 'Tỉnh / Thành phố',
    getValue: (item) => cityData[item.city_ben]?.name,
  },
];

export default function Fourth({ onPrevStep, onSubmit, cardInfo }) {
  // console.log(cardInfo);
  const licenseType = cardInfo.licenseNumber ? 'license' : (cardInfo.chassisNumber ? 'engine' : null);
  const [tosChecked, setTosChecked] = useState(true);
  const button_ref = useRef(null);

  const onPrev = () => {
    onPrevStep();
  };
  const onFinish = (values) => {
    if(cardInfo && cardInfo.licenseNumber){
      cardInfo.licenseNumber = cardInfo.licenseNumber.toUpperCase();
    }
    if(cardInfo && cardInfo.engineNumber){
      cardInfo.engineNumber = cardInfo.engineNumber.toUpperCase();
    }
    if(cardInfo && cardInfo.chassisNumber){
      cardInfo.chassisNumber = cardInfo.chassisNumber.toUpperCase();
    }
    onSubmit({ fourthData: values, button_ref });
  };
  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };
  const onNext = (e) => {
    if (!tosChecked) {
      message.error('Xin vui lòng đọc kỹ Quy tắc bảo hiểm và đồng ý!');
      e.preventDefault();
      return false;
    }
    // if (!confirm('Xin vui lòng kiểm tra lại kỹ các thông tin của bạn. Thẻ sau khi được kích hoạt sẽ không được hoàn lại!')) {
    //   e.preventDefault();
    //   return false;
    // }
    return true;

  };
  const onCheck = (e) => {
    setTosChecked(e.target.checked);
  };
  return (
    <div className="step-wrapper" style={{ maxWidth: 800, margin: '0px auto' }}>
      <Form
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // initialValues={VALUES}
        className="form-ezin"
      >
        <div className="p-2 ezin-card">
          <div className="text-center mb-4">
            <Title level={2} className="text-primary mb-4">
              XÁC NHẬN THÔNG TIN
            </Title>
            <Text className="text-primary">
              <strong>Vui lòng kiểm tra lại thông tin cá nhân của bạn.</strong>
            </Text>
          </div>
          <Typography.Title level={4} className="text-primary text-left pt-2">
            Thông tin cá nhân
          </Typography.Title>
          {DATA.map((item, index) => (
            <Row gutter={[8, 8]} key={`${item.id}_${index}`}>
              <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }}>
                <span>{item.label}: </span>
              </Col>
              <Col xs={{ span: 18 }} md={{ span: 18 }} lg={{ span: 18 }}>
                {item.id === 'full_name' ? (
                  <Typography.Title
                    level={5}
                    className="text-primary text-left d-inline"
                  >
                    {item.getValue?.(cardInfo) ?? cardInfo[item.id]}
                  </Typography.Title>
                ) : (
                  item.id === 'dob'
                    ? <span>{moment(item.getValue?.(cardInfo) ?? cardInfo[item.id], 'DDMMYYYY').format('DD/MM/YYYY')}</span>
                    : <span>{item.getValue?.(cardInfo) ?? cardInfo[item.id]}</span>
                )}
              </Col>
            </Row>
          ))}
          {
            (
              licenseType && (
                <>
                  <div className="border-top my-3"></div>
                  <Typography.Title level={4} className="text-primary text-left pt-2">
                    Thông tin xe được bảo hiểm
          </Typography.Title>
                  {DATA_LICENSE.filter(e => e.licenseType == licenseType).map((item, index) => (
                    <Row gutter={[8, 8]} key={`${item.id}_${index}`}>
                      <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }}>
                        <span>{item.label}: </span>
                      </Col>
                      <Col xs={{ span: 18 }} md={{ span: 18 }} lg={{ span: 18 }}>
                        <span style={{textTransform: 'uppercase'}}>{item.getValue?.(cardInfo) ?? cardInfo[item.id]}</span>
                      </Col>
                    </Row>

                  ))}
                </>
              )
            )
          }


          <div className="border-top my-3"></div>
          <Typography.Title level={4} className="text-primary text-left pt-2">
            Địa chỉ liên lạc
          </Typography.Title>
          {DATA_ADDRESS.map((item, index) => (
            <Row gutter={[8, 8]} key={`${item.id}_${index}`}>
              <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }}>
                <span>{item.label}: </span>
              </Col>
              <Col xs={{ span: 18 }} md={{ span: 18 }} lg={{ span: 18 }}>
                {item.id === 'full_name' ? (
                  <Typography.Title
                    level={5}
                    className="text-primary text-left d-inline"
                  >
                    {item.getValue?.(cardInfo) ?? cardInfo[item.id]}
                  </Typography.Title>
                ) : (
                  <span>{item.getValue?.(cardInfo) ?? cardInfo[item.id]}</span>
                )}
              </Col>
            </Row>
          ))}
          {
            cardInfo?.package_id?.product_id?.require_address ? (
              <>
                <div className="border-top my-3"></div>
                <Typography.Title level={4} className="text-primary text-left pt-2">
                  Địa chỉ được bảo hiểm
                </Typography.Title>
                {DATA_ADDRESS_BEN.map((item, index) => (
                  <Row gutter={[8, 8]} key={`${item.id}_${index}`}>
                    <Col xs={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <span>{item.label}: </span>
                    </Col>
                    <Col xs={{ span: 18 }} md={{ span: 18 }} lg={{ span: 18 }}>
                      {item.id === 'full_name' ? (
                        <Typography.Title
                          level={5}
                          className="text-primary text-left d-inline"
                        >
                          {item.getValue?.(cardInfo) ?? cardInfo[item.id]}
                        </Typography.Title>
                      ) : (
                        <span>{item.getValue?.(cardInfo) ?? cardInfo[item.id]}</span>
                      )}
                    </Col>
                  </Row>
                ))}
              </>
            )
              : <></>
          }

          <div className="border-top my-3"></div>
          <Row>
            <Col span={24}>
              <Typography.Title
                level={4}
                className="text-primary text-left pt-2"
              >
                Nội dung bảo hiểm
              </Typography.Title>
              <div>
                <span className="d-flex align-items-baseline">
                  <span style={{ flexBasis: 124, flexShrink: 0 }}>
                    Tên sản phẩm:
                  </span>
                  <span className="pl-2">
                    {cardInfo?.package_id?.name}
                  </span>
                </span>
              </div>
              <div>
                <span className="d-flex align-items-baseline">
                  <span style={{ flexBasis: 124, flexShrink: 0 }}>
                    {cardInfo?.package_id?.product_id?.total_fee_title || 'Số tiền bảo hiểm'}:
                  </span>
                  <div className="pl-2" dangerouslySetInnerHTML={{ __html: normalizeTotalFee(cardInfo?.package_id?.program_id?.total_fee || '') }}>
                  </div>
                </span>
              </div>
              <div>
                <span className="d-flex align-items-baseline">
                  <span style={{ flexBasis: 124, flexShrink: 0 }}>
                    Ngày hiệu lực:
                  </span>
                  <span className="pl-2">
                    {cardInfo['valid_from']}
                  </span>
                </span>
              </div>

              {/* <Typography.Title
                level={4}
                className="text-primary text-left pt-3"
              >
                Quyền lợi
              </Typography.Title>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim x.
              </div> */}
              {/* Them checkbox toi dong y: chinh lai design sau */}
              <br />
              <Checkbox checked={tosChecked} onChange={onCheck}>
                Tôi đã đọc và hiểu rõ <a className="font-weight-bold font-style-normal text-deco-underline" href={`${cardInfo?.package_id?.product_id?.link_rules}`} target="_blank">Quy tắc bảo hiểm</a> của chương trình này, xác
                nhận đồng ý tham gia chương trình bảo hiểm và cam kết các thông
                tin trên là đúng sự thật.
              </Checkbox>
            </Col>
          </Row>
        </div>
        <div className="my-4 d-flex justify-content-around">
          <ButtonEzin
            types="default"
            onClick={onPrev}
            className="btn-kichhoat"
          >
            Trở về
          </ButtonEzin>
          <ButtonEzin
            types="primary"
            onClick={onNext}
            htmlType="submit"
            className="btn-kichhoat"
            ref={button_ref}
          >
            Tiếp tục
          </ButtonEzin>
        </div>
      </Form>
    </div>
  );
}
