import React, { Component } from "react";
import NewsSidebar from "../../components/Blogs/NewsSidebar";
import Link from "next/link";
import { getAllBlogCats, getBlogDetail } from "../api/index";
import styles from "../life/life.module.scss";
import { createMarkup } from "../../utils/auth.helper";
import dayjs from "dayjs";

export default function Blog({ arrCats = [], blogDetail = [] }) {
  return (
    <>
      <section className="news-details-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="blog-details-desc">
                {/* <div className="article-image">
                  <img
                    src={blogDetail?.post_thumbnail}
                    alt="Image"
                    className={`${styles.life_title_img}`}
                  />
                </div> */}

                <div className="article-content">
                  <div className="entry-meta">
                    <ul>
                      <li>
                        <span>Posted On:</span>{" "}
                        {dayjs(blogDetail?.published_on).format("DD-MM-YYYY")}
                      </li>
                      <li>
                        <span>Posted By:</span>
                        <Link href="#">
                          <a>{blogDetail?.author[0]?.name}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <h2 className="mt-3">{blogDetail?.title}</h2>

                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      blogDetail?.short_description
                    )}
                  ></div>

                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      blogDetail?.description.replace(/\n/g, "")
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
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <NewsSidebar arrCats={arrCats} tags={blogDetail?.tags} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Blog.getInitialProps = async ({ query: { id } }) => {
  let [res1, res2] = await Promise.all([getAllBlogCats(), getBlogDetail(id)]);
  return {
    arrCats: res1?.data?.data,
    blogDetail: res2?.data?.data,
  };
};
