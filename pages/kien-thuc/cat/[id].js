import React from "react";
import NewsSidebar from "../../../components/News/NewsSidebar";
import ListNewsLife from "../../../components/Blogs/ListNewsLife";
import Link from "next/link";
import CommentsArea from "../../../components/News/CommentsArea";
import { getAllBlogCats } from "../../../pages/api";
// import styles from "../life.module.scss";
import { createMarkup } from "../../../utils/auth.helper";
import dayjs from "dayjs";

export default function CatBlogs({ id, arrBlogs = [] }) {
  return (
    <>
      {/* <ListNewsLife arrBlogs={arrBlogs} arrCats={arrCats} arrNewsestPost={postNewest} idCat={id}/> */}
    </>
  );
}

CatBlogs.getInitialProps = async ({ query: { id } }) => {
  const [res1] = await Promise.all([getAllBlogCats(`cat=${id}`)]);
  return {
    arrBlogs: res1?.data?.data,
    id: id,
  };
};
