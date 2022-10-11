import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import Link from "next/link";

class EzStore extends Component {
  render() {
    return (
      <div className="ptb-100 position-relative" style={{ padding: "30px 0" }}>
        <div className="container mb-20 mt-20 rounded-3">
          <div className="section-title text-40" style={{ maxWidth: 700 }}>
            <h2>
              <span className=" color-primary">EzStore</span> bán bảo
              hiểm cực dễ dàng
            </h2>
          </div>
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-6">
              <select class="form-select w-75 w-xs-100 ms-auto" aria-label="Default select example">
                <option selected>Chọn tỉnh/ thành phố</option>
                <option value="1">Hà Nội</option>
                <option value="2">Tp.Hồ Chí Minh</option>
                <option value="3">Đà Nẵng</option>
              </select>
            </div>
            <div className="col-lg-6">
              <select class="form-select w-75 w-xs-100 mt-xs-3 me-auto" aria-label="Default select example">
                <option selected>Chọn chi nhánh</option>
                <option value="1">Thủ Đức</option>
                <option value="2">Quận 1</option>
                <option value="3">Quận Phú Nhuận</option>
              </select>
            </div>
          </div>
          <Swiper
            spaceBetween={25}
            navigation={true}
            autoplay={{
              delay: 1000,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              // 992: {
              //     slidesPerView: 5,
              // },
            }}
            modules={[Navigation, Autoplay]}
            style={{ width: "90%" }}
            className="brand-slide text-left"
          >
            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore1.png" alt="ezstore1" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 1</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore2.png" alt="ezstore2" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 2</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore3.png" alt="ezstore3" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 3</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore4.png" alt="ezstore4" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Q.Gò Vấp</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore1.png" alt="ezstore1" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 1</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore2.png" alt="ezstore2" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 2</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore3.png" alt="ezstore3" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 3</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore4.png" alt="ezstore4" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Q.Gò Vấp</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          {/* <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore1.png" alt="Image" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 1</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore2.png" alt="Image" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 2</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore3.png" alt="Image" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận 3</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-news">
                <div className="news-content-wrap">
                  <div className="blog-img mb-2 text-center">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/ezstore4.png" alt="Image" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore Quận Gò Vấp</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i class="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li>124 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</li>
                  </ul>

                  <Link href="/services">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default EzStore;
