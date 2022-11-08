import React, { Component } from "react";
import PageBanner from "../components/Common/PageBanner";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactForm from "../components/Contact/ContactForm";
import Head from "next/head";

function Contact() {
  return (
    <>
      <Head>
        <title key="title">Liên hệ</title>
      </Head>
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
