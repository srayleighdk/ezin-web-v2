import React, { useState } from "react";
import Head from "next/head";
import { getAboutUs, getLeader, getPartner, getLegal } from "./api/index";
import { Tabs } from "antd";
import Card from "../src/container/about-us/Card";
import { getImageUrl } from "../utils/helpers";

const { TabPane } = Tabs;

const WrapContent = ({ children }) => (
  <div className="main-section content-section content-about-us">
    <div className="container">{children}</div>
  </div>
);

export default function About({ aboutUs, leader, partner, legal }) {
  const [tabData, setTabData] = useState(aboutUs);
  const onChange = (key) => {
    switch (key) {
      case "1":
        setTabData(aboutUs);
        break;
      case "2":
        setTabData(leader);
        break;
      case "3":
        setTabData(partner);
        break;
      case "4":
        setTabData(legal);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title key="title">{`Giới thiệu | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`Giới thiệu | Ezin`}
        />
        <meta
          property="og:description"
          key="og-description"
          content={"Giới thiệu Ezin"}
        />
      </Head>
      <div className="about-us-page" style={{ marginTop: "62px" }}>
        <Tabs defaultActiveKey="1" onChange={onChange} className="custom-tabar">
          <TabPane tab="VỀ CHÚNG TÔI" key="1">
            <div className="main-section content-section content-about-us">
              <div className="container">
                {tabData && (
                  <Card
                    img={`${getImageUrl()}/${tabData.image.path}`}
                    description={tabData.description.replace(/\n/g, "", "")}
                  />
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="LÃNH ĐẠO" key="2">
            <WrapContent>
              {tabData && (
                <Card
                  img={`${getImageUrl()}/${tabData.image.path}`}
                  description={tabData.description.replace(/\n/g, "", "")}
                  metaTitle={tabData.meta_title}
                  metaDesc={tabData.meta_description}
                />
              )}
            </WrapContent>
          </TabPane>
          <TabPane tab="ĐỐI TÁC BẢO HIỂM CỦA CHÚNG TÔI" key="3">
            <WrapContent>
              {tabData && (
                <Card
                  img={`${getImageUrl()}/${tabData.image.path}`}
                  description={tabData.description.replace(/\n/g, "")}
                  metaTitle={tabData.meta_title}
                />
              )}
            </WrapContent>
          </TabPane>
          <TabPane tab="PHÁP LÝ" key="4">
            <WrapContent>
              {tabData && (
                <Card
                  img={`${getImageUrl()}/${tabData.image.path}`}
                  description={tabData.description.replace(/\n/g, "")}
                />
              )}
            </WrapContent>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const [data1, data2, data3, data4] = await Promise.all([
    getAboutUs(),
    getLeader(),
    getPartner(),
    getLegal(),
  ]);

  return {
    props: {
      aboutUs: data1.data.data,
      leader: data2.data.data,
      partner: data3.data.data,
      legal: data4.data.data,
    },
    revalidate: 3600, // In seconds
  };
}
