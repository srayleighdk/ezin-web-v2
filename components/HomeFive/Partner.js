import React, { Component } from "react";
import Image from "next/image";

export default function Partner({ partners = {} }) {
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
      </div>
    </div>
  );
}
