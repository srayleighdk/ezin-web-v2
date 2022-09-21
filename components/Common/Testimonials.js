import React, { Component } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

class Testimonials extends Component {
    render() {
        return (
            <section className="client-area ptb-100">
                <div className="container">
                    {/* <div className="section-title">
                        <span>Testimonials</span>
                        <h2>What Clients Say About Us</h2>
                    </div> */}

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
                            <div className="single-client">
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
                            <div className="single-client">
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
                            <div className="single-client">
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
                            <div className="single-client">
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
            </section>
        );
    }
}

export default Testimonials;