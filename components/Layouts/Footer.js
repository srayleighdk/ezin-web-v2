import React from "react";
import Link from "next/link";

const Footer = ({ product }) => {
  console.log("product footer", product);
  // let currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-top-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <a href="/" className="logo">
                  <img src="/images/logo-2.png" alt="logo-2" />
                </a>
                <p>Đi Bình An - Về Hạnh Phúc</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Sản phẩm</h3>
                <ul>
                  {product?.map((item) => (
                    <li key={item._id}>
                      <Link href={`/san-pham/${item.slug}#mua-ngay`}>
                        <a>
                          <i className="right-icon bx bx-chevrons-right"></i>
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Liên kết nhanh</h3>

                <ul>
                  <li>
                    <Link href="/gioi-thieu">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Về chúng tôi
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/lien-he">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Liên hệ
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tin-tuc">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Tin tức
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/kien-thuc">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Kiến thức
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/oto/demo">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Công cụ giám định xe ô tô
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Quy định chính sách</h3>

                <ul>
                  <li>
                    <Link href="/p/dieu-khoan">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Điều khoản dịch vụ
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/p/chinh-sach-bao-mat">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Chính sách bảo mật
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/p/chinh-sach-thanh-toan">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Chính sách thanh toán
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/p/chinh-sach-giao-hang">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Chính sách giao hàng
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/p/chinh-sach-doi-tra">
                      <a>
                        <i className="right-icon bx bx-chevrons-right"></i>
                        Chính sách đổi trả
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
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
                    <p>
                      Địa chỉ DKKD: Số 3/40, Thích Quảng Đức, P.3, Q.Phú Nhuận,
                      TP.HCM, Việt Nam
                    </p>
                  </li>
                  <li>
                    <p>
                      Văn phòng: Toà nhà Petro Viet Nam, Số 1 Lê Duẩn, Bến Nghé,
                      Quận 1, TP.HCM, Việt Nam
                    </p>
                  </li>
                  <li>
                    <p>Mã số DN/MST: 0316570253</p>
                  </li>
                  <li>
                    <p>
                      Hotline: <a
                        href="tel:0909088313"
                        style={{ paddingLeft: 0, paddingRight: 6 }}
                      >
                        0909.088.313
                      </a> / Zalo:{" "}
                      <a
                        href="https://zalo.me/0909.088.313"
                        style={{ paddingLeft: 6 }}
                      >
                        0909.088.313
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Email:
                      <a
                        href="mailto:baohiem@ezin.vn"
                        style={{ paddingLeft: 6 }}
                      >
                        baohiem@ezin.vn
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3>Kết nối với chúng tôi</h3>

                <ul className="social-icon">
                  <li>
                    <a
                      href="https://www.facebook.com/baohiemezin"
                      target="_blank"
                    >
                      <i className="bx bxl-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCAISrxMuHxjkTl3LqX1S2cQ"
                      target="_blank"
                    >
                      <i className="bx bxl-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-shape">
          <img
            src="/images/shape/footer-shape-one.png"
            alt="footer-shape-one"
          />
          <img
            src="/images/shape/footer-shape-two.png"
            alt="footer-shape-two"
          />
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
};

export default Footer;
