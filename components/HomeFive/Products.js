import React, { Component } from 'react';
import Link from 'next/link';

class Products extends Component {
    render() {
        return (
            <section className="offer-area pt-100 pb-70">
			    <div className="container">
                    <div className="section-title">
                        <h2>Sản phẩm <a className="color-primary">Ezin</a></h2>
                        <p>Ezin liên kết cùng các Công ty Bảo hiểm hàng đầu Việt Nam để cung cấp đến cho bạn các sản phẩm bảo hiểm chất lượng, phù hợp với nhu cầu của bạn.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-offer pl-30 pr-30 text-center">
                                <img src="/images/product/product1.png" alt="Image" className="mx-auto" />
                                <h3 className="mt-3">
                                    <Link href="/service-details">
                                        <a>Hạnh Phúc 365</a>
                                    </Link>
                                </h3>
                                <p className="mb-0">Giảm tới 20% phí bảo hiểm mỗi năm.</p>
                                <p className="mb-0">Hoàn toàn tự động với Trí tuệ nhân tạo.</p>
                                <p className="mb-0">Phần thưởng lớn với Ezcoin.</p>
                                <div className="d-flex my-3">
                                    <div className="w-50 text-start">
                                        <p className="mb-0 text-danger font-weight-700 product-prize lh-1" >311.000đ</p>
                                        <p className="product-prize-old">345.000đ <a className="ml-3 text-dark">-10%</a></p>
                                    </div>
                                    <p className="product-coin font-weight-700 w-50">150.000 <img src="/images/coin.png" alt="Image" /></p>
                                </div>
                                <Link href="/about-1">
                                    <a className="default-btn w-100 rounded-pill">
                                        Mua ngay
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-offer pl-30 pr-30 text-center">
                                <img src="/images/product/product2.png" alt="Image" className="mx-auto" />
                                <h3 className="mt-3">
                                    <Link href="/service-details">
                                        <a>Bình An 365</a>
                                    </Link>
                                </h3>
                                <p className="mb-0">Việt Nam đứng đầu Đông Nam Á về tỉ lệ thiệt mạng do tai nạn giao thông với 24.970 người năm 2018.</p>
                                <div className="d-flex my-3">
                                    <div className="w-50 text-start">
                                        <p className="mb-0 text-danger font-weight-700 product-prize lh-1">500.000đ</p>
                                        <p className="product-prize-old">600.000đ <a className="ml-3 text-dark">-10%</a></p>
                                    </div>
                                    <p className="product-coin font-weight-700 w-50">250.000 <img src="/images/coin.png" alt="Image" /></p>
                                </div>
                                <Link href="/about-1">
                                    <a className="default-btn w-100 rounded-pill">
                                        Mua ngay
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-offer pl-30 pr-30 text-center">
                                <img src="/images/product/product3.png" alt="Image" className="mx-auto" />
                                <h3 className="mt-3">
                                    <Link href="/service-details">
                                        <a>Bắt buộc TNDS Xe Máy</a>
                                    </Link>
                                </h3>
                                <p className="mb-0 text-dot-3 product-decription">Theo Nghị định 03/2021/NĐ-CP của Chính phủ, mọi chủ xe cần phải tham gia bảo hiểm Trách nhiệm dân sự khi tham gia giao thông.</p>
                                <div className="d-flex my-3">
                                    <div className="w-50 text-start">
                                        <p className="mb-0 text-danger font-weight-700 product-prize lh-1">61.000đ</p>
                                        <p className="product-prize-old">132.000đ <a className="ml-3 text-dark">-50%</a></p>
                                    </div>
                                    <p className="product-coin font-weight-700 w-50">40.000 <img src="/images/coin.png" alt="Image" /></p>
                                </div>
                                <Link href="/about-1">
                                    <a className="default-btn w-100 rounded-pill">
                                        Mua ngay
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-offer pl-30 pr-30 text-center">
                                <img src="/images/product/product4.png" alt="Image" className="mx-auto" />
                                <h3 className="mt-3">
                                    <Link href="/service-details">
                                        <a>Bắt buộc TNDS xe Ô tô</a>
                                    </Link>
                                </h3>
                                <p className="mb-0 text-dot-3 product-decription">Theo Nghị định 03/2021/NĐ-CP của Chính phủ, mọi chủ xe cần phải tham gia bảo hiểm Trách nhiệm dân sự khi tham gia giao thông.</p>
                                <div className="d-flex my-3">
                                    <div className="w-50 text-start">
                                        <p className="mb-0 text-danger font-weight-700 product-prize lh-1">1.526.000đ</p>
                                        <p className="product-prize-old">1.826.000đ <a className="ml-3 text-dark">-30%</a></p>
                                    </div>
                                    <p className="product-coin font-weight-700 w-50">150.000 <img src="/images/coin.png" alt="Image" /></p>
                                </div>
                                <Link href="/about-1">
                                    <a className="default-btn w-100 rounded-pill">
                                        Mua ngay
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-offer pl-30 pr-30 text-center">
                                <img src="/images/product/product5.png" alt="Image" className="mx-auto" />
                                <h3 className="mt-3">
                                    <Link href="/service-details">
                                        <a>An Gia</a>
                                    </Link>
                                </h3>
                                <p className="mb-0">Nhà là tổ ấm và là một trong những tài sản lớn nhất của bạn. Hãy bảo vệ ngôi nhà của bạn một cách hợp lý nhất.</p>
                                <div className="d-flex my-3">
                                    <div className="w-50 text-start">
                                        <p className="mb-0 text-danger font-weight-700 product-prize lh-1">1.350.000đ</p>
                                        <p className="product-prize-old">1.375.000đ <a className="ml-3 text-dark">-10%</a></p>
                                    </div>
                                    <p className="product-coin font-weight-700 w-50">250.000 <img src="/images/coin.png" alt="Image" /></p>
                                </div>
                                <Link href="/about-1">
                                    <a className="default-btn w-100 rounded-pill">
                                        Mua ngay
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-offer pl-30 pr-30 text-center">
                                <img src="/images/product/product6.png" alt="Image" className="mx-auto" />
                                <h3 className="mt-3">
                                    <Link href="/service-details">
                                        <a>Evacare</a>
                                    </Link>
                                </h3>
                                <p className="mb-0">Theo thống kê của WHO, năm 2018, Việt Nam có khoảng 15.000 ca mắc ung thư vú và hơn 4.000 ca mắc ung thư cổ tử cung.</p>
                                <div className="d-flex my-3">
                                    <div className="w-50 text-start">
                                        <p className="mb-0 text-danger font-weight-700 product-prize lh-1">680.000đ</p>
                                        <p className="product-prize-old">1.280.000đ <a className="ml-3 text-dark">-50%</a></p>
                                    </div>
                                    <p className="product-coin font-weight-700 w-50">40.000 <img src="/images/coin.png" alt="Image" /></p>
                                </div>
                                <Link href="/about-1">
                                    <a className="default-btn w-100 rounded-pill">
                                        Mua ngay
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shape Images */}
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
}

export default Products;