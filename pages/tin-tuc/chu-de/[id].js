import React, { Component } from "react";
// import NewsSidebar from "../../../components/News/NewsSidebar";
import ListTopicNews from "../../../components/News/ListTopicNews";
// import Link from "next/link";
// import CommentsArea from "../../../components/News/CommentsArea";
import {
  getPostCategories,
  getNewestPost,
  getNewsByChuDe,
} from "../../../pages/api";
// import styles from "../life.module.scss";
// import { createMarkup } from "../../../utils/auth.helper";
// import dayjs from "dayjs";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const [res1, res2, res3] = await Promise.all([
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
    },
  };
}

export default function CatList({
  id,
  arrBlogs = [],
  postNewest = [],
  arrCats = [],
}) {
  console.log("CatList", id, arrBlogs, postNewest);
  return (
    <>
      <ListTopicNews
        arrBlogs={arrBlogs}
        arrCats={arrCats}
        arrNewsestPost={postNewest}
        idCat={id}
      />
    </>
  );
}