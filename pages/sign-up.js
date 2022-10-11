import React, { useState, useRef } from "react";
import Navbar from "../components/Layouts/Navbar";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import Link from "next/link";
import { createStructuredSelector } from 'reselect';
import { getHeader, registerApi, verifyAccountApi } from "../pages/api";
import { makeOTPVisible, makeModalData } from "../components/store/modal/selector";
import { useSelector, useDispatch } from 'react-redux';
import { normalizePhoneNumber } from "../utils/helpers";
import { toggleNewPass, toggleResetPass, toggleOTPModal } from "../components/store/modal/actions"
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
  const [arrCode, setArrCode] = useState('');
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('')
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
        } else {
          alert("Số điện thoại đã đăng ký")
        }
      })
      .catch((err) => console.log(err));
  };

  const checkValidCode = () => {
    return { code: arrCode, isValid: arrCode.toString().length === 4 };
  };

  const onFormSubmit2 = async(e) => {
    try {
      // button_ref.current.disabled = true;
      console.log("value", arrCode)
      const res = await verifyAccountApi({
        username: phone,
        otp: checkValidCode().code,
      });
      console.log("res", res)
      if (res.success) {
        console.log('success')
        // message.success(res.msg);
        // dispatch(toggleOTPModal());
        if (res.data.is_new) {
          console.log('success 111')
          setStep(3);
          // dispatch(toggleNewPass());
        } else {
          console.log('success 222')
          // dispatch(toggleResetPass());
        }
      } else {
        console.log('false')
        // button_ref.current.disabled = false;
        // message.error(res.msg);
      }
    } catch (err) {
      // button_ref.current.disabled = false;
      console.log("err", err);
    }
  }

  const render = () => {
    if (step === 1) {
      return (
        <>
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="phone"
                placeholder="Vui lòng nhập số điện thoại"
              />
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
          <div className="d-flex justify-content-center">
            <OtpInput
              className="OTP__checkInput mx-4 mb-4 mt-2"
              value={arrCode}
              onChange={(e) => setArrCode(e)}
              numInputs={4}
              shouldAutoFocus={true}
              // separator={<span>-</span>}
            />
          </div>
          <div className="col-12">
            <button className="default-btn btn-two" type="submit">
              Xác nhận
            </button>
          </div>
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

                <form method="post" onSubmit={(e) => {
                  if(step === 1) {
                    onFormSubmit1(e);
                  } else if (step === 2) {
                    onFormSubmit2(e);
                  } else {

                  }
                }}>
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
