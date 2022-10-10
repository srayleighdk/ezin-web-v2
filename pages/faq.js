import React from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import FaqContent from '../components/Faq/FaqContent';
import AskQuestionForm from '../components/Faq/AskQuestionForm';
import Footer from '../components/Layouts/Footer';
import { getHeader, getFAQ, getFAQContent } from './api';

export async function getStaticProps() {
  const [res, faq, faqContent] = await Promise.all([getHeader(), getFAQ(), getFAQContent()]);
  return {
    props: {
      headers: res?.data?.data,
      faq: faq?.data?.data,
      faqContent: faqContent?.data?.data,
    }
  }
}

function Faq({ headers, faq, faqContent }) {
  return (
    <>
      <Navbar headers={headers} style={{ background: "white" }} />

      <PageBanner
        pageTitle="Frequently Asked Questions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Frequently Asked Questions"
      />

      <FaqContent faq={faq} faqContent={faqContent} />

      <AskQuestionForm />

      <Footer />
    </>
  );
}

export default Faq;
