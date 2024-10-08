import React from "react";
import PageBanner from "../../components/Common/PageBanner";
import ListNewsLife from "../../components/News/ListNewsLife";
import {
  getPostCategories,
  getLatestPosts,
  getNewestPost,
  getHeader,
} from "../../pages/api";
import Head from "next/head";

export async function getServerSideProps() {
  let [res1, res2, res3, res4] = await Promise.all([
    getLatestPosts(),
    getPostCategories(),
    getNewestPost(),
    getHeader(),
  ]);
  return {
    props: {
      arrBlogs: res1?.data?.data,
      arrCats: res2?.data?.data,
      arrNewsestPost: res3?.data?.data,
      headers: res4?.data?.data,
    },
  };
}

export default function Life({
  arrBlogs = [],
  arrCats = [],
  arrNewsestPost = [],
  headers = [],
}) {
  return (
    <>
      <Head>
        <title>Life</title>
      </Head>

      <ListNewsLife
        arrBlogs={arrBlogs}
        arrCats={arrCats}
        arrNewsestPost={arrNewsestPost}
      />
    </>
  );
}
