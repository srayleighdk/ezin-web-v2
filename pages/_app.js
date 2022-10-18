import "../styles/globals.scss";
import "../styles/style.scss";
// import "../node_modules/antd/dist/antd.less";
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

import useConstructor from '../components/hooks/useConstructor';
import Cookies from 'js-cookie';
import App from "next/app";
import Head from "next/head";
import Loader from "../components/Shared/Loader";
import GoTop from "../components/Shared/GoTop";
import { AuthProvider } from "../components/auth-wrapper/auth.context";
import { Provider } from "react-redux";
import configureStores from "../components/configureStore";
import "moment/locale/vi";
import eZinApi from "./api/axios";
import eZinApiNode from "./api/axiosNode";
import { useState } from "react";

const initialState = {};
const store = configureStores(initialState);

function MyApp({ Component, pageProps }) {
  var timerHandle;
  const [state, setState] = useState({
    loading: true,
  });

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
  // Preloader

  const componentDidMount = () => {
    timerHandle = setTimeout(
      () => setState({ loading: false }),
      2000
    );
  };
  componentDidMount();
  const componentWillUnmount = () => {
    if (timerHandle) {
      clearTimeout(timerHandle);
      timerHandle = 0;
    }
  };
  componentWillUnmount();

  return (
    <Provider store={store}>
      <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Ezin - Đi Bình An, Về Hạnh Phúc</title>
          <meta
            property="og:title"
            content="Ezin - Đi Bình An, Về Hạnh Phúc"
          ></meta>
          <meta
            property="og:description"
            content="Bảo vệ bạn và những người yêu thương chưa bao giờ dễ dàng đến thế!"
          ></meta>
          <meta property="og:url" content="https://ezin.vn/"></meta>
          <meta
            property="og:image"
            content="https://api.ezin.vn/public/files/2021/12/54FA2CC66FB257F_ezin-slogan.jpg"
          ></meta>
        </Head>

        <Component {...pageProps} />

        {/* Preloader */}
        <Loader loading={state.loading} />

        {/* Go Top Button */}
        <GoTop scrollStepInPx="100" delayInMs="10.50" />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
