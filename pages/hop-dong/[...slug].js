import { message, Steps } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getPackage,
  requestActivate,
} from "../api";
import RegisterModal from "../../components/ezin-modal/RegisterModal";
import LoginModal from "../../components/ezin-modal/LoginModal";
// import QnA from './components/qna';
import ThongTinBH from "./components/thongTin";
import XacNhan from "./components/xacNhan";
import ThanhToan from "./components/thanhToan";
import moment from "moment";
import SecondStep from "../../src/container/activeCard/Second";
// import { createStructuredSelector } from "reselect";
// import { makeSelectAuth } from "../../src/store/selector";
// import { makeSelectActivation } from "../../src/store/selector";

const { Step } = Steps;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const id = slug[0];
  const [data] = await Promise.all([
    getPackage(id),
  ]);
  return {
    props: {
      data: data?.data?.data || null,
    },
  };
}

// const mapStateToProps = createStructuredSelector({
//   activation: makeSelectActivation(),
//   auth: makeSelectAuth(),
// });

export default function HopdongPage() {
  const router = useRouter();
  const id = router?.query?.slug?.[0];
  const type = router?.query?.slug?.[1].indexOf('EVA');
  const requestID = router?.query?.requestId || null;
  const [requestId, setRequestId] = useState(requestID);
  const [submitData, setSubmitData] = useState(null);
  const [cardInfo, setCardInfo] = useState({});
  const [data, setData] = useState(null);
  const nStep = Number(router?.query?.step) || 0;

  const getData = async () => {
    const res = await getPackage(id);
    if(requestID) {
      const res1 = await getTransactionInfo(requestID);
      console.log("res1", res1);
      setSubmitData({
        address: res1?.data?.data?.address,
        city: res1?.data?.data?.city,
        district: res1?.data?.data?.district,
        email: res1?.data?.data?.email,
        full_name: res1?.data?.data?.full_name,
        legal_id: res1?.data?.data?.legal_id,
        sex: res1?.data?.data?.sex,
        ward: res1?.data?.data?.ward,
        phone: res1?.data?.data?.phone?.replace('+84', '0'),
        dob: moment(res1?.data?.data?.dob, 'DDMMYYYY').format("DD/MM/YYYY"),
        valid_from: moment(res1?.data?.data?.valid_from),
        total: res1?.data?.data?.total,
        discount: res1?.data?.data?.discount
      })
    }
    setData({
      ...res?.data?.data
    });
  }
  useEffect(() => {
    getData();
  }, [id]);
  
  // console.log('activation 0', activation)
  // useEffect(() => {
  //   if (activation.seri !== '' && activation.code !== '') {
  //     setCardInfo(activation);
  //     console.log('activation', activation);
  //     if (activation.package_id) {
  //       if (activation?.package_id?.product_id?.qna?.length > 0) {
  //         setStep(0);
  //       } else {
  //         setStep(1);
  //       }
  //       window.scroll({
  //         top: 0,
  //         left: 0,
  //         behavior: 'smooth',
  //       });
        
  //     }
  //   }

  // }, [activation]);

  useEffect(() => {
    setTimeout(function () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 100)
  }, [nStep]);

  const nextStep = (values) => {
    console.log('values', values)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (values) {
      setSubmitData(values);
    }
    // setStep(nStep + 1);
    router.push(`/hop-dong/${id}/${router?.query?.slug?.[1]}?step=${nStep + 1}`);
  }
  const prevStep = (values) => {
    console.log('values prev', values);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if(values) {
      setSubmitData(values);
    }
    // setStep(nStep - 1);
    router.push(`/hop-dong/${id}/${router?.query?.slug?.[1]}?step=${nStep - 1}`);
  }
  const submit = async () => {
    let { dob, ...rest } = submitData;
    let body = {};
    if(data?.type === "XE_MAY" || data?.type === "OTO") {
      const valid_from = moment.isMoment(submitData.valid_from) ? moment(submitData.valid_from).format('DD/MM/YYYY') : submitData.valid_from;
      body = {
        ...rest,
        valid_from: valid_from,
        main_account: true,
        package_id: data._id,
        fee: data?.promotion_fee || data?.fee
      };
    } else {
      const date = moment(dob, 'DD/MM/YYYY');
      if (!date.isValid()) {
        message.error('Ngày tháng năm sinh không hợp lệ, vui lòng chọn lại');
        return;
      }
      const dateOfBirth = moment(date).format('DD/MM/YYYY');
      const valid_from = moment.isMoment(submitData.valid_from) ? moment(submitData.valid_from).format('DD/MM/YYYY') : submitData.valid_from;
      body = {
        ...rest,
        dob: dateOfBirth,
        valid_from: valid_from,
        main_account: true,
        package_id: data._id,
        fee: data?.promotion_fee || data?.fee
      };
    }
    const res = await requestActivate(body);
    if (res?.data?.success) {
      setRequestId(res?.data?.data?.request_id)
      nextStep();
    } else {
      message.error(res?.data?.msg)
    }
  }

  const RenderStep = () => {
    if(type >= 0 && type <= 2) {
      switch (nStep) {
        case 0:
          return <SecondStep onNextStep={nextStep} onPrevStep={prevStep} cardInfo={data} btnBack={0} submitData={submitData}/>
        case 1:
          return <ThongTinBH onPrev={prevStep} initData={submitData} onNext={nextStep} data={data} />;
        case 2:
          return <XacNhan onPrev={prevStep} onNext={nextStep} data={data} onSubmit={submit} submitData={submitData} />;
        case 3:
          return <ThanhToan onPrev={prevStep} onNext={nextStep} data={data} requestId={requestId} submitData={submitData}/>;
        default:
          return '';
      }
    } else {
      switch (nStep) {
        case 0:
          return <ThongTinBH onPrev={prevStep} initData={submitData} onNext={nextStep} data={data} />;
        case 1:
          return <XacNhan onPrev={prevStep} onNext={nextStep} data={data} onSubmit={submit} submitData={submitData} />;
        case 2:
          return <ThanhToan onPrev={prevStep} onNext={nextStep} data={data} requestId={requestId} submitData={submitData} />;
        default:
          return '';
      }
    }
  };
  if (!data) {
    return (
      <>
      </>
    );
  }
  return (
    <>
      <Head>
        <title key="title">{`Gói BH - ${data && data.name} | Ezin`}</title>
        <meta property="og:title" key="og-title" content={`Gói BH - ${data && data.name} | Ezin`} />
      </Head>
      <div id="activation">
        <div className="main-section content-section hopdong-info">
          <div className="container">
            <h2 className="text-center">Bảo hiểm {data?.product_id?.name} - {data?.program_id?.name}</h2>
            <div className="step-wrapper-1">
              <div className="wrap-steps">
                <Steps current={nStep} responsive={false}>
                  {type === 0 ?
                  <Step title="Trả lời câu hỏi" />
                  :null}
                  <Step title="Thông tin BH" />
                  <Step title="Xác nhận" />
                  <Step title="Thanh toán" />
                </Steps>
              </div>
              <div>
              {nStep === 0 && type === 0 ?
                <RenderStep />
              :
                <div className="ezin-card shadow">
                  <RenderStep />
                </div>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
