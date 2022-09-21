import React, { Component } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

class NewsSlider extends Component {
    render() {
        return (
            <div className="brand-area-two ptb-100 position-relative" style={{padding: "30px 0"}}>
                <img src="/images/brands/arrow.png" alt="Image" className="home-brand-arrow" />
                <h4 className="home-brand-title font-weight-700 color-white">Tin tức mới nhất</h4>
                <div className="container mr-0">
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
                                <img src="/images/brands/news1.png" alt="Image" />
                                <p className="text-dot-2 h-56 ml-12">Bảo hiểm nhân thọ “trẻ hóa” đội ngũ đại lý</p>
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/brands/news2.png" alt="Image" />
                                <p className="text-dot-2 h-56 ml-12">Cơ hội trúng “xế” xịn Honda City Rs khi mua bảo hiểm tại PVcomBank</p>
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/brands/news3.png" alt="Image" />
                                <p className="text-dot-2 h-56 ml-12">Khó dự phòng bảo hiểm liên quan tới Covid</p>
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/brands/news4.png" alt="Image" />
                                <p className="text-dot-2 h-56 ml-12">Việc quan trọng cần làm sau khi mua bảo hiểm</p>
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/brands/news1.png" alt="Image" />
                                <p className="text-dot-2 h-56 ml-12">Bảo hiểm nhân thọ “trẻ hóa” đội ngũ đại lý</p>
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/brands/news2.png" alt="Image" />
                                <p className="text-dot-2 h-56 ml-12">Cơ hội trúng “xế” xịn Honda City Rs khi mua bảo hiểm tại PVcomBank</p>
                            </a>
                        </SwiperSlide>

                        <SwiperSlide className="slider-news">
                            <a href="#" target="_blank" className="d-flex align-items-center">
                                <img src="/images/brands/news3.png" alt="Image" />
                                <p className="text-dot-2 h-56 ml-12">Khó dự phòng bảo hiểm liên quan tới Covid</p>
                            </a>
                        </SwiperSlide>
                    </Swiper> 
                </div>
            </div>
        );
    }
}

export default NewsSlider;