import { Html, Head, Main, NextScript } from "next/document";
import { CANONICAL_DOMAIN } from "../utils/config";
import { useRouter } from "next/router";

export default function MyDocument() {
  // const router = useRouter();
  // const canonical = CANONICAL_DOMAIN + router.asPath;
  return (
    <Html lang="vi-VN">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i&display=swap"
          rel="stylesheet"
        />
        <meta
          name="keywords"
          content={`ezin;ezin insurtech;bảo hiểm số;bảo hiểm cá nhân;sống an toàn;hạnh phúc;bình an`}
        />
        <meta property="og:url" content="https://ezin.vn" />
        <link
          href="https://fonts.googleapis.com/css?family=Inter:200,300,400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Ezin - Đi Bình An, Về Hạnh Phúc" />
        <meta name="author" content="Ezin" />
        <meta name="publisher" content="Công ty cổ phần Ezin Việt Nam" />
        <link rel="icon" type="image/png" href="/favicon.ico"></link>
        <link rel="canonical" href="https://ezin.vn" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
