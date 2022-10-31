import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { Modal, Checkbox } from "antd";
import { useRouter } from "next/router";
import ButtonEzin from "../Common/Button";
import { useMediaQuery } from "react-responsive";
// import BgBannerHeader from "../../public/images/bg-banner-header.png";

export default function MainBanner() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const router = useRouter();
  const [visibleAudio, setVisibleAudio] = useState(false);

  return (
    <section className="slider-area pb-0">
      {/* <div
        className="jumpx-slider-item vh-100"
        style={{
          backgroundImage: `url(/images/bg-banner-header.png)`,
          minHeight: "100vh",
        }}
      > */}
      <div className="text-center mt-40 pt-sm-1">
        <div className="jumpx-slider-text overflow-hidden one mx-auto homepage-no-maxWidth">
          {/* <span>IT & AI Services</span> */}
          <h1 className="text-black mb-0 px-ms-3 banner-header">
            Trải nghiệm cuộc sống tuyệt vời
          </h1>
          <p className="banner-maxim text-center px-ms-4 mb-3">
            " Những hy sinh của ngày hôm nay sẽ được đền đáp vào ngày mai. "
          </p>
        </div>
      </div>
      <div
        className="jumpx-slider-item mt-ms-80"
        style={{
          backgroundImage: `url(/images/banner-home.png)`,
          width: "100vw",
        }}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div
              className={`slider-btn position-absolute d-flex justify-content-center w-100 d-sm-flex ${isMobile ? "flex-column" : "flex-row group-btn"} px-ms-3`}
            >
              <ButtonEzin
                className={`mx-3 ${!isMobile && "w-25"} btn-buy-banner text-center shadow align-self-center`}
                onClick={() => router.push("/#san-pham")}
                types="primary"
              >
                Mua bảo hiểm ngay
              </ButtonEzin>

              <ButtonEzin
                className="btn-video-banner d-flex justify-content-center align-items-center text-center align-self-center"
                onClick={() => setVisibleAudio(true)}
                types="default"
              >
                <div className="playVideo rounded-circle position-relative me-3">
                  <div className="playIcon"></div>
                </div>
                <div className="view-video">Xem video</div>
              </ButtonEzin>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Giới thiệu về Ezin"
        visible={visibleAudio}
        onOk={() => setVisibleAudio(false)}
        onCancel={() => setVisibleAudio(false)}
        okText="Đồng ý"
        cancelText="Đóng"
        closable={true}
      >
        <div
          style={{
            height: "auto",
            overflow: "auto",
            border: "2px solid #E5E7EB",
            borderRadius: "10px",
            wordWrap: "break-word",
            padding: "10px",
            textAlign: "justify",
            fontSize: "12px",
          }}
        >
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/6Bz_kMgu3fA?autoplay=1"
            title="Quy tắc bảo hiểm"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
      {/* </div> */}
    </section>
  );
}
