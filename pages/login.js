import React, { useState } from "react";
// import PageBanner from "../components/Common/PageBanner";
import useAuth from "../src/container/auth-wrapper/auth.context";
import Link from "next/link";
import { getHeader, loginApi, getProfile } from "../pages/api";
import { normalizePhoneNumber } from "../utils/helpers";
import { setAuth } from "../src/store/actions";
import ButtonEzin from "../components/Common/Button";
// import { setAuth } from '../src/store/modal/actions';
// import { createStructuredSelector } from 'reselect';
// import { makeLoginVisible, makeModalData } from '../components/store/modal/selector';
import { useSelector, useDispatch } from "react-redux";
import {
  toggleLoginModal,
  toggleRegisterModal,
  toggleForgot,
  setParentModal,
} from "../src/store/modal/actions";
import Head from "next/head";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const onLogin = (values) => {
    const formData = new FormData(values.target);
    const formDataObj = Object.fromEntries(formData.entries());
    loginApi({
      username: "0" + normalizePhoneNumber(formDataObj.phone),
      password: formDataObj.password,
    }).then(({ data, token, msg, success }) => {
      if (success) {
        // dispatch(toggleLoginModal());
        login({ user: data, token: token });
        getProfile().then((res) => dispatch(setAuth(res.data.data)));
        router.push("/");
      } else {
        setMessage(msg);
      }
    });
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="user-area-all-style log-in-area ptb-100 mt-4">
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
                    onLogin(e);
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
                      <div className="form-group mb-2">
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="text-danger text-center">{message}</div>
                    </div>

                    {/* <div className="col-lg-6 col-sm-6 form-condition">
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
                    </div> */}
                    <div className="col-12 mt-1">
                      <Link href="/forgot-password">
                        <a className="forget">Quên mật khẩu?</a>
                      </Link>
                    </div>

                    <div className="col-12 mt-3">
                      <ButtonEzin className="btn-full-width" types="primary">
                        Đăng nhập
                      </ButtonEzin>
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
    </>
  );
}
