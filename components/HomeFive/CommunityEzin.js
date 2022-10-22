import React, { useEffect } from "react";

export default function CommunityEzin() {
  //   useEffect(() => {
  //   }, [screenX]);

  return (
    <div className="brand-area bg-community py-3">
      <div className="container mb-5 text-white">
        <div className="section-title my-4 text-40">
          <h2 className="text-white">Cộng đồng Ezin</h2>
        </div>
        <div className="row">
          <div className="col-lg-2 text-center position-relative line-right d-flex flex-row-reverse flex-lg-column justify-content-around align-items-center">
            <p className="text-16 mb-0 w-xs-comunity">Số Eziner được bảo vệ</p>
            <p className="text-40 font-weight-700">7K</p>
          </div>
          <div className="col-lg-2 text-center position-relative line-right d-flex flex-row-reverse flex-lg-column justify-content-around align-items-center">
            <p className="text-16 mb-0 w-xs-comunity">Số EzCoin kiếm được</p>
            <p className="text-40 font-weight-700">100M</p>
          </div>
          <div className="col-lg-2 text-center position-relative line-right d-flex flex-row-reverse flex-lg-column justify-content-around align-items-center">
            <p className="text-16 mb-0 w-xs-comunity">Số Km an toàn</p>
            <p className="text-40 font-weight-700">200K</p>
          </div>
          <div className="col-lg-2 text-center position-relative line-right d-flex flex-row-reverse flex-lg-column justify-content-around align-items-center">
            <p className="text-16 mb-0 w-xs-comunity">Fan Facebook</p>
            <p className="text-40 font-weight-700">100K</p>
          </div>
          <div className="col-lg-2 text-center position-relative line-right d-flex flex-row-reverse flex-lg-column justify-content-around align-items-center">
            <p className="text-16 mb-0 w-xs-comunity">Số EzStore</p>
            <p className="text-40 font-weight-700">50</p>
          </div>
          <div className="col-lg-2 text-center d-flex flex-row-reverse flex-lg-column justify-content-around align-items-center">
            <p className="text-16 mb-0 w-xs-comunity">
              Số người nhận được quyền lợi BH
            </p>
            <p className="text-40 font-weight-700">13K</p>
          </div>
        </div>
      </div>
    </div>
  );
}
