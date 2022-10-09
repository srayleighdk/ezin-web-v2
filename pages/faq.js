import React from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import FaqContent from '../components/Faq/FaqContent';
import AskQuestionForm from '../components/Faq/AskQuestionForm';
import Footer from '../components/Layouts/Footer';
import { getHeader, getFAQ } from './api';

export async function getStaticProps() {
  const [res, faq] = await Promise.all([getHeader(), getFAQ()]);
  return {
    props: {
      headers: res?.data?.data
    }
  }
}

function Faq({ headers }) {
  return (
    <>
      <Navbar headers={headers} style={{ backgroundColor: "white" }} />

      <PageBanner
        pageTitle="Frequently Asked Questions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Frequently Asked Questions"
      />

      <FaqContent />

      <AskQuestionForm />

      <Footer />
    </>
  );
}

export default Faq;
