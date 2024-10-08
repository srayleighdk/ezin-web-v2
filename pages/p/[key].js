import React, { Component } from "react";
import PageBanner from "../../components/Common/PageBanner";
import { getPageContents, getHeader, getAllNodeProducts } from "../api";
import { createMarkupNormal } from "../../utils/auth.helper";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const [res, headers, allNodeProducts] = await Promise.all([
    getPageContents(params.key),
    getHeader(),
    getAllNodeProducts(),
  ]);
  return {
    props: {
      data: res?.data?.data,
      headers: headers?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { key: "dieu-khoan" } },
      { params: { key: "chinh-sach-bao-mat" } },
      { params: { key: "chinh-sach-thanh-toan" } },
      { params: { key: "chinh-sach-giao-hang" } },
      { params: { key: "chinh-sach-doi-tra" } },
    ],
    fallback: false,
  };
}

const TermsConditions = ({ data, headers, allNodeProducts }) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="text-container mt-5 ptb-100">
        <div className="container">
          {data ? (
            <>
              {/* <img src="/images/comming.jpg" alt="comming-soon" /> */}
              <h2
                className="text-left uppercase font-weight-bold text-header"
                style={{ color: "#167ffc" }}
              >
                {data.name}
              </h2>
              <div className="pt-5">
                <div
                  dangerouslySetInnerHTML={createMarkupNormal(data.description)}
                  className="text-gray"
                />
              </div>
            </>
          ) : (
            <div>
              Xin lỗi chúng tôi không tìm thấy nội dung này. Quay về{" "}
              <Link href="/">Trang chủ</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
