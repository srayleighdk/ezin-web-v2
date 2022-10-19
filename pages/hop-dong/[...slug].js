import { message, Steps } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getPackage,
  requestActivate,
  getHeader,
  getAllNodeProducts,
} from "../api";
import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
// import QnA from './components/qna';
import ThongTinBH from "./components/thongTin";
import XacNhan from "./components/xacNhan";
import ThanhToan from "./components/thanhToan";
import moment from "moment";
import SecondStep from "../../src/container/activeCard/Second";
// import { createStructuredSelector } from 'reselect';
// import { makeSelectAuth } from 'store/selector';
// import { makeSelectActivation } from 'store/selector';

const { Step } = Steps;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const id = slug[0];
  const [res, allNodeProducts, data] =
    await Promise.all([
      getHeader(),
      getAllNodeProducts(),
      getPackage(id)
    ]);
  return {
    props: {
      data: data?.data?.data || null,
      headers: res?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
    },
  };
}

// const mapStateToProps = createStructuredSelector({
//   activation: makeSelectActivation(),
//   auth: makeSelectAuth(),

// });

export default function HopdongPage({ headers, allNodeProducts }) {
  const router = useRouter();
  const id = router?.query?.slug?.[0];
  const type = router?.query?.slug?.[1].indexOf("EVA");
  // const [nStep, setStep] = useState(0);
  const [requestId, setRequestId] = useState(null);
  const [submitData, setSubmitData] = useState(null);
  const [cardInfo, setCardInfo] = useState({});
  // const { activation } = useSelector(mapStateToProps);
  const [data, setData] = useState(null);
  const nStep = Number(router?.query?.step) || 0;

  const getData = async () => {
    const res = await getPackage(id);
    setData({
      ...res?.data?.data,
    });
  };
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
        behavior: "smooth",
      });
    }, 100);
  }, [nStep]);

  const nextStep = (values) => {
    console.log("values", values);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (values) {
      setSubmitData(values);
    }
    // setStep(nStep + 1);
    router.push(
      `/hop-dong/${id}/${router?.query?.slug?.[1]}?step=${nStep + 1}`
    );
  };
  const prevStep = (values) => {
    console.log("values prev", values);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (values) {
      setSubmitData(values);
    }
    // setStep(nStep - 1);
    router.push(
      `/hop-dong/${id}/${router?.query?.slug?.[1]}?step=${nStep - 1}`
    );
  };
  const submit = async () => {
    let { dob, ...rest } = submitData;
    let body = {};
    if (data?.type === "XE_MAY" || data?.type === "OTO") {
      const valid_from = moment.isMoment(submitData.valid_from)
        ? moment(submitData.valid_from).format("DD/MM/YYYY")
        : submitData.valid_from;
      body = {
        ...rest,
        valid_from: valid_from,
        main_account: true,
        package_id: data._id,
        fee: data?.promotion_fee || data?.fee,
      };
    } else {
      const date = moment(dob, "DD/MM/YYYY");
      if (!date.isValid()) {
        message.error("Ngày tháng năm sinh không hợp lệ, vui lòng chọn lại");
        return;
      }
      const dateOfBirth = moment(date).format("DD/MM/YYYY");
      const valid_from = moment.isMoment(submitData.valid_from)
        ? moment(submitData.valid_from).format("DD/MM/YYYY")
        : submitData.valid_from;
      body = {
        ...rest,
        dob: dateOfBirth,
        valid_from: valid_from,
        main_account: true,
        package_id: data._id,
        fee: data?.promotion_fee || data?.fee,
      };
    }
    const res = await requestActivate(body);
    if (res?.data?.success) {
      setRequestId(res?.data?.data?.request_id);
      nextStep();
    } else {
      message.error(res?.data?.msg);
    }
  };

  const RenderStep = () => {
    if (type >= 0 && type <= 2) {
      switch (nStep) {
        case 0:
          return (
            <SecondStep
              onNextStep={nextStep}
              onPrevStep={prevStep}
              cardInfo={data}
              btnBack={0}
              submitData={submitData}
            />
          );
        case 1:
          return (
            <ThongTinBH
              onPrev={prevStep}
              initData={submitData}
              onNext={nextStep}
              data={data}
            />
          );
        case 2:
          return (
            <XacNhan
              onPrev={prevStep}
              onNext={nextStep}
              data={data}
              onSubmit={submit}
              submitData={submitData}
            />
          );
        case 3:
          return (
            <ThanhToan
              onPrev={prevStep}
              onNext={nextStep}
              data={data}
              requestId={requestId}
              submitData={submitData}
            />
          );
        default:
          return "";
      }
    } else {
      switch (nStep) {
        case 0:
          return (
            <ThongTinBH
              onPrev={prevStep}
              initData={submitData}
              onNext={nextStep}
              data={data}
            />
          );
        case 1:
          return (
            <XacNhan
              onPrev={prevStep}
              onNext={nextStep}
              data={data}
              onSubmit={submit}
              submitData={submitData}
            />
          );
        case 2:
          return (
            <ThanhToan
              onPrev={prevStep}
              onNext={nextStep}
              data={data}
              requestId={requestId}
              submitData={submitData}
            />
          );
        default:
          return "";
      }
    }
  };
  if (!data) {
    return <></>;
  }
  return (
    <>
      <Head>
        <title key="title">{`Gói BH - ${data && data.name} | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`Gói BH - ${data && data.name} | Ezin`}
        />
      </Head>
      <Navbar headers={headers} />
      <section id="activation">
        <div className="main-section content-section ptb-100 mt-4">
          <div className="container">
            <h2 className="text-center">
              Bảo hiểm {data?.product_id?.name} - {data?.program_id?.name}
            </h2>
            <div className="step-wrapper-1">
              <div className="wrap-steps">
                <Steps current={nStep} responsive={false}>
                  {type === 0 ? <Step title="Trả lời câu hỏi" /> : null}
                  <Step title="Thông tin BH" />
                  <Step title="Xác nhận" />
                  <Step title="Thanh toán" />
                </Steps>
              </div>
              <div>
                {nStep === 0 && type === 0 ? (
                  <RenderStep />
                ) : (
                  <div className="ezin-card shadow">
                    <RenderStep />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer product={allNodeProducts} />
    </>
  );
}
