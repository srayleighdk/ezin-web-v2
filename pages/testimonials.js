import React, { Component } from "react";
import PageBanner from "../components/Common/PageBanner";
import TestimonialsContent from "../components/Testimonials/TestimonialsContent";

class Testimonials extends Component {
  render() {
    return (
      <>
        <PageBanner
          pageTitle="Testimonials"
          homePageUrl="/"
          homePageText="Home"
          activePageText="Testimonials"
        />
        <TestimonialsContent />
      </>
    );
  }
}

export default Testimonials;
