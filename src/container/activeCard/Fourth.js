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
export default function Fourth({ onPrevStep, onSubmit, cardInfo }) {
  // console.log(cardInfo);
  const licenseType = cardInfo.licenseNumber ? 'license' : (cardInfo.chassisNumber ? 'engine' : null);
  const [tosChecked, setTosChecked] = useState(true);
  const button_ref = useRef(null);

  const onPrev = () => {
    onPrevStep();
  };
  const onFinish = (values) => {
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
    return true;

  };
 
  return (
    <div className="step-wrapper" style={{ maxWidth: 800, margin: '0px auto' }}>
      <Form
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form-ezin"
      >
        <div className="p-2 ezin-card">
          <div className="text-center mb-4">
            <Title level={2} className="text-primary">
              QUY TẮC BẢO HIỂM
            </Title>
            <Text className="text-primary text-11">
              <i>Vui lòng đọc kỹ và xác nhận đồng ý với quy tắc bảo hiểm dưới đây</i>
            </Text>
          </div>
            <div 
            id="tos"
            style={{
              height: '300px', 
              overflow: 'auto', 
              border: '2px solid #ccc',
              wordWrap: 'break-word',
              padding: '10px',
              textAlign: 'justify',
              fontSize: '12px'
            }}
            dangerouslySetInnerHTML={{__html: cardInfo?.package_id?.product_id?.rule_content}}>

            </div>
        </div>

        <div className="my-4 d-flex justify-content-around">
          <ButtonEzin
            types="default"
            onClick={() => onPrev(cardInfo)}
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
            Tôi đồng ý
          </ButtonEzin>
        </div>
      </Form>
    </div>
  );
}
