import React, { Component } from "react";
import Link from "next/link";
import dayjs from "dayjs";

export default function NewsSidebar({ arrCats, arrNewsestPost }) {
  console.log("res3", arrCats, arrNewsestPost);
  return (
    <div className="widget-area" id="secondary">
      <div className="widget widget_search">
        <h3 className="widget-title">Search Now</h3>

        <div className="post-wrap">
          <form className="search-form">
            <label>
              <input
                type="search"
                className="search-field"
                placeholder="Search..."
              />
            </label>

            <button type="submit">
              <i className="bx bx-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="widget widget-posts-thumb">
        <h3 className="widget-title">Newsest Posts</h3>

        <div className="post-wrap">
          {arrNewsestPost?.map((item) => {
            return (
              <article className="item">
                <Link href="/news-details">
                  <a className="thumb">
                    <span
                      className="fullimage cover bg1"
                      role="img"
                      style={{ backgroundImage: `url(${item.post_thumbnail})` }}
                    ></span>
                  </a>
                </Link>

                <div className="info">
                  <time>{dayjs(item.updated_at).format("DD-MM-YYYY")}</time>
                  <h4 className="title usmall">
                    <Link href="/news-details">
                      <a>{item.post.post_title}</a>
                    </Link>
                  </h4>
                </div>

                <div className="clear"></div>
              </article>
            );
          })}
          {/* <article className="item">
            <Link href="/news-details">
              <a className="thumb">
                <span className="fullimage cover bg1" role="img"></span>
              </a>
            </Link>

            <div className="info">
              <time>February 20, 2020</time>
              <h4 className="title usmall">
                <Link href="/news-details">
                  <a>Making Peace With The Feast Or Famine Of Freelancing</a>
                </Link>
              </h4>
            </div>

            <div className="clear"></div>
          </article> */}
        </div>
      </div>

      <div className="widget widget_categories">
        <h3 className="widget-title">Categories</h3>

        <div className="post-wrap">
          <ul>
            {arrCats?.map((item) => {
              return (
                <li>
                  <Link href={`/life/cat/${item.slug}`}>
                    <a>
                        {item.name} <span>{item.count}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
            {/* <li>
              <Link href="#">
                <a>
                  Business <span>(10)</span>
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="widget widget_tag_cloud">
        <h3 className="widget-title">Tags</h3>

        <div className="post-wrap">
          <div className="tagcloud">
            {arrCats?.map((item) => {
              return (
                <Link href={`/life/cat/${item.slug}`}>
                  <a>
                    {item.name} ({item.count})
                  </a>
                </Link>
              );
            })}
            {/* <Link href="#">
              <a>IT Solution (3)</a>
            </Link>
            <Link href="#">
              <a>Uncategorized (3)</a>
            </Link>
            <Link href="#">
              <a>Tips (2)</a>
            </Link>
            <Link href="#">
              <a>AI Solution (2)</a>
            </Link>
            <Link href="#">
              <a>Technology (1)</a>
            </Link>
            <Link href="#">
              <a>Privacy (1)</a>
            </Link>
            <Link href="#">
              <a>Business (1)</a>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
