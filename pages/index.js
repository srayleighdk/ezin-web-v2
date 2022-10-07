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
import {getHeader} from './api'
 
// export async function getServerSideProps(context) {
//     const res = await getHeader();
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }
  
class Index5 extends Component {
    render() {
        return (
            <>
                <Navbar />

                <MainBanner />

                <NewsSlider />

                <Banner />

                {/* <Groups /> */}

                <Products />

                <HotDeals />

                <WhatWeOffer />

                <EzinCoin />

                <CommunityEzin />

                <News />

                <Testimonials />

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
}

export default Index5;