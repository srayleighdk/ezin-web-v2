import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "../../utils/ActiveLink";
import Image from "next/image";
import NewHeaderLogo from "../../public/images/logo.png";
import useAuth from "../../src/container/auth-wrapper/auth.context";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  makeSelectActivationVisible,
  makeSelectAuth,
  makeSelectCart,
  makeSelectCartVisible,
} from "../../src/store/selector";
import {
  toggleLoginModal,
  toggleRegisterModal,
} from "../../src/store/modal/actions";
import { setActivationVisible } from "../../src/store/actions";
import { getHeader } from "../../pages/api";

function ellipsis(str, len) {
  return str ? (str.length < len ? str : str.substr(0, len)) : "";
}

function titleCase(str) {
  return (
    str &&
    str.toLowerCase().replace(/(^|\s)(\w)/g, function (x) {
      return x.toUpperCase();
    })
  );
}
const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  cart: makeSelectCart(),
  cartVisible: makeSelectCartVisible(),
  activationVisible: makeSelectActivationVisible(),
});

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { logout } = useAuth();
  const { auth, activationVisible } = useSelector(mapStateToProps);
  const [headers, setHeaders] = useState();
  const [isMounted, setIsMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [collapsed, setCollapse] = useState(true);

  useEffect(() => {
    const fetchHeader = async () => {
      const res = await getHeader();
      if (res?.data.success) {
        setHeaders(res?.data?.data);
      }
    };
    fetchHeader();
  }, []);
  /**
   * If collapse is true, set collapse to false. If collapse is false, set collapse to true.
   */
  const toggleNavbar = () => {
    setCollapse(!collapsed);
  };

  const classOne = collapsed
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";
  return (
    <>
      <div id="navbar" className="navbar-area fixed-top">
        <nav
          className="navbar navbar-expand-md navbar-light py-2"
          style={{
            background:
              "linear-gradient(180deg, #ecf8ff 0%, rgb(240 255 253) 91.31%)",
          }}
        >
          <div className="container justify-content-start">
            <button
              onClick={toggleNavbar}
              className={`${classTwo}`}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ marginRight: "25%" }}
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            <Link href="/" passHref>
              <Image src={NewHeaderLogo} alt="logo-header" layout="intrinsic" />
            </Link>

            <div className={classOne} id="navbarSupportedContent">
              {/* <ul className={`navbar-nav m-auto align-items-center ${isMobile && "mt-4"}`}> */}
              <ul className={`navbar-nav m-auto align-items-center`}>
                {headers &&
                  headers.map((header) => {
                    return (
                      // <li className={`nav-item ${isMobile && "w-100"}`} key={header.key}>
                      <li className={`nav-item`} key={header.key}>
                        <Link href={header.link}>
                          <a
                            className="nav-link text-black text-start"
                            onClick={toggleNavbar}
                            // onClick={(e) => e.preventDefault()}
                          >
                            {header.label}
                            {header.children && (
                              <i className="bx bx-chevron-down"></i>
                            )}{" "}
                            {/* <i className='bx bx-chevron-down'></i> */}
                          </a>
                        </Link>

                        {header.children && (
                          <ul className="dropdown-menu">
                            {header.children.map((child) => {
                              return (
                                <li
                                  className="nav-item dropend"
                                  key={child.key}
                                >
                                  <Link
                                    href={child.link}
                                    activeClassName="active"
                                  >
                                    <a className="nav-link">
                                      {child.label}
                                      {child.children && (
                                        <i
                                          className="bx bx-chevron-right"
                                          style={{ top: "4px" }}
                                        ></i>
                                      )}
                                    </a>
                                  </Link>
                                  {child.children && (
                                    <ul
                                      className="dropdown-menu"
                                      style={{ top: "-5px" }}
                                    >
                                      {child.children.map((child) => {
                                        return (
                                          <li
                                            className="nav-item"
                                            key={child.key}
                                          >
                                            <Link
                                              href={child.link}
                                              activeClassName="active"
                                            >
                                              <a className="nav-link">
                                                {child.label}
                                              </a>
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                <div
                  className={`${
                    !isMobile ? "ms-2" : "text-uppercase w-100"
                  } others-options text-ms-16 fw-ms-default`}
                >
                  <ul className="navbar-nav m-auto align-item-baseline">
                    <li
                      className="nav-item w-100"
                      onClick={() =>
                        setShowNavbar(
                          showNavbar !== "account" ? "account" : null
                        )
                      }
                    >
                      {isMobile ? (
                        <div className="pt-2 text-capitalize pb-1 pb-sm-1 nav-link text-black">
                          {auth?.full_name || auth?.username
                            ? ellipsis(
                                titleCase(auth?.full_name || auth?.username)
                              )
                            : "Tài khoản"}
                          <i className="bx bx-chevron-down"></i>
                        </div>
                      ) : (
                        <a className="pt-2 text-capitalize pb-3 px-3 pb-sm-1 default-btn nav-link text-black">
                          {auth?.full_name || auth?.username
                            ? ellipsis(
                                titleCase(auth?.full_name || auth?.username)
                              )
                            : "Tài khoản"}
                          <i className="bx bx-chevron-down"></i>
                        </a>
                      )}
                      {showNavbar === "account" && (
                        <ul className="dropdown-menu navbar no-border pt-sm-1 no-shadow mt-sm-0 w-100">
                          {auth?.full_name || auth?.username ? (
                            <div
                              className="text-dark text-capitalize w-100"
                              onClick={() => {
                                toggleNavbar();
                                logout();
                              }}
                            >
                              <li className="nav-item dropend cursor-pointer">
                                Đăng xuất
                              </li>
                            </div>
                          ) : (
                            <>
                              <Link href="/login">
                                <a
                                  className={`text-dark text-capitalize w-100 ${
                                    isMobile && "text-start"
                                  }`}
                                  onClick={() => {
                                    toggleNavbar();
                                  }}
                                >
                                  <li className="nav-item dropend cursor-pointer">
                                    Đăng nhập
                                  </li>
                                </a>
                              </Link>
                              <Link href="/sign-up">
                                <a className="text-dark text-capitalize">
                                  <li
                                    className="nav-item dropend cursor-pointer d-flex align-items-center"
                                    onClick={() => {
                                      toggleNavbar();
                                    }}
                                  >
                                    Đăng ký{" "}
                                    <span className="ms-1 badge rounded-pill bg-warning text-dark bg-color-coin">
                                      Nhận ngay 2000{" "}
                                      <img
                                        src="/images/coin.png"
                                        alt="Coin"
                                        className="navbar-coin"
                                      />
                                    </span>
                                  </li>
                                </a>
                              </Link>
                              <Link href="/forgot-password">
                                <a
                                  className={`text-dark text-capitalize w-100 ${
                                    isMobile && "text-start"
                                  }`}
                                  onClick={() => {
                                    toggleNavbar();
                                  }}
                                >
                                  <li className="nav-item dropend cursor-pointer">
                                    Quên mật khẩu
                                  </li>
                                </a>
                              </Link>
                            </>
                          )}
                          <Link href="/tra-cuu">
                            <a
                              className={`text-dark text-capitalize w-100 ${
                                isMobile && "text-start"
                              }`}
                              onClick={() => {
                                toggleNavbar();
                              }}
                            >
                              <li className="nav-item dropend cursor-pointer">
                                Tra cứu bảo hiểm
                              </li>
                            </a>
                          </Link>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
