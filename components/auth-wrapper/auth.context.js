import { message, Spin } from "antd";
import Cookies from "js-cookie";
import Router from "next/router";
import eZinApi from "../../pages/api/axios";
import eZinApiNode from "../../pages/api/axiosNode";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setCart } from "../../components/store/actions";
import {
  toggleLoginModal,
  toggleRegisterModal,
} from "../../components/store/modal/actions";
import { removeUser } from "../../utils/auth.helper";
// const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  var reqInterceptor = undefined;
  var resInterceptor = undefined;
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // async function loadCartFromCookies() {
    //   const token = Cookies.get('token');
    //   console.log('loadCartFromCookies', token)
    //   const res = await eZinApi.get('/cart/session');
    //   if (res?.data?.success) {
    //     dispatch(setCart(res?.data?.data))
    //   }
    // }
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        // console.log("Got a token in the cookies, let's see if it is valid");
        eZinApi.defaults.headers.Authorization = `Bearer ${token}`;
        eZinApiNode.defaults.headers.Authorization = `Bearer ${token}`;
        const { data } = await eZinApi.get("/account/info");
        dispatch(setAuth(data.data));
        setUser(data.data);
      }
      setLoading(false);
    }

    initAxios();
    loadUserFromCookies();
    // loadCartFromCookies();
    return () => {
      eZinApi.interceptors.request.eject(reqInterceptor);
      eZinApi.interceptors.response.eject(resInterceptor);
    };
  }, []);

  const initAxios = () => {
    reqInterceptor = eZinApi.interceptors.request.use((req) => {
      return req;
    });

    resInterceptor = eZinApi.interceptors.response.use(
      (res) => {
        // console.log('res', res);

        if (res.data.errors && Object.keys(res.data.errors).length) {
          // if (res.data.errors) {
          message.error(res.data.msg);
        }
        return res;
      },
      (error) => {
        console.log("error", error);
        if (error.response?.status === 401) {
          // if you ever get an unauthorized response, logout the user
          logout();
          throw error;
        }
        // if (process.env.NODE_ENV !== 'production') {
        //   message.success(JSON.stringify(getUserData()));
        //   message.success(getToken());
        // }

        if (
          error &&
          error.response &&
          Object.keys(error.response.data.errors).length
        ) {
          message.error(Object.values(error.response.data.errors).join(", "));
          return Promise.reject(error.response);
        } else {
          // message.error(error.response.data.msg);
          return Promise.reject(
            error && error.response && error.response.data.msg
          );
        }
      }
    );
  };

  const login = async ({ user, token }) => {
    console.log("1111");
    if (user) {
      Cookies.set('token', token, { expires: 3600 * 1000 });
      eZinApi.defaults.headers.Authorization = `Bearer ${token}`;
      eZinApiNode.defaults.headers.Authorization = `Bearer ${token}`;
      dispatch(setAuth(user));
      setUser(user);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    removeUser();
    setUser(null);
    dispatch(setAuth({}));
    Router.replace("/");
    delete eZinApi.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export function ProtectedRoute(Component) {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();
    const dispatch = useDispatch();
    if (loading) return <Spin size="large" />;

    if (!isAuthenticated && window.location.pathname !== "/login") {
      // Router.replace('/');
      // return null;
      return (
        <div>
          Vui lòng{" "}
          <a
            className="text-link"
            href="#"
            onClick={() => dispatch(toggleLoginModal())}
          >
            đăng nhập
          </a>{" "}
          hoặc{" "}
          <a
            className="text-link"
            href="#"
            onClick={() => dispatch(toggleRegisterModal())}
          >
            đăng ký
          </a>{" "}
          tài khoản Ezin để tiếp tục
        </div>
      );
    }
    return <Component {...props} />;
  };
}
