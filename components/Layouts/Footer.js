import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllNodeProducts } from "../../pages/api";
import Script from "next/script";

const Footer = () => {
  const [product, setProduct] = useState();
  // let currentYear = new Date().getFullYear();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getAllNodeProducts();
      if (res?.data.success) {
        setProduct(res?.data?.data);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <footer className="footer-top-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-widget text-center">
                <a href="/" className="logo">
                  <img src="/images/logo-2.png" alt="logo-2" />
                </a>
                <p>Đi Bình An - Về Hạnh Phúc</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3 className="color-heading-footer">Sản phẩm</h3>
                <ul>
                  <div className="row">
                    {product?.map((item) => (
                      <div className="col-6">
                        <li key={item._id}>
                          <Link href={`/san-pham/${item.slug}#mua-ngay`}>
                            <a>
                              <i className="right-icon bx bx-chevrons-right"></i>
                              {item.name}
                            </a>
                          </Link>
                        </li>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3 className="color-heading-footer">Liên kết nhanh</h3>

                <ul>
                  <div className="row">
                    <div className="col-6">
                      <li>
                        <Link href="/gioi-thieu">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Về chúng tôi
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/lien-he">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Liên hệ
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/tin-tuc">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Tin tức
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/kien-thuc">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Kiến thức
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/oto/demo">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Công cụ giám định xe ô tô
                          </a>
                        </Link>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3 className="color-heading-footer">Quy định chính sách</h3>

                <ul>
                  <div className="row">
                    <div className="col-6">
                      <li>
                        <Link href="/p/dieu-khoan">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Điều khoản dịch vụ
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/p/chinh-sach-bao-mat">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Chính sách bảo mật
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/p/chinh-sach-thanh-toan">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Chính sách thanh toán
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/p/chinh-sach-giao-hang">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Chính sách giao hàng
                          </a>
                        </Link>
                      </li>
                    </div>
                    <div className="col-6">
                      <li>
                        <Link href="/p/chinh-sach-doi-tra">
                          <a>
                            <i className="right-icon bx bx-chevrons-right"></i>
                            Chính sách đổi trả
                          </a>
                        </Link>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-3 col-md-6 align-self-center">
              <div className="single-widget">
                <p className="text-20 fw-600">CÔNG TY CỔ PHẦN EZIN VIỆT NAM</p>
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
                    <div className="text-white">
                      Hotline:{" "}
                      <a
                        href="tel:0909088313"
                        style={{ paddingLeft: 0, paddingRight: 6 }}
                      >
                        0909.088.313
                      </a>{" "}
                      / Zalo:{" "}
                      <a
                        href="https://zalo.me/0909.088.313"
                        style={{ paddingLeft: 6 }}
                      >
                        0909.088.313
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="text-white">
                      Email:
                      <a
                        href="mailto:baohiem@ezin.vn"
                        style={{ paddingLeft: 6 }}
                      >
                        baohiem@ezin.vn
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-widget">
                <h3 className="color-heading-footer">Kết nối với chúng tôi</h3>
                <div className="d-flex align-items-center justify-content-between me-3">
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

                  <div className="social-logo mt-1">
                    <a
                      href="//www.dmca.com/Protection/Status.aspx?ID=0c630e8e-139a-4c78-baf7-5752454eb796"
                      title="DMCA.com Protection Status"
                      className="dmca-badge"
                    >
                      {" "}
                      <img
                        src="https://images.dmca.com/Badges/dmca_protected_16_120.png?ID=0c630e8e-139a-4c78-baf7-5752454eb796"
                        alt="DMCA.com Protection Status"
                      />
                    </a>
                    <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></Script>
                  </div>
                </div>
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
