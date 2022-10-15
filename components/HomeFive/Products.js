import React, { Component } from 'react';
import Link from 'next/link';
import { formatVND } from '../../utils/helpers.js';
const Products = ({ allNodeProducts }) => {
  console.log("allNodeProducts", allNodeProducts)
  return (
    <section className="offer-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <h2>Sản phẩm <a className="color-primary">Ezin</a></h2>
          <p>Ezin liên kết cùng các Công ty Bảo hiểm hàng đầu Việt Nam để cung cấp đến cho bạn các sản phẩm bảo hiểm chất lượng, phù hợp với nhu cầu của bạn.</p>
        </div>

        <div className="row">
          {allNodeProducts.map((product) => {
            return (
              <div className="col-lg-4 col-sm-6" key={product._id}>
                <div className="single-offer pl-30 pr-30 text-center">
                  <img src={product.thumbnail} alt={product.name} className="mx-auto" />
                  <h3 className="mt-3">
                    <Link href={`san-pham/${product.slug}#mua-ngay`}>
                      <a>{product.name}</a>
                    </Link>
                  </h3>
                  <p className='mb-0 product-decription text-dot-3'>{product.intro}</p>
                  <div className="d-flex my-3">
                    <div className="w-50 text-start">
                      <p className="mb-0 text-danger font-weight-700 product-prize lh-1" >{formatVND(product.min_fee)}</p>
                      <p className="product-prize-old">{formatVND(product.max_fee)} <a className="ml-3 text-dark">-{Math.round((product.max_fee - product.min_fee) / product.max_fee * 100)}%</a></p>
                    </div>
                    <p className="product-coin font-weight-700 w-50">150.000 <img src="/images/coin.png" alt="Coin" /></p>
                  </div>
                  <Link href={`san-pham/${product.slug}#mua-ngay`}>
                    <a className="default-btn w-100 rounded-pill">
                      Mua ngay
                    </a>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Shape Images */}
      <div className="offer-shape">
        <img src="/images/shape/services-shape/1.png" alt="services-shape1" />
        <img src="/images/shape/services-shape/2.png" alt="services-shape2" />
        <img src="/images/shape/services-shape/3.png" alt="services-shape3" />
        <img src="/images/shape/services-shape/4.png" alt="services-shape4" />
        <img src="/images/shape/services-shape/5.png" alt="services-shape5" />
        <img src="/images/shape/services-shape/6.png" alt="services-shape6" />
      </div>
    </section>
  );

}

export default Products;
