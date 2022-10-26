import React, { useEffect, useState } from "react";
import PageBanner from "../../components/Common/PageBanner";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import { getFAQ, getFAQContent } from "../api";
import { createMarkupNormal } from '../../utils/auth.helper';

export async function getStaticProps() {
  const res = await getFAQ();
  const faqCat = res?.data?.data;

  return {
    props: {
      faqCat,
    },
  };
}

export default function FAQ({ faqCat }) {
  const [faqCatId, setFaqCatId] = useState(faqCat[0]?._id);
  const [faqContent, setFaqContent] = useState(null);
  const faqCont = faqCat.filter((e) => e.is_active);
  faqCont.sort((a, b) => a.title.length - b.title.length);

  useEffect(async () => {
    const res = await getFAQContent(faqCatId);
    console.log("ressasasas", res);
    setFaqContent(res?.data?.data);
  }, [faqCatId]);

  return (
    <>
      <PageBanner
        pageTitle="Frequently Asked Questions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Frequently Asked Questions"
      />

      {/* <FaqContent faq={faq} /> */}
      <div className="container">
        <div className="news-details-area">
          <div className="widget-area" id="secondary">
            <div className="widget widget_categories">
              <h3 className="widget-title">Tổng Quan</h3>
              <div className="row">
                <div className="col-4 post-wrap">
                  <ul>
                    {faqCont?.map((child, index) => {
                      return (
                        <li
                          key={child?._id}
                          onClick={() => setFaqCatId(child?._id)}
                        >
                          <a
                            className="btn"
                            data-bs-toggle="collapse"
                            href={`#multiCollapseExample${index}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls={`#multiCollapseExample${index}`}
                          >
                            {child.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="col-8">
                  {faqContent?.map((item, index) => (
                    <Accordion>
                      <AccordionItem uuid={index}>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            {item?.question}
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p dangerouslySetInnerHTML={createMarkupNormal(e.title)}></p>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <AskQuestionForm /> */}
    </>
  );
}
