import React, { Component } from "react";
import Link from "next/link";
import dayjs from "dayjs";

const titles = {
  "tin-nong": "Tin nóng",
  covid: "COVID",
  video: "Video",
  "tai-nan": "Tai nạn",
};

export default function NewsSidebar({ arrCats, tags = [] }) {
  return (
    <div className="widget-area" id="secondary">
      {/* <div className="widget widget_search">
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
      </div> */}

      <div className="widget widget_categories">
        <h3 className="widget-title">Chuyên mục</h3>

        <div className="post-wrap">
          <ul>
            {arrCats?.map((item) => {
              return (
                <li>
                  <Link href={`/kien-thuc/cat/${item.slug_url}`}>
                    <a>
                      {item.title}
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

      {tags?.length === 0 ? null : (
        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">Tags</h3>

          <div className="post-wrap">
            <div className="tagcloud">
              {tags?.map((item) => {
                return (
                  // <div>{item.name}</div>
                  <Link href={`/life/tags/${item.slug}`}>
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
