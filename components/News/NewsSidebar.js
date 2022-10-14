import React, { Component } from "react";
import Link from "next/link";
import dayjs from "dayjs";

const titles = {
  "tin-nong": "Tin nóng",
  covid: "COVID",
  video: "Video",
  "tai-nan": "Tai nạn",
};

export default function NewsSidebar({ arrCats, arrNewsestPost, tags = [] }) {
  return (
    <div className="widget-area" id="secondary">
      <div className="widget widget_search">
        <h3 className="widget-title">Tìm kiếm</h3>

        <div className="post-wrap">
          <form className="search-form">
            <label>
              <input
                type="search"
                className="search-field"
                placeholder="Tìm kiếm..."
              />
            </label>

            <button type="submit">
              <i className="bx bx-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="widget widget-posts-thumb">
        <h3 className="widget-title">Bài viết mới nhất</h3>

        <div className="post-wrap">
          {arrNewsestPost?.map((item, index) => {
            return (
              <article className="item" key={index}>
                <Link href={`/life/p/${item.post_id}/${item.post.post_name}`}>
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
                    <Link
                      href={`/life/p/${item.post_id}/${item.post.post_name}`}
                    >
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
        <h3 className="widget-title">Chuyên mục</h3>

        <div className="post-wrap">
          <ul>
            {arrCats?.map((item, index) => {
              return (
                <li key={index}>
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

      <div className="widget widget_categories">
        <h3 className="widget-title">Chủ đề</h3>

        <div className="post-wrap">
          <ul>
            <li>
              <Link href={`/life/chu-de/tin-nong`}>
                <a>Tin nóng</a>
              </Link>
            </li>
            <li>
              <Link href={`/life/chu-de/covid`}>
                <a>COVID</a>
              </Link>
            </li>
            <li>
              <Link href={`/life/chu-de/video`}>
                <a>Video</a>
              </Link>
            </li>
            <li>
              <Link href={`/life/chu-de/tai-nan`}>
                <a>Tai nạn</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {tags?.length === 0 ? null : (
        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">Tags</h3>

          <div className="post-wrap">
            <div className="tagcloud">
              {tags?.map((item, index) => {
                return (
                  // <div>{item.name}</div>
                  <Link href={`/life/tags/${item.slug}`} key={index}>
                    <a>{item.name || item.label}</a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
