import React, { Component } from "react";
import PageBanner from "../components/Common/PageBanner";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactForm from "../components/Contact/ContactForm";

function Contact() {
  return (
    <>
      <PageBanner
        pageTitle="Hãy liên hệ với chúng tôi"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Liên Hệ"
      />

      <ContactInfo />

      <ContactForm />
    </>
  );
}

export default Contact;
