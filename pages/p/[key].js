import React, { Component } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import PageBanner from '../../components/Common/PageBanner';
import Footer from '../../components/Layouts/Footer';
import { getPageContents, getHeader } from '../api';
import { createMarkupNormal } from '../../utils/helpers';

export async function getStaticProps({ params }) {
  const [res, headers] = await Promise.all([getPageContents(params.key), getHeader()])
  return {
    props: {
      data: res?.data?.data,
      headers: headers?.data?.data
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { key: 'dieu-khoan' } },
      { params: { key: 'chinh-sach-bao-mat' } },
      { params: { key: 'chinh-sach-thanh-toan' } },
      { params: { key: 'chinh-sach-giao-hang' } },
      { params: { key: 'chinh-sach-doi-tra' } },
    ],
    fallback: false
  };
}

const TermsConditions = ({ data, headers }) => {
  return (
    <>
      <Navbar headers={headers} />

      <PageBanner
        pageTitle="Terms & Conditions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Terms & Conditions"
      />

      <div className="text-container ptb-100">
        <div className="container">
          {data
            ? (
              <>
                {/* <img src="/images/comming.jpg" alt="comming-soon" /> */}
                < h2 className="text-left uppercase font-weight-bold text-header" style={{ color: "#167ffc" }}>
                  {data.name}
                </h2>
                <div className="pt-5">
                  <div
                    dangerouslySetInnerHTML={createMarkupNormal(data.description)}
                    className="text-gray"
                  />
                </div>
              </>
            )
            : (<div>Xin lỗi chúng tôi không tìm thấy nội dung này. Quay về <Link href="/">Trang chủ</Link></div>)
          }

        </div>
      </div>

      <Footer />
    </>
  );

}

export default TermsConditions;
