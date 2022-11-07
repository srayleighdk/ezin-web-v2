import React from 'react';
import { Button, Typography, Modal, Form, message } from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeForgotVisible, makeSelectParentModal } from '../../src/store/modal/selector';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleForgot,
  toggleOTPModal,
  toggleLoginModal,
  toggleRegisterModal,
} from '../../src/store/modal/actions';
// import './otp.scss';
import PhoneNumber from '../../components/PhoneNumber';
import { forgetPasswordApi } from '../../pages/api';
import ButtonEzin from '../Common/Button';

const mapStateToProps = createStructuredSelector({
  forgotVisible: makeForgotVisible(),
  parentModal: makeSelectParentModal(),
});

export default function ForgotPassModal() {
  const [form] = Form.useForm();
  const { forgotVisible, parentModal } = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await forgetPasswordApi({
        username: values.phoneNumber,
      });
      if (res.success) {
        message.success(res.msg);
        dispatch(toggleForgot(values.phoneNumber));
        dispatch(toggleOTPModal(values.phoneNumber));
      } else {
        // message.error(res.msg);
        form.setFields([
          {
            name: 'phoneNumber',
            errors: [res.msg],
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onClose = () => {
    if (parentModal === 'login') {
      dispatch(toggleLoginModal());
    } else if (parentModal === 'register') {
      dispatch(toggleRegisterModal());
    }
    dispatch(toggleForgot());
  };

  return (
    <Modal
      visible={forgotVisible}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      destroyOnClose
      maskClosable={false}
    >
      <div className="">
        <Typography.Title level={3} className="text-primary mb-5 text-center">
          QUÊN MẬT KHẨU
        </Typography.Title>
      </div>
      <Form className="form-otp mt-4" onFinish={onFinish} form={form}>
        <PhoneNumber
          placeholder="Số điện thoại"
          value={{ prefix: '+84' }}
          prefixName="prefix"
          phoneName="phoneNumber"
          size="large"
          rules={[
            {
              required: true,
              message: 'Vui lòng đồng ý với điều khoản!',
            },
          ]}
        />
        <h4 className="mb-2 text-center">
          Vui lòng nhập chính xác số điện thoại đã đăng ký, mật khẩu sẽ được gửi
          về số điện thoại này.
        </h4>
        <ButtonEzin types="primary" block className="mb-2 mt-5 btn-full-width" htmlType="submit">
          Lấy lại mật khẩu
        </ButtonEzin>
      </Form>
    </Modal>
  );
}
