import React, { Component } from "react";
import Link from "next/link";

class Footer extends Component {
  render() {
    let currentYear = new Date().getFullYear();
    return (
      <>
        <footer className="footer-top-area pt-100 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="single-widget">
                  <a href="/" className="logo">
                    <img src="/images/logo-2.png" alt="Image" />
                  </a>

                  <p>San sẻ rủi ro - hết cả âu lo.</p>

                  {/* <ul className="social-icon">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="bx bxl-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.pinterest.com/" target="_blank">
                        <i className="bx bxl-pinterest-alt"></i>
                      </a>
                    </li>
                  </ul> */}
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="single-widget">
                  <h3>Sản phẩm</h3>
                  <ul>
                    <li>
                      <Link href="/service-details">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Hạnh Phúc 365
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Bình An 365
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Bắt buộc TNDS Xe máy
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Bắt buộc TNDS Xe Ô tô
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          An Gia
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          EvaCare
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="single-widget">
                  <h3>Liên kết nhanh</h3>

                  <ul>
                    <li>
                      <Link href="/about-1">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Về chúng tôi
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Liên hệ
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Tin tức
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/team">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Kiến thức
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Công cụ giám định xe ô tô
                        </a>
                      </Link>
                    </li>
                    {/* <li>
                                            <Link href="/testimonials">
                                                <a>
                                                    <i className="right-icon bx bx-chevrons-right"></i>
                                                    Testimonials
                                                </a>
                                            </Link>
                                        </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="single-widget">
                  <h3>Quy định chính sách</h3>

                  <ul>
                    <li>
                      <Link href="/about-1">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Điều khoản dịch vụ
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Chính sách bảo mật
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Chính sách thanh toán
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/team">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Chính sách giao hàng
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          Chính sách đổi trả
                        </a>
                      </Link>
                    </li>
                    {/* <li>
                                            <Link href="/testimonials">
                                                <a>
                                                    <i className="right-icon bx bx-chevrons-right"></i>
                                                    Testimonials
                                                </a>
                                            </Link>
                                        </li> */}
                  </ul>
                </div>
              </div>

              {/* <div className="col-lg-3 col-md-6">
                                <div className="single-widget">
                                    <h3>Quy định và chính sách</h3>

                                    <ul className="information">
                                        <li className="address">
                                            <i className="flaticon-call"></i>
                                            <span>Phone</span>
                                            +882-569-756
                                        </li>

                                        <li className="address">
                                            <i className="flaticon-envelope"></i>
                                            <span>Email</span>
                                            hello@jumpx.com
                                        </li>

                                        <li className="address">
                                            <i className="flaticon-maps-and-flags"></i>
                                            <span>Address</span>
                                            123, Western Road, Melbourne Australia
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
            </div>

            <div className="row mt-4">
              <div className="col-lg-3 col-md-6 align-self-center">
                <div className="single-widget">
                  <p>CÔNG TY CỔ PHẦN EZIN VIỆT NAM</p>
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="single-widget">
                  <ul>
                    <li>
                      <Link href="/service-details">
                        <a>
                          Địa chỉ DKKD: Số 3/40, Thích Quảng Đức, P.3, Q.Phú
                          Nhuận, TP.HCM, Việt Nam
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>
                          Văn phòng: Toà nhà Petro Viet Nam, Số 1 Lê Duẩn, Bến
                          Nghé, Quận 1, TP.HCM, Việt Nam
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Mã số DN/MST: 0316570253</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Hotline: 028.999.66.333 / Zalo: 0909.088.313</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/service-details">
                        <a>Email: baohiem@ezin.vn</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="single-widget">
                  <h3>Kết nối với chúng tôi</h3>

                  <ul className="social-icon">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="bx bxl-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-shape">
            <img src="/images/shape/footer-shape-one.png" alt="Image" />
            <img src="/images/shape/footer-shape-two.png" alt="Image" />
          </div>
        </footer>

        {/* Footer Bottom Area   */}
        <footer className="footer-bottom-area">
          <div className="container">
            <div className="row align-items-center text-center">
              <div className="copy-right">
                <p>
                  Bản quyền thuộc về Công ty Cổ phần Ezin Việt Nam. Tất cả các
                  quyền được bảo hộ.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
