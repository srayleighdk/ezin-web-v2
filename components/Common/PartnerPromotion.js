import React, { Component } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

class PromotionSlider extends Component {
    render() {
        return (
            <div className="ptb-100 position-relative" style={{padding: "30px 0"}}>
                {/* <img src="/images/brands/arrow.png" alt="Image" className="home-brand-arrow" />
                <h4 className="home-brand-title font-weight-700 color-white">Tin tức mới nhất</h4> */}
                <div className="container mb-20 mt-20">
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
                        style={{width: "90%"}}
                        className="brand-slide text-left"
                    >
                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/promotion/promotion1.png" alt="Image" />
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/promotion/promotion2.png" alt="Image" />
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/promotion/promotion3.png" alt="Image" />
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/promotion/promotion1.png" alt="Image" />
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/promotion/promotion2.png" alt="Image" />
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/promotion/promotion3.png" alt="Image" />
                            </a>
                        </SwiperSlide>
                    </Swiper> 
                </div>
            </div>
        );
    }
}

export default PromotionSlider;