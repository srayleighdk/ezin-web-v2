import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import moment from "moment";
import Link from "next/link";
import { Statistic } from "antd";
const { Countdown } = Statistic;
import { formatVND } from "../../utils/helpers";

const HotDeals = ({ allNodeProducts }) => {
  const [hotDealsKey, setHotDealsKey] = useState(1);
  const deadline = moment() + 1000 * 60 * 60 * 24 * 5 + 1000 * 59;
  const hotDeals = [
    { key: 1, time: "14:00 - 16:00" },
    { key: 2, time: "17:00 - 18:00" },
    { key: 3, time: "21:00 - 22:00" },
    { key: 4, time: "01:00 - 02:00" },
    { key: 5, time: "05:00 - 07:00" },
  ];
  console.log("moment1", deadline)

  const finish = () => {};

  const onChange = (val) => {
    if (4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!', val);
    }
  };
  return (
    <div className="ptb-100 position-relative" style={{ padding: "30px 0" }}>
      <div className="container mb-20 mt-20 bg-deals rounded-3">
        <div className="row justify-content-between">
          <div className="col-lg-5 col-12 d-flex justify-content-center mt-4">
            <img
              src="/images/flash-deal.png"
              alt="flash deal"
              className="mt-3 mb-1 ms-3"
              style={{ width: 70 }}
            />
            <div className="d-flex flex-wrap ms-4 text-white">
              <h2 className="w-100 mb-0 align-self-end text-white fw-700">
                Giờ vàng deal sốc
              </h2>
              <div className="w-100 mb-0 d-flex align-items-center">
                Kết thúc trong{" "}
                <div className="ms-2 me-1 time-deal">
                  <Countdown
                    value={deadline}
                    format="HH"
                    onFinish={finish}
                    className="text-white"
                  />
                </div>
                :<div className="time-deal mx-1">30</div>:
                <div className="time-deal mx-1">09</div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-7 col-12" >
            <div className="row text-white h-100 align-items-center text-center">
              <div className="col-lg-4 col-4 position-relative">
                <p className="mb-0 text-18">Đang diễn ra</p>
                <p className="text-20 text-xm-18 line-footer">14:00 - 16:00</p>
              </div>
            </div>
          </div> */}
          <Countdown
            title="Countdown"
            value={deadline}
            format="HH"
            onFinish={finish}
          />
          <Countdown
            title="Countdown"
            value={deadline}
            format="HH:mm"
            onFinish={finish}
          />
          <Countdown
            title="Countdown"
            value={deadline}
            format="ss"
            onFinish={finish}
          />
          <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={onChange} />
          <div className="col-lg-7 col-12 d-flex justify-content-center align-items-center">
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
              {hotDeals.map((item) => (
                <SwiperSlide key={item.key} className="pt-2 text-center">
                  <button
                    className="position-relative text-center"
                    onClick={() => setHotDealsKey(item.key)}
                  >
                    <p className="mb-0 text-18">Đang diễn ra</p>
                    <p
                      className={`text-20 text-xm-18 ${
                        hotDealsKey === item.key && "line-footer"
                      }`}
                    >
                      {item.time}
                    </p>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
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
          {allNodeProducts.map((product) => {
            return (
              <SwiperSlide className="slider-news" key={product._id}>
                <div className="single-offer pl-30 pr-30 text-center rounded">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="mx-auto"
                  />
                  <h3 className="mt-3 mb-0 h-56 d-flex justify-content-center align-items-center">
                    <Link href="/service-details">
                      <a>{product.name}</a>
                    </Link>
                  </h3>
                  <p className="mb-0 mt-2 text-danger font-weight-700 product-prize lh-1">
                    311.000đ
                  </p>
                  <p className="product-prize-old text-center">
                    {formatVND(product.min_fee)}{" "}
                    <a className="ml-3 text-dark">-10%</a>
                  </p>
                  <div
                    className="progress position-relative"
                    style={{ height: 20 }}
                  >
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${(124 / 150) * 100}%` }}
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <p
                      className="position-absolute start-25 text-dark"
                      style={{ top: -3 }}
                    >
                      Đã bán 124/ 150
                    </p>
                  </div>
                  <img
                    src="/images/FireDeals.png"
                    alt="Fire Deals"
                    className="hot-deal-icon"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default HotDeals;
