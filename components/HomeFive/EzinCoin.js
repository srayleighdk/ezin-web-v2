import React, { Component } from "react";
import Link from "next/link";
import ButtonEzin from "../Common/Button";
import { useRouter } from "next/router";

function EzinCoin() {
  const router = useRouter();
  return (
    <section className="offer-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <h2 className="color-primary">
            Ezcoin <span>999 cách để vui cùng Ezin</span>{" "}
          </h2>
          <p>
            Những trò chơi của Ezin bạn có thể kiếm thêm vô số coin cũng như mã
            giảm giá có giá trị cao
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="single-news">
              <div className="blog-img rounded-top">
                <Link href="/tra-cuu">
                  <a>
                    <img
                      src="/images/ezcoin/nhiem-vu-hang-ngay.png"
                      alt="nhiem-vu-hang-ngay"
                    />
                  </a>
                </Link>
              </div>

              <div className="news-content-wrap">
                <div className="w-100">
                  <h3
                    className="text-center fst-normal"
                    style={{ fontWeight: "700", fontSize: "20px" }}
                  >
                    Nhiệm vụ hàng ngày
                  </h3>
                </div>

                <p
                  className="style-font-p text-center w-100 pt-2"
                  style={{ color: "#4D5562" }}
                >
                  Tổng số Ezcoin là{" "}
                  <span style={{ color: "#FE9526" }}>
                    <object
                      style={{ verticalAlign: "sub" }}
                      data="/images/ezcoin/icon/ezin-coin-color.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>{" "}
                    500,000
                  </span>
                </p>

                <div className="slider-btn d-flex justify-content-center">
                  <ButtonEzin
                    onClick={() => router.push("/tra-cuu")}
                    types="primary"
                    className="btn-full-width"
                  >
                    Xem nhiệm vụ
                  </ButtonEzin>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-news">
              <div className="blog-img rounded-top">
                <Link href="/tra-cuu">
                  <a>
                    <img src="/images/ezcoin/ez-game.png" alt="ez-game" />
                  </a>
                </Link>
              </div>

              <div className="news-content-wrap">
                <div className="w-100">
                  <h3
                    className="text-center fst-normal"
                    style={{ fontWeight: "700", fontSize: "20px" }}
                  >
                    Ezgame - Mini games
                  </h3>
                </div>

                <p
                  className="style-font-p text-center w-100 pt-2"
                  style={{ color: "#4D5562" }}
                >
                  Tổng số Ezcoin là{" "}
                  <span style={{ color: "#FE9526" }}>
                    <object
                      style={{ verticalAlign: "sub" }}
                      data="/images/ezcoin/icon/ezin-coin-color.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>{" "}
                    500,000
                  </span>
                </p>

                <div className="slider-btn d-flex justify-content-center">
                  <ButtonEzin
                    onClick={() => router.push("/tra-cuu")}
                    types="primary"
                    className="btn-full-width"
                  >
                    Chơi ngay
                  </ButtonEzin>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-news">
              <div className="blog-img rounded-top">
                <Link href="/tra-cuu">
                  <a>
                    <img
                      src="/images/ezcoin/thu-tai-cung-ai.png"
                      alt="thu-tai-cung-ai"
                    />
                  </a>
                </Link>
              </div>

              <div className="news-content-wrap">
                <div className="w-100">
                  <h3
                    className="text-center fst-normal"
                    style={{ fontWeight: "700", fontSize: "20px" }}
                  >
                    Thử tài cùng AI
                  </h3>
                </div>

                <p
                  className="style-font-p text-center w-100 pt-2"
                  style={{ color: "#4D5562" }}
                >
                  Tổng số Ezcoin là{" "}
                  <span style={{ color: "#FE9526" }}>
                    <object
                      style={{ verticalAlign: "sub" }}
                      data="/images/ezcoin/icon/ezin-coin-color.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>{" "}
                    500,000
                  </span>
                </p>

                <div className="slider-btn d-flex justify-content-center">
                  <ButtonEzin
                    onClick={() => router.push("/tra-cuu")}
                    types="primary"
                    className="btn-full-width"
                  >
                    Chơi ngay
                  </ButtonEzin>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-news">
              <div className="blog-img rounded-top">
                <Link href="/tra-cuu">
                  <a>
                    <img
                      src="/images/ezcoin/ride-to-earn.png"
                      alt="ride-to-earn"
                    />
                  </a>
                </Link>
              </div>

              <div className="news-content-wrap">
                <div className="w-100">
                  <h3
                    className="text-center fst-normal"
                    style={{ fontWeight: "700", fontSize: "20px" }}
                  >
                    Ride to earn
                  </h3>
                </div>

                <p
                  className="style-font-p text-center w-100 pt-2"
                  style={{ color: "#4D5562" }}
                >
                  Tổng số Ezcoin là{" "}
                  <span style={{ color: "#FE9526" }}>
                    <object
                      style={{ verticalAlign: "sub" }}
                      data="/images/ezcoin/icon/ezin-coin-color.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>{" "}
                    500,000
                  </span>
                </p>

                <div className="slider-btn d-flex justify-content-center">
                  <ButtonEzin
                    onClick={() => router.push("/tra-cuu")}
                    types="primary"
                    className="btn-full-width"
                  >
                    Chơi ngay
                  </ButtonEzin>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-news">
              <div className="blog-img rounded-top">
                <Link href="https://store.ezin.vn/">
                  <a>
                    <img
                      src="/images/ezcoin/tro-thanh-ez-store.png"
                      alt="tro-thanh-ez-store"
                    />
                  </a>
                </Link>
              </div>

              <div className="news-content-wrap">
                <div className="w-100">
                  <h3
                    className="text-center fst-normal"
                    style={{ fontWeight: "700", fontSize: "20px" }}
                  >
                    Trở thành EzStore
                  </h3>
                </div>

                <p
                  className="style-font-p text-center w-100 pt-2"
                  style={{ color: "#4D5562" }}
                >
                  Tổng số Ezcoin là{" "}
                  <span style={{ color: "#FE9526" }}>
                    <object
                      style={{ verticalAlign: "sub" }}
                      data="/images/ezcoin/icon/ezin-coin-color.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>{" "}
                    500,000
                  </span>
                </p>

                <div className="slider-btn d-flex justify-content-center">
                  <ButtonEzin
                    onClick={() => router.push("https://store.ezin.vn/")}
                    types="primary"
                    className="btn-full-width"
                  >
                    Chi tiết
                  </ButtonEzin>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
            <div className="single-news">
              <div className="blog-img rounded-top">
                <Link href="/tra-cuu">
                  <a>
                    <img
                      src="/images/ezcoin/doi-ez-coin-lay-qua.png"
                      alt="doi-ez-coin-lay-qua"
                    />
                  </a>
                </Link>
              </div>

              <div className="news-content-wrap">
                <div className="w-100">
                  <h3
                    className="text-center fst-normal"
                    style={{ fontWeight: "700", fontSize: "20px" }}
                  >
                    Đổi Ezcoin lấy quà
                  </h3>
                </div>

                <p
                  className="style-font-p text-center w-100 pt-2"
                  style={{ color: "#4D5562" }}
                >
                  Tổng số Ezcoin là{" "}
                  <span style={{ color: "#FE9526" }}>
                    <object
                      style={{ verticalAlign: "sub" }}
                      data="/images/ezcoin/icon/ezin-coin-color.svg"
                      width="20"
                      height="20"
                    >
                      {" "}
                    </object>{" "}
                    500,000
                  </span>
                </p>

                <div className="slider-btn d-flex justify-content-center">
                  <ButtonEzin
                    onClick={() => router.push("/tra-cuu")}
                    types="primary"
                    className="btn-full-width"
                  >
                    Đổi quà
                  </ButtonEzin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shape Images */}
      <div className="offer-shape">
        <img src="/images/shape/services-shape/1.png" alt="services-shape1" />
        <img src="/images/shape/services-shape/2.png" alt="services-shape2" />
        <img src="/images/shape/services-shape/3.png" alt="services-shape3" />
        <img src="/images/shape/services-shape/4.png" alt="services-shape4" />
        <img src="/images/shape/services-shape/5.png" alt="services-shape5" />
        <img src="/images/shape/services-shape/6.png" alt="services-shape6" />
      </div>
    </section>
  );
}

export default EzinCoin;
