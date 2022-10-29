import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function CommunityEzin() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  //   useEffect(() => {
  //   }, [screenX]);

  return (
    <div className="brand-area bg-community py-3">
      <div className="container mb-5 text-white">
        <div className="section-title my-4 text-40">
          <h2 className="text-white">Cộng đồng Ezin</h2>
        </div>
        <div className="row">
          <div
            className={`col-lg-2 col-6 text-center position-relative ${
              !isMobile && "line-right"
            } d-flex flex-column flex-lg-column justify-content-around align-items-center`}
          >
            <p className={`${isMobile && "h-58"} comunity-title text-16 mb-0 w-xs-comunity`}>Số Eziner được bảo vệ</p>
            <p className={`${isMobile && "color-FFF2AB"} text-40 font-weight-700 comunity-number`}>7K</p>
          </div>
          <div
            className={`col-lg-2 col-6 text-center position-relative ${
              !isMobile && "line-right"
            } d-flex flex-column flex-lg-column justify-content-around align-items-center`}
          >
            <p className={`${isMobile && "h-58"} comunity-title text-16 mb-0 w-xs-comunity`}>Số EzCoin kiếm được</p>
            <p className={`${isMobile && "color-FFF2AB"} text-40 font-weight-700 comunity-number`}>100M</p>
          </div>
          <div
            className={`col-lg-2 col-6 text-center position-relative ${
              !isMobile && "line-right"
            } d-flex flex-column flex-lg-column justify-content-around align-items-center`}
          >
            <p className={`${isMobile && "h-58"} comunity-title text-16 mb-0 w-xs-comunity`}>Số Km an toàn</p>
            <p className={`${isMobile && "color-FFF2AB"} text-40 font-weight-700 comunity-number`}>200K</p>
          </div>
          <div
            className={`col-lg-2 col-6 text-center position-relative ${
              !isMobile && "line-right"
            } d-flex flex-column flex-lg-column justify-content-around align-items-center`}
          >
            <p className={`${isMobile && "h-58"} comunity-title text-16 mb-0 w-xs-comunity`}>Fan Facebook</p>
            <p className={`${isMobile && "color-FFF2AB"} text-40 font-weight-700 comunity-number`}>100K</p>
          </div>
          <div
            className={`col-lg-2 col-6 text-center position-relative ${
              !isMobile && "line-right"
            } d-flex flex-column flex-lg-column justify-content-around align-items-center`}
          >
            <p className={`${isMobile && "h-58"} comunity-title text-16 mb-0 w-xs-comunity`}>Số EzStore</p>
            <p className={`${isMobile && "color-FFF2AB"} text-40 font-weight-700 comunity-number`}>50</p>
          </div>
          <div
            className={`col-lg-2 col-6 text-center position-relative d-flex flex-column flex-lg-column justify-content-around align-items-center`}
          >
            <p className="text-16 mb-0 w-xs-comunity comunity-title">
              Số người nhận được quyền lợi BH
            </p>
            <p className={`${isMobile && "color-FFF2AB"} text-40 font-weight-700 comunity-number`}>13K</p>
          </div>
        </div>
      </div>
    </div>
  );
}
