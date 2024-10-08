import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import NewsSidebarNews from "./NewsSidebarNews";
import dayjs from "dayjs";
import styles from "../../pages/life/life.module.scss";

export default function ListTopicNews({
  arrBlogs,
  arrCats,
  arrNewsestPost,
  idCat,
}) {
  const paginationNumber = Math.ceil(arrBlogs?.length / 6);
  const [pagiNumber, setPagiNumber] = useState(1);
  const isVideo = idCat == "video";
  let pagination = [];
  for (var i = 0; i < paginationNumber; i++) {
    pagination[i] = i;
  }

  return (
    <section
      className="news-details-area news-right-sidebar-area my-3 pt-5"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="row">
              {idCat && (
                <div className="my-2 text-16">
                  Chủ đề:{" "}
                  <span className="badge bg-primary text-16">{idCat}</span>
                </div>
              )}
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
                    return !isVideo ? (
                      <>
                        <div className="col-lg-6 col-md-6" key={index}>
                          <div className="single-news">
                            <div className="blog-img">
                              <Link href={item.img_hor}>
                                <a>
                                  <img
                                    src={item.img_hor}
                                    style={{ height: 240 }}
                                    alt="Image"
                                  />
                                </a>
                              </Link>

                              <div className="dates">
                                <span>
                                  {dayjs(item.publishedAt).format("DD-MM-YYYY")}
                                </span>
                              </div>
                            </div>

                            <div
                              className={`news-content-wrap ${styles.height_313} p-4`}
                            >
                              <ul className="mb-0">
                                <li>
                                  <Link
                                    href={`/tin-tuc/cat/${item.categories[0].url}`}
                                  >
                                    <a>
                                      <i>{item.categories[0].name}</i>
                                    </a>
                                  </Link>
                                </li>
                              </ul>

                              <Link href={`/tin-tuc/${item.url}`}>
                                <a>
                                  <h3>{item.title}</h3>
                                </a>
                              </Link>

                              <p
                                className={`${styles.post_description} text-dot-4`}
                              >
                                {item.description}
                              </p>

                              <Link href={`/tin-tuc/${item.url}`}>
                                <a className="read-more">
                                  Xem thêm <i className="bx bx-plus"></i>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-lg-12 col-md-12">
                          <div className="single-news">
                            <h3 className="mb-0">{item.title}</h3>
                            <span>Theo </span>
                            <Link
                              href={`https://${item.from_source}${item.post_url}`}
                            >
                              <a>{item.from_source}</a>
                            </Link>
                            <div>
                              <ReactPlayer url={item.video_url} />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                })
              )}

              {/* Pagination */}
              {paginationNumber === 0 ? null : (
                <div className="col-lg-12">
                  <div className="page-navigation-area">
                    <nav aria-label="Page navigation example text-center">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            pagiNumber === 1 && "d-none"
                          }`}
                          onClick={() => {
                            setPagiNumber(pagiNumber - 1);
                            setTimeout(function () {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                            }, 100);
                          }}
                        >
                          <a className="page-link page-links">
                            <i className="bx bx-chevrons-left"></i>
                          </a>
                        </li>

                        {pagination.map((item) => {
                          if (pagiNumber === item + 1) {
                            return (
                              <>
                                <li
                                  key={item._id}
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
                                      top: 0,
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

                        <li
                          className={`page-item ${
                            pagiNumber === paginationNumber && "d-none"
                          }`}
                          onClick={() => {
                            setPagiNumber(pagiNumber + 1);
                            setTimeout(function () {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                            }, 100);
                          }}
                        >
                          <a className="page-link">
                            <i className="bx bx-chevrons-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <NewsSidebarNews
              arrCats={arrCats}
              arrNewsestPost={arrNewsestPost}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
