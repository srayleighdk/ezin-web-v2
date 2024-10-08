import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { useMediaQuery } from "react-responsive";

export default function NewsSlider({ newsPost }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <div className="header-newsSlider d-md-none fw-700 text-16 d-flex align-items-center text-white">
        Tin tức mới nhất
      </div>

      <div
        className={`brand-area-two ptb-100 position-relative ${
          !isMobile && "brand-area-two-web"
        }`}
        // className="brand-area-two ptb-100 position-relative mt-newsSlider"
        style={{ padding: "20px 0" }}
      >
        <img
          src="/images/brands/arrow.png"
          alt="News"
          className="home-brand-arrow d-none d-sm-block"
        />
        <h2 className="home-brand-title font-weight-700 text-white d-none d-sm-block">
          Tin tức mới nhất
        </h2>
        <div className="container">
          <Swiper
            spaceBetween={25}
            // navigation={true}
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
              // 920: {
              //     slidesPerView: 5,
              // },
            }}
            modules={[Navigation, Autoplay]}
            style={{ width: "90%" }}
            className="brand-slide text-left mr-0"
          >
            {newsPost.map((item) => (
              <SwiperSlide className="slider-news" key={item._id}>
                <a
                  href={`/life/p/${item.post_id}/${item.post.post_name}`}
                  target="_blank"
                  className="d-flex align-items-center"
                >
                  <img
                    src={item.post_thumbnail}
                    alt={item.post.post_name}
                    style={{ height: 62 }}
                  />
                  <p className="text-dot-2 h-62 lh-lg ml-12">
                    {item.post.post_title}
                  </p>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
