import React from 'react';
import ActivateForm from './ActivateForm';
import ActivateFormAuto from './ActivateFormAuto';
import ActivateFormMoto from './ActivateFormMoto';
import ActivateFormAnGia from './ActivateFormAnGia';
// import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
// import { makeSelectAuth } from 'store/selector';
// import { toggleRegisterModal, toggleLoginModal } from '../../../src/store/modal/actions';

const mapForms = {
    'OTO': ActivateFormAuto,
    'XE_MAY': ActivateFormMoto,
    'AN_GIA': ActivateFormAnGia,
    'OTHER': ActivateForm
};

// const mapStateToProps = createStructuredSelector({
//     auth: makeSelectAuth(),
// });
export default function ThongTinBH({ data = [], onNext = [] }) {
    // const { auth } = useSelector(mapStateToProps);
    // const dispatch = useDispatch();

    // if (!auth.username) {
    //     return (<>
    //         Vui lòng <a className="text-link" href="#" onClick={() => dispatch(toggleLoginModal())}>đăng nhập</a> hoặc <a className="text-link" href="#" onClick={() => dispatch(toggleRegisterModal())}>đăng ký</a> tài khoản Ezin để tiếp tục
    //     </>);
    // }
    const DynamicComponent = mapForms[data.type] || ActivateForm;
    return (<div>
        <DynamicComponent data={data} onNext={onNext} />
    </div>
    );
}

