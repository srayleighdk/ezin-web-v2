import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import Footer from "../../../components/Layouts/Footer";
import ListTagsNews from "../../../components/News/ListTagsNews";
import { getNews, getNewestPost, getPostCategories } from "../../../pages/api";

export default function TagList({ id, arrBlogs = [], postNewest=[], arrCats=[] }) {
  return (
    <>
      {/* <Navbar /> */}
      <ListTagsNews arrBlogs={arrBlogs} arrCats={arrCats} arrNewsestPost={postNewest} idCat={id} />
      <Footer />
    </>
  );
}

TagList.getInitialProps = async ({ query: { id } }) => {
  const [res1, res2, res3] = await Promise.all([
    getNews(`cat=${id}`),
    getNewestPost(),
    getPostCategories(),
  ]);
  return {
    arrBlogs: res1?.data?.data,
    id: id,
    postNewest: res2?.data?.data,
    arrCats: res3?.data?.data,
  };
};