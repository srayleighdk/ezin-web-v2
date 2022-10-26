import React, { useEffect, useState } from "react";
import PageBanner from "../../components/Common/PageBanner";
// import FaqContent from "./content/FaqContent";
// import AskQuestionForm from "./content/AskQuestionForm";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import { getFAQ, getFAQContent } from "../api";

export async function getStaticProps() {
    const res = await getFAQ()
    const faqCat = res?.data?.data

    return {
        props: {
            faqCat,
        },
    }
}

export default function FAQ({ faqCat }) {
  const [faqCatId, setFaqCatId] = useState(faqCat[0]?._id);
  const faqCont = faqCat.filter((e) => e.is_active);
  faqCont.sort((a, b) => a.title.length - b.title.length);

  useEffect(async() => {
    const res = await getFAQContent(faqCatId);
    console.log("ressasasas", res)
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
                  {/* {faqContent} */}
                  <Accordion>
                    <AccordionItem uuid={"a"}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          What Are The Business Advisory Company?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Fugit labore iure aspernatur at! Tenetur vero
                          molestiae delectus nulla ipsa soluta quibusdam,
                          repellat harum, odit facere, corporis possimus earum
                          facilis aliquam?
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid={"b"}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          What Are The Business Advisory Company?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Fugit labore iure aspernatur at! Tenetur vero
                          molestiae delectus nulla ipsa soluta quibusdam,
                          repellat harum, odit facere, corporis possimus earum
                          facilis aliquam?
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
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
