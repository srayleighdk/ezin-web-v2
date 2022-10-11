import React, { Component, useEffect, useState } from "react";
import Link from "../../utils/ActiveLink";

const Navbar = ({ headers }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState(false);
  const [collapsed, setCollapse] = useState(true);

  /**
   * If collapse is true, set collapse to false. If collapse is false, set collapse to true.
   */
  const toggleNavbar = () => {
    setCollapse(!collapsed);
  };

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

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
              <ul className="navbar-nav m-auto align-item-baseline">
                {headers &&
                  headers.map((header) => {
                    return (
                      <li className="nav-item">
                        <Link href={header.link} key={header.key}>
                          <a
                            className="nav-link text-black"
                            onClick={(e) => e.preventDefault()}
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
};

export default Navbar;
