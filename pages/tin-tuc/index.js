import React from "react";
import Head from "next/head";
import { getNewsByChuDe } from "../../pages/api";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import ListNews from "../../components/News/ListNews";

const { TabPane } = Tabs;
const id = "tin-nong";
function TinTuc({ arrBlogs = [] }) {
  const router = useRouter();

  const onChangeTab = (slug) => {
    if (slug == "tin-nong") {
      router.replace(`/tin-tuc`);
    } else {
      router.push(`/tin-tuc/chu-de/${slug}`);
    }
  };

  return (
    <div>
      <Head>
        <title key="title">Tin tức | Ezin</title>
        <meta property="og:title" key="og-title" content="Tin tức | Ezin" />
        <meta
          property="og:description"
          key="og-description"
          content="Tin tức"
        />
      </Head>
      <Tabs
        defaultActiveKey={id}
        onChange={onChangeTab}
        className="custom-tabar ptb-100 pb-0"
      >
        <TabPane tab="Tin nóng" key="tin-nong"></TabPane>
        <TabPane tab="COVID" key="covid"></TabPane>
        <TabPane tab="Video" key="video"></TabPane>
        <TabPane tab="Tai nạn" key="tai-nan"></TabPane>
      </Tabs>
      <div className="container blog-container">
        <ListNews blogs={arrBlogs} />
      </div>
    </div>
  );
}

// This function gets called at build time
export async function getServerSideProps() {
  let res = await getNewsByChuDe("tin-nong");
  return {
    props: {
      arrBlogs: res?.data?.data,
    },
  };
}

export default TinTuc;
