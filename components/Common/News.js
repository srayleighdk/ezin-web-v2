import React, { Component } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import dayjs from "dayjs";
import ButtonEzin from "./Button";

export default function News({ news }) {
  return (
    <section className="news-area pt-100 pb-70">
      <div className="container">
        <div className="section-title text-40">
          {/* <span>Latest News</span> */}
          <h2 className="color-primary">
            Câu Chuyện <span>Eziner</span>{" "}
          </h2>
          {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsum fugit temporibus possimus itaque accusamus voluptatibus dignissimos nobis eaque.</p> */}
        </div>

        <div className="row">
          <Swiper
            spaceBetween={25}
            navigation={false}
            autoplay={{
              delay: 6500,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            modules={[Navigation, Autoplay]}
            className="testimonials-slide"
          >
            {news?.map((item) => (
              <SwiperSlide className="pt-2 newsSlider-item">
                <div className="single-news">
                  <div className="blog-img">
                    <Link href={`/tin-tuc/${item?.url}`}>
                      <a>
                        <img src={item?.img_hor} alt="Rectangle1" />
                      </a>
                    </Link>

                    <div className="dates">
                      <span style={{ fontFamily: "Inter" }}>
                        {dayjs(item?.publishedAt).format("DD-MM-YYYY")}
                      </span>
                    </div>
                  </div>

                  <div className="news-content-wrap text-start">
                    <ul>
                      <li>
                        <Link href="/news-grid">
                          <a
                            style={{ fontFamily: "Inter" }}
                            className="text-center"
                          >
                            <i className="flaticon-user"></i> Ezin
                          </a>
                        </Link>
                      </li>
                    </ul>

                    <Link href="/news-details">
                      <a className="text-center">
                        <h3
                          style={{ maxHeight: 52, overflow: "hidden" }}
                          className="text-dot-2"
                        >
                          {item?.title}
                        </h3>
                      </a>
                    </Link>

                    <p className="style-font-p eziner-news text-dot-3">
                      {item?.description}
                    </p>

                    <Link href={`/tin-tuc/${item?.url}`}>
                      <a className="read-more" style={{ fontFamily: "Inter" }}>
                        Đọc tiếp{" "}
                        <svg
                          style={{ height: "12px", width: "7px" }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="slider-btn d-flex justify-content-center">
            <ButtonEzin
              types="primary"
              onClick={() => router.push("/tin-tuc")}
              className=""
            >
              xem thêm
            </ButtonEzin>
          </div>
        </div>
      </div>
    </section>
  );
}
