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

import App from "next/app";
import Head from "next/head";
import Loader from "../components/Shared/Loader";
import GoTop from "../components/Shared/GoTop";
import { AuthProvider } from "../components/auth-wrapper/auth.context";
import { Provider } from "react-redux";
import configureStores from "../components/configureStore";

const initialState = {};
const store = configureStores(initialState);

export default class MyApp extends App {
  // Preloader
  state = {
    loading: true,
  };
  componentDidMount() {
    this.timerHandle = setTimeout(
      () => this.setState({ loading: false }),
      2000
    );
  }
  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <AuthProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
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
          <Loader loading={this.state.loading} />

          {/* Go Top Button */}
          <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </AuthProvider>
      </Provider>
    );
  }
}
