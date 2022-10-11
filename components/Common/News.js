import React, { Component } from 'react';
import Link from 'next/link';

class News extends Component {
    render() {
        return (
            <section className="news-area pt-100 pb-70">
                <div className="container">
                    <div className="section-title text-40">
                        {/* <span>Latest News</span> */}
                        <h2 className="color-primary">Câu Chuyện <span>Eziner</span> </h2>
                        {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsum fugit temporibus possimus itaque accusamus voluptatibus dignissimos nobis eaque.</p> */}
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-news">
                                <div className="blog-img">
                                    <Link href="/news-details">
                                        <a>
                                            <img src="/images/cau-chuyen-eziner/Rectangle1.png" alt="Rectangle1" />
                                        </a>
                                    </Link>

                                    <div className="dates">
                                        <span style={{fontFamily: 'Inter'}}>20 February</span>
                                    </div>
                                </div>

                                <div className="news-content-wrap">
                                    <ul>
                                        <li>
                                            <Link href="/news-grid"> 
                                                <a style={{fontFamily: 'Inter'}}>
                                                    <i className="flaticon-user"></i> Admin
                                                </a>
                                            </Link>
                                        </li>
                                        <li style={{fontFamily: 'Inter'}}>
                                            <i className="flaticon-conversation"></i> 2 Comments
                                        </li>
                                    </ul>

                                    <Link href="/news-details">
                                        <a>
                                            <h3>6 yếu tố ảnh hưởng đến phí bảo hiểm nhân thọ</h3>
                                        </a>
                                    </Link>

                                    <p className='style-font-p eziner-news text-dot-3'>Tuổi, tình trạng sức khỏe, loại bảo hiểm, sản phẩm bổ trợ, thời hạn và số tiền bảo hiểm...</p>
                                    
                                    <Link href="/news-details">
                                        <a className="read-more" style={{fontFamily: 'Inter'}}>
                                            Đọc tiếp <svg style={{height: '12px', width: '7px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-news">
                                <div className="blog-img">
                                    <Link href="/news-details">
                                        <a>
                                            <img src="/images/cau-chuyen-eziner/Rectangle2.png" alt="Rectangle2" />
                                        </a>
                                    </Link>

                                    <div className="dates">
                                        <span style={{fontFamily: 'Inter'}}>21 February</span>
                                    </div>
                                </div>

                                <div className="news-content-wrap">
                                    <ul>
                                        <li>
                                            <Link href="/news-grid"> 
                                                <a style={{fontFamily: 'Inter'}}>
                                                    <i className="flaticon-user"></i> Admin
                                                </a>
                                            </Link>
                                        </li>
                                        <li style={{fontFamily: 'Inter'}}>
                                            <i className="flaticon-conversation"></i> 3 Comments
                                        </li>
                                    </ul>

                                    <Link href="/news-details">
                                        <a>
                                            <h3>Có nên mua thêm bảo hiểm nhân thọ khi thu nhập tăng?</h3>
                                        </a>
                                    </Link>

                                    <p className='style-font-p'>Nếu thu nhập tăng ít, bạn không nên mua thêm bảo hiểm còn khi thu nhập tăng đáng kể...</p>
                                    
                                    <Link href="/news-details">
                                        <a className="read-more" style={{fontFamily: 'Inter'}}>
                                            Đọc tiếp <svg style={{height: '12px', width: '7px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                            <div className="single-news">
                                <div className="blog-img">
                                    <Link href="/news-details">
                                        <a>
                                            <img src="/images/cau-chuyen-eziner/Rectangle3.png" alt="Rectangle3" />
                                        </a>
                                    </Link>

                                    <div className="dates">
                                        <span style={{fontFamily: 'Inter'}}>22 February</span>
                                    </div>
                                </div>

                                <div className="news-content-wrap">
                                    <ul>
                                        <li>
                                            <Link href="/news-grid"> 
                                                <a style={{fontFamily: 'Inter'}}>
                                                    <i className="flaticon-user"></i> Admin
                                                </a>
                                            </Link>
                                        </li>
                                        <li style={{fontFamily: 'Inter'}}>
                                            <i className="flaticon-conversation"></i> 4 Comments
                                        </li>
                                    </ul>

                                    <Link href="/news-details">
                                        <a>
                                            <h3>5 lầm tưởng phổ biến về bảo hiểm nhân thọ</h3>
                                        </a>
                                    </Link>

                                    <p className='style-font-p'>Còn trẻ không cần đến bảo hiểm nhân thọ, phải có điều kiện kinh tế mới có thể tham gia bảo hiểm..</p>

                                    <Link href="/news-details">
                                        <a className="read-more" style={{fontFamily: 'Inter'}}>
                                            Đọc tiếp <svg style={{height: '12px', width: '7px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                       <div className="slider-btn d-flex justify-content-center">
                                                <Link href="/contact">
                                                    <a className="default-btn white" style={{fontFamily: 'Inter'}}>
                                                        Xem Thêm
                                                    </a>
                                                </Link>
                        </div> 
                    </div>
                </div>
            </section>
        );
    }
}

export default News;