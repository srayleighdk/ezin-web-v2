import React, { Component } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

class WhatWeOffer extends Component {
  openTabSection = (evt, tabNmae) => {
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

  render() {
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
              <div className="col-lg-3">
                {/* Tabs navs */}
                <ul className="tabs">
                  <li
                    className="current"
                    onClick={(e) => this.openTabSection(e, "tab1")}
                  >
                    <span>
                      {/* <i className="flaticon-health"></i> */}
                      <h3>Quyền lợi</h3>
                      {/* <p>All kind of industry</p> */}
                    </span>
                  </li>

                  <div className="col-lg-9">
                    <div className="tab_content">
                      <div id="tab1" className="tabs_item">
                        <div className="row align-items-center">
                          <div className="col-lg-6">
                            <div className="industries-img left-img">
                              <img src="/images/why1.png" alt="why1" />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="industries-content text-center text-40">
                              <h3>Quyền lợi</h3>
                              <div className="row">
                                <div className="col-lg-6 col-sm-6">
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

                                <div className="col-lg-6 col-sm-6">
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

                              {/* <div className="text-center">
                            <Link href="/services">
                              <a className="default-btn">Discover More</a>
                            </Link>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <li onClick={(e) => this.openTabSection(e, "tab2")} className="mt-3">
                    <span>
                      {/* <i className="flaticon-machine-learning"></i> */}
                      <h3>Ezin Lifestyle</h3>
                      {/* <p>All kind of industry</p> */}
                    </span>
                  </li>

                  <div className="col-lg-9">
                    <div className="tab_content">
                      <div id="tab2" className="tabs_item">
                        <div className="row align-items-center">
                          <div className="col-lg-6">
                            <div className="industries-img right-img">
                              <img src="/images/why2.png" alt="why2" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="industries-content text-center text-40">
                              <h3>Ezin Lifestyle</h3>
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

                              {/* <div className="text-center">
                            <Link href="/services">
                              <a className="default-btn">Discover More</a>
                            </Link>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <li onClick={(e) => this.openTabSection(e, "tab3")} className="mt-3">
                    <span>
                      {/* <i className="flaticon-artificial-intelligence"></i> */}
                      <h3>FAQ</h3>
                      {/* <p>All kind of industry</p> */}
                    </span>
                  </li>

                  <div className="col-lg-9">
                    <div className="tab_content">
                      <div id="tab3" className="tabs_item">
                        <div className="row  align-items-center">
                          <div className="col-lg-6">
                            <div className="industries-img left-img">
                              <img src="/images/why3.png" alt="why3" />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="industries-content text-center text-40">
                              <h3>FAQ</h3>

                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="faq-accordion">
                                    <Accordion preExpanded={["a"]}>
                                      <AccordionItem uuid="a">
                                        <AccordionItemHeading>
                                          <AccordionItemButton>
                                            Ezin là gì?
                                          </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                          <p>
                                            Ezin là cách viết tắt của cụm từ
                                            Easy Insurance- bảo hiểm thật dễ
                                            dàng. Đây cũng là tôn chỉ của chúng
                                            tôi, những người sáng lập nên Ezin.
                                            Chúng tôi muốn tạo ra những sản phẩm
                                            bảo hiểm thật dễ hiểu, mang lại
                                            những quyền lợi thiết thực nhất để
                                            bảo vệ bạn và những người thân yêu
                                            của bạn với mức chi phí dễ tiếp cận
                                            nhất.
                                          </p>
                                        </AccordionItemPanel>
                                      </AccordionItem>

                                      <AccordionItem uuid="b">
                                        <AccordionItemHeading>
                                          <AccordionItemButton>
                                            Bảo hiểm Ezin có gì khác biệt?
                                          </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                          <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Quis ipsum
                                            suspendisse ultrices gravida. Risus
                                            commodo viverra maecenas accumsan
                                            lacus vel facilisis.
                                          </p>
                                        </AccordionItemPanel>
                                      </AccordionItem>

                                      <AccordionItem uuid="c">
                                        <AccordionItemHeading>
                                          <AccordionItemButton>
                                            Claim như thế nào?
                                          </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                          <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Quis ipsum
                                            suspendisse ultrices gravida. Risus
                                            commodo viverra maecenas accumsan
                                            lacus vel facilisis.
                                          </p>
                                        </AccordionItemPanel>
                                      </AccordionItem>

                                      <AccordionItem uuid="d">
                                        <AccordionItemHeading>
                                          <AccordionItemButton>
                                            Kích hoạt ra sao?
                                          </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                          <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Quis ipsum
                                            suspendisse ultrices gravida. Risus
                                            commodo viverra maecenas accumsan
                                            lacus vel facilisis.
                                          </p>
                                        </AccordionItemPanel>
                                      </AccordionItem>

                                      <AccordionItem uuid="e">
                                        <AccordionItemHeading>
                                          <AccordionItemButton>
                                            AI Hoạt động như thế nào?
                                          </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                          <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Quis ipsum
                                            suspendisse ultrices gravida. Risus
                                            commodo viverra maecenas accumsan
                                            lacus vel facilisis.
                                          </p>
                                        </AccordionItemPanel>
                                      </AccordionItem>
                                    </Accordion>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="text-center">
                            <Link href="/services">
                              <a className="default-btn">Discover More</a>
                            </Link>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>

              {/* <div className="col-lg-9">
                <div className="tab_content">
                  <div id="tab1" className="tabs_item">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="industries-img left-img">
                          <img src="/images/why1.png" alt="why1" />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="industries-content text-center text-40">
                          <h3>Quyền lợi</h3>
                          <div className="row">
                            <div className="col-lg-6 col-sm-6">
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

                            <div className="col-lg-6 col-sm-6">
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

                  <div id="tab2" className="tabs_item">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="industries-img right-img">
                          <img src="/images/why2.png" alt="why2" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="industries-content text-center text-40">
                          <h3>Ezin Lifestyle</h3>
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

                  <div id="tab3" className="tabs_item">
                    <div className="row  align-items-center">
                      <div className="col-lg-6">
                        <div className="industries-img left-img">
                          <img src="/images/why3.png" alt="why3" />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="industries-content text-center text-40">
                          <h3>FAQ</h3>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="faq-accordion">
                                <Accordion preExpanded={["a"]}>
                                  <AccordionItem uuid="a">
                                    <AccordionItemHeading>
                                      <AccordionItemButton>
                                        Ezin là gì?
                                      </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                      <p>
                                        Ezin là cách viết tắt của cụm từ Easy
                                        Insurance- bảo hiểm thật dễ dàng. Đây
                                        cũng là tôn chỉ của chúng tôi, những
                                        người sáng lập nên Ezin. Chúng tôi muốn
                                        tạo ra những sản phẩm bảo hiểm thật dễ
                                        hiểu, mang lại những quyền lợi thiết
                                        thực nhất để bảo vệ bạn và những người
                                        thân yêu của bạn với mức chi phí dễ tiếp
                                        cận nhất.
                                      </p>
                                    </AccordionItemPanel>
                                  </AccordionItem>

                                  <AccordionItem uuid="b">
                                    <AccordionItemHeading>
                                      <AccordionItemButton>
                                        Bảo hiểm Ezin có gì khác biệt?
                                      </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Quis ipsum suspendisse ultrices
                                        gravida. Risus commodo viverra maecenas
                                        accumsan lacus vel facilisis.
                                      </p>
                                    </AccordionItemPanel>
                                  </AccordionItem>

                                  <AccordionItem uuid="c">
                                    <AccordionItemHeading>
                                      <AccordionItemButton>
                                        Claim như thế nào?
                                      </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Quis ipsum suspendisse ultrices
                                        gravida. Risus commodo viverra maecenas
                                        accumsan lacus vel facilisis.
                                      </p>
                                    </AccordionItemPanel>
                                  </AccordionItem>

                                  <AccordionItem uuid="d">
                                    <AccordionItemHeading>
                                      <AccordionItemButton>
                                        Kích hoạt ra sao?
                                      </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Quis ipsum suspendisse ultrices
                                        gravida. Risus commodo viverra maecenas
                                        accumsan lacus vel facilisis.
                                      </p>
                                    </AccordionItemPanel>
                                  </AccordionItem>

                                  <AccordionItem uuid="e">
                                    <AccordionItemHeading>
                                      <AccordionItemButton>
                                        AI Hoạt động như thế nào?
                                      </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Quis ipsum suspendisse ultrices
                                        gravida. Risus commodo viverra maecenas
                                        accumsan lacus vel facilisis.
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
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default WhatWeOffer;
