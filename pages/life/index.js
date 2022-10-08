import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import ListNewsLife from "../../components/News/ListNewsLife";
import Footer from "../../components/Layouts/Footer";
import { getPostCategories, getLatestPosts, getNewestPost } from "../../pages/api";

export async function getServerSideProps() {
  let [res1, res2, res3] = await Promise.all([getLatestPosts(), getPostCategories(), getNewestPost()])
  return {
    props: {
      arrBlogs: res1?.data?.data,
      arrCats: res2?.data?.data,
      arrNewsestPost: res3?.data?.data
    },
  };
}

export default function Life({ arrBlogs = [], arrCats = [], arrNewsestPost = [] }) {
    console.log("res1", arrCats, arrNewsestPost);
  return (
    <>
      <Navbar />

      <ListNewsLife arrBlogs={arrBlogs} arrCats={arrCats} arrNewsestPost={arrNewsestPost} />

      <Footer />
    </>
  );
}
