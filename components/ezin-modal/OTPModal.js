import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Typography, Modal, Form, message } from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeOTPVisible, makeModalData } from '../../src/store/modal/selector';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleOTPModal,
  toggleNewPass,
  toggleResetPass,
} from '../../src/store/modal/actions';
// import './otp.scss';
import { resendOTPApi, verifyAccountApi } from '../../pages/api';
import { useMediaQuery } from 'react-responsive';
import OtpInput from 'react-otp-input';
import AuthCode from 'react-auth-code-input';

const mapStateToProps = createStructuredSelector({
  otpVisible: makeOTPVisible(),
  data: makeModalData(),
});

const COUNTDOWN_TIME = 59;

export default function OTPModal() {
  const { otpVisible, data } = useSelector(mapStateToProps);
  const [arrCode, setArrCode] = useState('');
  // const code_1_ref = useRef(null);
  // const code_2_ref = useRef(null);
  // const code_3_ref = useRef(null);
  // const code_4_ref = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const button_ref = useRef(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);

  const { code_1, code_2, code_3, code_4 } = arrCode;

  useEffect(() => {
    setCountdown(COUNTDOWN_TIME);
    setArrCode('');
  }, [otpVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      countdown > 0 && setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const dispatch = useDispatch();
  const closeOTP = () => {
    dispatch(toggleOTPModal());
  };

  const onChange = (e) => {
    console.log('e', e)
    setArrCode(e);
    // if (value.length <= 1) {
    //   setArrState({ ...arrCode, [refName]: value });
    // }
    // if (value.length === 1) {
    //   if (refName === 'code_1') {
    //     code_2_ref.current.focus();
    //     code_2_ref.current.select();
    //   } else if (refName === 'code_2') {
    //     code_3_ref.current.focus();
    //     code_3_ref.current.select();
    //   } else if (refName === 'code_3') {
    //     code_4_ref.current.focus();
    //     code_4_ref.current.select();
    //   }
    // }
  };

  // const onKeyDown = (ev) => {
  //   if (ev.keyCode === 8 && !ev.target.value) {
  //     code_1_ref.current.focus();
  //   }
  // };

  // const onKeyUp = (ev) => {
  //   console.log('ev.keyCode', ev.keyCode);
  //   if (ev.keyCode !== 8 && ev.target.value) {
  //     const code = Object.values(arrCode).reduce((obj, item) => obj + item, '');
  //     console.log(code);
  //   }
  // };

  const onResend = async () => {
    try {
      const res = await resendOTPApi({ username: data.phoneNumber });
      if (res.success) {
        message.success(res.msg);
        setCountdown(COUNTDOWN_TIME);
      } else {
        message.error(res.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkValidCode = () => {
    // const code = Object.values(arrCode).reduce((obj, item) => obj + item, '');
    // const code = arrCode;
    // console.log('code', code)
    return { code: arrCode, isValid: arrCode.toString().length === 4 };
  };

  const onFinish = async () => {
    try {
      button_ref.current.disabled = true;
      const res = await verifyAccountApi({
        username: data.phoneNumber,
        otp: checkValidCode().code,
      });

      if (res.success) {
        // console.log('res.data', res.data)
        message.success(res.msg);
        dispatch(toggleOTPModal());
        if (res.data.is_new) {
          dispatch(toggleNewPass());
        } else {
          dispatch(toggleResetPass());
        }
      } else {
        button_ref.current.disabled = false;
        message.error(res.msg);
      }
    } catch (err) {
      button_ref.current.disabled = false;
      console.log(err);
    }
  };

  return (
    <Modal
      visible={otpVisible}
      onCancel={closeOTP}
      footer={null}
      centered
      width={420}
      destroyOnClose
      maskClosable={false}
    >
      <div className="text-center">
        <Typography.Title level={3} className="text-primary mb-5">
          XÁC NHẬN MÃ OTP
        </Typography.Title>
        <h4>Mã xác thực đã được gửi vào số điện thoại {data.phoneNumber}</h4>
      </div>
      <Form className="form-otp mt-4 text-center" onFinish={onFinish}>
        <div className={isMobile ? "input-container-mobile" : "input-container"}>
          {/* <Input
            value={code_1}
             pattern="[0-9]*" inputMode="numeric"
            onChange={(ev) => onChange('code_1', ev.target.value)}
            onFocus={(ev) => {
              ev.target.select();
            }}
            ref={code_1_ref}
            size="large"
            autoFocus={true}
            maxlength={1}
          
          />
          <Input
            value={code_2}
             pattern="[0-9]" inputMode="numeric"
            onChange={(ev) => onChange('code_2', ev.target.value)}
            onFocus={(ev) => {
              ev.target.select();
            }}
            ref={code_2_ref}
            size="large"
            maxlength={1}
          />
          <Input
            value={code_3}
             pattern="[0-9]" inputMode="numeric"
            onChange={(ev) => onChange('code_3', ev.target.value)}
            onFocus={(ev) => {
              ev.target.select();
            }}
            ref={code_3_ref}
            size="large"
            maxlength={1}
          />
          <Input
            value={code_4}
             pattern="[0-9]" inputMode="numeric"
            onChange={(ev) => onChange('code_4', ev.target.value)}
            // onKeyDown={onKeyDown}
            // onKeyUp={onKeyUp}
            ref={code_4_ref}
            onFocus={(ev) => {
              ev.target.select();
            }}
            size="large"
            maxlength={1}
          /> */}

          <OtpInput
            className="OTP__checkInput"
            value={arrCode}
            onChange={onChange}
            numInputs={4}
            shouldAutoFocus={true}
            // separator={<span>-</span>}
          />
        </div>
        {/* <p className="mt-1">
          <i style={{ color: 'red' }}>Mã OTP không hợp lệ</i>
        </p> */}
        <p className="mt-2">
          Không nhận được mã.{' '}
          {countdown === 0 ? (
            <u className="pointer" onClick={onResend}>
              GỬI LẠI
            </u>
          ) : (
            `(${countdown})`
          )}
        </p>
        <Button
          type="primary"
          htmlType="submit"
          block
          className="mt-2"
          disabled={!checkValidCode().isValid}
          ref={button_ref}
        >
          Xác nhận
        </Button>
      </Form>
    </Modal>
  );
}
