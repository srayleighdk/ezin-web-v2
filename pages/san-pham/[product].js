import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Product/PageBanner";
import PricingStyleOne from "../../components/Product/PricingStyleOne";
import MoneyIcon from "../../public/images/money.svg";
import Footer from "../../components/Layouts/Footer";
import {
  getProduct,
  getNodePackages,
  getHeader,
  getAllNodeProducts,
} from "../api/index";
import Image from "next/image";
import WorkIcon from "../../public/images/work.svg";
import FileIcon from "../../public/images/file.svg";
import { createMarkup } from "../../utils/auth.helper";
import styles from "./product.module.scss";
import Link from "next/link";
import { formatVND } from "../../utils/helpers";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

export async function getServerSideProps(context) {
  const { product: slug } = context.params;
  const { data } = await getProduct(slug);
  const [res, res2, res3] = await Promise.all([
    getHeader(),
    getNodePackages(data.data._id),
    getAllNodeProducts(),
  ]);
  return {
    props: {
      product: data.data,
      nodePackages: res2?.data?.data,
      headers: res?.data?.data,
      allNodeProducts: res3?.data?.data,
    },
  };
}

export default function Product({
  product,
  nodePackages,
  headers,
  allNodeProducts,
}) {
  console.log("headers", product, nodePackages);
  const features = product?.features.split("\n") || [];
  const iconsFeatures = [MoneyIcon, WorkIcon, FileIcon];
  return (
    <>
      <Navbar headers={headers} />

      {/* <PageBanner
        pageTitle={product?.name}
        img={product.image.path}
        name={product.name}
        //   homePageUrl="/"
        //   homePageText="TNDS"
        //   activePageText="Xe máy"
      /> */}

      <PageBanner
        pageTitle={product?.name}
        img={product.image.path}
        name={product.name}
        homePageUrl="#"
        // homePageText="Home"
        // activePageText="Contact Style Two"
      />

      <section className="team-area mt-4 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="single-features h-100 text-start">
                <h3 className="h5 text-primary">Giới thiệu</h3>
                <p>{product.desc}</p>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 text-start">
              <div className="single-features h-100 text-start">
                <h3 className="h5 text-primary">Đặc điểm nổi bật</h3>
                {features.map((item, index) => (
                  <div className="mb-1 align-items-baseline" key={index}>
                    <Image
                      src={iconsFeatures[index]}
                      layout="fixed"
                      height={15}
                      width={30}
                      alt="Đặc điểm nổi bật"
                    />
                    <span className="ml-2">{item || ""}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 col-sm-12">
              <div className="single-features h-100">
                <h3 className="h3 text-primary">ĐỐI TƯỢNG BẢO HIỂM</h3>
                <p className="text-start">{product.customers}</p>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="single-features h-100">
                <h3 className="h3 text-primary">CÁC ĐIỂM LOẠI TRỪ CHÍNH</h3>
                {/* <p className="text-start">{product.exclusions}</p> */}
                <div
                  dangerouslySetInnerHTML={createMarkup(product.exclusions)}
                  className="text-start"
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-center">
            *Chi tiết các điểm loại trừ được quy định tại Quy tắc bảo hiểm do
            PVI ban hành{"  "}
            <Link href={product.link_rules}>
              <a>
                <strong className="text-primary">
                  {`(`}
                  XEM NGAY
                  {`)`}
                </strong>
              </a>
            </Link>
          </p>
        </div>
      </section>

      <section className="offer-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>CÁC GÓI QUYỀN LỢI</h2>
          </div>

          <div className="row">
            {nodePackages.map((item) => (
              <div className="col-lg-6 col-sm-6">
                <div className="single-offer pl-30 pr-30">
                  <h3 className="mt-2">
                    <Link href="/service-details">
                      <a>Gói {item?.name}</a>
                    </Link>
                  </h3>
                  <p className={`mb-0 p-2 rounded ${styles.background}`}>
                    Tổng giá trị bảo hiểm: {item?.quyen_loi_bao_hiem}
                  </p>
                  <p className="mt-3 mb-0 text-primary fw-bolder">
                    Thu phí: {formatVND(item?.gia_tien)}
                  </p>
                  <a className={`${styles.benefit} text-primary mb-2`} href="#">
                    Xem quyền lợi bảo hiểm
                  </a>
                  <Link href={`/hop-dong/${item.package_id}/${item.name}`}>
                    <a className="default-btn py-3 w-100 rounded-pill text-center">
                      Mua ngay
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shape Images */}
        <div className="offer-shape">
          <img src="/images/shape/services-shape/1.png" alt="Image" />
          <img src="/images/shape/services-shape/2.png" alt="Image" />
          <img src="/images/shape/services-shape/3.png" alt="Image" />
          <img src="/images/shape/services-shape/4.png" alt="Image" />
          <img src="/images/shape/services-shape/5.png" alt="Image" />
          <img src="/images/shape/services-shape/6.png" alt="Image" />
        </div>
      </section>

      <div className="contact-info-area mt-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <a href={product?.link_rules}>
                <div className="single-contact-info mb-3">
                  <i className="bx bx-download"></i>
                  <h3>Quy tắc bảo hiểm áp dụng</h3>
                </div>
              </a>
            </div>
          </div>

          <p>
            <i>{product?.rule_desc}</i>
          </p>
        </div>
      </div>

      <section className="industries-area">
        <div className="container">
          <div className="industries-content text-center text-40 mt-5">
            <h4 className="mb-4">HỎI VÀ ĐÁP</h4>

            <div className="row">
              <div className="col-lg-12">
                <div className="faq-accordion">
                  <Accordion preExpanded={["a"]}>
                    {product?.faq?.map((item, index) => (
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            {item.question}
                          </AccordionItemButton>
                        </AccordionItemHeading>

                        <AccordionItemPanel className="text-start">
                          <p className="bg-white">{item.title}</p>
                        </AccordionItemPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>

            <Link href="/about-1">
              <a className="default-btn mt-4 w-25 rounded-pill text-center">
                Tham gia ngay
              </a>
            </Link>
          </div>
        </div>
      </section>

      <Footer product={allNodeProducts} />
    </>
  );
}
