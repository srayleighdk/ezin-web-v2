import React, { Component } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { getImageUrl } from "../../utils/helpers.js"

const Testimonials = ({ testimonials }) => {
  console.log('testimonials', testimonials)
  return (
    <section className="offer-area ptb-100">
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: '#167ffc' }}>Dịch vụ <span>khách hàng 5 sao</span> </h2>
          <p >Chúng tôi đã dành ngân sách Marketing để chăm sóc bạn. Mỗi khách hàng trung thành là một đại sứ thương hiệu</p>
          <div className='d-flex justify-content-around px-3 '>
            <img src="/images/Union.png" alt="" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="" style={{ height: 60 }} />
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
          {testimonials?.content && testimonials?.content?.map((testimonial) => {
            return (
              <SwiperSlide key={testimonial._id}>
                <div className="single-client text-dot-5 pt-5" style={{ height: 240 }}>
                  <i className="quotes flaticon-left-quotes-sign"></i>
                  {/* <img className='quotes' src="/images/Ellipse9.png" alt="" />
                                <p className='style-name'>Trần Thị Phương Thảo</p> */}
                  <p>{testimonial.desc}</p>

                  <ul>
                    <li><i className="bx bxs-star"></i></li>
                    <li><i className="bx bxs-star"></i></li>
                    <li><i className="bx bxs-star"></i></li>
                    <li><i className="bx bxs-star"></i></li>
                    <li><i className="bx bxs-star"></i></li>
                  </ul>

                  <div className="client-img">
                    <img src={testimonial.image ? `${getImageUrl()}/${testimonial.image?.path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRs20OhbD-VfH378DhoBDNTDhcMIYMWj5GurA&usqp=CAU'
                    } alt="Image" />
                    <h3 className='text-black'>{testimonial.name}</h3>
                    {/* <span>Developer</span> */}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}

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

export default Testimonials;
