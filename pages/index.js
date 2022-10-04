import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import MainBanner from '../components/HomeFive/MainBanner';
import PartnerSlider from '../components/Common/PartnerSlider';
import NewsSlider from '../components/Common/NewsSlider';
import Banner from '../components/Common/Banner';
import HotDeals from '../components/Common/HotDeals';
import EzStore from '../components/Common/EzStore';
import About from '../components/HomeFive/About';
import WhyChooseUs from '../components/HomeFive/WhyChooseUs';
import Partner from '../components/HomeFive/Partner';
import CommunityEzin from '../components/HomeFive/CommunityEzin';
import Groups from '../components/HomeFive/Groups';
import Services from '../components/HomeFive/Services';
import EzinCoin from '../components/HomeFive/EzinCoin';
import Products from '../components/HomeFive/Products';
import MakeYourBusiness from '../components/Common/MakeYourBusiness';
import WhatWeOffer from '../components/HomeFive/WhatWeOffer';
import CaseStudies from '../components/HomeFive/CaseStudies';
import Testimonials from '../components/Common/Testimonials';
import Faq from '../components/HomeFive/Faq';
import News from '../components/Common/News';
import Footer from '../components/Layouts/Footer';
import { getHeader, getAllNodeProducts, getHomeData } from './api';


export async function getServerSideProps(context) {
  const [res, allNodeProducts, homeData] = await Promise.all([
    getHeader(),
    getAllNodeProducts(),
    getHomeData(),
  ]);
  return {
    props: {
      headers: res?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
      testimonials: homeData?.data?.data?.sections,
    }, // will be passed to the page component as props

  }
}
const Home = ({ headers, allNodeProducts, testimonials }) => {
  return (
    <>
      <Navbar headers={headers} />

      <MainBanner />

      <NewsSlider />

      <Banner />

      <Groups />

      <Products allNodeProducts={allNodeProducts} />

      <HotDeals />

      <WhatWeOffer />

      <EzinCoin />

      <CommunityEzin />

      <News />

      <Testimonials testimonials={testimonials.testimonials} />

      <CaseStudies />

      <Partner />

      <EzStore />

      {/* <PartnerSlider /> */}

      {/* <About /> */}

      {/* <WhyChooseUs /> */}

      {/* <MakeYourBusiness />

            <WhatWeOffer />

            <CaseStudies /> */}

      {/* <NewsSlider />

            <Banner />

            <Products /> */}

      {/* <Groups /> */}

      {/* <HotDeals /> */}

      {/* <WhatWeOffer />

            <Partner />

            <EzStore />

            <CommunityEzin />


            <About />

            <WhyChooseUs />

            <Services />

            <MakeYourBusiness />

            <WhatWeOffer />

            <CaseStudies /> */}

      {/* <Testimonials />

            <Faq />

            <News /> */}

      <Footer />
    </>
  );
}

export default Home;
