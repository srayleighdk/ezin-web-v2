import Head from 'next/head';
import React from 'react';
import ActiveMobile from '../../components/ActiveMobile/ActiveMobile';

const ActivationVoucher = () => {
  return (
    <>
      <Head>
        <title key="title">{`Kích hoạt thẻ bảo hiểm | Ezin`}</title>
        <meta property="og:title" key="og-title" content={`Kích hoạt thẻ bảo hiểm | Ezin`} />
        <meta property="og:description" key="og-description" content={`Kích hoạt thẻ bảo hiểm | Ezin`} />
      </Head>
      <div id="activation">
        <ActiveMobile title={'Kích hoạt thẻ'} desc={''} quote={''} type={2} />
        <div className="service-card">
          <div><i>Nếu bạn vẫn không thể kích hoạt thẻ, vui lòng xem video hướng dẫn dưới đây:</i> </div>
          <div className="container" id="videos">
            <div className="video-container">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/5BdiwJxTU9E?rel=0&autoplay=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivationVoucher;
