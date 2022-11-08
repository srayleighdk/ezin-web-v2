import { message, Steps } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getPackage, getTransactionInfo, requestActivate } from '../api';
import moment from 'moment';
import ThongTinBH from '../hop-dong/components/thongTin';
import XacNhan from '../hop-dong/components/xacNhan';
import ThanhToan from '../hop-dong/components/thanhToan';

const { Step } = Steps;

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   const { data } = await getTransactionsInfo(id);
//   return {
//     props: {
//       data: data?.data || null,
//     },
//   };
// }

export default function TaiTucPage() {
  const router = useRouter();
  const id = router?.query?.id;
  const [nStep, setStep] = useState(0);
  const [requestId, setRequestId] = useState(null);
  const [submitData, setSubmitData] = useState(null);
  const [data, setData] = useState(null);
  const [initData, setInitData] = useState(null);
  const getData = async (id) => {
    const res = await getTransactionInfo(id);
    if (res?.data?.success) {
        const request = res?.data?.data;
        const initData = {
            full_name: request?.full_name,
            dob: request?.dob,
            city: request?.city,
            district: request?.district,
            ward: request?.ward,
            address: request?.address,
            phone: request?.phone,
            email: request?.email,
            legal_id: request?.legal_id,
            sex: request?.sex,
            valid_from: moment.max(moment().add(1, 'days'), moment(request?.valid_to).add(1, 'days')).format('DD/MM/YYYY'),
            license_number: request?.license_number,
            chassis_number: request?.chassis_number,
            engine_number: request?.engine_number,
        }
        const packageId = request?.package_id;
        const res1 = await getPackage(packageId.package_id)
        setData(res1?.data?.data)
        setInitData(initData);
    }
    // 
  }
  useEffect(() => {
      if (id) {
        getData(id);
      }
  }, [id]);

  useEffect(() => {
    setTimeout(function() {
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
    setStep(nStep + 1);
    
  }
  const prevStep = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setStep(nStep - 1);
  }
  const submit = async () => {
    let { dob, ...rest } = submitData;
    const date = moment(dob, 'DD/MM/YYYY');
    if (!date.isValid()) {
      message.error('Ngày tháng năm sinh không hợp lệ, vui lòng chọn lại');
      return;
    }
    const dateOfBirth = moment(date).format('DD/MM/YYYY');
    const valid_from = moment.isMoment(submitData.valid_from) ? moment(submitData.valid_from).format('DD/MM/YYYY') : submitData.valid_from;
    let body = {
      ...rest,
      dob: dateOfBirth,
      valid_from: valid_from,
      main_account: true,
      package_id: data._id,
      fee: data?.promotion_fee || data?.fee
    };
    const res = await requestActivate(body);
    if (res?.data?.success) {
      setRequestId(res?.data?.data?.request_id)
      nextStep();
    } else {
      message.error(res?.data?.msg)
    }
  }
  const RenderStep = () => {
    switch (nStep) {
      case 0:
        return <ThongTinBH onPrev={prevStep} onNext={nextStep} data={data} initData={initData}/>;
      case 1:
        return <XacNhan onPrev={prevStep} onNext={nextStep} data={data} onSubmit={submit} submitData={submitData} />;
      case 2:
        return <ThanhToan onPrev={prevStep} onNext={nextStep} data={data} requestId={requestId} />;
      default:
        return '';
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
        <div className="main-section content-section">
          <div className="container">
            <h2 className="text-center">Bảo hiểm {data?.product_id?.name} - {data?.program_id?.name}</h2>
            <div className="step-wrapper-1">
              <div className="wrap-steps">
                <Steps current={nStep} responsive={false}>
                  <Step title="Thông tin BH" />
                  <Step title="Xác nhận" />
                  <Step title="Thanh toán" />
                </Steps>
              </div>
              <div>
                <div className="ezin-card shadow">

                  <RenderStep />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
