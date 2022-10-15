import React, { useEffect, useState } from "react";
import Link from "../../utils/ActiveLink";

const Navbar = ({ headers }) => {
  // console.log("headers", headers)
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState(false);
  const [collapsed, setCollapse] = useState(true);

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
      <div id="navbar" className="navbar-area fixed-top bg-white">
        <nav className="navbar navbar-expand-md navbar-light">
          <div className="container">
            <Link href="/">
              <a className="navbar-brand">
                <img src="/images/logo.png" alt="logo_EZIN" />
              </a>
            </Link>

            <button
              onClick={toggleNavbar}
              className={classTwo}
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

            <div className={classOne} id="navbarSupportedContent">
              <ul className="navbar-nav m-auto align-items-center">
                {headers &&
                  headers.map((header) => {
                    return (
                      <li className="nav-item" key={header.key}>
                        <Link href={header.link} >
                          <a
                            className="nav-link text-black"
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
                <div className="ms-2 others-options">
                  <ul className="navbar-nav m-auto align-item-baseline">
                    <li className="nav-item">
                      <a className="pt-2 text-capitalize pb-3 px-3 default-btn nav-link text-black">
                        Tài khoản
                        <i className="bx bx-chevron-down"></i>
                      </a>
                      <ul className="dropdown-menu navbar">
                        <a href="/login" className="text-dark text-capitalize">
                          <li className="nav-item dropend cursor-pointer">
                            Đăng nhập
                          </li>
                        </a>
                        <a href="/sign-up" className="text-dark text-capitalize">
                          <li className="nav-item dropend cursor-pointer d-flex align-items-center">
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
                        <a href="/forgot-password" className="text-dark text-capitalize">
                          <li className="nav-item dropend cursor-pointer">
                            Quên mật khẩu
                          </li>
                        </a>
                        <a href="/tra-cuu" className="text-dark text-capitalize">
                          <li className="nav-item dropend cursor-pointer">
                            Tra cứu bảo hiểm
                          </li>
                        </a>
                      </ul>
                    </li>
                  </ul>
                </div>
              </ul>

              {/* <Link href="/contact">
                <a className="default-btn white" style={{padding: 16}}>Kích hoạt</a>
              </Link>

              <Link href="/contact">
                <a className="default-btn white" style={{padding: 16}}>Download</a>
              </Link> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
