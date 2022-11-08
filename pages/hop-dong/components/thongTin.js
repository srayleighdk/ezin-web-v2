import React, { useEffect } from "react";
// import dynamic from 'next/dynamic';
import ActivateForm from "./ActivateForm";
import ActivateFormAuto from "./ActivateFormAuto";
import ActivateFormMoto from "./ActivateFormMoto";
import ActivateFormAnGia from "./ActivateFormAnGia";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectAuth } from "../../../src/store/selector";
import {
  toggleRegisterModal,
  toggleLoginModal,
} from "../../../src/store/modal/actions";
import useAuth from "../../../src/container/auth-wrapper/auth.context";
// const LoginModal = dynamic(() => import('src/components/ezin-modal/LoginModal'))

const mapForms = {
  "OTO": ActivateFormAuto,
  "XE_MAY": ActivateFormMoto,
  "AN_GIA": ActivateFormAnGia,
  "OTHER": ActivateForm,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

export default function ThongTinBH({ data, initData = [], onNext, onPrev }) {
  const res = useSelector(mapStateToProps);
  console.log("ressss", res);
  const { loading } = useAuth();
  const auth = res?.auth;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading && !auth?.username) {
      dispatch(toggleLoginModal());
    }
  }, [auth?.username]);

  if (!auth?.username) {
    return (
      <>
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
      </>
    );
  }
  const DynamicComponent = mapForms[data.type] || ActivateForm;
  return (
    <div>
      <DynamicComponent
        data={data}
        initData={initData}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  );
}
