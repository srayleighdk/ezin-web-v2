import React, { Component } from 'react';

class WhyChooseUs extends Component {
  render() {
    return (
      <section className="choose-ue-area" style={{ padding: "30px 0" }}>
        <div className="container">
          <div className="d-flex row align-items-center justify-content-between flex-column flex-sm-row flex-wrap">
            <div className="col-lg-3 col-sm-6 fluid position-relative d-flex align-items-center group-wrap py-3 justify-content-center rounded">
              <img src="/images/circle1.png" alt="circle" />
              <img src="/images/handshake.png" alt="circle" className="position-absolute group-icons" />
              <p className="font-weight-500 text-18 w-75 ms-3">Dành cho Doanh nghiệp.</p>
            </div>

            <div className="col-lg-3 col-sm-6 position-relative d-flex align-items-center group-wrap py-3 justify-content-center rounded">
              <img src="/images/circle2.png" alt="circle" />
              <img src="/images/subtract.png" alt="circle" className="position-absolute group-icons" />
              <p className="font-weight-500 text-18 w-75 ms-3">Thẻ bảo hiểm điện tử Ezin.</p>
            </div>

            <div className="col-lg-3 col-sm-6 position-relative d-flex align-items-center group-wrap py-3 justify-content-center rounded">
              <img src="/images/circle3.png" alt="circle" />
              <img src="/images/gift-voucher.png" alt="circle" className="position-absolute group-icons" />
              <p className="font-weight-500 text-18 w-75 ms-3">E-Voucher Ezin.</p>
            </div>

            <div className="col-lg-3 col-sm-6 position-relative d-flex align-items-center group-wrap py-3 justify-content-center rounded">
              <img src="/images/circle4.png" alt="circle" />
              <img src="/images/coupon.png" alt="circle" className="position-absolute group-icons" />
              <p className="font-weight-500 text-18 w-75 ms-3">Giảm giá combo.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default WhyChooseUs;
