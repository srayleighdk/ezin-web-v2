import React from "react";
// import './style.scss';
import Header from "./Navbar";
import Footer from "./Footer";
// import LoginModal from 'components/ezin-modal/LoginModal';
// import RegisterModal from 'components/ezin-modal/RegisterModal';
// import OTPModal from 'components/ezin-modal/OTPModal';
// import ForgotPassModal from 'components/ezin-modal/ForgotPassModal';
// import NewPassword from 'components/ezin-modal/NewPassword';
// import ResetPassword from 'components/ezin-modal/ResetPassword';
// import TransactionInfoModal from 'components/ezin-modal/TransactionInfoModal';
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
const LoginModal = dynamic(() =>
  import("../../components/ezin-modal/LoginModal")
);
const RegisterModal = dynamic(() =>
  import("../../components/ezin-modal/RegisterModal")
);
const OTPModal = dynamic(() => import("../../components/ezin-modal/OTPModal"));
const ForgotPassModal = dynamic(() =>
  import("../../components/ezin-modal/ForgotPassModal")
);
const NewPassword = dynamic(() =>
  import("../../components/ezin-modal/NewPassword")
);
const ResetPassword = dynamic(() =>
  import("../../components/ezin-modal/ResetPassword")
);
const TransactionInfoModal = dynamic(() =>
  import("../../components/ezin-modal/TransactionInfoModal")
);
import { useRouter } from "next/router";
import { CANONICAL_DOMAIN } from "../../utils/config";

export default function Layout({ children }) {
  const router = useRouter();
  const canonical = CANONICAL_DOMAIN + router.asPath;
  return (
    <>
      <Head>
        <meta
          name="dmca-site-verification"
          content="WGlQaWl2UWZWb2xiR2VTcUxqT3RGZz090"
        />
        <meta httpEquiv="content-language" content="vi-VN" />
        <meta
          property="og:title"
          key="og-title"
          content="Ezin - Đi Bình An, Về Hạnh phúc"
        />
        <meta
          property="og:image"
          key="og-image"
          content="https://api.ezin.vn/public/files/2021/12/54FA2CC66FB257F_ezin-slogan.jpg"
        />
        <meta
          property="og:description"
          key="og-description"
          content="Bảo vệ bạn và những người thân yêu chưa bao giờ dễ dàng đến thế!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta
          name="keywords"
          content={`ezin;ezin insurtech;bảo hiểm số;bảo hiểm cá nhân;sống an toàn;hạnh phúc;bình an`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="canonical" href={canonical} />
        <script
          id="hotjar"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2133785,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                  `,
          }}
        ></script>
        <script
          id="heatmap"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,e,a,t,m,p) {
                m=e.createElement(a);m.async=!0;m.src=t;
                p=e.getElementsByTagName(a)[0];p.parentNode.insertBefore(m,p);
                })(window,document,'script','https://u.heatmap.it/log.js');
                  `,
          }}
        ></script>
        <script
          id="microsoft_clarify"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "dn9wpz19fj");
                  `,
          }}
        ></script>
      </Head>
      <div id="app">
        <div
          dangerouslySetInnerHTML={{
            __html: `
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-536K9S8"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        `,
          }}
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P5DSZHN7ZN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-P5DSZHN7ZN');
        `}
        </Script>
        <Script id="google-tag-manager-head" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-536K9S8');
        `}
        </Script>
        <Script
          src="//static.accesstrade.vn/js/trackingtag/tracking.min.js"
          strategy="beforeInteractive"
        />
        <Script id="access-trade" strategy="afterInteractive">
          {`AT.init({"campaign_id": 1730, "is_reoccur": 1,"is_lastclick": 1, "cookie_duration": 30}); AT.track();`}
        </Script>

        <Header />
        <div className="main-section flex-1">
          <div className="content">{children}</div>
        </div>
        <Footer />
        <LoginModal />
        <RegisterModal />
        <OTPModal />
        <ForgotPassModal />
        <NewPassword />
        <ResetPassword />
        <TransactionInfoModal />
      </div>
    </>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
