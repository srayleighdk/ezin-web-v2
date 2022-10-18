import React, { useState, useEffect } from "react";
import Navbar from "../components/Layouts/Navbar";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import Link from "next/link";
import { createStructuredSelector } from "reselect";
import {
  getHeader,
  registerApi,
  verifyAccountApi,
  newPasswordApi,
  resendOTPApi,
} from "../pages/api";
import {
  makeOTPVisible,
  makeModalData,
} from "../src/store/modal/selector";
import { useSelector, useDispatch } from "react-redux";
import { normalizePhoneNumber } from "../utils/helpers";
import {
  toggleNewPass,
  toggleResetPass,
  toggleOTPModal,
} from "../src/store/modal/actions";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getServerSideProps() {
  const res = await getHeader();
  return {
    props: {
      headers: res?.data?.data,
    },
  };
}

const COUNTDOWN_TIME = 59;

export default function SignUp({ headers }) {
  const router = useRouter();
  const [arrCode, setArrCode] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);

  useEffect(() => {
    const timer = setTimeout(() => {
      countdown > 0 && setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const onFormSubmit1 = (e) => {
    setCountdown(COUNTDOWN_TIME);
    setArrCode("");
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    setPhone(formDataObj.phone);
    registerApi({
      ...formDataObj,
      "prefix-2": 0,
      username: "0" + normalizePhoneNumber(formDataObj["phone"]),
      legal_id: "123456",
    })
      .then((res) => {
        if (res.success) {
          setStep(2);
          setMessage("");
        } else {
          setMessage("Số điện thoại đã đăng ký");
        }
      })
      .catch((err) => console.log(err));
  };

  const checkValidCode = () => {
    return { code: arrCode, isValid: arrCode.toString().length === 4 };
  };

  const onFormSubmit2 = async (e) => {
    try {
      const res = await verifyAccountApi({
        username: phone,
        otp: checkValidCode().code,
      });
      console.log("res", res, phone, arrCode);
      if (res.success) {
          setMessage("");
          setStep(3);
      } else {
        setMessage("Mã OTP không hợp lệ");
        // button_ref.current.disabled = false;
        // message.error(res.msg);
      }
    } catch (err) {
      // button_ref.current.disabled = false;
      console.log("err", err);
    }
  };

  const onFormSubmit3 = async (values) => {
    const formData = new FormData(values.target);
    const formDataObj = Object.fromEntries(formData.entries());
    if (formDataObj.confirmpassword !== formDataObj.password) {
      setMessage("Xác nhận mật khẩu sai. Vui lòng nhập lại");
      return;
    }
    console.log("wwwwww", formDataObj);
    const res = await newPasswordApi({
      username: phone,
      newpassword: formDataObj.password,
      full_name: formDataObj.full_name,
      email: formDataObj.email,
    });
    if (res.success) {
      setMessage(res.msg);
      setStep(4);
    } else {
      setMessage("");
    }
  };

  const onResend = async () => {
    try {
      const res = await resendOTPApi({ username: phone });
      if (res.success) {
        // message.success(res.msg);
        setCountdown(COUNTDOWN_TIME);
        setMessage(`Mã OTP đã được gửi đến số điện thoại ${phone}`);
      } else {
        // message.error(res.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const render = () => {
    if (step === 1) {
      return (
        <>
          <Head>
            <title>Signup</title>
          </Head>
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label for="phone" class="form-label">
                Số điện thoại
              </label>
              <input
                className="form-control"
                type="text"
                name="phone"
                placeholder="Vui lòng nhập số điện thoại (10 số)"
                maxlength="10"
                required
              />
              <div className="text-danger">{message}</div>
            </div>
          </div>
          <div className="col-12">
            <button className="w-100 default-btn btn-two" type="submit">
              Đăng ký
            </button>
          </div>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <div className="text-center mb-3">
            Mã xác thực đã được gửi vào số điện thoại {phone}
          </div>
          <div className="d-flex justify-content-center">
            <OtpInput
              className="OTP__checkInput mx-4 mb-2 mt-2"
              value={arrCode}
              onChange={(e) => setArrCode(e)}
              numInputs={4}
              shouldAutoFocus={true}
              // separator={<span>-</span>}
            />
          </div>
          <div
            className={`${
              message === "Mã OTP không hợp lệ" ? "text-danger" : "text-primary"
            } text-center mb-3`}
          >
            {message}
          </div>
          <div className="col-lg-6 col-12">
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
          <div className="col-lg-6 col-12">
            <button className="default-btn btn-two" type="submit">
              Xác nhận
            </button>
          </div>
          <div class="text-center mt-3">
            Không nhận được mã.{" "}
            {countdown === 0 ? (
              <u className="cursor-pointer pl-1" onClick={onResend}>
                GỬI LẠI
              </u>
            ) : (
              <u className="">{countdown}</u>
            )}
          </div>
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label for="name" class="form-label">
                Họ tên
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                title="họ tên"
                placeholder="Vui lòng nhập họ tên"
                required
              />
            </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Vui lòng nhập email"
              />
            </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label for="password" class="form-label">
                Mật khẩu
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
              <label for="confirmpassword" class="form-label">
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
          {/* <div className="col-lg-6 col-12">
            <button
              className="default-btn btn-two"
              onClick={() => {
                setMessage("");
                setStep(2);
              }}
            >
              Quay lại
            </button>
          </div> */}
        </>
      );
    } else {
      return (
        <>
          <div className="text-center mb-3">{message}</div>
          <div className="col-12">
            <button className="w-100 default-btn btn-two" type="submit">
              Đến trang chủ
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Navbar headers={headers} />

      <div className="user-area-all-style sign-up-area ptb-100 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-form-action">
                <div className="form-heading text-center">
                  <h3 className="form-title">Tạo tài khoản</h3>
                </div>

                <form
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (step === 1) {
                      onFormSubmit1(e);
                    } else if (step === 2) {
                      onFormSubmit2(e);
                    } else if (step === 3) {
                      onFormSubmit3(e);
                    } else {
                      router.push("/");
                    }
                  }}
                >
                  <div className="row">
                    {render()}
                    {/* <div className="col-md-12 col-sm-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          placeholder="Vui lòng nhập họ tên"
                        />
                      </div>
                    </div> */}

                    {/* <div className="col-md-12 col-sm-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          name="phone"
                          placeholder="Vui lòng nhập số điện thoại"
                        />
                      </div>
                    </div> */}

                    {/* <div className="col-md-12 col-sm-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Vui lòng nhập email (nếu có)"
                        />
                      </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Thiết lập mật khẩu (6 chữ số)"
                        />
                      </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Nhập lại mật khẩu"
                        />
                      </div>
                    </div> */}

                    {/* <div className="d-flex justify-content-center">
                      <OtpInput
                        className="OTP__checkInput mx-4 mb-3"
                        value={arrCode}
                        onChange={(e) => setArrCode(e)}
                        numInputs={4}
                        shouldAutoFocus={true}
                        // separator={<span>-</span>}
                      />
                    </div> */}

                    {/* <div className="col-12">
                      <button className="default-btn btn-two" type="submit">
                        Đăng ký
                      </button>
                    </div> */}

                    <div className="col-12">
                      <p className="account-desc">
                        Bạn đã có tài khoản?
                        <Link href="/login">
                          <a>Đăng nhập</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
