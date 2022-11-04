import React, { Component } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Partner({ partners = {} }) {
  const router = useRouter();
  return (
    <div className="brand-area">
      <div className="container my-5">
        <div className="section-title mb-3 text-40">
          <h2>
            <span className="color-primary">Ezin</span> partner
          </h2>
        </div>
        <div className="brand-list">
          {partners.map((item) => (
            <div className="single-brand mb-3">
              {item.link ? (
                <Image
                  src={item?.image_path}
                  alt={item?.caption || "img"}
                  layout="intrinsic"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src={item?.image_path}
                  alt={item?.caption || "img"}
                  layout="intrinsic"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              )}
              {/* <a href={item?.link} target="_blank">
                <img src="/images/partner/partner1.png" alt="partner1" />
              </a> */}
            </div>
          ))}
        </div>
        <div className="row partner">
          <div className="col-6" onClick={() => router.push('/tra-cuu')}>
            <div className="bussiness">
              <div className="position-relative">
                <img
                  src="/images/circle1.png"
                  alt="circle"
                  className="circle"
                />
                <img
                  src="/images/bussiness.png"
                  alt="kinh doanh"
                  className="icon"
                />
              </div>
              <div className="title">
                Kinh doanh bảo hiểm tích hợp cho Website và App
              </div>
            </div>
          </div>
          <div className="col-6" onClick={() => router.push('/tra-cuu')}>
            <div className="bussiness invest">
              <div className="position-relative">
                <img
                  src="/images/circle4.png"
                  alt="circle"
                  className="circle"
                />
                <img
                  src="/images/invest.png"
                  alt="Đầu tư"
                  className="icon"
                />
              </div>
              <div className="title">
                Đầu tư Zone Startups
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
