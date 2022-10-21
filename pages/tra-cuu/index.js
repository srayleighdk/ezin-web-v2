import React, { useState } from "react";
import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
import { getHeader, getAllNodeProducts } from "../api";
import Link from "next/link";
import Head from "next/head";

export async function getServerSideProps() {
  const [res, allNodeProducts] = await Promise.all([
    getHeader(),
    getAllNodeProducts(),
  ]);
  return {
    props: {
      headers: res?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
    }, // will be passed to the page component as props
  };
}

export default function ComingSoon({ headers, allNodeProducts }) {
  var myInterval;
  const [state, setState] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const commingSoonTime = () => {
    let endTime = new Date("August 23, 2022 17:00:00 PDT");
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let days = Math.floor(timeLeft / 86400);
    let hours = Math.floor((timeLeft - days * 86400) / 3600);
    let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    let seconds = Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    );
    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }
    setState({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  const componentDidMount = () => {
    myInterval = setInterval(() => {
      commingSoonTime();
    }, 1000);
  };

  const componentWillUnmount = () => {
    clearInterval(myInterval);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Tính năng sắp ra mắt</title>
      </Head>
      <div className="coming-soon-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container d-flex justify-content-center flex-column align-items-center">
              <div className="coming-soon-content">
                <h1 className="text-white">Tính năng sắp ra mắt</h1>
              </div>
              <Link href="/">
                <a className="default-btn w-25 text-center rounded-pill mt-4">
                  Về trang chủ
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
