import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import MainBanner from '../components/HomeFive/MainBanner';
import PartnerSlider from '../components/Common/PartnerSlider';
import PartnerPromotion from '../components/Common/PartnerPromotion';
import HotDeals from '../components/Common/HotDeals';
import About from '../components/HomeFive/About';
import WhyChooseUs from '../components/HomeFive/WhyChooseUs';
import Groups from '../components/HomeFive/Groups';
import Services from '../components/HomeFive/Services';
import Products from '../components/HomeFive/Products';
import MakeYourBusiness from '../components/Common/MakeYourBusiness';
import WhatWeOffer from '../components/HomeFive/WhatWeOffer';
import CaseStudies from '../components/HomeFive/CaseStudies';
import Testimonials from '../components/Common/Testimonials';
import Faq from '../components/HomeFive/Faq';
import News from '../components/Common/News';
import Footer from '../components/Layouts/Footer';
 
class Index5 extends Component {
    render() {
        return (
            <>
                <Navbar />

                <MainBanner />

                <PartnerSlider />

                <PartnerPromotion />

                <Products />

                <Groups />

                <HotDeals />


                <About />

                <WhyChooseUs />

                <Services />

                <MakeYourBusiness />

                <WhatWeOffer />

                <CaseStudies />

                // Quang
                <Testimonials />

                <Faq />

                <News />
                
                <Footer />
            </>
        );
    }
}

export default Index5;