import React, { Component } from "react";
import NewsSidebar from "../../../components/News/NewsSidebar";
import Link from "next/link";
import Navbar from "../../../components/Layouts/Navbar";
import Footer from "../../../components/Layouts/Footer";
import CommentsArea from "../../../components/News/CommentsArea";
import {
  getPostCategories,
  getNewestPost,
  getPostDetails,
  getHeader,
} from "../../../pages/api";
import styles from "../life.module.scss";
import { createMarkup } from "../../../utils/auth.helper";
import dayjs from "dayjs";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const id = slug[0];
  let [res1, res2, res3, res4] = await Promise.all([
    getPostCategories(),
    getNewestPost(),
    getPostDetails(id),
    getHeader(),
  ]);
  return {
    props: {
      arrCats: res1?.data?.data,
      arrNewsestPost: res2?.data?.data,
      blogDetail: res3?.data?.data,
      headers: res4?.data?.data,
    },
  };
}

export default function NewsDetailsContent({
  arrCats = [],
  arrNewsestPost = [],
  blogDetail = [],
  headers = [],
}) {
  return (
    <>
      <Head>
        <title>{blogDetail?.post?.post_title}</title>
      </Head>
      <section className="news-details-area ptb-100 mt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="blog-details-desc">
                <div className="article-image">
                  <img
                    src={blogDetail?.post_thumbnail}
                    alt="Image"
                    className={`${styles.life_title_img}`}
                  />
                </div>

                <div className="article-content">
                  <div className="entry-meta">
                    <ul>
                      <li>
                        <span>Posted On:</span>{" "}
                        {dayjs(blogDetail?.updated_at).format("DD-MM-YYYY")}
                      </li>
                      <li>
                        <span>Posted By:</span>
                        <Link href="#">
                          <a>{blogDetail?.post?.post_author}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <h2 className="mt-3">{blogDetail?.post?.post_title}</h2>

                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      blogDetail?.description
                    )}
                  ></p>

                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      blogDetail?.post?.post_content.replace(/\n/g, "")
                    )}
                  ></p>
                </div>

                <div className="article-footer">
                  <div className="article-tags">
                    <span>
                      <i className="bx bx-share-alt"></i>
                    </span>
                    <Link href="#">
                      <a>Share</a>
                    </Link>
                  </div>

                  <div className="article-share">
                    <ul className="social">
                      <li>
                        <a href="https://www.facebook.com/" target="_blank">
                          <i className="bx bxl-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.twitter.com/" target="_blank">
                          <i className="bx bxl-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/" target="_blank">
                          <i className="bx bxl-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.pinterest.com/" target="_blank">
                          <i className="bx bxl-pinterest-alt"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <div className="post-navigation">
                <div className="navigation-links">
                  <div className="nav-previous">
                    <Link href="#">
                      <a>
                        <i className="bx bx-left-arrow-alt"></i> Prev Post
                      </a>
                    </Link>
                  </div>

                  <div className="nav-next">
                    <Link href="#">
                      <a>
                        Next Post <i className="bx bx-right-arrow-alt"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div> */}

                {/* Comments Area */}
                {/* <CommentsArea /> */}
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <NewsSidebar
                arrCats={arrCats}
                arrNewsestPost={arrNewsestPost}
                tags={blogDetail?.taxonomies?.post_tag}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
