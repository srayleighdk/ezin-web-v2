import "../styles/globals.scss";
import "../styles/style.scss";
import "antd/dist/antd.less";
import "../styles/antd-custom-style.scss";
import "../styles/antd-step.scss";
// import "react-datepicker/dist/react-datepicker.css";
// import "antd-mobile/dist/antd-mobile.css";
import "../styles/bootstrap.min.css";
import "animate.css";
import "../styles/boxicons.min.css";
import "../styles/flaticon.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "swiper/css";
import "swiper/css/bundle";

// Global styles
import "../styles/style.css";
import "../styles/responsive.css";

import useConstructor from "../components/hooks/useConstructor";
import Cookies from "js-cookie";
import App from "next/app";
import Head from "next/head";
import Loader from "../components/Shared/Loader";
import GoTop from "../components/Shared/GoTop";
import { AuthProvider } from "../src/container/auth-wrapper/auth.context";
import { Provider } from "react-redux";
import configureStores from "../components/configureStore";
import "moment/locale/vi";
import eZinApi from "./api/axios";
import eZinApiNode from "./api/axiosNode";
import { useEffect, useState } from "react";
import { getLayout } from "../components/Layouts";

const initialState = {};
const store = configureStores(initialState);

export default function MyApp({ Component, pageProps }) {
  useConstructor(() => {
    if (Cookies.get("token")) {
      eZinApi.defaults.headers.Authorization = `Bearer ${Cookies.get("token")}`;
      eZinApiNode.defaults.headers.Authorization = `Bearer ${Cookies.get(
        "token"
      )}`;
    }
    // node token
    // eZinApi.defaults.headers.token = `EzinWebApp@123`;
  });

  return (
    <Provider store={store}>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}

        {/* Go Top Button */}
        <GoTop scrollStepInPx="100" delayInMs="10.50" />
      </AuthProvider>
    </Provider>
  );
}
