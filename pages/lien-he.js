import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactForm from '../components/Contact/ContactForm';
import Footer from '../components/Layouts/Footer';
import { getHeader } from './api';

export async function getStaticProps() {
  const res = await getHeader();
  return {
    props: {
      headers: res?.data?.data,
    }
  }
}


function Contact({ headers }) {

  return (
    <>
      <Navbar headers={headers} />

      <PageBanner
        pageTitle="Hãy liên hệ với chúng tôi"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Liên Hệ"
      />

      <ContactInfo />

      <ContactForm />

      <Footer />
    </>
  );

}

export default Contact;
