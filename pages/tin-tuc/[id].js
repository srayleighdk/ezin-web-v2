import React, { Component } from "react";
import NewsSidebarNews from "../../components/News/NewsSidebarNews";
import Link from "next/link";
import CommentsArea from "../../components/News/CommentsArea";
import {
  getPostCategories,
  getNewestPost,
  getNewsDetails,
  getHeader,
} from "../../pages/api";
import styles from "../life/life.module.scss";
import { createMarkup } from "../../utils/auth.helper";
import dayjs from "dayjs";
import Head from "next/head";

export default function Blog({
  arrCats = [],
  arrNewsestPost = [],
  blogDetail = [],
  headers,
}) {
  return (
    <>
      <Head>
        <title>{blogDetail.title}</title>
      </Head>
      <section
        className="news-details-area ptb-100 mt-5 pt-5"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="blog-details-desc">
                <div className="article-image">
                  <img
                    src={blogDetail?.img_hor}
                    alt="Image"
                    className={`${styles.life_title_img}`}
                  />
                </div>

                <div className="article-content">
                  <div className="col-lg-12 col-md-12">
                    <div className="single-news mb-2">
                      <h4 className="mb-0">{blogDetail.title}</h4>
                      <span>Theo </span>
                      <Link
                        href={`https://${blogDetail.from_source}${blogDetail.post_url}`}
                      >
                        <a>{blogDetail.from_source}</a>
                      </Link>
                      {/* <span>
                        {dayjs(blogDetail?.publishedAt).format("DD-MM-YYYY")}
                      </span> */}
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      blogDetail?.description
                    )}
                  ></div>

                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      blogDetail?.content.replace(/\n/g, "")
                    )}
                  ></div>
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
              <NewsSidebarNews
                arrCats={arrCats}
                arrNewsestPost={arrNewsestPost}
                tags={blogDetail?.tags}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Blog.getInitialProps = async ({ query: { id } }) => {
  let [res, res1, res2, res3] = await Promise.all([
    getHeader(),
    getPostCategories(),
    getNewestPost(),
    getNewsDetails(id),
  ]);
  return {
    headers: res?.data?.data,
    arrCats: res1?.data?.data,
    arrNewsestPost: res2?.data?.data,
    blogDetail: res3?.data?.data,
  };
};
