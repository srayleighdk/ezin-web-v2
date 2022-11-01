import { message, Steps } from 'antd';
import FirstStep from '../src/container/activeCard/First';
import FourthStep from '../src/container/activeCard/Fourth';
import FourthStepOld from '../src/container/activeCard/FourthOld';
import SecondStep from '../src/container/activeCard/Second';
import ThirdStep from '../src/container/activeCard/Third';
import Third_InputTNDS_DT_MOTO from '../src/container/activeCard/Third_InputTNDS_DT_MOTO';
import Third_InputTNDS_DT_AUTO from '../src/container/activeCard/Third_InputTNDS_DT_AUTO';
import Third_InputTDNTN from '../src/container/activeCard/Third_InputTDNTN';
import ForceLogin  from '../src/container/activeCard/ForceLogin';
import md5 from 'md5';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { activeCard } from './api';
import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { makeSelectActivation } from '../src/store/selector';
import { secretOrKey } from '../utils/config';
import { useSelector } from 'react-redux';
import { makeSelectAuth } from '../src/store/selector';

const { Step } = Steps;

const thirdComponents = {
  'InputTNDS_DT_MOTO': Third_InputTNDS_DT_MOTO,
  'InputTNDS_DT_AUTO': Third_InputTNDS_DT_AUTO,
  'InputTDNTN': Third_InputTDNTN,
}
const mapStateToProps = createStructuredSelector({
  activation: makeSelectActivation(),
  auth: makeSelectAuth(),

});

const Activation = () => {
  const route = useRouter();
  const [nStep, setStep] = useState(0);
  const [cardInfo, setCardInfo] = useState({});
  const { activation } = useSelector(mapStateToProps);
  const { auth } = useSelector(mapStateToProps);

  useEffect(() => {
    if (activation.seri !== '' && activation.code !== '') {
      setCardInfo(activation);
      if (activation.package_id) {
        if (activation?.package_id?.product_id?.qna?.length > 0) {
          setStep(1);
        } else {
          setStep(2);
        }
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        
      }
    }

  }, [activation]);

  const nextStep = (data) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    console.log('next 4', data)
    switch (nStep) {
      case 0:
        // getCardInfo(data)
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err));
        if (data?.package_id?.product_id?.qna?.length) {
          setStep(1);
        } else {
          setStep(2);
        }
        setCardInfo(Object.assign({}, cardInfo, data));

        break;
      case 1:
        setStep(nStep + 1);
        setCardInfo(Object.assign({}, cardInfo, data));
        break;
      case 2:
        setStep(nStep + 1);
        setCardInfo(Object.assign({}, cardInfo, data));
        break;
      case 3:
        setCardInfo(Object.assign({}, cardInfo, data));
        break;
      default:
        return '';
    }
  };
  const prevStep = (data) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    console.log('prev nstep', nStep);
    console.log('prev cardInfo', cardInfo);
    console.log('prev data', data);
    if (nStep === 2 && !cardInfo?.package_id?.product_id?.qna?.length) {
      setStep(0);
    } else if (nStep === 2 && cardInfo?.package_id?.product_id?.qna?.length) {
      setCardInfo(Object.assign({}, cardInfo, data));
      setStep(nStep - 1);
    } else {
      setCardInfo(Object.assign({}, cardInfo, data));
      setStep(nStep - 1);
    }
  };

  // const onChange = (current) => {
  //   console.log('onChange:', current);
  //   setStep(current);
  // };

  const onGoBack = (request_id, msg) => {
    // console.log('msg', msg)
    let subpath = ''
    let url = (msg != 'API_FAIL')
      ? `/thank-you/${request_id}`
      : `/complete/${request_id}`;

    route.push(url);
  };

  const success = (request_id, msg) => {
    // console.log('success',request_id )
    onGoBack(request_id, msg);
    // Modal.success({
    //   content: (
    //     <h4>
    //       <strong>Xin chúc mừng! Bạn đã kích hoạt thành công bảo hiểm với Ezin - PVI!</strong>
    //     </h4>
    //   ),
    //   centered: true,
    //   onOk() {
    //     // console.log('onOk',request_id )
    //     onGoBack(request_id, msg);
    //   },
    //   okText: 'Đóng',
    // });
  };

  const onSubmit = ({ fourthData, button_ref }) => {
    const otp = Math.round(Math.random() * 10000 + 1000);
    const checksum = md5(`${secretOrKey}${otp}`);
    const { day, month, year, ...rest } = cardInfo;

    if (button_ref && button_ref.current) {
      button_ref.current.disabled = true;
    }
    const body = Object.assign(
      {},
      rest,
      fourthData,
      {
        otp,
        checksum,
      },
    );

    activeCard(body).then(({ data }) => {
      if (data.success) {
        // localStorage.setItem('requestId', data.data._id);
        success(data.data._id, data.msg);
        // if (button_ref && button_ref.current) {
        //   button_ref.current.disabled = false;
        // }
      } else {
        if (button_ref && button_ref.current) {
          button_ref.current.disabled = false;
        }
        message.error(data.msg);
      }
    });
  };

  const RenderStep = () => {
    switch (nStep) {
      case 0:
        return <FirstStep onNextStep={nextStep} card={cardInfo} />;
      case 1:
        return (
          <SecondStep
            onNextStep={nextStep}
            onPrevStep={prevStep}
            cardInfo={cardInfo}
          />
        );
      case 2:
        if (!auth?.username) {
          return <ForceLogin/>
        }
        const DynamicComponent = thirdComponents[cardInfo?.package_id?.product_id?.api_method] || ThirdStep;
        return (
          <DynamicComponent
            onNextStep={nextStep}
            onPrevStep={prevStep}
            cardInfo={cardInfo}
          />
        );
      case 3:
        return cardInfo?.package_id?.product_id?.rule_content ? (
          <FourthStep
            onPrevStep={prevStep}
            onSubmit={onSubmit}
            cardInfo={cardInfo}
          />
        )
          : (
            <FourthStepOld
              onPrevStep={prevStep}
              onSubmit={onSubmit}
              cardInfo={cardInfo}
            />
          )
      default:
        return '';
    }
  };
  return (
    <>
      <Head>
        <title key="title">{`Kích hoạt thẻ bảo hiểm | Ezin`}</title>
        <meta property="og:title" key="og-title" content={`Kích hoạt thẻ bảo hiểm | Ezin`} />
        <meta property="og:description" key="og-description" content={`Kích hoạt thẻ bảo hiểm | Ezin`} />
      </Head>
      <div id="activation">
        <div className="main-section content-section">
          <div className="container">
            <div className="wrap-steps">
              <Steps current={nStep}>
                <Step title="Thông tin thẻ" />
                <Step title="Trả lời câu hỏi" />
                <Step title="Thông tin cá nhân" />
                <Step title="Xác nhận" />
              </Steps>
            </div>
            <RenderStep />
          </div>
        </div>
      </div>
    </>
  );
};

export default Activation;
