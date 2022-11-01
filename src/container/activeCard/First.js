import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Typography, Row, Col, Modal, Input } from 'antd';
import { getCardInfo } from '../../../pages/api';
import { normalizeTotalFee } from '../../../utils/helpers';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { makeSelectAuth } from '../../store/selector';
// import MaskedInput from 'antd-mask-input';
import InputMask from 'react-input-mask';


const { Text, Title } = Typography;

const layout = {
  wrapperCol: { span: 24 },
};
const cardStatusColors = [
  'grey',
  'green',
  'red',
  'grey'
]
const cardStatuses = [
  'Chưa bán',
  'Chưa kích hoạt',
  'Đã kích hoạt',
  'Đã hủy'
]

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});
const SERI_LEN = 12;
const CODE_LEN = 8;
export default function First({ onNextStep, card }) {
  const inputSeri = useRef(null);
  const inputCode = useRef(null);
  const [loading, setLoading] = useState(false);
  const [cardInfo, setInfo] = useState(card);
  // const [cardURL, setCardURL] = useState('');
  const [hasError, setError] = useState(false);
  const [formValues, setFormValue] = useState(undefined);
  const [form] = Form.useForm();
  const { auth } = useSelector(mapStateToProps);
  let buttonNext = useRef(null);
  useEffect(() => {
    if (card.seri) {
      setInfo(card);
      autoFieldInput(card);
    }
  }, [card]);

  useEffect(() => {
    if (auth.username) {
      onNext();
    }
  }, [auth]);
  // auto-filled input
  const autoFieldInput = (values) => {
    setFormValue(values);
    getCardInfo(values).then((res) => {
      if (res.success) {
        setInfo({ ...res.data, ...values });
        //onNextStep(cardInfo);
      } else {
        Modal.destroyAll();
        Modal.error({
          content: res.msg,
          okText: 'Đóng',
          onOk: () => {
            inputSeri.current.focus();
          }
        });
      }
    })
      .catch((err) => {
        Modal.destroyAll();
        Modal.error({
          content: 'Chúng tôi không tìm thấy thẻ này. Vui lòng liên hệ nơi bán hoặc gọi số hotline để được hỗ trợ.',
          okText: 'Đóng',
          onOk: () => {
            inputSeri.current.focus();
          }
        });
      });
  };

  const sanitizeFormvalue = (formValues) => {
    var newFormValues = {
      ...formValues,
      code: formValues && formValues.code && formValues.code.replace(/\s/g, '').replace(/_/g, ' '),
      seri: formValues && formValues.seri && formValues.seri.replace(/\s/g, '').replace(/_/g, ' '),
    }
    // console.log('newFormValues', newFormValues)
    return newFormValues;
  }

  const onFinish = (values) => {
    const newValues = sanitizeFormvalue(values);
    if (!newValues || (!newValues.seri && !newValues.code)) {
      setInfo({});
      return;
    }
    setLoading(true);
    getCardInfo(newValues)
      .then((res) => {
        // console.log('res', res)
        if (res.success) {
          setInfo({ ...res.data, ...newValues });
          // setCardURL(
          //   `https://api.ezin.vn/${res.data.package_id.product_id.image_card.path}`,
          // );
          setError(false);
          buttonNext.current.focus();
        } else {
          // setInfo({ ...res.data, ...values });
          setInfo({});
          setError(true);
          Modal.destroyAll();
          Modal.error({
            content: res.msg,
            okText: 'Đóng',
            onOk: () => {
              inputSeri.current.focus();
            }
          });

        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        setInfo({});
        Modal.destroyAll();
        Modal.error({
          content: 'Chúng tôi không tìm thấy thẻ này. Vui lòng liên hệ nơi bán hoặc gọi số hotline để được hỗ trợ.',
          okText: 'Đóng',
          onOk: () => {
            inputSeri.current.focus();
          }
        });
      });
    // if (auth.username) {
    //   // Fake
    //   setInfo(values);
    // } else {
    //   dispatch(toggleLoginModal());
    // }
  };

  const onNext = () => {
    if (cardInfo.package_id && cardInfo.status == 1) {
      // if (!auth.username) {
      //   dispatch(toggleRegisterModal());
      // } else {
      //   cardInfo && onNextStep(cardInfo);
      // }
      cardInfo && onNextStep(cardInfo);
    } else {
      onFinish(formValues);
    }
  };

  const onFinishFailed = ({ values }) => {
    setFormValue(values);
  };

  const onValuesChange = (values) => {
    const key = Object.keys(values)[0];
    const value = values[key];
    var newFormValues = { ...formValues, ...values };
    setFormValue({ ...formValues, ...values });
    if (newFormValues && newFormValues.seri && newFormValues.code
      && (newFormValues.code.length >= 9 && newFormValues.seri.length >= 14)) {
      onFinish(newFormValues);
    } else {
      setInfo({})
      if (key == 'seri' && value && value.length >= 14) {
        // console.log('focus')
        inputCode.current.focus();
      }
    }


  };

  useEffect(() => {
    form.setFieldsValue({
      seri: card.seri,
      code: card.code,
    });
  }, [card]);
  return (
    <div className="step-wrapper-1 text-center">
      <div>
        <div className="ezin-card shadow">
          <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            // initialValues={{ ...cardInfo }}
            form={form}
            onValuesChange={onValuesChange}
          >
            <div><i><a href="/kich-hoat-voucher" className="text-link">Bạn nhận được mã E-Voucher từ Shopee/Lazada? nhấn vào đây để kích hoạt</a></i></div>

            <Title level={2} className="text-primary mb-4">
              NHẬP THÔNG TIN THẺ
            </Title>
            <Text className="text-primary">
              Vui lòng điền thông tin có ở mặt sau của thẻ cào để kích hoạt bảo hiểm.
            </Text>

            <Row gutter={[16, 16]} className="mt-3 text-left">
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <p className="ml-0 mb-0">Số Seri</p>
                <Form.Item
                  className="mb-1"
                  name="seri"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Số Seri',
                    },
                  ]}
                  validateStatus={
                    formValues && !formValues['seri'] ? 'error' : 'validating'
                  }
                >
                  {/* <MaskedInput ref={inputSeri} autoFocus={true} disabled={loading} placeholder="Số Seri" mask="1111 1111 1111" size="large" inputMode="numeric" /> */}
                  <InputMask
                    disabled={loading}
                    placeholder="Số Seri"
                    mask="9999 9999 9999"
                    inputMode="numeric"
                    maskChar=""
                  >
                    {(inputProps) => <Input autoFocus={true} ref={inputSeri} {...inputProps} />}
                  </InputMask>
                </Form.Item>
                {/* {hasError ? (
                  <div
                    className="ant-form-item-explain"
                    style={{ color: '#ff4d4f' }}
                  >
                    <div role="alert">Seri thẻ không hợp lệ</div>
                  </div>
                ) : null} */}
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <p className="ml-0 mb-0">Mã thẻ</p>
                <Form.Item
                  name="code"
                  className="mb-1"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Mã thẻ',
                    },
                  ]}
                  validateStatus={
                    formValues && !formValues['code'] ? 'error' : 'validating'
                  }
                >
                  {/* <Input  ref={inputCode} disabled={loading} placeholder="Mã thẻ" size="large" type="number" pattern="[0-9]*" inputMode="numeric" /> */}
                  {/* <MaskedInput ref={inputCode} disabled={loading} placeholder="Mã thẻ" mask="1111 1111" size="large" inputMode="numeric" /> */}
                  <InputMask
                    disabled={loading}
                    placeholder="Mã thẻ"
                    mask="9999 9999"
                    inputMode="numeric"
                    maskChar=""
                  >
                    {(inputProps) => <Input ref={inputCode} {...inputProps} />}
                  </InputMask>
                </Form.Item>
                {/* {hasError ? (
                  <div
                    className="ant-form-item-explain"
                    style={{ color: '#ff4d4f' }}
                  >
                    <div role="alert">Mã thẻ không hợp lệ</div>
                  </div>
                ) : null} */}
              </Col>
            </Row>
            {!loading && cardInfo.package_id && (
              formValues && formValues.seri.length > 0 && formValues.code.length > 0
              && formValues.seri.indexOf('_') < 0 && formValues.code.indexOf('_') < 0
            ) ? (
              <>
                <div><i className="pl-2">Vui lòng cuộn xuống để tiếp tục</i></div>
                <div className="border-top mb-4"></div>
                <Row>
                  <Col span={24}>
                    <div>
                      <span>
                        <Row>
                          <Col span={8}>
                            <Typography.Title
                              level={5}
                              className="text-primary"
                              style={{ textAlign: 'left' }}
                            >
                              Tên sản phẩm:
                            </Typography.Title>
                          </Col>
                          <Col span={16} style={{ textAlign: 'left' }}>
                            <span className="pl-4">
                              {cardInfo?.package_id?.name}
                            </span>
                          </Col>
                        </Row>
                      </span>
                    </div>
                    <div>
                      <span>
                        <Row>
                          <Col span={8}>
                            <Typography.Title
                              level={5}
                              className="text-primary"
                              style={{ textAlign: 'left' }}
                            >
                              {cardInfo?.package_id?.product_id?.total_fee_title || 'Số tiền bảo hiểm'}:
                            </Typography.Title>
                          </Col>
                          <Col span={12} style={{ textAlign: 'left' }} >
                            <div className="pl-4" dangerouslySetInnerHTML={{ __html: normalizeTotalFee(cardInfo?.package_id?.program_id?.total_fee || '') }}>
                            </div>
                          </Col>
                        </Row>
                      </span>
                    </div>
                    <div>
                      <span>
                        <Row>
                          <Col span={8}>
                            <Typography.Title
                              level={5}
                              className="text-primary"
                              style={{ textAlign: 'left' }}
                            >
                              Tình trạng thẻ:
                            </Typography.Title>
                          </Col>
                          <Col span={12} style={{ textAlign: 'left' }}>
                            <span className="pl-4" style={{ color: cardStatusColors[cardInfo.status] }}>
                              {cardStatuses[cardInfo.status]}
                            </span>
                          </Col>


                        </Row>
                        {
                          cardInfo?.package_id?.partner_package && (
                            <Row>
                              <Col span={8}>
                                <Typography.Title
                                  level={5}
                                  className="text-primary"
                                  style={{ textAlign: 'left' }}
                                >
                                  Quyền lợi tập luyện CITIGYM (Gói {cardInfo?.package_id?.partner_package?.name}):
                                </Typography.Title>
                              </Col>
                              <Col span={12} style={{ textAlign: 'left' }}>
                                <div className="ml-3" dangerouslySetInnerHTML={{ __html: cardInfo?.package_id?.partner_package?.benefits }}></div>
                              </Col>
                            </Row>
                          )
                        }
                      </span>
                    </div>
                    {cardInfo.status == 1 && (
                      <div className="text-left">Thẻ đã sẵn sàng để kích hoạt, vui lòng nhấn nút Tiếp tục</div>
                    )}
                  </Col>
                </Row>
              </>
            ) : (
              <div><i className="pl-2">* Đảm bảo bạn nhập chính xác số Seri và Mã thẻ, sau đó nhấn nút Kiểm tra</i></div>
            )
            }
            {/* <div className="wrap-card-image-inner">
              <img src="/images/card.png" alt="card" className="img" />
            </div> */}
          </Form>
        </div>

        <div className="py-4 text-center" ref={buttonNext}>
          <Button type="primary" className="p-button" onClick={onNext} disabled={loading} >
            {cardInfo.package_id && cardInfo.status == 1 ? 'Tiếp tục' : 'Kiểm tra'}
          </Button>
        </div>
        <div className="mb-1"><i>Nếu bạn vẫn không thể kích hoạt thẻ, vui lòng xem video hướng dẫn dưới đây:</i>
        </div>
        <div className="container" id="videos">
          <div className="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/5BdiwJxTU9E?rel=0&autoplay=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </div>
      {/* <div className="wrap-card-image">
        <img
          src={cardURL !== '' ? cardURL : '/images/card_blank.png'}
          alt="card"
          className="img"
        />
      </div> */}
      <style jsx="true">
        {`
          .wrap-first {
            display: flex;
            justify-content: center;
          }
          .active-card {
            background-color: white;
            border-radius: 10px;
            padding: 2rem;
            min-height: 284px;
          }
          .wrap-card-image {
            margin-left: 2rem;
            flex-shrink: 0;
          }
          .img {
            max-width: 100%;
            height: 300px;
          }
        `}
      </style>
    </div>
  );
}
