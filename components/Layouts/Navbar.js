import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import ButtonEzin from "../Common/Button";
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
import { getAllNodeProducts, getHeader } from "../../pages/api";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { logout } = useAuth();
  const { auth, activationVisible } = useSelector(mapStateToProps);
  const [headers, setHeaders] = useState();
  const [childItem, setChildItem] = useState(false);
  // const [isMounted, setIsMounted] = useState(false);
  // const [showNavbar, setShowNavbar] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [vehicle, setVehicle] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [collapsed, setCollapse] = useState(true);

  console.log("product", vehicle, personal);

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  useEffect(() => {
    const fetchHeader = async () => {
      const [res, res1] = await Promise.all([
        getHeader(),
        getAllNodeProducts(),
      ]);
      if (res?.data.success) {
        setHeaders(res?.data?.data);
      }
      if (res1?.data?.data) {
        setVehicle(res1?.data?.data?.slice(0, 2));
        setPersonal(res1?.data?.data?.slice(2));
      }
    };
    fetchHeader();
  }, []);
  /**
   * If collapse is true, set collapse to false. If collapse is false, set collapse to true.
   */
  const toggleNavbar = (value) => {
    if (userInfo) {
      setUserInfo(false);
    }
    if (value === "Sản phẩm") {
      setChildItem(true);
    } else {
      if (value !== "back") {
        setCollapse(!collapsed);
      }
      setChildItem(false);
    }
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
          className={`navbar navbar-expand-md navbar-light py-2 ${
            !collapsed && "align-items-start height"
          }`}
          // style={{
          //   background:
          //     "linear-gradient(180deg, #ecf8ff 0%, rgb(240 255 253) 91.31%)",
          // }}
        >
          <div
            className={`container h-100 ${!collapsed && "flex-row-reverse"}`}
          >
            <button
              onClick={toggleNavbar}
              className={`${classTwo}`}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            <Link href="/" passHref>
              <Image
                onClick={toggleNavbar}
                src={NewHeaderLogo}
                alt="logo-header"
                layout="intrinsic"
              />
            </Link>

            {collapsed && (
              <div className="d-flex justify-content-between align-items-center">
                {/* <SearchOutlined className="navbar-search" /> */}
                <Avatar
                  size="small"
                  className="bg-dark ms-3"
                  icon={<UserOutlined />}
                  onClick={() => {
                    toggleNavbar();
                    setUserInfo(!userInfo);
                  }}
                />
              </div>
            )}

            <div
              className={`position-relative h-100 ${classOne}`}
              id="navbarSupportedContent"
            >
              {/* <ul className={`navbar-nav m-auto align-items-center ${isMobile && "mt-4"}`}> */}
              {userInfo ? (
                <ul
                  className={`navbar-nav m-auto align-items-center mt-3 h-100`}
                >
                  {isMobile ? (
                    auth?.full_name || auth?.username ? (
                      <>
                        <Link href="#">
                          <a
                            className={`text-dark text-capitalize w-100 ${
                              isMobile && "text-start"
                            }`}
                            onClick={() => {
                              toggleNavbar();
                              logout();
                            }}
                          >
                            <li className="nav-item dropend cursor-pointer">
                              Đăng xuất
                            </li>
                          </a>
                        </Link>
                        <ButtonEzin
                          types="secondary"
                          className="nav-btn mt-3"
                          onClick={() => {
                            toggleNavbar();
                            router.push("/kich-hoat-the");
                          }}
                        >
                          Kích hoạt
                        </ButtonEzin>
                        <ButtonEzin
                          types="primary"
                          className="nav-btn mt-2"
                          onClick={() => {
                            toggleNavbar();
                            // router.push("/kich-hoat-the");
                          }}
                        >
                          Download
                        </ButtonEzin>
                      </>
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
                          <a className="text-dark text-capitalize w-100">
                            <li
                              className="nav-item dropend cursor-pointer d-flex align-items-center justify-content-between"
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
                              Tra cứu bảo hiểm 11111
                            </li>
                          </a>
                        </Link>
                        <ButtonEzin
                          types="secondary"
                          className="nav-btn mt-3"
                          onClick={() => {
                            toggleNavbar();
                            router.push("/kich-hoat-the");
                          }}
                        >
                          Kích hoạt
                        </ButtonEzin>
                        <ButtonEzin
                          types="primary"
                          className="nav-btn mt-2"
                          onClick={() => {
                            toggleNavbar();
                            // router.push("/kich-hoat-the");
                          }}
                        >
                          Download
                        </ButtonEzin>
                      </>
                    )
                  ) : null}
                </ul>
              ) : (
                <ul
                  className={`navbar-nav m-auto align-items-center mt-3 h-100`}
                >
                  {isMobile ? (
                    auth?.full_name || auth?.username ? (
                      <>
                        {headers &&
                          headers.map((header) => {
                            return (
                              // <li className={`nav-item ${isMobile && "w-100"}`} key={header.key}>
                              <li className={`nav-item w-100`} key={header.key}>
                                <Link href={header.link}>
                                  <a
                                    className={`nav-link text-black text-start ${
                                      header.label === "Ezin Life" && "mb-1"
                                    } d-flex align-items-center justify-content-between`}
                                    onClick={() => {
                                      if (header.label === "Sản phẩm") {
                                        toggleNavbar("Sản phẩm");
                                      } else {
                                        toggleNavbar();
                                      }
                                    }}
                                    // onClick={(e) => e.preventDefault()}
                                  >
                                    {header.label}
                                    {header.label === "Sản phẩm" && (
                                      <RightOutlined />
                                    )}{" "}
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                        <Link href="https://store.ezin.vn/">
                          <a
                            className={`text-dark text-capitalize w-100 ${
                              isMobile && "text-start"
                            }`}
                            onClick={() => {
                              toggleNavbar();
                            }}
                          >
                            <li className="nav-item dropend cursor-pointer">
                              Trở thành EzStore
                            </li>
                          </a>
                        </Link>
                        <ButtonEzin
                          types="secondary"
                          className="nav-btn mt-3"
                          onClick={() => {
                            toggleNavbar();
                            router.push("/kich-hoat-the");
                          }}
                        >
                          Kích hoạt
                        </ButtonEzin>
                        <ButtonEzin
                          types="primary"
                          className="nav-btn mt-2"
                          onClick={() => {
                            toggleNavbar();
                            // router.push("/kich-hoat-the");
                          }}
                        >
                          Download
                        </ButtonEzin>
                      </>
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
                          <a className="text-dark text-capitalize w-100">
                            <li
                              className="nav-item dropend cursor-pointer d-flex align-items-center justify-content-between"
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
                        <ButtonEzin
                          types="secondary"
                          className="nav-btn mt-3"
                          onClick={() => {
                            toggleNavbar();
                            router.push("/kich-hoat-the");
                          }}
                        >
                          Kích hoạt
                        </ButtonEzin>
                        <ButtonEzin
                          types="primary"
                          className="nav-btn mt-2"
                          onClick={() => {
                            toggleNavbar();
                            // router.push("/kich-hoat-the");
                          }}
                        >
                          Download
                        </ButtonEzin>
                      </>
                    )
                  ) : null}
                </ul>
              )}
                {childItem && (  <ul
                  className={`product-item w-100 h-100 navbar-nav m-auto align-items-center mt-3`}
                >
                  <div
                    className="d-flex align-items-center"
                    onClick={() => toggleNavbar("back")}
                  >
                    <LeftOutlined />
                    <div className="ms-2 navbar-back">Trở về</div>
                  </div>
                  <>
                    <div className="w-100">
                      <div className="single-widget mb-2">
                        <h3 className="navbar mt-2">Ô tô và Xe máy</h3>
                        <ul>
                          {vehicle.map((item) => (
                            <div className="">
                              <div className="">
                                <Link href={`san-pham/${item.slug}#mua-ngay`}>
                                  <a
                                    className={`text-dark text-capitalize navbar-childItem w-100 ${
                                      isMobile && "text-start"
                                    }`}
                                    onClick={() => {
                                      toggleNavbar();
                                    }}
                                  >
                                    <li className="nav-item dropend cursor-pointer">
                                      {item.name}
                                    </li>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </ul>
                      </div>

                      <div className="single-widget mb-2">
                        <h3 className="navbar mt-2">Cá nhân</h3>
                        <ul>
                          {personal.map((item) => (
                            <div className="">
                              <div className="">
                                <Link href={`san-pham/${item.slug}#mua-ngay`}>
                                  <a
                                    className={`text-dark text-capitalize navbar-childItem w-100 ${
                                      isMobile && "text-start"
                                    }`}
                                    onClick={() => {
                                      toggleNavbar();
                                    }}
                                  >
                                    <li className="nav-item dropend cursor-pointer">
                                      {item.name}
                                    </li>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                </ul>)}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
