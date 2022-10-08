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
} from "../../../pages/api";
// import styles from "../life.module.scss";
// import { createMarkup } from "../../../utils/auth.helper";
// import dayjs from "dayjs";

export default function CatList({ id, arrBlogs = [], postNewest=[], arrCats=[] }) {
  console.log("CatList", id, arrBlogs, postNewest);
  return (
    <>
    <Navbar />
    <ListNews arrBlogs={arrBlogs} arrCats={arrCats} arrNewsestPost={postNewest} idCat={id}/>
    <Footer />
    </>
  );
}

CatList.getInitialProps = async ({ query: { id } }) => {
  const [res1, res2, res3] = await Promise.all([
    getNews(`cat=${id}`),
    getNewestPost(),
    getPostCategories(),
  ]);
  return {
    arrBlogs: res1?.data?.data,
    id: id,
    postNewest: res2?.data?.data,
    arrCats: res3?.data?.data
  };
};