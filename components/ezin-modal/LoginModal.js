import React from "react";
import { Button, Input, Typography, Modal, Form, message } from "antd";
import { loginApi } from "../../pages/api";
import PhoneNumber from "../../components/PhoneNumber";
import { normalizePhoneNumber } from "../../utils/helpers";
import useAuth from "../../src/container/auth-wrapper/auth.context";
import { createStructuredSelector } from "reselect";
import {
  makeLoginVisible,
  makeModalData,
} from "../../src/store/modal/selector";
import { useSelector, useDispatch } from "react-redux";
import { AuthProvider } from "../../src/container/auth-wrapper/auth.context";
import {
  toggleLoginModal,
  toggleRegisterModal,
  toggleForgot,
  setParentModal,
} from "../../src/store/modal/actions";
import { getProfile } from "../../pages/api";
import { setAuth } from "../../src/store/actions";
import { useRouter } from "next/router";
const { confirm } = Modal;
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const mapStateToProps = createStructuredSelector({
  loginVisible: makeLoginVisible(),
  data: makeModalData(),
});
export default function LoginModal() {
  const route = useRouter();
  const [form] = Form.useForm();
  const { login } = useAuth();
  const { loginVisible } = useSelector(mapStateToProps);

  const dispatch = useDispatch();
  const closeLogin = () => {
    dispatch(toggleLoginModal());
  };

  const onLogin = (values) => {
    const formData = new FormData(values.target);
    const formDataObj = Object.fromEntries(formData.entries());
    loginApi({
      username: "0" + normalizePhoneNumber(formDataObj.phone),
      password: formDataObj.password,
    }).then(({ data, token, msg, success }) => {
      if (success) {
        message.success("Chúc mừng bạn đã đăng nhập thành công");
        dispatch(toggleLoginModal());
        login({ user: data, token: token });
        getProfile().then((res) => dispatch(setAuth(res.data.data)));
        if (data.unconfirmedMembers && data.unconfirmedMembers.length > 0) {
          // message.success('Bạn có chuyến đi chưa được xác nhận.')
          const group = data?.unconfirmedMembers[0]?.group_id;
          confirm({
            title: `Bạn có chuyến đi "${group?.group_code} - ${
              group?.group_name
            }" (khởi hành ngày ${moment(group?.start_date).format(
              "DD/MM/YYYY"
            )}) chưa được xác nhận`,
            icon: <ExclamationCircleOutlined />,
            content:
              "Vui lòng nhấn xác nhận ngay, hoặc bạn có thể xác nhận sau bằng cách vào mục Tài khoản > Chuyến đi",
            okText: "Xác nhận ngay",
            // okType: 'danger',
            cancelText: "Bỏ qua",
            onOk() {
              //doConfirmMember(record)
              route.push(`/profile/travel/${group._id}`);
            },
            onCancel() {},
          });
        }
      } else {
        /*  if(msg=='force_change_password'){
            dispatch(toggleLoginModal());
            route.push({
              pathname: '/change-password',
              query: { token: 'token-chang-password' },
            })
            //route.push(`/change-password/`, );
            return;
          }*/
        form.setFields([
          {
            name: "phoneNumber-1",
            errors: [msg],
          },
        ]);
      }
    });
  };

  const onRegister = () => {
    dispatch(toggleLoginModal());
    dispatch(toggleRegisterModal());
  };

  const onForget = () => {
    dispatch(setParentModal("login"));
    dispatch(toggleForgot());
    dispatch(toggleLoginModal());
  };

  return (
    // <AuthProvider>
    <Modal
      visible={loginVisible}
      onCancel={closeLogin}
      className="p-5"
      style={{ marginTop: 90 }}
      footer={null}
      centered
      width={420}
      destroyOnClose
      maskClosable={false}
    >
      <Typography.Title level={3} className="text-primary text-center">
        ĐĂNG NHẬP
      </Typography.Title>
      <p className="text-center text-sm mb-2">
        <i>
          Sử dụng tài khoản Ezin để lưu trữ và tra cứu đơn bảo hiểm theo cách dễ
          dàng nhất!
        </i>
      </p>
      <p className="text-center text-sm">
        <i>
          Nếu bạn chưa có tài khoản vui lòng nhấn nút{" "}
          <a
            href="#"
            onClick={onRegister}
            className="text-deco-underline text-secondary"
          >
            Đăng ký
          </a>
          .
        </i>
      </p>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(e);
        }}
        // initialValues={
        //   data.phoneNumber
        //     ? { 'phoneNumber-1': data.phoneNumber }
        //     : { 'phoneNumber-1': '', password: '' }
        // }
      >
        {/* <PhoneNumber
            placeholder="Số điện thoại"
            phoneName="phoneNumber-1"
            size="large"
          /> */}

        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="phone"
            placeholder="Số điện thoại"
          />
        </div>
        {/* </Form.Item> */}
        {/* <Form.Item
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được để trống" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" size="large" />
          </Form.Item> */}

        <div className="form-group mb-2">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Mật khẩu"
          />
        </div>
        {/* <Button type="primary" block className="mb-2" htmlType="submit">
            Đăng nhập
          </Button> */}

        <button className="default-btn btn-two w-100" type="submit">
          Đăng nhập
        </button>
        <p className="text-center pointer" onClick={onForget}>
          <i>
            <u>Quên mật khẩu</u>
          </i>
        </p>
        {/* <Button block className="mt-3" ghost onClick={onRegister}>
            Đăng ký
          </Button> */}

        <button className="default-btn btn-two w-100" onClick={onRegister}>
          Đăng ký
        </button>
      </form>
    </Modal>
    // {/* </AuthProvider> */}
  );
}
