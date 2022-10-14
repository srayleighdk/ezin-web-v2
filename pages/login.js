import React, { Component } from "react";
import Navbar from "../components/Layouts/Navbar";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import Link from "next/link";
import { getHeader, loginApi } from "../pages/api";
import { normalizePhoneNumber, getProfile } from "../utils/helpers";
import { setAuth } from '../components/store/modal/actions';
import { createStructuredSelector } from 'reselect';
import { makeLoginVisible, makeModalData } from '../components/store/modal/selector';
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

export default function Login({ headers }) {
  // const onLogin = (values) => {
  //   const formData = new FormData(values.target);
  //   const formDataObj = Object.fromEntries(formData.entries());
  //   console.log("valuee", formDataObj);
  //   loginApi({
  //     ...values,
  //     username: '0' + normalizePhoneNumber(formDataObj.phone),
  //   }).then(({ data, token, msg, success }) => {
  //     if (success) {
  //       getProfile().then((res) => dispatch(setAuth(res.data.data)));
  //     }
  //   });
  // }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head >
      <Navbar headers={headers} />

      <div className="user-area-all-style log-in-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-form-action">
                <div className="form-heading text-center">
                  <h3 className="form-title">Đăng nhập tài khoản</h3>
                </div>
                <p className="text-center text-sm mb-3">
                  <i>
                    Sử dụng tài khoản Ezin để lưu trữ và tra cứu đơn bảo hiểm
                    theo cách dễ dàng nhất!
                  </i>
                </p>
                <form
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // onLogin(e);
                  }}
                >
                  <div className="row">
                    {/* <div className="col-lg-4 col-md-4 col-sm-12">
                      <a href="#" className="default-btn mb-30">
                        <i className="bx bxl-google"></i> Google
                      </a>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <a href="#" className="default-btn mb-30">
                        <i className="bx bxl-facebook"></i> Facebook
                      </a>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <a href="#" className="default-btn mb-30">
                        <i className="bx bxl-twitter"></i> Twitter
                      </a>
                    </div> */}

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
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-6 form-condition">
                      <div className="agree-label">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="gridCheck"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="gridCheck"
                          >
                            Nhớ tài khoản
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-6">
                      <Link href="/forgot-password">
                        <a className="forget">Quên mật khẩu?</a>
                      </Link>
                    </div>

                    <div className="col-12">
                      <button className="default-btn btn-two" type="submit">
                        Đăng nhập
                      </button>
                    </div>

                    <div className="col-12">
                      <p className="account-desc">
                        Tôi không có tài khoản?
                        <Link href="/sign-up">
                          <a>Đăng ký</a>
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
