import React from "react";
import Link from "next/link";
import { getImageUrl } from "../../utils/helpers";
import { useMediaQuery } from "react-responsive";

export default function PageBanner(props) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  let { pageTitle, img, name, homePageUrl, homePageText, activePageText } = props;
  console.log("props", getImageUrl(img))
  return (
    <div className="page-title-area item-bg1 bg-white pb-0 mt-5">
      <div className="container">
        <div
          className={`page-title-content position-relative banner-img ${isMobile && "mobile"}`}
          style={{ backgroundImage: `url(${getImageUrl(img)})` }}
        >
          <h2 className="product-banner w-100 text-uppercase text-center">{pageTitle}</h2>
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

      {/* <style jsx>
        {`
        .banner-img {

        }
        
        `}
      </style> */}
    </div>
  );
}
