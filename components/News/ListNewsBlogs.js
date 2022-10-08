import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import Link from "next/link";
import NewsBarBlogs from "./NewsBarBlogs";
import dayjs from "dayjs";
import styles from "../../pages/life/life.module.scss";
import FullImage from "../FullImage";
import { getImageUrl } from "../../utils/helpers";

export default function ListNewsBlogs({
  arrBlogs,
  arrCats,
}) {
  console.log("res2", arrCats, arrBlogs);
  const paginationNumber = Math.ceil(arrBlogs?.length / 6);
  const [pagiNumber, setPagiNumber] = useState(1);
  let pagination = [];
  for (var i = 0; i < paginationNumber; i++) {
    pagination[i] = i;
  }

  return (
    <section className="news-details-area news-right-sidebar-area ptb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="row">
              {/* {idCat && (
                <div className="my-2 text-16">
                  Chuyên mục:{" "}
                  <span class="badge bg-primary text-16">{idCat}</span>
                </div>
              )} */}
              {arrBlogs?.length === 0 ? (
                <h4 className="text-center">
                  Hiện Ezin chưa có bài viết chủ đề này, vui lòng quay lại sau
                  nhé!
                </h4>
              ) : (
                arrBlogs?.map((item, index) => {
                  if (
                    index >= (pagiNumber - 1) * 6 &&
                    index <= pagiNumber * 6 - 1
                  ) {
                    return (
                      <>
                        <div className="col-lg-6 col-md-6">
                          <div className="single-news">
                            <div className="blog-img">
                              {/* <FullImage src={getImageUrl(item?.image?.path)} alt="img-blog" maxWidth="250px" /> */}

                              <div className="dates">
                                <span>
                                  {dayjs(item.published_on).format("DD-MM-YYYY")}
                                </span>
                              </div>
                            </div>

                            <div
                              className={`news-content-wrap ${styles.height_313}`}
                            >
                              <ul>
                                <li>
                                  <Link
                                    href={`/kien-thuc/${item.slug_url}`}
                                  >
                                    <a>
                                      <i className="flaticon-user"></i>{" "}
                                      {item.author[0].name}
                                    </a>
                                  </Link>
                                </li>
                                {/* <li>
                                  <i className="flaticon-conversation"></i>{" "}
                                  {item.post.comment_count} Bình luận
                                </li> */}
                              </ul>

                              <Link
                                href={`/kien-thuc/${item.slug_url}`}
                              >
                                <a>
                                  <h3>{item.title}</h3>
                                </a>
                              </Link>

                              <p
                                className={`${styles.post_description} text-dot-4`}
                              >
                                {item.short_description}
                              </p>

                              <Link
                                href={`/kien-thuc/${item.slug_url}`}
                              >
                                <a className="read-more">
                                  Xem thêm <i className="bx bx-plus"></i>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                })
              )}

              {/* Pagination */}
              {paginationNumber === 0 ? null :
                <div className="col-lg-12">
                  <div className="page-navigation-area">
                    <nav aria-label="Page navigation example text-center">
                      <ul className="pagination">
                        <li className="page-item">
                          <Link href="#">
                            <a className="page-link page-links">
                              <i className="bx bx-chevrons-left"></i>
                            </a>
                          </Link>
                        </li>

                        {pagination.map((item) => {
                          if (pagiNumber === item + 1) {
                            return (
                              <>
                                <li
                                  className="page-item active cursor-pointer"
                                  onClick={() => {
                                    setPagiNumber(item + 1);
                                    setTimeout(function () {
                                      window.scroll({
                                        top: 400,
                                        left: 0,
                                        behavior: "smooth",
                                      });
                                    }, 100);
                                  }}
                                >
                                  <a className="page-link">{item + 1}</a>
                                </li>
                              </>
                            );
                          }
                          return (
                            <>
                              <li
                                className="page-item cursor-pointer"
                                onClick={() => {
                                  setPagiNumber(item + 1);
                                  setTimeout(function () {
                                    window.scroll({
                                      top: 400,
                                      left: 0,
                                      behavior: "smooth",
                                    });
                                  }, 100);
                                }}
                              >
                                <a className="page-link">{item + 1}</a>
                              </li>
                            </>
                          );
                        })}

                        <li className="page-item">
                          <Link href="#">
                            <a className="page-link">
                              <i className="bx bx-chevrons-right"></i>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <NewsBarBlogs arrCats={arrCats}  />
          </div>
        </div>
      </div>
    </section>
  );
}
