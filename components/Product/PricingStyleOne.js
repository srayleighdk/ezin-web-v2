import React, { Component } from "react";
import Link from "next/link";
import MoneyIcon from "../../public/images/money.svg";
import Image from "next/image";

export default function PricingStyleOne({ product, nodePackages }) {
  const features = product?.features.split("\n") || [];
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
    <section className="pricing-area pt-100 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h3 className="h3">Giới thiệu</h3>
            <p>{product.desc}</p>
          </div>
          <div className="col-lg-6">
            <h3 className="h3">Đặc điểm nổi bật</h3>
            {features.map((item) => {
              <Image
                src={MoneyIcon}
                layout="fixed"
                height={15}
                width={15}
                alt="Đặc điểm nổi bật"
                // className="mr-2"
              />;
              <span className="ml-2">{item||''}</span>
            })}
          </div>
        </div>

        <div className="tab quote-list-tab">
          <div className="tab_content">
            <div id="tab1" className="tabs_item">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="single-pricing">
                    <div className="pricing-top-heading">
                      <h3>Basic</h3>
                      <p>Build A Website</p>
                    </div>
                    <span>
                      $29<sub>/m</sub>
                    </span>

                    <ul>
                      <li>
                        <i className="bx bx-check"></i>
                        Drag & Drop Builder
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Lead Generation & Sales
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Boot & Digital Assistants
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Customer Service
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Up to 1000 Subscribers
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Unlimited Broadcasts
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Landing Pages & Web Widgets
                      </li>
                    </ul>

                    <Link href="/contact">
                      <a className="default-btn">Get Started</a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="single-pricing">
                    <div className="pricing-top-heading">
                      <h3>Standard</h3>
                      <p>Build A Website</p>
                    </div>
                    <span>
                      $59<sub>/m</sub>
                    </span>

                    <ul>
                      <li>
                        <i className="bx bx-check"></i>
                        Drag & Drop Builder
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Lead Generation & Sales
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Boot & Digital Assistants
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Customer Service
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Up to 1000 Subscribers
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Unlimited Broadcasts
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Landing Pages & Web Widgets
                      </li>
                    </ul>

                    <Link href="/contact">
                      <a className="default-btn">Get Started</a>
                    </Link>

                    <strong className="popular">Popular</strong>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                  <div className="single-pricing">
                    <div className="pricing-top-heading">
                      <h3>Premium</h3>
                      <p>Build A Website</p>
                    </div>
                    <span>
                      $79 <sub>/m</sub>
                    </span>

                    <ul>
                      <li>
                        <i className="bx bx-check"></i>
                        Drag & Drop Builder
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Lead Generation & Sales
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Boot & Digital Assistants
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Customer Service
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Up to 1000 Subscribers
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Unlimited Broadcasts
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Landing Pages & Web Widgets
                      </li>
                    </ul>

                    <Link href="/contact">
                      <a className="default-btn">Get Started</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div id="tab2" className="tabs_item">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="single-pricing">
                    <div className="pricing-top-heading">
                      <h3>Basic</h3>
                      <p>Build A Website</p>
                    </div>
                    <span>
                      $39<sub>/y</sub>
                    </span>

                    <ul>
                      <li>
                        <i className="bx bx-check"></i>
                        Drag & Drop Builder
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Lead Generation & Sales
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Boot & Digital Assistants
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Customer Service
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Up to 1000 Subscribers
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Unlimited Broadcasts
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Landing Pages & Web Widgets
                      </li>
                    </ul>

                    <Link href="/contact">
                      <a className="default-btn">Get Started</a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="single-pricing">
                    <div className="pricing-top-heading">
                      <h3>Standard</h3>
                      <p>Build A Website</p>
                    </div>
                    <span>
                      $79<sub>/y</sub>
                    </span>

                    <ul>
                      <li>
                        <i className="bx bx-check"></i>
                        Drag & Drop Builder
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Lead Generation & Sales
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Boot & Digital Assistants
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Customer Service
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Up to 1000 Subscribers
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Unlimited Broadcasts
                      </li>
                      <li>
                        <i className="bx bx-x"></i>
                        Landing Pages & Web Widgets
                      </li>
                    </ul>

                    <Link href="/contact">
                      <a className="default-btn">Get Started</a>
                    </Link>

                    <strong className="popular">Popular</strong>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                  <div className="single-pricing">
                    <div className="pricing-top-heading">
                      <h3>Premium</h3>
                      <p>Build A Website</p>
                    </div>
                    <span>
                      $99<sub>/y</sub>
                    </span>

                    <ul>
                      <li>
                        <i className="bx bx-check"></i>
                        Drag & Drop Builder
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Lead Generation & Sales
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Boot & Digital Assistants
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Customer Service
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Up to 1000 Subscribers
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Unlimited Broadcasts
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Landing Pages & Web Widgets
                      </li>
                    </ul>

                    <Link href="/contact">
                      <a className="default-btn">Get Started</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
