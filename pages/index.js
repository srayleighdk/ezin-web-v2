import React, { useEffect, useState } from "react";
import Head from "next/head";
import MainBanner from "../components/HomeFive/MainBanner";
import NewsSlider from "../components/Common/NewsSlider";
import Banner from "../components/Common/Banner";
import HotDeals from "../components/Common/HotDeals";
import EzStore from "../components/Common/EzStore";
import Partner from "../components/HomeFive/Partner";
import CommunityEzin from "../components/HomeFive/CommunityEzin";
import Groups from "../components/HomeFive/Groups";
import EzinCoin from "../components/HomeFive/EzinCoin";
import Products from "../components/HomeFive/Products";
import WhatWeOffer from "../components/HomeFive/WhatWeOffer";
import CaseStudies from "../components/HomeFive/CaseStudies";
import Testimonials from "../components/Common/Testimonials";
import News from "../components/Common/News";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useRouter } from "next/router";
import {
  getHeader,
  getAllNodeProducts,
  getHomeData,
  getNewestPost,
  getTopStore,
  getHotNews,
  getAllPartners,
} from "./api";
import SchemaCode from "../components/schema-code";
import {
  makeSelectActivationVisible,
  makeSelectAuth,
  makeSelectCart,
  makeSelectCartVisible,
} from "../src/store/selector";

export async function getServerSideProps(context) {
  const [
    res,
    allNodeProducts,
    homeData,
    newsPost,
    topStore,
    newsData,
    partnerData,
  ] = await Promise.all([
    getHeader(),
    getAllNodeProducts(),
    getHomeData(),
    getNewestPost(),
    getTopStore(),
    getHotNews(),
    getAllPartners(),
  ]);
  return {
    props: {
      headers: res?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
      testimonials: homeData?.data?.data?.sections,
      newsPost: newsPost?.data?.data,
      topStores: topStore?.data?.data,
      news: newsData?.data?.data,
      partners: partnerData?.data?.data?.images,
    }, // will be passed to the page component as props
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  cart: makeSelectCart(),
  cartVisible: makeSelectCartVisible(),
  activationVisible: makeSelectActivationVisible(),
});

const Home = ({
  headers,
  allNodeProducts,
  testimonials,
  newsPost,
  topStores,
  news,
  partners,
}) => {
  const { auth, activationVisible } = useSelector(mapStateToProps);
  const router = useRouter();
  const [hidden, setHidden] = useState("");
  // export async function getServerSideProps(context) {
  //     const res = await getHeader();
  //     return {
  //       props: {}, // will be passed to the page component as props
  //     }
  //   }

  // useEffect(() => {
  //   if (router.asPath === "/#san-pham") {
  //     window.scroll({
  //       top: 1100,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [router.asPath]);

  return (
    <>
      <Head>
        <title>EZIN - Đi Bình An, Về Hạnh phúc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="jumpx-slider-item pt-sm-1 pb-sm-0"
        style={{
          backgroundImage: `url(/images/bg-banner-header.png)`,
          maxHeight: "100vh",
        }}
      >
        <MainBanner />
      </div>

      <NewsSlider newsPost={newsPost} />

      <Banner />

      <Products allNodeProducts={allNodeProducts} />

      <Groups />

      {/* <HotDeals allNodeProducts={allNodeProducts} /> */}

      {hidden === "why" || hidden === "" ? <WhatWeOffer /> : null}

      {hidden === "why" || hidden === "" ? (
        <div className="d-flex justify-content-center">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-hidden"
            onClick={() => {
              setHidden("no-why");
            }}
          >
            <EyeInvisibleOutlined style={{ width: 24, marginRight: 6 }} />
            Ẩn phần này
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-show"
            onClick={() => {
              setHidden("why");
            }}
          >
            <EyeOutlined style={{ width: 24, marginRight: 6 }} />
            Tại sao dùng Ezin
          </div>
        </div>
      )}

      <EzinCoin />

      <CommunityEzin />

      <News news={news} />

      {hidden === "reviews" || hidden === "" ? (
        <Testimonials testimonials={testimonials.testimonials} />
      ) : null}

      {hidden === "reviews" || hidden === "" ? (
        <div className="d-flex justify-content-center">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-hidden"
            onClick={() => {
              setHidden("no-reviews");
            }}
          >
            <EyeInvisibleOutlined style={{ width: 24, marginRight: 6 }} />
            Ẩn phần này
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-show"
            onClick={() => {
              setHidden("reviews");
            }}
          >
            <EyeOutlined style={{ width: 24, marginRight: 6 }} />
            Đánh giá khách hàng
          </div>
        </div>
      )}

      <CaseStudies />

      <Partner partners={partners} />

      <EzStore topStores={topStores} />

      <SchemaCode
        code={`
{
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "name": "Ezin Smart Insurance",
  "image": "https://api.ezin.vn/public/files/62770C51DE39CEA_nguyen-xuan-tai.png",
  "@id": "https://ezin.vn/gioi-thieu",
  "url": "https://ezin.vn/",
  "telephone": "02899966333",
  "priceRange": "60000-1375000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3/40 Thích Quảng Đức, Phường 3, Phú Nhuận, Thành phố Hồ Chí Minh, Vietnam",
    "addressLocality": "Ho Chi Minh",
    "postalCode": "72213",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.803932,
    "longitude": 106.6814523
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:30",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.facebook.com/baohiemezin",
    "https://www.youtube.com/channel/UCAISrxMuHxjkTl3LqX1S2cQ",
    "https://www.linkedin.com/company/ezin",
    "https://ezin.vn"
  ],
  "department": {
    "@type": "InsuranceAgency",
    "name": "Ezin Lê Duẩn",
    "image": "https://api.ezin.vn/public/files/09943D0D1A1CA0B_doi-tac-bao-hiem.png",
    "telephone": "0909088313" 
  }
}`}
      />

      <SchemaCode
        code={`
{
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Nguyễn Xuân Tài",
  "url": "https://www.linkedin.com/in/tai-nguyen-vietnam/",
  "image": "https://api.ezin.vn/public/files/62770C51DE39CEA_nguyen-xuan-tai.png",
  "sameAs": [
    "https://www.linkedin.com/company/ezin",
    "https://ezin.vn"
  ],
  "jobTitle": "CEO & President",
  "worksFor": {
    "@type": "Organization",
    "name": "Ezin Smart Insurance"
  }  
}`}
      />
    </>
  );
};

export default Home;
