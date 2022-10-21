import React from "react";
import { Button, Input, Typography, Modal, Form, message } from "antd";
import { createStructuredSelector } from "reselect";
import {
  makeResetPassVisible,
  makeModalData,
} from "../../src/store/modal/selector";
import { useSelector, useDispatch } from "react-redux";
import { toggleResetPass } from "../../src/store/modal/actions";
import { resetPasswordApi } from "../../pages/api";
import useAuth from "../../src/container/auth-wrapper/auth.context";

const mapStateToProps = createStructuredSelector({
  resetPassVisible: makeResetPassVisible(),
  data: makeModalData(),
});

export default function ResetPassword() {
  const { login } = useAuth();

  const { resetPassVisible, data } = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // console.log('values', values);
    const res = await resetPasswordApi({
      username: data.phoneNumber,
      newpassword: values.password,
    });
    if (res.success) {
      message.success(res.msg);
      login({ user: res.data, token: res.token });

      dispatch(toggleResetPass());
      // dispatch(toggleLoginModal());
    } else {
      message.error(res.msg);
    }
  };
  const onClose = () => {
    dispatch(toggleResetPass());
  };

  return (
    <Modal
      visible={resetPassVisible}
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
            placeholder="Mật khẩu (6 chữ số)"
            autoFocus={true}
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
            placeholder="Nhập lại mật khẩu"
            size="large"
            inputMode="numeric"
            minLength={6}
            maxLength={6}
          />
        </Form.Item>
        <i className="pl-2 note">* Vui lòng nhập mật khẩu gồm 6 chữ số</i>
        <Button type="primary" htmlType="submit" block className="mt-2">
          Xác nhận
        </Button>
      </Form>
    </Modal>
  );
}
