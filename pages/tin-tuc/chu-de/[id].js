import Head from "next/head";
import React, { Component } from "react";
import Footer from "../../../components/Layouts/Footer";
import Navbar from "../../../components/Layouts/Navbar";
// import NewsSidebar from "../../../components/News/NewsSidebar";
import ListTopicNews from "../../../components/News/ListTopicNews";
// import Link from "next/link";
// import CommentsArea from "../../../components/News/CommentsArea";
import {
  getPostCategories,
  getNewestPost,
  getNewsByChuDe,
  getHeader,
} from "../../../pages/api";
// import styles from "../life.module.scss";
// import { createMarkup } from "../../../utils/auth.helper";
// import dayjs from "dayjs";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const [res, res1, res2, res3] = await Promise.all([
    getHeader(),
    getNewsByChuDe(id),
    getNewestPost(),
    getPostCategories(),
  ]);
  return {
    props: {
      arrBlogs: res1?.data?.data,
      id: id,
      postNewest: res2?.data?.data,
      arrCats: res3?.data?.data,
      headers: res?.data.data,
    },
  };
}

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
      <Head>
        <title>Chủ đề {id}</title>
      </Head>
      <Navbar headers={headers} />
      <ListTopicNews
        arrBlogs={arrBlogs}
        arrCats={arrCats}
        arrNewsestPost={postNewest}
        idCat={id}
      />
    </>
  );
}
