import React from "react";
import NewsSidebar from "../../../components/News/NewsSidebar";
import ListNewsLife from "../../../components/News/ListNewsLife";
import Link from "next/link";
import Navbar from "../../../components/Layouts/Navbar";
import Footer from "../../../components/Layouts/Footer";
import CommentsArea from "../../../components/News/CommentsArea";
import {
  getPostCategories,
  getNewestPost,
  getPostDetails,
  getPostByCategory,
  getHeader,
} from "../../../pages/api";
import styles from "../life.module.scss";
import { createMarkup } from "../../../utils/auth.helper";
import dayjs from "dayjs";
import Head from "next/head";

export default function CatList({
  id,
  arrBlogs = [],
  postNewest = [],
  arrCats = [],
  headers = [],
}) {
  return (
    <>
      <Head>
        <title>Chuyên mục Ezin</title>
      </Head>
      <ListNewsLife
        arrBlogs={arrBlogs}
        arrCats={arrCats}
        arrNewsestPost={postNewest}
        idCat={id}
      />
    </>
  );
}

CatList.getInitialProps = async ({ query: { id } }) => {
  // const details = await getPostByCategory(id);
  const [res1, res2, res3, res4] = await Promise.all([
    getPostByCategory(id),
    getNewestPost(),
    getPostCategories(),
    getHeader(),
  ]);
  return {
    arrBlogs: res1?.data?.data,
    id: id,
    postNewest: res2?.data?.data,
    arrCats: res3?.data?.data,
    headers: res4?.data?.data,
  };
};
