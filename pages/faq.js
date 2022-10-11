import React from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import FaqContent from '../components/Faq/FaqContent';
import AskQuestionForm from '../components/Faq/AskQuestionForm';
import Footer from '../components/Layouts/Footer';
import { getHeader, getFAQ, getFAQContent } from './api';

export async function getStaticProps() {
  const [res, faq] = await Promise.all([getHeader(), getFAQ()]);
  return {
    props: {
      headers: res?.data?.data,
      faq: faq?.data?.data,
    }
  }
}

function Faq({ headers, faq }) {
  return (
    <>
      <Navbar headers={headers} style={{ background: "white" }} />

      <PageBanner
        pageTitle="Frequently Asked Questions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Frequently Asked Questions"
      />

      <FaqContent faq={faq} />

      <AskQuestionForm />

      <Footer />
    </>
  );
}

export default Faq;
