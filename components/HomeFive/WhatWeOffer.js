import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import { Collapse, Select } from "antd";
import { useMediaQuery } from "react-responsive";
import { getFAQContent } from "../../pages/api";
import { createMarkupNormal } from "../../utils/auth.helper";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import ContentFAQ from "../Faq";
const { Panel } = Collapse;

export default function WhatWeOffer({ faqCat }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [faqContent, setFaqContent] = useState(null);
  const [hidden, setHidden] = useState("");

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
  const genExtra = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-question-circle-fill icon-check"
      viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
    </svg>
  );

  return (
    <section className="industries-area pb-100 pb-0">
      {hidden === "why" || hidden === "" ? (
        <div className="container">
          <div className="section-title">
            <h2 className="text-dark text-40">
              <span className="color-primary text-40">Tại sao</span> dùng Ezin?
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
                      <h3 className={`why-heading ${!isMobile && "mobile"}`}>
                        Quyền lợi
                      </h3>
                    </span>
                    <div className="tab_content">
                      <div id="tab1" className="tabs_item">
                        <div className="row align-items-center">
                          <div className="col-lg-12">
                            <div className="industries-content text-start text-40">
                              <div className="row">
                                <div className="col-lg-12 col-sm-6">
                                  <ul className="industries-item">
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
                                      Hoàn toàn điện tử - không giấy tờ
                                    </li>
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
                                      Cam kết hỗ trợ tới 100 triệu
                                    </li>
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
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
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
                                      Đòi bồi thường trực tuyến
                                    </li>
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
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

                <div
                  className={`mt-3 ${!isMobile && "d-flex flex-row-reverse"}`}
                >
                  <li
                    // onClick={(e) => openTabSection(e, "tab2")}
                    className={`col-lg-6 mt-3 why-wrap-header d-flex ${
                      !isMobile && "justify-content-center"
                    }`}
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
                      <h3 className={`why-heading ${!isMobile && "mobile"}`}>
                        Ezin Lifestyle
                      </h3>
                    </span>
                    <div className="tab_content">
                      <div id="tab2" className="tabs_item">
                        <div className="row align-items-center">
                          <div className="col-lg-12">
                            <div className="industries-content text-start text-40">
                              <div className="row">
                                <div className="col-lg-12 col-sm-12">
                                  <ul className="industries-item">
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
                                      Sống an toàn
                                    </li>
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
                                      Sống lành mạnh
                                    </li>
                                    <li>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill why-icon"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
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
                                    {/* <Collapse
                                      defaultActiveKey={["1"]}
                                      accordion
                                      expandIconPosition="end"
                                    >
                                      {faqContent?.map((item, index) => (
                                        <Panel
                                          header={item?.question}
                                          key={index + 1}
                                          extra={genExtra()}
                                        >
                                          <p
                                            dangerouslySetInnerHTML={createMarkupNormal(
                                              item.title
                                            )}
                                            className="text-start"
                                          ></p>
                                        </Panel>
                                      ))}
                                    </Collapse> */}
                                    <ContentFAQ faqContent={faqContent} classnamePanel="home_faq" />
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
      ) : null}
      {hidden === "why" || hidden === "" ? (
        <div className="d-flex ps-5 cursor-pointer justify-content-start">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-hidden"
            onClick={() => {
              setHidden("no-why");
              window.scroll({
                top: 2600,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <EyeInvisibleOutlined style={{ width: 24, marginRight: 6 }} />
            Ẩn phần này
          </div>
        </div>
      ) : (
        <div className="d-flex cursor-pointer justify-content-center">
          <div
            className="my-4 text-center d-flex align-items-center justify-content-center rounded-pill button-show"
            onClick={() => {
              setHidden("why");
            }}
          >
            <EyeOutlined style={{ width: 24, marginRight: 6 }} />
            Tại sao dùng Ezin
          </div>
        </div>
      )}
    </section>
  );
}
