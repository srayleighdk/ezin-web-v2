import React, { Component } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

class CaseStudies extends Component {
  render() {
    return (
      <section
        className="case-area pb-100"
        style={{
          backgroundImage:
            "linear-gradient(248.66deg, #FFF1F1 0%, #E9F8FB 100%)",
        }}
      >
        <div className="container pt-5">
          <div className="section-title">
            <h2 style={{ color: "#167ffc" }}>
              Tiện ích <span>dành cho bạn</span>{" "}
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-3">
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
                    alt="Image"
                  />
                </div>

                <div className="py-4" style={{ textAlign: "center" }}>
                  <h3 className="h3-margin-bt">Kiến thức</h3>
                  <Link href="/services">
                    <a className="default-btn w-75 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3">
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
                    alt="Image"
                  />
                </div>

                <div className="py-4" style={{ textAlign: "center" }}>
                  <h3 className="h3-margin-bt">Kinh nghiệm</h3>
                  <Link href="/services">
                    <a className="default-btn w-75 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3">
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
                    alt="Image"
                  />
                </div>

                <div className="py-4" style={{ textAlign: "center" }}>
                  <h3 className="h3-margin-bt">Tư vấn đòi quyền lợi bảo hiểm</h3>
                  <Link href="/services">
                    <a className="default-btn w-75 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sx-3">
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
                    alt="Image"
                  />
                </div>

                <div className="py-4" style={{ textAlign: "center" }}>
                  <h3 className="h3-margin-bt">Quản lý bảo hiểm giùm bạn</h3>
                  <Link href="/services">
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
}

export default CaseStudies;
