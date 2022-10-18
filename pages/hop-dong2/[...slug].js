import React, { useState, useEffect } from "react";
import { getPackage } from "../api";
import { useRouter } from "next/router";
import { getHeader, getAllNodeProducts } from "../api";
import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
import Head from "next/head";
import ActivateFormAuto from "./components/ActivateFormAuto";
import ActivateFormMoto from "./components/ActivateFormMoto";
import ActivateFormAnGia from "./components/ActivateFormAnGia";
import ActivateForm from "./components/ActivateForm";

export async function getServerSideProps(context) {
  const [res, allNodeProducts] = await Promise.all([
    getHeader(),
    getAllNodeProducts(),
  ]);
  return {
    props: {
      headers: res?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
    },
  };
}

export default function ThongTin({ headers, allNodeProducts }) {
  const router = useRouter();
  const id = router?.query?.slug?.[0];

  const [data, setData] = useState(null);
  console.log("data", data);

  const getData = async () => {
    const res = await getPackage(id);
    setData({
      ...res?.data?.data,
    });
  };
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <Head>
        <title>Gói BH - {data?.program_id?.name}</title>
      </Head>
      <Navbar headers={headers} />

      <section className="service-details-area ptb-100 mt-4">
        <div className="container">
          <h2 className="text-center text-primary">
            Bảo hiểm {data?.product_id?.name} - {data?.program_id?.name}
          </h2>
          <div className="ask-question">
            {data?.type === "OTO" ?
            <ActivateFormAuto />
            :
            data?.type === "XE_MAY" ?
            <ActivateFormMoto />
            :
            data?.type === "AN_GIA" ?
            <ActivateFormAnGia />
            :
            <ActivateForm />
            }
          </div>
        </div>
      </section>

      <Footer product={allNodeProducts} />
    </>
  );
}
