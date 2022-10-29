import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import { useMediaQuery } from "react-responsive";
import { getFAQContent } from "../../pages/api";
import { createMarkupNormal } from "../../utils/auth.helper";

export default function WhatWeOffer({ faqCat }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [faqContent, setFaqContent] = useState(null);
  console.log("faqContent", faqContent);

  useEffect(() => {
    infoFAQContent();
  }, [faqCat]);

  const infoFAQContent = async () => {
    const res = await getFAQContent(faqCat);
    setFaqContent(res?.data?.data);
  };
  const openTabSection = (evt, tabNmae) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabs_item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByTagName("li");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("current", "");
    }

    document.getElementById(tabNmae).style.display = "block";
    evt.currentTarget.className += "current";
  };

  return (
    <section className="industries-area pb-100">
      <div className="container">
        <div className="section-title text-40">
          <h2>
            <span className="color-primary">Tại sao</span> dùng Ezin?
          </h2>
          <p>Một trải nghiệm hoàn toàn mới để San sẻ rủi ro - Hết cả âu lo</p>
        </div>

        <div className="tab industries-list-tab">
          <div className="row align-items-center">
            {/* Tabs navs */}
            <ul className={`tabs`}>
              <div className={`${!isMobile && "d-flex"}`}>
                <li
                  className="col-lg-6"
                  // onClick={(e) => openTabSection(e, "tab1")}
                >
                  <div className="industries-img left-img">
                    <img
                      src="/images/why1.png"
                      className="why-img mt-3"
                      alt="why1"
                    />
                  </div>
                </li>

                <div className="col-lg-6 px-3">
                  <span className="py-0 px-0">
                    <h3 className="why-heading">Quyền lợi</h3>
                  </span>
                  <div className="tab_content">
                    <div id="tab1" className="tabs_item">
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <div className="industries-content text-center text-40">
                            <div className="row">
                              <div className="col-lg-12 col-sm-6">
                                <ul className="industries-item">
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Hoàn toàn điện tử - không giấy tờ
                                  </li>
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Cam kết hỗ trợ tới 100 triệu
                                  </li>
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Chăm sóc khách hàng 5 sao
                                  </li>
                                </ul>
                              </div>

                              <div
                                className={`col-lg-12 col-sm-6 ${
                                  isMobile && "mt-4"
                                }`}
                              >
                                <ul className="industries-item">
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Đòi bồi thường trực tuyến
                                  </li>
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Mua bảo hiểm trong 5 phút
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-3 ${!isMobile && "d-flex flex-row-reverse"}`}>
                <li
                  // onClick={(e) => openTabSection(e, "tab2")}
                  className={`col-lg-6 mt-3 why-wrap-header d-flex ${!isMobile && "justify-content-center"}`}
                >
                  <div className={`industries-img left-img`}>
                    <img
                      src="/images/why2.png"
                      className="why-img mt-3"
                      alt="why2"
                    />
                  </div>
                </li>

                <div className="col-lg-6 px-3">
                  <span className="py-0 px-0">
                    <h3 className="why-heading">Ezin Lifestyle</h3>
                  </span>
                  <div className="tab_content">
                    <div id="tab2" className="tabs_item">
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <div className="industries-content text-center text-40">
                            <div className="row">
                              <div className="col-lg-12 col-sm-12">
                                <ul className="industries-item">
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Sống an toàn
                                  </li>
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Sống lành mạnh
                                  </li>
                                  <li>
                                    <i className="flaticon-checked"></i>
                                    Sống đẹp
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${!isMobile && "d-flex"}`}>
                <li
                  // onClick={(e) => openTabSection(e, "tab3")}
                  className="col-lg-6 mt-3 why-wrap-header"
                >
                  <div className="industries-img left-img">
                    <img
                      src="/images/why3.png"
                      className="why-img mt-3"
                      alt="why3"
                    />
                  </div>
                </li>

                <div className="col-lg-6 px-3">
                  <span className="py-0 px-0">
                    <h3 className="why-heading">FAQ</h3>
                  </span>
                  <div className="tab_content">
                    <div id="tab3" className="tabs_item">
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <div className="industries-content text-center text-40">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="faq-accordion">
                                  <Accordion>
                                    {faqContent?.map((item, index) => (
                                      <AccordionItem uuid={index}>
                                        <AccordionItemHeading>
                                          <AccordionItemButton>
                                            {item?.question}
                                          </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                          <p
                                            dangerouslySetInnerHTML={createMarkupNormal(
                                              item.title
                                            )}
                                            className="text-start"
                                          ></p>
                                        </AccordionItemPanel>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
