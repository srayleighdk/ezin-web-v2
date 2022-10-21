import React from "react";
import ListNewsBlogs from "../../components/News/ListNewsBlogs";
import Link from "next/link";
import { getHomeBlogs, getAllBlogCats } from "../api/index";
import { createMarkup } from "../../utils/auth.helper";
import FullImage from "../../components/FullImage";
import { getImageUrl } from "../../utils/auth.helper";

export default function KienThuc({ arrBlogs, arrCatBlogs }) {
  return (
    <>
      <ListNewsBlogs arrBlogs={arrBlogs} arrCats={arrCatBlogs} />
    </>
  );
}

export async function getServerSideProps() {
  let [res1, res2] = await Promise.all([getHomeBlogs(), getAllBlogCats()]);
  return {
    props: {
      arrBlogs: res1?.data?.data,
      arrCatBlogs: res2?.data?.data,
    },
  };
}
