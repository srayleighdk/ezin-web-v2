import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import Link from "next/link";

class HotDeals extends Component {
  render() {
    return (
      <div className="ptb-100 position-relative" style={{ padding: "30px 0" }}>
        <div className="container mb-20 mt-20 bg-deals rounded-3">
            <div className="row justify-content-between">
                <div className="col-lg-5 d-flex" >
                    <img src="/images/flash-deal.png" alt="flash deal" className="mt-3 mb-1 ms-3" />
                    <div className="d-flex flex-wrap ms-4 text-white">
                        <h4 className="w-100 mb-0 align-self-end text-white">Giờ vàng deal sốc</h4>
                        <div className="w-100 mb-0 me-3 mt-2 d-flex">Kết thúc trong <div className="ms-2 me-1 time-deal">01</div>:<div className="time-deal mx-1">30</div>:<div className="time-deal mx-1">09</div></div>
                    </div>
                </div>
                <div className="col-lg-7" >
                    <div className="row text-white h-100 align-items-center text-center">
                        <div className="col-lg-4 position-relative">
                            <p className="mb-0 text-18">Đang diễn ra</p>
                            <p className="text-20 line-footer">14:00 - 16:00</p>
                        </div>
                        <div className="col-lg-4 position-relative">
                            <p className="mb-0 text-18">Đang diễn ra</p>
                            <p className="text-20">14:00 - 16:00</p>
                        </div>
                        <div className="col-lg-4 position-relative">
                            <p className="mb-0 text-18">Đang diễn ra</p>
                            <p className="text-20">14:00 - 16:00</p>
                        </div>
                    </div>
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
            className="brand-slide text-left p-3"
          >
            <SwiperSlide className="slider-news">
              <div className="single-offer pl-30 pr-30 text-center rounded">
                <img
                  src="/images/product/product4.png"
                  alt="Image"
                  className="mx-auto"
                />
                <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                  <Link href="/service-details">
                    <a>Bắt buộc TNDS xe Ô tô</a>
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                  311.000đ
                </p>
                <p className="product-prize-old text-center">
                  345.000đ <a className="ml-3 text-dark">-10%</a>
                </p>
                <div class="progress position-relative" style={{ height: 20 }}>
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${(124 / 150) * 100}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <p className="position-absolute start-25 text-dark" style={{top: -3}}>
                    Đã bán 124/ 150
                  </p>
                </div>
                <img src="/images/FireDeals.png" alt="Fire Deals" className="hot-deal-icon" />
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-offer pl-30 pr-30 text-center rounded">
                <img
                  src="/images/product/product5.png"
                  alt="Image"
                  className="mx-auto"
                />
                <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                  <Link href="/service-details">
                    <a>An Gia</a>
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                  311.000đ
                </p>
                <p className="product-prize-old text-center">
                  345.000đ <a className="ml-3 text-dark">-10%</a>
                </p>
                <div class="progress position-relative" style={{ height: 20 }}>
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${(150 / 150) * 100}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <p className="position-absolute start-25 text-dark" style={{top: -3}}>
                    Đã bán 150/ 150
                  </p>
                </div>
                <img src="/images/FireDeals.png" alt="Fire Deals" className="hot-deal-icon" />
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-offer pl-30 pr-30 text-center rounded">
                <img
                  src="/images/product/product6.png"
                  alt="Image"
                  className="mx-auto"
                />
                <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                  <Link href="/service-details">
                    <a>Evacare</a>
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                  311.000đ
                </p>
                <p className="product-prize-old text-center">
                  345.000đ <a className="ml-3 text-dark">-10%</a>
                </p>
                <div class="progress position-relative" style={{ height: 20 }}>
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${(12 / 150) * 100}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <p className="position-absolute start-25 text-dark" style={{top: -3}}>
                    Đã bán 12/ 150
                  </p>
                </div>
                <img src="/images/FireDeals.png" alt="Fire Deals" className="hot-deal-icon" />
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-offer pl-30 pr-30 text-center rounded">
                <img
                  src="/images/product/product2.png"
                  alt="Image"
                  className="mx-auto"
                />
                <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                  <Link href="/service-details">
                    <a>Bình An 365</a>
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                  311.000đ
                </p>
                <p className="product-prize-old text-center">
                  345.000đ <a className="ml-3 text-dark">-10%</a>
                </p>
                <div class="progress position-relative" style={{ height: 20 }}>
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${(124 / 150) * 100}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <p className="position-absolute start-25 text-dark" style={{top: -3}}>
                    Đã bán 124/ 150
                  </p>
                </div>
                <img src="/images/FireDeals.png" alt="Fire Deals" className="hot-deal-icon" />
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-offer pl-30 pr-30 text-center rounded">
                <img
                  src="/images/product/product4.png"
                  alt="Image"
                  className="mx-auto"
                />
                <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                  <Link href="/service-details">
                    <a>Bắt buộc TNDS xe Ô tô</a>
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                  311.000đ
                </p>
                <p className="product-prize-old text-center">
                  345.000đ <a className="ml-3 text-dark">-10%</a>
                </p>
                <div class="progress position-relative" style={{ height: 20 }}>
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${(124 / 150) * 100}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <p className="position-absolute start-25 text-dark" style={{top: -3}}>
                    Đã bán 124/ 150
                  </p>
                </div>
                <img src="/images/FireDeals.png" alt="Fire Deals" className="hot-deal-icon" />
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-offer pl-30 pr-30 text-center rounded">
                <img
                  src="/images/product/product5.png"
                  alt="Image"
                  className="mx-auto"
                />
                <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                  <Link href="/service-details">
                    <a>An Gia</a>
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                  311.000đ
                </p>
                <p className="product-prize-old text-center">
                  345.000đ <a className="ml-3 text-dark">-10%</a>
                </p>
                <div class="progress position-relative" style={{ height: 20 }}>
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${(150 / 150) * 100}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <p className="position-absolute start-25 text-dark" style={{top: -3}}>
                    Đã bán 150/ 150
                  </p>
                </div>
                <img src="/images/FireDeals.png" alt="Fire Deals" className="hot-deal-icon" />
              </div>
            </SwiperSlide>

            <SwiperSlide className="slider-news">
              <div className="single-offer pl-30 pr-30 text-center rounded">
                <img
                  src="/images/product/product6.png"
                  alt="Image"
                  className="mx-auto"
                />
                <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                  <Link href="/service-details">
                    <a>Evacare</a>
                  </Link>
                </h3>
                <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                  311.000đ
                </p>
                <p className="product-prize-old text-center">
                  345.000đ <a className="ml-3 text-dark">-10%</a>
                </p>
                <div class="progress position-relative" style={{ height: 20 }}>
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${(12 / 150) * 100}%` }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                  <p className="position-absolute start-25 text-dark" style={{top: -3}}>
                    Đã bán 12/ 150
                  </p>
                </div>
                <img src="/images/FireDeals.png" alt="Fire Deals" className="hot-deal-icon" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    );
  }
}

export default HotDeals;
