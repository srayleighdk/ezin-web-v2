import { Table } from 'antd';
import Separator from '../../components/Separator';
import Head from 'next/head';
import SecurityIcon from '../../public/images/security.png';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { formatDateTime, getImageUrl } from '../../utils/helpers';
import { getOrderNumber, getTransactions } from '../api';
import NoImageIcon from '../../public/images/noimage.png';
import {
  DownloadOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import FullImage from '../../components/FullImage';
const columns = [
  {
    dataIndex: '_id',
    key: '_id',
    render: (value, record) => (
      <>
        <div className={record.status == 0 ? 'text-link' : 'text-success'}>
          <i>
            <span className="mr-1">{record.status == 0 ? (<SyncOutlined />) : (<CheckCircleOutlined />)}</span>
            {moment(record?.added_at).format('DD/MM/YYYY HH:mm')}
          </i>
        </div>
        <div><b>{record.package_name}</b></div>
        <div><b>Seri thẻ:</b> <i>{record?.card_id?.serial}</i></div>
        <div><b>Người được bảo hiểm:</b> <i>{record?.full_name} - <b>CMND/CCCD:</b> {record?.legal_id}</i></div>
        <div><b>Giá trị/quyền lợi:</b> <i>{record?.card_id?.package_id?.program_id?.total_fee}</i></div>
        {record.url && (<div><i><a className="text-link" rel="noreferrer" target="_blank" href={record?.url}><DownloadOutlined /> Tải chứng chỉ</a></i></div>)}
      </>
    ),
    align: 'left',
    width: '100%'
  },
];

export async function getServerSideProps(context) {
  const { request_id } = context.params;

  return {
    props: {
      request_id
    },
  };
}

export default function OrderComplete({ request_id }) {
  const [requestId, setRequestId] = useState();
  const [data, setData] = useState({});
  const [orderNumber, setOrderNumber] = useState();
  const [url, setUrl] = useState();

  const { link_rules, product_name, value_money, valid_from, valid_to, email, package_id } =
    data.request || {};
  useLayoutEffect(() => {
    // setRequestId(localStorage.getItem('requestId'));
    setRequestId(request_id);
  }, []);

  useEffect(() => {
    var intervalId;
    const getCode = async () => {
      try {
        const { data } = await getOrderNumber(requestId);

        if (data?.data?.PVIID) {
          setOrderNumber(data.data.PVIID);
          setUrl(data.data.url);
          clearInterval(intervalId);
        }
      } catch (e) {
        console.log('Error', e);
      }
    };

    if (requestId) intervalId = setInterval(getCode, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [requestId]);

  useEffect(() => {
    (async () => {
      if (requestId) {
        const { data } = await getTransactions(requestId);
        setData(data.data);
      }
    })();
  }, [requestId]);

  return (
    <div>
      <Head>
        <title>Kích hoạt thành công</title>
      </Head>
      <div className="main-section content-section">
        <div className="container">
          <div
            className="ezin-card mt-5"
            // style={{ maxWidth: 800, margin: '0px auto' }}
          >
            <div className="pt-5 align-items-center flex-column text-center">
              <Image width={96} height={115} src={SecurityIcon} alt="" />
              {data.is_first && (<div className="mt-2 font-weight-bold">
                {data.totalEziner} Eziner chào mừng bạn tới cộng đồng hạnh phúc và bình an. Bạn là thành viên mới nhất của chúng tôi, hãy kết nối Zalo 0909.088.313 để tương tác hàng ngày nhé!
              </div>)}
              {data?.is_demo && (
                <div className="mt-3" style={{
                  color: 'red',
                  fontSize: '11px'
                }}>

                  * Đây là tài khoản dùng thử để trải nghiệm sản phẩm, bạn phải mua thẻ để sử dụng bảo hiểm
                </div>
              )}
              <div className="mt-2 font-weight-bold">
                CẢM ƠN BẠN ĐÃ THAM GIA BẢO HIỂM
                <br />
                THÔNG QUA WEBSITE EZIN.VN!
              </div>
              {/* <div className="mt-5 mb-2 font-style-italic">
                Số đơn bảo hiểm của bạn là:
              </div> */}
              <div
                className="p-2 border"
                style={{
                  backgroundColor: '#F5EFF7',
                  width: 'fit-content',
                  fontSize: 'larger',
                  borderRadius: 5,
                }}
              >
                <div className="font-weight-bold">
                  {orderNumber || 'Đơn bạn đang được xử lý'}
                </div>
              </div>
            </div>
            <hr />

            <div className="mt-5 font-style-italic">
              {orderNumber && (
                <p>
                  Bạn có thể xem&nbsp;
                  <a
                    href={url}
                    className="font-weight-bold font-style-normal text-deco-underline"
                    target="_blank" rel="noreferrer"
                  >
                    Giấy chứng nhận bảo hiểm
                  </a>
                  &nbsp;và&nbsp;
                  <a
                    href={link_rules}
                    target="_blank" rel="noreferrer"
                    className="font-weight-bold font-style-normal text-deco-underline"
                  >
                    Quy tắc bảo hiểm
                  </a>
                </p>
              )}

              <table width="100%">
                <tbody>
                  <tr>
                    <td>Gói bảo hiểm tham gia:</td>
                    <td className="font-style-normal">
                      <b>{product_name}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Giá trị bảo hiểm <br />/ Mức trách nhiệm:</td>
                    <td className="font-style-normal">
                      <b>{value_money}</b>
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Phí bảo hiểm:</td>
                    <td className="font-style-normal">
                      <b>{formatVND(fee_value)}</b>
                    </td>
                  </tr> */}
                  <tr>
                    <td>Thời gian bảo hiểm:</td>
                    <td>
                      Từ ngày{' '}
                      <b className="font-style-normal">
                        {formatDateTime(valid_from)}
                      </b>{' '}
                      đến ngày{' '}
                      <b className="font-style-normal">
                        {formatDateTime(valid_to)}
                      </b>
                    </td>
                  </tr>
                  {package_id?.type == 'COMBO' && (
                    <>
                    <tr>
                      <td colSpan="2"><hr/></td>
                    </tr>
                    <tr>
                      <td valign="top">Quyền lợi gói {package_id?.partner_package?.name}:</td>
                      <td>
                        <div dangerouslySetInnerHTML={{ __html: package_id?.partner_package?.benefits }} />
                      </td>
                    </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="mt-5">
              {email ? (
                <p>
                  <i>
                    Đơn bảo hiểm của bạn đang được xử lý bởi hệ thống<br />
                    Xin bạn giữ lại thẻ kích hoạt bảo hiểm EZIN cho tới khi nhận được chứng nhận bảo hiểm từ Tổng công ty bảo hiểm PVI.
                  </i>
                </p>
              ) : (
                <></>
              )}

              <p>
                <i>
                  Nếu có bất kỳ thắc mắc nào trong quá trình kích hoạt, vui lòng
                  liên hệ số hotline:{' '}
                  <b>
                    <Link href={`tel:${data.hotline}`} passHref><span>{data.hotline}</span></Link>
                  </b>
                </i>
              </p>
            </div>
          </div>
          <Separator height={50} />
          <h2 className="text-center uppercase font-weight-bold text-header">
            CÁC ĐƠN BẢO HIỂM CỦA TÔI
          </h2>
          <Separator height={20} />
          <div
            className="ezin-card"
            style={{ maxWidth: 800, margin: '0px auto' }}
          >
            {data.transactions && (
              <Table
                rowKey={(row) => row._id}
                dataSource={data.transactions}
                columns={columns}
                pagination={false}
                showHeader={false}
              />
            )}
            <div><Link style={{ color: 'nlue' }} href="/profile/transaction" passHref><i>Xem tất cả</i></Link></div>
          </div>
          <Separator height={20} />
          <div className="text-center w-100">
            <Link
              target="_blank" rel="noreferrer"
              href="/profile/transaction"
              className="font-weight-bold font-style-normal text-deco-underline"
            >
              Chi tiết đơn bảo hiểm của bạn
            </Link>
          </div>
          <Separator height={50} />
          {!!data?.products && (
            <>
              <h2 className="text-center uppercase font-weight-bold text-header">
                THAM KHẢO THÊM CÁC SẢN PHẨM KHÁC
              </h2>
              <Separator height={20} />
              <div
                className="other-product-container"
                style={{
                  maxWidth: 800,
                  margin: '0px auto',
                  display: 'grid',
                }}
              >
                {data?.products?.map((item) => {
                  const { image, _id, name, slug } = item;
                  return (
                    <div
                      style={{
                        borderRadius: 10,
                        height: 130,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        position: 'relative',
                      }}
                      key={_id}
                    >
                      <Link href={`/san-pham/${slug}`} target="_blank" rel="noreferrer" passHref>
                        <div>
                          {
                            image ? (
                              <FullImage
                                src={`${getImageUrl()}/${image.path}`}
                                style={{
                                  height: 130,
                                  width: '100%',
                                  objectFit: 'cover',
                                }}
                                alt={name}
                              />
                            )
                              :
                              (<FullImage
                                src={NoImageIcon}
                                style={{
                                  height: 130,
                                  width: '100%',
                                  objectFit: 'cover',
                                }}
                                alt={name}
                              />)
                          }
                          <div
                            className="bg-primary"
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 0,
                              top: 0,
                              left: 0,
                              opacity: 0.2,
                            }}
                          />
                          <div
                            className="font-style-italic text-right"
                            style={{
                              position: 'absolute',
                              right: 20,
                              bottom: 20,
                              width: '40%',
                              fontSize: 20,
                              color: 'white',
                            }}
                          >
                            {name}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
