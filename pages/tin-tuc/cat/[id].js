import React from "react";
// import NewsSidebar from "../../../components/News/NewsSidebar";
import ListNews from "../../../components/News/ListNews";
// import Link from "next/link";
import Navbar from "../../../components/Layouts/Navbar";
import Footer from "../../../components/Layouts/Footer";
// import CommentsArea from "../../../components/News/CommentsArea";
import {
  getPostCategories,
  getNewestPost,
  getNews,
  getHeader,
} from "../../../pages/api";
// import styles from "../life.module.scss";
// import { createMarkup } from "../../../utils/auth.helper";
// import dayjs from "dayjs";

export default function CatList({
  id,
  arrBlogs = [],
  postNewest = [],
  arrCats = [],
  headers,
}) {
  console.log("CatList", id, arrBlogs, postNewest);
  return (
    <>
      <ListNews
        arrBlogs={arrBlogs}
        arrCats={arrCats}
        arrNewsestPost={postNewest}
        idCat={id}
      />
    </>
  );
}

CatList.getInitialProps = async ({ query: { id } }) => {
  const [res, res1, res2, res3] = await Promise.all([
    getHeader(),
    getNews(`cat=${id}`),
    getNewestPost(),
    getPostCategories(),
  ]);
  return {
    headers: res?.data?.data,
    arrBlogs: res1?.data?.data,
    id: id,
    postNewest: res2?.data?.data,
    arrCats: res3?.data?.data,
  };
};
