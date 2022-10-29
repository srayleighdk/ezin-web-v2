import React, { Component } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { useMediaQuery } from "react-responsive";

export default function CaseStudies() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <section
      className="case-area pb-100"
      style={{
        backgroundImage: "linear-gradient(248.66deg, #FFF1F1 0%, #E9F8FB 100%)",
      }}
    >
      <div className="container pt-5">
        <div className="section-title">
          <h2 style={{ color: "#167ffc" }}>
            Tiện ích <span>dành cho bạn</span>{" "}
          </h2>
        </div>

        <div className="row">
          <div className={`col-lg-3 col-md-3`}>
            <div
              className="single-news"
              style={{
                boxShadow: "0px 5px 20px rgb(14 30 62 / 10%)",
                borderRadius: "10px",
                background: "#ffffff",
              }}
            >
              <div>
                <img
                  className="img-center"
                  src="/images/tien-ich-svg/Group.png"
                  alt="Group"
                />
              </div>

              <div className="py-4 d-flex flex-column align-items-center">
                <h3 className={`studies-title text-center ${!isMobile && "studies-wrap"}`}>Kiến thức</h3>
                <Link href="/tra-cuu">
                  <a className="default-btn w-75 text-center">Liên hệ</a>
                </Link>
              </div>
            </div>
          </div>

          <div className={`col-lg-3 col-md-3`}>
            <div
              className="single-news"
              style={{
                boxShadow: "0px 5px 20px rgb(14 30 62 / 10%)",
                borderRadius: "10px",
                background: "#ffffff",
              }}
            >
              <div>
                <img
                  className="img-center"
                  src="/images/tien-ich-svg/give-love.png"
                  alt="give-love"
                />
              </div>

              <div className="py-4 d-flex flex-column align-items-center">
                <h3 className={`studies-title text-center ${!isMobile && "studies-wrap"}`}>Kinh nghiệm</h3>
                <Link href="/tra-cuu">
                  <a className="default-btn w-75 text-center">Liên hệ</a>
                </Link>
              </div>
            </div>
          </div>

          <div className={`col-lg-3 col-md-3`}>
            <div
              className="single-news"
              style={{
                boxShadow: "0px 5px 20px rgb(14 30 62 / 10%)",
                borderRadius: "10px",
                background: "#ffffff",
              }}
            >
              <div>
                <img
                  className="img-center"
                  src="/images/tien-ich-svg/Frame3210.png"
                  alt="Frame3210"
                />
              </div>

              <div className="py-4 d-flex flex-column align-items-center">
                <h3 className={`studies-title text-center ${!isMobile && "studies-wrap"}`}>
                  Tư vấn đòi quyền lợi bảo hiểm
                </h3>
                <Link href="/tra-cuu">
                  <a className="default-btn w-75 text-center">Liên hệ</a>
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`col-lg-3 col-md-3 ${
              !isMobile && "studies-wrap"
            } col-sx-3`}
          >
            <div
              className="single-news"
              style={{
                boxShadow: "0px 5px 20px rgb(14 30 62 / 10%)",
                borderRadius: "10px",
                background: "#ffffff",
              }}
            >
              <div>
                <img
                  className="img-center"
                  src="/images/tien-ich-svg/Frame13210.png"
                  alt="Frame13210"
                />
              </div>

              <div className="py-4 d-flex flex-column align-items-center">
                <h3 className={`studies-title text-center ${!isMobile && "studies-wrap"}`}>
                  Quản lý bảo hiểm giùm bạn
                </h3>
                <Link href="/tra-cuu">
                  <a className="default-btn w-75 text-center">Liên hệ</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
