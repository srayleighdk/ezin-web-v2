import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Product/PageBanner";
import PricingStyleOne from "../../components/Product/PricingStyleOne";
import MoneyIcon from "../../public/images/money.svg";
import Footer from "../../components/Layouts/Footer";
import { getProduct, getNodePackages } from "../api/index";
import Image from "next/image";
import WorkIcon from "../../public/images/work.svg";
import FileIcon from "../../public/images/file.svg";
import styles from "./product.module.scss";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { product: slug } = context.params;
  const { data } = await getProduct(slug);
  const resPackages = await getNodePackages(data.data._id);
  return {
    props: {
      product: data.data,
      nodePackages: resPackages?.data?.data,
    },
  };
}

export default function Product({ product, nodePackages }) {
  console.log("product", product, nodePackages);
  const features = product?.features.split("\n") || [];
  const iconsFeatures = [MoneyIcon, WorkIcon, FileIcon];
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={product?.name}
        //   homePageUrl="/"
        //   homePageText="TNDS"
        //   activePageText="Xe máy"
      />

      <section className="team-area mt-4 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="single-features text-start">
                <h3 className="h3">Giới thiệu</h3>
                <p>{product.desc}</p>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 text-start">
              <div className="single-features text-start">
                <h3 className="h3">Đặc điểm nổi bật</h3>
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
        </div>
      </section>

      {/* <PricingStyleOne product={product} nodePackages={nodePackages} /> */}

      <Footer />
    </>
  );
}
