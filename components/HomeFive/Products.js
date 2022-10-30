import React, { Component } from "react";
import Link from "next/link";
import { formatVND } from "../../utils/helpers.js";
import ButtonEzin from "../Common/Button";
import { useRouter } from "next/router";

const Products = ({ allNodeProducts }) => {
  const router = useRouter();
  const percentReduce = (value) => {
    return Math.round(
      ((value.min_fee - value.min_fee_promotion) / value.min_fee) * 100
    );
  };

  return (
    <section id="san-pham" className="offer-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <h2>
            Sản phẩm <a className="color-primary">Ezin</a>
          </h2>
          <p>
            Ezin liên kết cùng các Công ty Bảo hiểm hàng đầu Việt Nam để cung
            cấp đến cho bạn các sản phẩm bảo hiểm chất lượng, phù hợp với nhu
            cầu của bạn.
          </p>
        </div>

        <div className="row">
          {allNodeProducts.map((product) => {
            return (
              <div className="col-lg-4 col-sm-6" key={product._id}>
                <div
                  className="single-offer pl-30 pr-30 text-center"
                  // style={{ height: 618 }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="mx-auto product-img"
                  />
                  <h3 className="mt-3">
                    <Link href={`san-pham/${product.slug}#mua-ngay`}>
                      <a>{product.name}</a>
                    </Link>
                  </h3>
                  <p className="mb-0 product-decription text-dot-3">
                    {product.intro}
                  </p>
                  <div className="d-flex align-items-center my-3">
                    <div className="w-50 text-start">
                      <p className="mb-0 text-danger font-weight-700 product-prize lh-1">
                        {formatVND(product.min_fee)}
                      </p>
                      {percentReduce(product) !== 0 && (
                        <p className="product-prize-old">
                          {formatVND(product.min_fee)}{" "}
                          <a className="ml-1 text-dark">
                            {`-${percentReduce(product)}%`}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="product-coin font-weight-700 w-50">
                      150.000 <img src="/images/coin.png" alt="Coin" />
                    </div>
                  </div>
                  <ButtonEzin
                    href={`san-pham/${product.slug}#mua-ngay`}
                    types="primary"
                    onClick={() =>
                      router.push(`san-pham/${product.slug}#mua-ngay`)
                    }
                    className="btn-full-width"
                  >
                    Mua ngay
                  </ButtonEzin>
                </div>
              </div>
            );
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
};

export default Products;
