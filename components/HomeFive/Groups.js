import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";

export default function WhyChooseUs() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <section className="choose-ue-area" style={{ padding: "30px 0" }}>
      <div className="mx-2">
        <div className="container">
          <div className="d-flex row align-items-center justify-content-between flex-sm-row flex-wrap">
            <div
              className="col-lg-3 col-sm-6 col-6 h-group my-2 fluid d-flex text-center px-0 justify-content-between rounded"
            >
              <div className={`m-2 ${isMobile ? "flex-column pt-3" : "flex-row py-3 ps-3 pe-2"} w-100 group-wrap align-items-center`}>
                <div className="position-relative">
                  <img src="/images/circle1.png" alt="circle" />
                  <img
                    src="/images/handshake.png"
                    alt="handshake"
                    className="position-absolute group-icons"
                  />
                </div>
                <p className="group-title font-weight-500 text-18 w-75 ms-2 h-100 d-flex align-items-center">
                  Doanh nghiệp.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-6 h-group my-2 d-flex text-center px-0 justify-content-between rounded">
              <div className={`m-2 ${isMobile ? "flex-column pt-3" : "flex-row py-3 ps-3 pe-2"} w-100 group-wrap align-items-center`}>
                <div className="position-relative">
                  <img src="/images/circle2.png" alt="circle" />
                  <img
                    src="/images/subtract.png"
                    alt="subtract"
                    className="position-absolute group-icons"
                  />
                </div>
                <p className="group-title font-weight-500 text-18 w-75 ms-2 h-100 d-flex align-items-center">
                  Thẻ bảo hiểm điện tử Ezin.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-6 h-group my-2 position-relative d-flex text-center px-0 justify-content-between rounded">
              <div className={`m-2 ${isMobile ? "flex-column pt-3" : "flex-row py-3 ps-3 pe-2"} w-100 group-wrap align-items-center`}>
                <div className="position-relative">
                  <img src="/images/circle3.png" alt="circle" />
                  <img
                    src="/images/gift-voucher.png"
                    alt="gift-voucher"
                    className="position-absolute group-icons"
                  />
                </div>
                <p className="group-title font-weight-500 text-18 w-75 ms-2 h-100 d-flex align-items-center">
                  E-Voucher Ezin.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-6 h-group my-2 position-relative d-flex text-center px-0 justify-content-between rounded">
              <div className={`m-2 ${isMobile ? "flex-column pt-3" : "flex-row py-3 ps-3 pe-2"} w-100 group-wrap align-items-center`}>
                <div className="position-relative">
                  <img src="/images/circle4.png" alt="circle" />
                  <img
                    src="/images/coupon.png"
                    alt="coupon"
                    className="position-absolute group-icons"
                  />
                </div>
                <p className="group-title font-weight-500 text-18 w-75 ms-2 h-100 d-flex align-items-center">
                  Giảm giá combo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
