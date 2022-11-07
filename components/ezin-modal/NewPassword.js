import React from "react";
import { Button, Input, Typography, Modal, Form, message } from "antd";
import { createStructuredSelector } from "reselect";
import {
  makeNewPassVisible,
  makeModalData,
} from "../../src/store/modal/selector";
import { useSelector, useDispatch } from "react-redux";
import { toggleNewPass } from "../../src/store/modal/actions";
import { newPasswordApi } from "../../pages/api";
import useAuth from "../../src/container/auth-wrapper/auth.context";
import ButtonEzin from "../Common/Button";

const mapStateToProps = createStructuredSelector({
  newPassVisible: makeNewPassVisible(),
  data: makeModalData(),
});

export default function NewPassword() {
  const { login } = useAuth();

  const { newPassVisible, data } = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const res = await newPasswordApi({
      username: data.phoneNumber,
      newpassword: values.password,
      full_name: values.full_name,
      email: values.email,
    });
    if (res.success) {
      message.success(res.msg);
      login({ user: res.data, token: res.token });

      dispatch(toggleNewPass());
      // dispatch(toggleLoginModal());
    } else {
      message.error(res.msg);
    }
  };
  const onClose = () => {
    dispatch(toggleNewPass());
  };

  return (
    <Modal
      visible={newPassVisible}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      destroyOnClose
      maskClosable={false}
    >
      <div className="text-center">
        <Typography.Title level={3} className="text-primary mb-5">
          THIẾT LẬP MẬT KHẨU
        </Typography.Title>
        <h4>Vui lòng thiết lập mật khẩu mới </h4>
      </div>
      <Form className="mt-4" onFinish={onFinish}>
        <Form.Item name="full_name" className="mb-3">
          <Input
            size="large"
            placeholder="Vui lòng nhập họ tên"
            autoFocus={true}
            valie=""
          />
        </Form.Item>
        <Form.Item name="email" className="mb-3">
          <Input
            size="large"
            placeholder="Vui lòng nhập email (nếu có)"
            valie=""
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            {
              pattern: new RegExp("[0-9]{6}"),
              message: "Mật khẩu phải bao gồm 6 chữ số",
            },
          ]}
          className="mb-3"
        >
          <Input.Password
            size="large"
            inputMode="numeric"
            placeholder="Thiết lập mật khẩu (6 chữ số)"
            minLength={6}
            maxLength={6}
            // iconRender={(visible) =>
            //   visible ? <VisibleIcon /> : <InvisibleIcon />
            // }
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu không giống nhau");
              },
            }),
          ]}
        >
          <Input.Password
            inputMode="numeric"
            minLength={6}
            maxLength={6}
            placeholder="Nhập lại mật khẩu"
            size="large"
          />
        </Form.Item>
        <i className="pl-2 note">* Vui lòng nhập mật khẩu gồm 6 chữ số</i>
        <ButtonEzin types="primary" htmlType="submit" block className="mt-2 btn-full-width">
          Xác nhận
        </ButtonEzin>
      </Form>
    </Modal>
  );
}
