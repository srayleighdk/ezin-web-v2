import React, { Component } from 'react';

class CommunityEzin extends Component {
    render() {
        return (
            <div className="brand-area bg-community py-3">
                <div className="container mb-5 text-white">
                    <div className="section-title my-4">
                        <h2 className="text-white">Cộng đồng Ezin</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 text-center position-relative line-right">
                            <p className="text-16 mb-0 line-height-60" style={{height: 60}}>Số Eziner được bảo vệ</p>
                            <p className="text-40 font-weight-700">7K</p>
                        </div>
                        <div className="col-lg-2 text-center position-relative line-right" >
                            <p className="text-16 mb-0 line-height-60" style={{height: 60}}>Số EzCoin kiếm được</p>
                            <p className="text-40 font-weight-700">100M</p>
                        </div>
                        <div className="col-lg-2 text-center position-relative line-right" >
                            <p className="text-16 mb-0 line-height-60" style={{height: 60}}>Số Km an toàn</p>
                            <p className="text-40 font-weight-700">200K</p>
                        </div>
                        <div className="col-lg-2 text-center position-relative line-right" >
                            <p className="text-16 mb-0 line-height-60" style={{height: 60}}>Fan Facebook</p>
                            <p className="text-40 font-weight-700">100K</p>
                        </div>
                        <div className="col-lg-2 text-center position-relative line-right" >
                            <p className="text-16 mb-0 line-height-60" style={{height: 60}}>Số EzStore</p>
                            <p className="text-40 font-weight-700">50</p>
                        </div>
                        <div className="col-lg-2 text-center" >
                            <p className="text-16 mb-0" style={{height: 60}}>Số người nhận được quyền lợi BH</p>
                            <p className="text-40 font-weight-700">13K</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommunityEzin;
