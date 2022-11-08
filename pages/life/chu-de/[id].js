import React, { Component } from "react";
import NewsSidebar from "../../../components/News/NewsSidebar";
import ListTopic from "../../../components/News/ListTopic";
import Link from "next/link";
import CommentsArea from "../../../components/News/CommentsArea";
import {
  getPostCategories,
  getNewestPost,
  getPostDetails,
  getNewsByChuDe,
} from "../../../pages/api";
import styles from "../life.module.scss";
import { createMarkup } from "../../../utils/auth.helper";
import dayjs from "dayjs";

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts
  const id = context.query.id;
  const [res1, res2, res3] = await Promise.all([
    getNewsByChuDe(id),
    getNewestPost(),
    getPostCategories(),
  ]);
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
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
  return (
    <>
      <ListTopic
        arrBlogs={arrBlogs}
        arrCats={arrCats}
        arrNewsestPost={postNewest}
        idCat={id}
      />
    </>
  );
}
