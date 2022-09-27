import React, { useEffect, useState } from "react";
import Link from "next/link";
import NewsSidebar from "./NewsSidebar";
import dayjs from "dayjs";

export default function NewsGridTwo({ arrBlogs, arrCats, arrNewsestPost }) {
  console.log("res2", arrCats, arrNewsestPost);
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
              {arrBlogs?.map((item, index) => {
                if (
                  index >= (pagiNumber - 1) * 6 &&
                  index <= pagiNumber * 6 - 1
                ) {
                  return (
                    <div className="col-lg-6 col-md-6">
                      <div className="single-news">
                        <div className="blog-img">
                          <Link href={`/life/p/${item.post_id}/${item.post.post_name}`}>
                            <a>
                              <img
                                src={item.post_thumbnail}
                                style={{ height: 240 }}
                                alt="Image"
                              />
                            </a>
                          </Link>

                          <div className="dates">
                            <span>{dayjs(item.updated_at).format("DD-MM-YYYY")}</span>
                          </div>
                        </div>

                        <div className="news-content-wrap">
                          <ul>
                            <li>
                              <Link href={`/life/p/${item.post_id}/${item.post.post_name}`}>
                                <a>
                                  <i className="flaticon-user"></i> {item.post.post_author}
                                </a>
                              </Link>
                            </li>
                            <li>
                              <i className="flaticon-conversation"></i> {item.post.comment_count} Bình luận
                            </li>
                          </ul>

                          <Link href={`/life/p/${item.post_id}/${item.post.post_name}`}>
                            <a>
                              <h3>{item.post.post_title}</h3>
                            </a>
                          </Link>

                          <p>{item.post.post_excerpt}</p>

                          <Link href={`/life/p/${item.post_id}/${item.post.post_name}`}>
                            <a className="read-more">
                              Xem thêm <i className="bx bx-plus"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {/* <div className="col-lg-6 col-md-6">
                <div className="single-news">
                  <div className="blog-img">
                    <Link href="/news-details">
                      <a>
                        <img src="/images/blog/blog4.png" alt="Image" />
                      </a>
                    </Link>

                    <div className="dates">
                      <span>23 February</span>
                    </div>
                  </div>

                  <div className="news-content-wrap">
                    <ul>
                      <li>
                        <Link href="#">
                          <a>
                            <i className="flaticon-user"></i> Admin
                          </a>
                        </Link>
                      </li>
                      <li>
                        <i className="flaticon-conversation"></i> 2 Comments
                      </li>
                    </ul>

                    <Link href="/news-details">
                      <a>
                        <h3>The Security Risks Of Changing Package Owners</h3>
                      </a>
                    </Link>

                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Fuga veritatis veniam corrupti perferendis minima in.
                    </p>

                    <Link href="/news-details">
                      <a className="read-more">
                        Read More <i className="bx bx-plus"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div> */}

              {/* Pagination */}
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
                                      behavior: 'smooth',
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
                                    behavior: 'smooth',
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
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <NewsSidebar arrCats={arrCats} arrNewsestPost={arrNewsestPost} />
          </div>
        </div>
      </div>
    </section>
  );
}
