import { Button, Col, Input, message, Radio, Row } from 'antd';
import ButtonEzin from "../../../components/Common/Button";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import TableInfo from './TableInfo';
import { 
    createPaymentURL, 
    createTokenURL, 
    getAccountVnpayToken, 
    applyVoucher, 
    createDynamicShopeePayQR, 
    createShopeePayOrder,
    checkShopeePayQRInvalidate,
    checkShopeePayStatus,
    createDynamicZaloPayQR
} from '../../api';
import { formatVND } from '../../../utils/helpers';
import LogoVNPAY from '../../../public/images/vnpay.png';
import LogoShopeePay from '../../../public/images/shopeepay.jpg';
import ZaloPay from '../../../public/images/ZaloPay.png';
import Image from 'next/image';
import { vnpayTmncode, vnpayTmncodeToken } from '../../../utils/config';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { setInterval } from 'core-js';

const EXPIRE_TIME = 5 * 60;

function ThanhToan({ data, onPrev, requestId, submitData }) {
    const [method, setMethod] = useState('VNPAY');
    const [vnpayToken, setVnpayToken] = useState([]);
    const [voucher, setVoucher] = useState('');
    const [discount, setDiscount] = useState(0);
    const [paymentQR, setPaymentQR] = useState(null);
    const [countTime, setCountTime] = useState(EXPIRE_TIME);
    const [popup, setPopup] = useState(false);
    const [handleButtonConfirm, setHandleButtonConfirm] = useState(false);
    const [paymentIdQRCode, setPaymentIdQRCode] = useState(null);
    // const [flagDisableConfirm, setFlagDisableConfirm] = useState(false);

    const router = useRouter();
    const fee = data?.promotion_fee || data?.fee;
    const discountValue = discount?.value || 0;
    const total = fee - discountValue;
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const checkPaymentStatusTimeout = useRef(null);
    const countTimeInterval = useRef(null);

    // let statusCountTime = false;
    // console.log('statusCountTime', statusCountTime);

    useEffect(() => {
        getAccountToken();
        return () => {
            clearTimeoutCheckPaymentStatus();
        }

    }, [])

    const updateCounter = (value) => {
        if (value > 0) {
            setCountTime(value - 1);
            countTimeInterval.current = setTimeout(() => updateCounter(value - 1), 1000);
        } else {
            clearTimeoutCheckPaymentStatus();
            setPopup(true);
        }
    }

    const checkPaymentStatus = async () => {
        let res = await checkShopeePayStatus({
            request_id: requestId,
        });

        const responseCode = res?.data?.data?.response_code;
        if (responseCode) {
            if (responseCode === '00') {
                router.push('/hop-dong/complete/spp?result_code=100&reference_id=' + res?.data?.data?._id);
            }
            else {
                router.push('/hop-dong/complete/spp?result_code=202&reference_id=' + res?.data?.data?._id);
            } 
        } else {
            checkPaymentStatusTimeout.current = setTimeout(() => checkPaymentStatus(), 3000)
        }
    }

    // const checkPaymentStatusZaloPay = async (value) => {
    //     let res = await checkStatusZaloPayQR({
    //         app_trans_id: value,
    //     });

    //     const responseCode = res?.data?.data?.return_code;
    //     if (responseCode) {
    //         if (responseCode === '1') {
    //             router.push('/hop-dong/zlp/complete?result_code=100&reference_id=' + res?.data?.data?.zp_trans_id);
    //         }
    //         else {
    //             router.push('/hop-dong/zlp/complete?result_code=202&reference_id=' + res?.data?.data?.zp_trans_id);
    //         } 
    //     } else {
    //         checkPaymentStatusTimeout.current = setTimeout(() => checkPaymentStatus(), 3000)
    //     }
    // }

    const clearTimeoutCheckPaymentStatus = () => {
        clearTimeout(countTimeInterval.current);
        clearTimeout(checkPaymentStatusTimeout.current);
        setHandleButtonConfirm(false);
    }

    // useEffect(() => {
    //     if(countTime > 0 ) {
    //         countTimeInterval = setTimeout(() => setCountTime(countTime - 1), 1000);
    //     } else {
    //         clearTimeout(countTimeInterval);
    //     }
    // }, [countTime])

    const getAccountToken = async () => {
        const res = await getAccountVnpayToken();
        if (res?.data?.success) {
            setVnpayToken(res?.data?.data)
        }
    }
    const createPayment = async () => {
        const baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        // const returnURL = `${baseUrl}/hop-dong/card/complete`;
        if (method == 'VNPAY') {
            const baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            let returnURL = `${baseUrl}/hop-dong/complete`;
            const res = await createPaymentURL({
                amount: total,
                voucher: discount?.voucher,
                discount: discountValue,
                total: total,
                orderDescription: `Hợp đồng thông minh - ${data?.name}`,
                requestId,
                returnURL,
                tmncode: vnpayTmncode
            })
            if (res?.data?.success) {
                router.push(res?.data?.data)
            }
        } else if (method == 'SHOPEE_PAY') {
            let returnURL = `${baseUrl}/hop-dong/complete/spp`;

            if (isMobile) {
                let res = await createShopeePayOrder({
                    amount: total,
                    voucher: discount?.voucher,
                    discount: discountValue,
                    total: total,
                    orderDescription: `Hợp đồng thông minh - ${data?.name}`,
                    requestId,
                    returnURL,
                });
                if (res?.data?.success) {
                    const { errcode, debug_msg, redirect_url_http } = res?.data?.data;
                    console.log('redirect_url_http',redirect_url_http);
                    if (errcode == '0') {
                        router.push(redirect_url_http)
                        // window.location.href = redirect_url_http
                    } else {
                        message.error(debug_msg)
                    }
                    // console.log('success', res?.data?.data)
                }

            } else {
                let res = await createDynamicShopeePayQR({
                    amount: total,
                    voucher: discount?.voucher,
                    discount: discountValue,
                    total: total,
                    orderDescription: `Hợp đồng thông minh - ${data?.name}`,
                    requestId,
                    returnURL,
                    expire_time: EXPIRE_TIME,
                });
                // console.log('res ShopeePay', res);
                if (res?.data?.success) {
                    if (paymentQR) {
                        clearTimeoutCheckPaymentStatus();
                        getShopeePayQRInvalidate();
                    }
                    setPaymentQR(res?.data?.data?.qr_url);
                    setPaymentIdQRCode(res?.data?.data?.payment_id);
                    setHandleButtonConfirm(true);
                    countTimeInterval.current = setTimeout(() => updateCounter(EXPIRE_TIME), 1000);
                    countTimeInterval.current = setTimeout(() => checkPaymentStatus(), 3000);
                }
            }

        } else if (method == 'ZALO_PAY') {
            
            let returnURL = `${baseUrl}/hop-dong/complete/zlp`;
            let res = await createDynamicZaloPayQR({
                amount: total,
                voucher: discount?.voucher,
                discount: discountValue,
                total: total,
                orderDescription: `Hợp đồng thông minh - ${data?.name}`,
                request_id: requestId,
                returnURL,
                expire_time: EXPIRE_TIME,
            });

            console.log('res ZaloPay', res);
            if (res?.data?.success) {
                router.push(res?.data?.data?.order_url);
                // countTimeInterval.current = setTimeout(() => checkPaymentStatusZaloPay(res?.data?.data?.app_trans_id), 3000);
            } else {
                message.error(res?.data?.msg || 'Đã có lỗi xảy ra, xin vui lòng thử lại sau!')
            }
        } else if (method.indexOf('vnpay_token') >= 0) {
            let returnURL = `${baseUrl}/hop-dong/complete/card`;

            const token = method.replace('vnpay_token_', '');
            // token 

            const res = await createTokenURL({
                amount: total,
                voucher: discount?.voucher,
                discount: discountValue,
                total: total,
                orderDescription: `Hợp đồng thông minh - ${data?.name}`,
                requestId,
                returnURL,
                tmncode: vnpayTmncodeToken,
                vnpCommand: 'token_pay',
                vnpToken: token,
            })
            if (res?.data?.success) {
                router.push(res?.data?.data)
            }
        }
    }
    const onAddCard = async (type) => {
        const baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        const returnURL = `${baseUrl}/hop-dong/complete/card`;
        const res = await createTokenURL({
            amount: total,
            voucher: discount?.voucher,
            discount: discountValue,
            total: total,
            orderDescription: `Hợp đồng thông minh - ${data?.name}`,
            requestId,
            returnURL,
            tmncode: vnpayTmncodeToken,
            vnpCommand: 'pay_and_create',
            type
        })
        if (res?.data?.success) {
            router.push(res?.data?.data)
        }
    }
    const onAddVoucher = async (e) => {
        // console.log('values', data, voucher)
        const res = await applyVoucher({
            voucher,
            fee,
            package_id: data?._id,
            product_id: data?.product_id?._id
        })


        if (res?.data?.success) {
            setDiscount(res?.data?.data)
            // setVoucher('');
            message.success('Đã áp dụng mã khuyến mãi thành công!')
        } else {
            message.error(res?.data?.msg)
            setDiscount(0)
        }

    }
    const getLogo = (item) => {
        const type = item?.vnp_card_type;
        const bank_code = item?.vnp_bank_code;
        const card_number = item?.vnp_card_number
        if (type === '01') {
            return (
                <>
                    <div style={{ marginLeft: -20 }}>
                        <Image layout='fixed' height={20} width={100} src={`https://sandbox.vnpayment.vn/tokenUI/Images/logo-bank/${bank_code.toLowerCase()}_logo.png`} />
                    </div>
                    <div style={{ marginLeft: -10 }}>
                        {card_number}
                    </div>
                </>
            )
        } else if (type === '02') {
            return (
                <>
                    <div>
                        <Image layout='fixed' height={36} width={60} src={`https://sandbox.vnpayment.vn/tokenUI/Images/logo-bank/${bank_code.toLowerCase()}_icon.png`} />
                    </div>
                    <div className='ml-1'>
                        {card_number}
                    </div>
                </>
            )
        }
        return null;
    }
    const handleMethodChange = (_method) => {
        setMethod(_method);
        if (_method != 'SHOPEE_PAY') {
            setPaymentQR(null);
            clearTimeoutCheckPaymentStatus();
            getShopeePayQRInvalidate();
            // statusCountTime = false;
        } else {
            setCountTime(EXPIRE_TIME);
        }
    }

    const getShopeePayQRInvalidate = async () => {
        // Tam thoi khong dung QR code invalidate
        // if (paymentIdQRCode) {
        //     console.log('paymentIdQRCode', paymentIdQRCode);
        //     let res = await checkShopeePayQRInvalidate({
        //         payment_id: paymentIdQRCode,
        //     });
    
        //     console.log('getShopeePayQRInvalidate', res);
    
        //     if (res?.data?.success) {
        //         // message thông báo QR Code Invalidate
        //         // alert("QR Code invalidate. Vui lòng tạo lại mã QR Code mới");
        //     }
        // }
    }

    let tableData = [
        ['Tên bảo hiểm', `${data?.product_id?.name} - ${data?.program_id?.name}`],
        ['Gói bảo hiểm', data?.name],
        ['Phí bảo hiểm', formatVND(fee)],
        ['Giảm giá', formatVND(discountValue)],
        ['Thanh toán', formatVND(total)]
    ]
    return (<div>
        <h3>Mã khuyến mãi</h3>

        <Input.Group compact>
            <Input style={{ width: 'calc(100% - 100px)' }} placeholder="Mã khuyến mãi" value={voucher} onChange={(e) => setVoucher(e.target.value)} />
            <Button type="primary" style={{ width: '100px' }} onClick={onAddVoucher}>Áp dụng</Button>
        </Input.Group>
        {/* <Button
            type="primary"
            className="mt-2"
            onClick={createPayment}>Chọn mã</Button> */}
        <hr />
        <h3>Thông tin thanh toán</h3>
        <TableInfo
            tableData={tableData}
        />

        <h3>Phương thức thanh toán</h3>
        <TableInfo
            tableData={[
                [
                    <div key={1} className="d-flex align-items-center flex-row">
                        <div style={{ width: '50px' }}>
                            <Image height={40} width={40} src={LogoVNPAY} alt="VNPAY" />
                        </div>
                        <div>Cổng thanh toán VNPAY</div>
                    </div>,
                    <Radio
                        key={1}
                        // onChange={() => {
                        //     setMethod('VNPAY');
                        // }}
                        onChange={() => handleMethodChange('VNPAY')}
                        checked={method === 'VNPAY'}
                    ></Radio>

                ],
                [
                    <>
                        <div key={1} className="d-flex align-items-center flex-row">
                            <div style={{ width: '50px' }}>
                                <Image height={40} width={40} src={LogoShopeePay} alt="SHOPEE PAY" />
                            </div>
                            <div>Ví ShopeePay</div>

                        </div>
                        {paymentQR && method === 'SHOPEE_PAY' ? (
                            <>
                                <p>Vui lòng quét mã QR code sau để thanh toán</p>
                                {/* {messageQR && ( */}
                                <div className="d-flex align-items-center pl-2" style={{ backgroundColor: 'rgba(247, 184, 1, 0.3)' }}>
                                    <div style={{ position: 'relative', borderWidth: '0 14px 25px', borderStyle: 'solid', borderColor: 'transparent transparent rgba(247, 184, 1, 0.9) transparent' }}>
                                        <p style={{ position: 'absolute', top: '-1px', left: '-3px', fontSize: '22px', fontWeight: 600, color: 'white' }}>!</p>
                                    </div>
                                    <p className="pl-1 mt-auto mb-auto" style={{ paddingTop: '6px' }}>Vui lòng dùng ứng dụng ShopeePay để quét mã QR code sau.</p>
                                    <div style={{ border: '4px solid rgb(41 189 181)', borderRadius: '50%', margin: '8px 8px 8px auto', height: '48px', width: '62px', padding: '8px 0 0 6px' }}>0{Math.floor(countTime / 60)}:{countTime % 60 < 10 ? '0' + countTime % 60 : countTime % 60}</div>
                                </div>
                                {/* )} */}
                                <img src={method === 'SHOPEE_PAY' && paymentQR} width="100%" style={{ maxWidth: 300 }} />
                            </>
                        ) : null}
                    </>,
                    <Radio
                        key={1}
                        // onChange={() =>  {
                        //     setMethod('SHOPEE_PAY');
                        // }}
                        onChange={() => handleMethodChange('SHOPEE_PAY')}

                        checked={method === 'SHOPEE_PAY'}
                    ></Radio>
                ],
                [
                    <>
                        <div key={1} className="d-flex align-items-center flex-row">
                            <div style={{ width: '50px' }}>
                                <Image height={40} width={40} src={ZaloPay} alt="ZALO PAY" />
                            </div>
                            <div>ZaloPay</div>
                        </div>
                    </>,
                    <Radio
                        key={1}
                        // onChange={() =>  {
                        //     setMethod('SHOPEE_PAY');
                        // }}
                        onChange={() => handleMethodChange('ZALO_PAY')}

                        checked={method === 'ZALO_PAY'}
                    ></Radio>
                ],
                ...vnpayToken.map(e => ([
                    <div key={1} className="d-flex align-items-center flex-row">
                        {getLogo(e)}
                    </div>,
                    <Radio key={1}
                        // onChange={() => setMethod(`vnpay_token_${e.vnp_token}`)} 
                        onChange={() => handleMethodChange(`vnpay_token_${e.vnp_token}`)}

                        checked={method === `vnpay_token_${e.vnp_token}`}></Radio>
                ])),
                [<div key="card-manage">
                    <Link passHref={true} href="/profile/cards" target="_blank">
                        <a target="_blank" >Quản lý liên kết thẻ của bạn</a>
                    </Link>
                </div>]
            ]}
        />
        <div key={1}>
            <Row gutter={[16, 8]}>
                <Col lg={12} sm={24} md={24} xs={24} >
                    <Button types="secondary" onClick={() => onAddCard('01')} className="w-100 text-left">
                        + Thêm thẻ ATM nội địa
                    </Button>
                </Col>
                <Col lg={12} sm={24} md={24} xs={24} >
                    <Button types="secondary" onClick={() => onAddCard('02')} className="w-100 text-left">
                        + Thêm thẻ tín dụng/thẻ ghi nợ
                    </Button>
                </Col>
            </Row>
        </div>
        <hr />
        <div>
            <div>
                <ButtonEzin
                    types="primary"
                    className="p-button btn-full-width mt-2"
                    onClick={() => {
                        createPayment();
                    }}
                    disabled={false}
                >
                    Xác nhận
                </ButtonEzin>
            </div>
            <div>
                <ButtonEzin
                    types="default"
                    className="p-button btn-full-width mt-2"
                    onClick={() => onPrev(submitData)}
                >
                    Quay về
                </ButtonEzin>
            </div>
        </div>
        {popup && (
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', paddingTop: '212px' }}>
                <div className="" style={{ width: '300px', height: '180px', position: 'absolute', top: 'calc((100vh - 180px) / 2)', left: 'calc((100vw - 300px) / 2)', alignItems: 'center', backgroundColor: '#d9d9d9', borderRadius: '6px', border: '1px solid #d9d9d9' }}>
                    <p style={{ fontSize: '16px', color: 'black' }}>QR code của bạn đã hết hạn. Vui lòng lấy mã mới.</p>
                    <ButtonEzin
                        types="primary"
                        className="mt-2 ml-auto pl-0 pr-0" style={{ width: '60px', height: '40px', textAlign: 'center', position: 'absolute', bottom: '6px', right: '6px' }}
                        onClick={() => {
                            setPopup(false);
                        }}
                    >
                        OK
                    </ButtonEzin>
                </div>
            </div>
        )
        }

    </div>
    );
}

export default ThanhToan;
