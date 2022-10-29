import React, { useState, useEffect } from "react";
import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";
import { Input, Select, Form } from "antd";
import Link from "next/link";
import {
  getHeader,
  forgetPasswordApi,
  verifyAccountApi,
  verifyForgetApi,
  resetPasswordApi,
} from "./api";
import OtpInput from "react-otp-input";
import Head from "next/head";

export async function getServerSideProps() {
  const res = await getHeader();
  return {
    props: {
      headers: res?.data?.data,
    },
  };
}

// const mapStateToProps = createStructuredSelector({
//   loginVisible: makeLoginVisible(),
//   data: makeModalData(),
// });
const COUNTDOWN_TIME = 59;

export default function Login({ headers }) {
  const [step, setStep] = useState(1);
  const [arrCode, setArrCode] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      countdown > 0 && setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const checkValidCode = () => {
    return { code: arrCode, isValid: arrCode.toString().length === 4 };
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData(values.target);
      const formDataObj = Object.fromEntries(formData.entries());
      if (step === 1) {
        setPhone(formDataObj.phone);
        const res = await forgetPasswordApi({
          username: formDataObj.phone,
        });
        if (res.success) {
          //   message.success(res.msg);
          //   dispatch(toggleForgot(values.phoneNumber));
          //   dispatch(toggleOTPModal(values.phoneNumber));
          setStep(2);
        } else {
          // message.error(res.msg);
          // form.setFields([
          //   {
          //     name: 'phoneNumber',
          //     errors: [res.msg],
          //   },
          // ]);
        }
      } else if (step === 2) {
        const res = await verifyAccountApi({
          username: phone,
          otp: checkValidCode().code,
        });
        if (res.success) {
          setMessage("");
          setStep(3);
        } else {
          setMessage("Mã OTP không hợp lệ");
          // button_ref.current.disabled = false;
          // message.error(res.msg);
        }
      } else if (step === 3) {
        const res = await resetPasswordApi({
          username: phone,
          newpassword: formDataObj.password,
        });
        if (res.success) {
          setStep(4);
          setMessage(res.msg);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const render = () => {
    if (step === 1) {
      return (
        <>
          <div className="form-heading text-center mb-3">
            <h1 className="form-title">Quên mật khẩu</h1>
          </div>
          <p className="text-center text-sm mb-3">
            <i>
              Vui lòng nhập chính xác số điện thoại đã đăng ký, mật khẩu sẽ được
              gửi về số điện thoại này
            </i>
          </p>
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              onFinish(e);
            }}
          >
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                  />
                </div>
              </div>

              <div className="col-12">
                <button className="default-btn btn-two" type="submit">
                  Lấy lại mật khẩu
                </button>
              </div>

              <div className="col-12">
                <p className="account-desc">
                  Tôi có tài khoản?
                  <Link href="/login">
                    <a>Đăng nhập</a>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <div className="form-heading text-center mb-3">
            <h1 className="form-title">Xác nhận mã OTP</h1>
          </div>
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              onFinish(e);
            }}
          >
            <div className="text-center mb-3">
              Mã xác thực đã được gửi vào số điện thoại {phone}
            </div>
            <div className="d-flex justify-content-center">
              <OtpInput
                className="OTP__checkInput mx-4 mb-2 mt-2"
                value={arrCode}
                onChange={(e) => {
                  setArrCode(e);
                  if(e.length === 4) {
                    onFinish(e)
                  }
                }}
                numInputs={4}
                shouldAutoFocus={true}
                // separator={<span>-</span>}
              />
            </div>
            <div
              className={`${
                message === "Mã OTP không hợp lệ"
                  ? "text-danger"
                  : "text-primary"
              } text-center mb-3`}
            >
              {message}
            </div>
            <div className="row">
              <div className="col-lg-6 col-12">
                <button className="default-btn btn-two" type="submit">
                  Xác nhận
                </button>
              </div>
              <div className="col-lg-6 col-12 mt-2">
                <button
                  className="default-btn btn-two"
                  onClick={() => {
                    setMessage("");
                    setStep(1);
                  }}
                >
                  Quay lại
                </button>
              </div>
            </div>
            <div className="text-center mt-3">
              Không nhận được mã.{" "}
              {countdown === 0 ? (
                <u className="cursor-pointer pl-1">GỬI LẠI</u>
              ) : (
                <u className="">{countdown}</u>
              )}
            </div>
          </form>
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <div className="form-heading text-center mb-3">
            <h1 className="form-title">Thiết lập mật khẩu</h1>
          </div>
          <p className="text-center text-sm mb-3">
            <i>Vui lòng thiết lập mật khẩu mới</i>
          </p>
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              onFinish(e);
            }}
          >
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                <label for="password" className="form-label">
                  Mật khẩu mới
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Thiết lập mật khẩu (6 chữ số)"
                  required
                />
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                <label for="confirmpassword" className="form-label">
                  Xác nhận mật khẩu
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmpassword"
                  placeholder="Nhập lại mật khẩu (6 chữ số)"
                  required
                />
              </div>
            </div>
            <div className="text-center text-danger mb-2">{message}</div>
            <div className="col-12">
              <button className="w-100 default-btn btn-two" type="submit">
                Xác nhận
              </button>
            </div>
          </form>
        </>
      );
    } else {
      return (
        <>
          <div className="form-heading text-center mb-3">
            <h1 className="form-title">{message}</h1>
          </div>
          <Link href="/">
            <a className="default-btn w-100 text-center mt-3 rounded-pill">
              Về trang chủ
            </a>
          </Link>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>

      <div className="user-area-all-style log-in-area ptb-100 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-form-action">{render()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
