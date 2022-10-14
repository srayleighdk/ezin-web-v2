
import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Layouts/Navbar';
import { getHeader } from './api';
import Footer from '../components/Layouts/Footer';
import ActiveMobile from '../components/ActiveMobile/ActiveMobile';
export async function getStaticProps() {
  const res = await getHeader();
  return {
    props: {
      headers: res?.data?.data,
    }
  }
}


function KichHoatThe({ headers }) {

  const openTabSection = (evt, tabNmae) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabs_item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByTagName("li");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("current", "");
    }

    document.getElementById(tabNmae).style.display = "block";
    evt.currentTarget.className += "current";
  }

  return (
    <>
      <Head>
        <title key="title">{`Kích hoạt thẻ bảo hiểm | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`Kích hoạt thẻ bảo hiểm | Ezin`}
        />
        <meta
          property="og:description"
          key="og-description"
          content={`Kích hoạt thẻ bảo hiểm | Ezin`}
        />
      </Head>
      <Navbar headers={headers}> </Navbar>
      <section className="pricing-area pt-100 pb-70" style={{ paddingTop: "150px" }}>
        <div className="container">
          <div id="activation">
            <ActiveMobile />
            <div className="service-card">
              <div>
                <p>
                  Nếu bạn vẫn không thể kích hoạt thẻ, vui lòng xem video hướng dẫn
                  dưới đây:
                </p>{' '}
              </div>
              <div className="container" id="videos">
                <div className="video-container">
                  {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/5BdiwJxTU9E?rel=0&autoplay=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/Lax3BiQqVrQ?rel=0&autoplay=0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default KichHoatThe;
