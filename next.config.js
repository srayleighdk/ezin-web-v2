// /** @type {import('next').NextConfig} */
// const path = require('path')
// const fs = require('fs');
// const nextConfig = {
//   reactStrictMode: true,
//   trailingSlash: true,
//   distDir: 'build',
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
//   optimizeFonts: false,
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   }
// }

// module.exports = nextConfig

// the following 2 lines are specific to this repo. in your project use next-with-less directly
const withLess = require("next-with-less");
const path = require("path");
const fs = require("fs");
const lessToJS = require("less-vars-to-js");

// const withLess = require("../../src");
withLess.patchNext(require("next/dist/build/webpack/config/blocks/css"));
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./styles/antd-custom.less"), "utf8")
);
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// })
module.exports =
  // withBundleAnalyzer(
  withLess({
    reactStrictMode: true,
    lessLoaderOptions: {
      lessOptions: {
        // it's possible to use additionalData or modifyVars for antd theming
        // read more @ https://ant.design/docs/react/customize-theme
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
      },
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
    images: {
      domains: [
        "docs-dev.ezin.vn",
        "localhost",
        "images.dmca.com",
        "api.ezin.vn",
        "ss-images.saostar.vn",
        "sandbox.vnpayment.vn",
        "sandbox.ezin.vn",
      ],
    },
    i18n: {
      locales: ["vi-VN"],
      defaultLocale: "vi-VN",
    },
    async redirects() {
      return [
        {
          source: "/a/:id",
          destination: "/kich-hoat-the/:id",
          permanent: true,
        },
        {
          source: "/san-pham/tncn",
          destination: "/san-pham/binh-an",
          permanent: true,
        },
        {
          source: "/0988136833",
          destination: "/profile/tai-tuc",
          permanent: true,
        },
      ];
    },
  });
// );
