import React, { Component } from "react";
import Link from "next/link";
import { getImageUrl } from "../../utils/helpers";
import { useMediaQuery } from "react-responsive";

export default function PageBanner(props) {
    const isMobile = useMediaQuery({ maxWidth: 767 });
  let { pageTitle, img, name, homePageUrl, homePageText, activePageText } = props;

  return (
    <div className="page-title-area item-bg1 bg-white pb-0 mt-5">
      <div className="container">
        <div
          className={`page-title-content ${isMobile ? "" : "banner-img"}`}
          style={{ backgroundImage: `url(${getImageUrl(img)})` }}
        >
          {/* <img src={getImageUrl(img)} alt={name} style={{width: "100%"}} /> */}
          <h2 className="product-banner w-100 text-center">{pageTitle}</h2>
          <ul>
            <li>
              <Link href={homePageUrl}>
                <a>{homePageText}</a>
              </Link>
            </li>
            <li>{activePageText}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
