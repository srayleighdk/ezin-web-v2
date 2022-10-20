import React, { Component } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

export default function MainBanner() {
  return (
    <section className="slider-area">
      <Swiper
        navigation={true}
        autoplay={{
          delay: 6000,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        className="hero-swiper"
      >
        <SwiperSlide>
          <div
            className="jumpx-slider-item vh-100"
            style={{
              backgroundImage: `url(/images/home-five/slider.png)`,
              minHeight: "100vh",
            }}
          >
            <div className="d-table">
              <div className="d-table-cell">
                <div className="container">
                  <div className="jumpx-slider-text overflow-hidden one mx-auto homepage-no-maxWidth">
                    {/* <span>IT & AI Services</span> */}
                    <h1 className="text-black mb-0 text-60">
                      Trải nghiệm cuộc sống tuyệt vời
                    </h1>
                    <p className="text-black mb-46">
                      Những hy sinh của ngày hôm nay sẽ được đền đáp vào ngày
                      mai.
                    </p>
                  </div>
                </div>
                <div
                  className="slider-btn position-absolute d-flex justify-content-center w-100"
                  style={{ bottom: "8%" }}
                >
                  <Link href="/contact">
                    <a className="default-btn white mx-3">Mua bảo hiểm ngay</a>
                  </Link>

                  <Link href="/services">
                    <a className="default-btn mx-3">Xem video</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="jumpx-slider-item vh-100"
            style={{ backgroundImage: `url(/images/home-five/slider.png)` }}
          >
            <div className="d-table">
              <div className="d-table-cell">
                <div className="container">
                  <div className="jumpx-slider-text overflow-hidden one mx-auto homepage-no-maxWidth">
                    {/* <span>IT & AI Services</span> */}
                    <h1 className="text-black mb-0 text-60">
                      Đi bình an về hạnh phúc
                    </h1>
                    <p className="text-black mb-46">
                      Hạnh phúc lớn nhất là sống hài lòng từng chút một.
                    </p>
                  </div>
                </div>

                <div
                  className="slider-btn position-absolute d-flex justify-content-center w-100"
                  style={{ bottom: "8%" }}
                >
                  <Link href="/contact">
                    <a className="default-btn white mx-3">Mua bảo hiểm ngay</a>
                  </Link>

                  <Link href="/services">
                    <a className="default-btn mx-3">Xem video</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="jumpx-slider-item vh-100"
            style={{ backgroundImage: `url(/images/home-five/slider.png)` }}
          >
            <div className="d-table">
              <div className="d-table-cell">
                <div className="container">
                  <div className="jumpx-slider-text overflow-hidden one mx-auto homepage-no-maxWidth">
                    {/* <span>IT & AI Services</span> */}
                    <h1 className="text-black mb-0 text-60">
                      Trải nghiệm cuộc sống tuyệt vời
                    </h1>
                    <p className="text-black mb-46">
                      Những hy sinh của ngày hôm nay sẽ được đền đáp vào ngày
                      mai.
                    </p>
                  </div>
                </div>

                <div
                  className="slider-btn position-absolute d-flex justify-content-center w-100"
                  style={{ bottom: "8%" }}
                >
                  <Link href="/contact">
                    <a className="default-btn white mx-3">Mua bảo hiểm ngay</a>
                  </Link>

                  <Link href="/services">
                    <a className="default-btn mx-3">Xem video</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
