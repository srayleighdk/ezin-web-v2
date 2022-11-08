import React from "react";
import {
  Button,
  Typography,
  Modal,
  Form,
  Checkbox,
  message,
  Input,
} from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import { createStructuredSelector } from "reselect";
import { makeRegisterVisible } from "../../src/store/modal/selector";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRegisterModal,
  toggleOTPModal,
  toggleForgot,
  setParentModal,
  toggleLoginModal,
} from "../../src/store/modal/actions";
import PhoneNumber from "../../components/PhoneNumber";
import { registerApi } from "../../pages/api";
import { normalizePhoneNumber } from "../../utils/helpers";
import Link from "next/link";
import ButtonEzin from "../Common/Button";

const mapStateToProps = createStructuredSelector({
  registerVisible: makeRegisterVisible(),
});

export default function RegisterModal() {
  const [form] = Form.useForm();
  const { registerVisible } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const closeRegister = () => {
    dispatch(toggleRegisterModal());
  };

  const onRegister = (values) => {
    registerApi({
      ...values,
      username: "0" + normalizePhoneNumber(values["phoneNumber-2"]),
      legal_id: "123456",
    })
      .then((res) => {
        // dispatch(
        //   toggleRegisterModal(
        //     '0' + normalizePhoneNumber(values['phoneNumber-2']),
        //   ),
        // );
        if (res.success) {
          dispatch(
            toggleRegisterModal(
              "0" + normalizePhoneNumber(values["phoneNumber-2"])
            )
          );
          message.success(res.msg);
          dispatch(toggleOTPModal());
        } else {
          // message.error(res.msg);
          form.setFields([
            {
              name: "phoneNumber-2",
              errors: [res.msg],
            },
          ]);
          if (res.msg === `Số điện thoại đã được đăng kí`) {
            // dispatch(toggleLoginModal());
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const onGetPassword = () => {
    dispatch(setParentModal("register"));
    dispatch(toggleRegisterModal());
    dispatch(toggleForgot());
  };

  const onLogin = () => {
    dispatch(toggleRegisterModal());
    dispatch(toggleLoginModal());
  };

  return (
    <Modal
      visible={registerVisible}
      onCancel={closeRegister}
      footer={null}
      centered
      width={420}
      destroyOnClose
      maskClosable={false}
    >
      <Typography.Title level={3} className="text-primary text-center p-2">
        ĐĂNG KÝ MỚI
      </Typography.Title>
      <p className="text-center p-1">
        Bạn có thể kích hoạt bảo hiểm cho nhiều người bằng số điện thoại này
      </p>

      <div className="p-3 mt-2">
        <Form
          onFinish={onRegister}
          form={form}
          initialValues={{ remember: true }}
        >
          <PhoneNumber
            placeholder="Số điện thoại"
            value={{ prefix: "+84" }}
            prefixName="prefix-2"
            phoneName="phoneNumber-2"
            minLength={9}
            maxLength={10}
            size="large"
            form={form}
          />
          <Form.Item
            name="referal_link"
            rules={[
              {
                pattern: new RegExp(/^EZ[0-9]{10,11}$/),
                message: "Mã giới thiệu không hợp lệ",
              },
            ]}
            className="mt-1"
          >
            <Input
              type="input"
              prefix={<BarcodeOutlined className="mr-2" />}
              placeholder="Mã giới thiệu (nếu có)"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Vui lòng đồng ý với điều khoản!",
              },
            ]}
          >
            <Checkbox>
              Đồng ý với{" "}
              <Link target="_blank" href="/p/dieu-khoan" passHref>
                <u>điều khoản sử dụng</u>
              </Link>
            </Checkbox>
          </Form.Item>
          <ButtonEzin
            block
            htmlType="submit"
            className="mt-1 btn-full-width"
            types="primary"
            // style={{ height: 40 }}
          >
            Đăng ký
          </ButtonEzin>
          <div className="text-center mt-4 pointer">
            <u onClick={onGetPassword}>Lấy lại mật khẩu</u>
          </div>
          <ButtonEzin block className="mt-3 btn-full-width" types="default" onClick={onLogin}>
            Đăng nhập
          </ButtonEzin>
        </Form>
      </div>
    </Modal>
  );
}
