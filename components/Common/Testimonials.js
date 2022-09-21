import React, { Component } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

class Testimonials extends Component {
    render() {
        return (
            <section className="offer-area ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2 style={{color: '#167ffc'}}>Dịch vụ <span>khách hàng 5 sao</span> </h2>
                        <p >Chúng tôi đã dành ngân sách Marketing để chăm sóc bạn. Mỗi khách hàng trung thành là một đại sứ thương hiệu</p>
                        <div className='d-flex justify-content-around px-3 '>
                            <img src="/images/Union.png" alt="" style={{height: 60}}/>
                            <img src="/images/Union.png" alt="" style={{height: 60}}/>
                            <img src="/images/Union.png" alt="" style={{height: 60}}/>
                            <img src="/images/Union.png" alt="" style={{height: 60}}/>
                            <img src="/images/Union.png" alt="" style={{height: 60}}/>
                        </div>
                    </div>

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
                        <SwiperSlide>
                            <div className="single-client text-dot-5 pt-5" style={{height: 240}}>
                                <i className="quotes flaticon-left-quotes-sign"></i>
                                {/* <img className='quotes' src="/images/Ellipse9.png" alt="" />
                                <p className='style-name'>Trần Thị Phương Thảo</p> */}
                                <p>“ Always disappointed in how much insurance will fight against customer in a claim. Just had my first good experience with filing. Unbelievably quick and solid customer experience with”</p>

                                <ul>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                </ul>

                                <div className="client-img">
                                    <img src="/images/Ellipse9.png" alt="Image" />
                                    <h3>Trần Thị Phương Thảo</h3>
                                    {/* <span>Developer</span> */}
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="single-client text-dot-5 pt-5" style={{height: 240}}>
                                <i className="quotes flaticon-left-quotes-sign"></i>
                                {/* <img className='quotes' src="/images/Ellipse9.png" alt="" />
                                <p className='style-name'>Trần Thị Phương Thảo</p> */}
                                <p>“ I just bought home insurance from you and I’m pretty sure it was easier than ordering pizza. Awesome job on the experience.”</p>
                            
                                <ul>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                </ul>

                                <div className="client-img">
                                    <img src="/images/Ellipse1.png" alt="Image" />
                                    <h3>Lê Thị Mai</h3>
                                    {/* <span>CEO</span> */}
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="single-client text-dot-5 pt-5" style={{height: 240}}>
                                <i className="quotes flaticon-left-quotes-sign"></i>
                                {/* <img className='quotes' src="/images/Ellipse9.png" alt="" />
                                <p className='style-name'>Trần Thị Phương Thảo</p> */}
                                <p>“ Once every 2-3 years, I stumble across a truly outstanding app / business which nails everything. UX, pricing, customer service “ </p>
                                
                                <ul>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                </ul>

                                <div className="client-img">
                                    <img src="/images/Ellipse2.png" alt="Image" />
                                    <h3>Thế Nguyễn</h3>
                                    {/* <span>Designer</span> */}
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="single-client text-dot-5 pt-5" style={{height: 240}}>
                                <i className="quotes flaticon-left-quotes-sign"></i>
                                {/* <img className='quotes' src="/images/Ellipse9.png" alt="" />
                                <p className='style-name'>Trần Thị Phương Thảo</p> */}
                                <p>“ Always disappointed in how much insurance will fight against customer in a claim. Just had my first good experience with filing. Unbelievably quick and solid customer experience with”</p>
                            
                                <ul>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                    <li><i className="bx bxs-star"></i></li>
                                </ul>

                                <div className="client-img">
                                    <img src="/images/Ellipse3.png" alt="Image" />
                                    <h3>Mạnh Cường</h3>
                                    {/* <span>Developer</span> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
                <div className="offer-shape">
                    <img src="/images/shape/services-shape/1.png" alt="Image" />
                    <img src="/images/shape/services-shape/2.png" alt="Image" />
                    <img src="/images/shape/services-shape/3.png" alt="Image" />
                    <img src="/images/shape/services-shape/4.png" alt="Image" />
                    <img src="/images/shape/services-shape/5.png" alt="Image" />
                    <img src="/images/shape/services-shape/6.png" alt="Image" />
                </div>
            </section>
        );
    }
}

export default Testimonials;