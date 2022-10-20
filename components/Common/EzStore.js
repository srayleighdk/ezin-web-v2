import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import Link from "next/link";
import { getDistricts, getWards, getCities } from "../../pages/api";
import { getImageUrl } from "../../utils/helpers";

export default function EzStore({ topStores }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const getInitData = async () => {
    const [res1] = await Promise.all([getCities()]);
    setCities(
      res1?.data?.data?.map((e) => ({
        label: e.name_with_type,
        value: e.code,
        group: e.type,
      })),
    );
  };

  useEffect(() => {
    getInitData();
  }, []);

  const loadDistricts = async (value) => {
    const res = await getDistricts(value);
    setDistricts(
      res?.data?.data?.map((e, index) => ({ label: e.name_with_type, value: e.code, key: index })),
    );
  };

  const loadWards = async (value) => {
    const res = await getWards(value);
    setWards(
      res?.data?.data?.map((e) => ({ label: e.name_with_type, value: e.code })),
    );
  };

  return (
    <div className="ptb-100 position-relative" style={{ padding: "30px 0" }}>
      <div className="container mb-20 mt-20 rounded-3">
        <div className="section-title text-40" style={{ maxWidth: 700 }}>
          <h2>
            <span className=" color-primary">EzStore</span> bán bảo hiểm cực dễ
            dàng
          </h2>
        </div>
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-6">
            <select
              className="form-select w-75 w-xs-100 ms-auto"
              aria-label="Default select example"
              onClick={(e) => loadDistricts(e.target.value)}
            >
              <option selected>Chọn tỉnh/ thành phố</option>
              {cities?.map(item => (
                <option value={item.value} key={item._id}>{item.label}</option>
              ))}
            </select>
          </div>
          {/* <div className="col-lg-6">
            <select
              className="form-select w-75 w-xs-100 mt-xs-3 me-auto"
              aria-label="Default select example"
            >
              <option selected>Chọn chi nhánh</option>
              {districts?.map(item => (
                <option value={item.value} key={item._id}>{item.label}</option>
              ))}
            </select>
          </div> */}
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
          {topStores?.map((item) => (
            <SwiperSlide className="slider-news" key={item._id}>
              <div className="single-news">
                <div className="news-content-wrap" style={{ height: 382 }}>
                  <div className="blog-img mb-2 text-center" style={{ height: 100 }}>
                    <Link href="/news-details">
                      <a>
                        <img src={getImageUrl(item?.agency_id?.avatar?.path)} alt={`EzStore ${item?.district?.name ? item?.district?.name : ""}`} className="w-50" />
                      </a>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link href="/news-details">
                      <a>
                        <h3>EzStore {item?.district?.name}</h3>
                      </a>
                    </Link>
                  </div>

                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-call"></i>
                    </li>
                    <li>0987652718</li>
                  </ul>
                  <ul className="d-flex">
                    <li className="pe-1">
                      <i className="flaticon-maps-and-flags"></i>
                    </li>
                    <li style={{ height: 100 }}>{item?.ward?.path_with_type}</li>
                  </ul>

                  <Link href="/tra-cuu">
                    <a className="default-btn w-100 text-center">Liên hệ</a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
