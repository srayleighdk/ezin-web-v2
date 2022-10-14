import React, { useState, useRef } from "react";
import Navbar from "../components/Layouts/Navbar";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import Link from "next/link";
import { createStructuredSelector } from "reselect";
import { getHeader, registerApi, verifyAccountApi } from "../pages/api";
import {
  makeOTPVisible,
  makeModalData,
} from "../components/store/modal/selector";
import { useSelector, useDispatch } from "react-redux";
import { normalizePhoneNumber } from "../utils/helpers";
import {
  toggleNewPass,
  toggleResetPass,
  toggleOTPModal,
} from "../components/store/modal/actions";
import OtpInput from "react-otp-input";

export async function getServerSideProps() {
  const res = await getHeader();
  return {
    props: {
      headers: res?.data?.data,
    },
  };
}

// const mapStateToProps = createStructuredSelector({
//   otpVisible: makeOTPVisible(),
//   data: makeModalData(),
// });

export default function SignUp({ headers }) {
  // const { otpVisible, data } = useSelector(mapStateToProps);
  const [arrCode, setArrCode] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const button_ref = useRef(null);
  // const dispatch = useDispatch();

  const onFormSubmit1 = (e) => {
    e.preventDefault();
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
        if (res.data.is_new) {
          setStep(3);
          setMessage("");
        } else {
          setMessage("Mã OTP không hợp lệ");
        }
      }
      // else {
      //   e.preventDefault();
      //   setMessage("Mã OTP không hợp lệ 2");
      //   // button_ref.current.disabled = false;
      //   // message.error(res.msg);
      // }
    } catch (err) {
      e.preventDefault();
      // button_ref.current.disabled = false;
      console.log("err", err);
    }
  };

  const onResend = () => {
    alert("đã gửi lại otp")
  }

  const render = () => {
    if (step === 1) {
      return (
        <>
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label for="phone" class="form-label">
                Số điện thoại
              </label>
              <input
                className="form-control"
                type="text"
                name="phone"
                placeholder="Vui lòng nhập số điện thoại"
                required
              />
              <div class="text-danger">{message}</div>
            </div>
          </div>
          <div className="col-12">
            <button className="default-btn btn-two" type="submit">
              Đăng ký
            </button>
          </div>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <div className="text-center mb-3">Mã xác thực đã được gửi vào số điện thoại 0939272027</div>
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
          <div class="text-danger text-center mb-3">{message}</div>
          <div className="col-lg-6 col-12">
            <button className="default-btn btn-two" onClick={() => setStep(1)}>
              Quay lại
            </button>
          </div>
          <div className="col-lg-6 col-12">
            <button className="default-btn btn-two" type="submit">
              Xác nhận
            </button>
          </div>
          <div class="text-center mt-3">Không nhận được mã. <u onClick={onResend}>GỬI LẠI</u></div>
        </>
      );
    } else {
      return <div>123</div>;
    }
  };

  return (
    <>
      <Navbar headers={headers} />

      <div className="user-area-all-style sign-up-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-form-action">
                <div className="form-heading text-center">
                  <h3 className="form-title">Tạo tài khoản</h3>
                </div>

                <form
                  className="needs-validation"
                  method="post"
                  onSubmit={(e) => {
                    if (step === 1) {
                      onFormSubmit1(e);
                    } else if (step === 2) {
                      onFormSubmit2(e);
                    } else {
                    }
                  }}
                  novalidate
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
