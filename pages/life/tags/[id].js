import React from "react";
import Navbar from "../../../components/Layouts/Navbar";
import Footer from "../../../components/Layouts/Footer";
import ListTags from "../../../components/News/ListTags";
import {
  getPostByTag,
  getNewestPost,
  getPostCategories,
} from "../../../pages/api";

export default function TagList({
  id,
  arrBlogs = [],
  postNewest = [],
  arrCats = [],
}) {
  console.log("getPostByTag", id, arrBlogs);
  return (
    <>
      <ListTags
        arrBlogs={arrBlogs}
        arrCats={arrCats}
        arrNewsestPost={postNewest}
        idCat={id}
      />
    </>
  );
}

TagList.getInitialProps = async ({ query: { id } }) => {
  const [res1, res2, res3] = await Promise.all([
    getPostByTag(id),
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
