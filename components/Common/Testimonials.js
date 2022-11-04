import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { getImageUrl } from "../../utils/helpers.js";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import ButtonEzin from "./Button.js";

const Testimonials = ({ testimonials }) => {
  const [hidden, setHidden] = useState("");

  return (
    <section id="indemnify" className="brand-area ptb-100 pb-3">
      {hidden === "reviews" || hidden === "" ? (
      <div className="container">
        <div className="section-title">
          <h2 className="title">
            Dịch vụ <span>khách hàng 5 sao</span>{" "}
          </h2>
          <p>
            Chúng tôi đã dành ngân sách Marketing để chăm sóc bạn. Mỗi khách
            hàng trung thành là một đại sứ thương hiệu
          </p>
          <div className="d-flex justify-content-around px-3 ">
            <img src="/images/Union.png" alt="Union" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="Union" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="Union" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="Union" style={{ height: 60 }} />
            <img src="/images/Union.png" alt="Union" style={{ height: 60 }} />
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
          {testimonials?.content &&
            testimonials?.content?.map((testimonial) => {
              return (
                <SwiperSlide key={testimonial._id}>
                  <div
                    className="single-client text-dot-5 pt-5"
                    style={{ height: 240 }}
                  >
                    <i className="quotes flaticon-left-quotes-sign"></i>
                    {/* <img className='quotes' src="/images/Ellipse9.png" alt="" />
                                <p className='style-name'>Trần Thị Phương Thảo</p> */}
                    <p className="testimonial-description text-dot-5">
                      {testimonial.desc}
                    </p>

                    <ul>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                      <li>
                        <i className="bx bxs-star"></i>
                      </li>
                    </ul>

                    <div className="client-img">
                      <img
                        src={
                          testimonial.image
                            ? `${getImageUrl()}/${testimonial.image?.path}`
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRs20OhbD-VfH378DhoBDNTDhcMIYMWj5GurA&usqp=CAU"
                        }
                        alt={testimonial.name}
                      />
                      <h3 className="text-black">{testimonial.name}</h3>
                      {/* <span>Developer</span> */}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>)
      : null }
      {hidden === "reviews" || hidden === "" ? (
        <div className="d-flex ps-5 cursor-pointer justify-content-start mt-4">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-hidden"
            onClick={() => {
              setHidden("no-why");
              window.scroll({
                top: 2600,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <EyeInvisibleOutlined style={{ width: 24, marginRight: 6 }} />
            Ẩn phần này
          </div>
        </div>
      ) : (
        <div className="d-flex cursor-pointer justify-content-center">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-show"
            onClick={() => {
              setHidden("why");
            }}
          >
            <EyeOutlined style={{ width: 24, marginRight: 6 }} />
            Đánh giá khách hàng
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
