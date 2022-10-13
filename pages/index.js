import React, { useEffect } from "react";
import Navbar from "../components/Layouts/Navbar";
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
import Footer from "../components/Layouts/Footer";
import { useRouter } from 'next/router';
import {
  getHeader,
  getAllNodeProducts,
  getHomeData,
  getNewestPost,
  getTopStore,
} from "./api";
import SchemaCode from "../components/schema-code";

export async function getServerSideProps(context) {
  const [res, allNodeProducts, homeData, newsPost, topStore] = await Promise.all([
    getHeader(),
    getAllNodeProducts(),
    getHomeData(),
    getNewestPost(),
    getTopStore(),
  ]);
  return {
    props: {
      headers: res?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
      testimonials: homeData?.data?.data?.sections,
      newsPost: newsPost?.data?.data,
      topStores: topStore?.data?.data,
    }, // will be passed to the page component as props
  };
}
const Home = ({ headers, allNodeProducts, testimonials, newsPost, topStores }) => {
  console.log("topStores", topStores)
  const router = useRouter();
  // export async function getServerSideProps(context) {
  //     const res = await getHeader();
  //     return {
  //       props: {}, // will be passed to the page component as props
  //     }
  //   }

  useEffect(() => {
    if(router.asPath === "/#san-pham") {
      window.scroll({
        top: 1100,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [router.asPath])

  return (
    <>
      <Navbar headers={headers} />

      <MainBanner />

      <NewsSlider newsPost={newsPost} />

      <Banner />

      <Groups />

      <Products allNodeProducts={allNodeProducts} />

      <HotDeals allNodeProducts={allNodeProducts} />

      <WhatWeOffer />

      <EzinCoin />

      <CommunityEzin />

      <News />

      <Testimonials testimonials={testimonials.testimonials} />

      <CaseStudies />

      <Partner />

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

      <Footer product={allNodeProducts} />
    </>
  );
};

export default Home;
