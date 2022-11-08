import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectAuth } from '../../store/selector';
import { toggleRegisterModal, toggleLoginModal } from '../../store/modal/actions';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});
export default function ForceLogin({ }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(mapStateToProps);
  useEffect(() => {
    if (!auth.username) {
      dispatch(toggleRegisterModal());
    }
  })
  return (<div className="step-wrapper" style={{ maxWidth: 800, margin: '0px auto' }}>
    <div className="p-2 ezin-card">
      Vui lòng <a className="text-link" href="#" onClick={() => dispatch(toggleLoginModal())}>đăng nhập</a> hoặc <a className="text-link" href="#" onClick={() => dispatch(toggleRegisterModal())}>đăng ký</a> tài khoản Ezin để tiếp tục
    </div>
  </div>);
}
