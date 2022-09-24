import React, { useState, useEffect } from "react";
import Link from "../../utils/ActiveLink";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
    setIsMounted(false);
  }, []);

  // _isMounted = false;
  const state = {
    display: false,
    // collapsed: true
  };
  const toggleNavbar = () => {
    console.log("run1");
    // this.setState({
    //     collapsed: !this.state.collapsed,
    // });
    setCollapsed(!collapsed);
  };
  // componentDidMount() {
  //     let elementId = document.getElementById("navbar");
  //     document.addEventListener("scroll", () => {
  //         if (window.scrollY > 170) {
  //             elementId.classList.add("is-sticky");
  //         } else {
  //             elementId.classList.remove("is-sticky");
  //         }
  //     });
  // }
  // const componentWillUnmount = () => {
  //     setIsMounted(false);
  // }

  // const { collapsed } = this.state;
  const classOne = collapsed
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";
  return (
    <>
      <div id="navbar" className="navbar-area fixed-top">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container">
            <Link href="/">
              <a className="navbar-brand">
                <img src="/images/logo.png" alt="logo" />
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
              <ul className="navbar-nav m-auto align-item-baseline">
                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      Trang chủ
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      Sản phẩm <i className="bx bx-chevron-down"></i>
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link href="/about-1" activeClassName="active">
                        <a className="nav-link">Ô tô</a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/about-2" activeClassName="active">
                        <a className="nav-link">Xe máy</a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/about-2" activeClassName="active">
                        <a className="nav-link">Con người</a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      Ezcoin
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      EzLife <i className="bx bx-chevron-down"></i>
                    </a>
                  </Link>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link href="/pricing" activeClassName="active">
                        <a className="nav-link">Ezin life</a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="#">
                        <a
                          className="nav-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          BH tai nạn <i className="bx bx-chevron-down"></i>
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/faq" activeClassName="active">
                        <a className="nav-link">Các quy tắc</a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="#">
                        <a
                          className="nav-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          TNDS <i className="bx bx-chevron-down"></i>
                        </a>
                      </Link>
                    </li>

                  </ul>
                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      Tiện ích
                    </a>
                  </Link>

                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      Đối tác
                    </a>
                  </Link>

                </li>

                <li className="nav-item">
                  <Link href="#">
                    <a
                      className="nav-link text-black"
                      onClick={(e) => e.preventDefault()}
                    >
                      Trở thành EzStore
                    </a>
                  </Link>
                </li>
              </ul>

              <div className="others-options">
                <Link href="/login">
                  <a className="default-btn">
                    Log In <i className="bx bx-log-in-circle"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
