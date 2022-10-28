import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Drawer, message, Timeline, Table } from "antd";
import Head from "next/head";
import Card from "../../../src/container/tai-tuc/Card";
import Shopee from '../../../public/images/shopee.png';
import { getExpiresRequest } from '../../api';
import { ProtectedRoute } from '../../../src/container/auth-wrapper/auth.context';
import { getLayout } from '../../../components/layout/profile';
import { ClockCircleOutlined, CreditCardOutlined, ShopOutlined } from '@ant-design/icons';
import moment from 'moment';
import { formatNumber } from '../../../utils/helpers';

function TaiTuc() {
    const columns = [
        {
            title: '#',
            key: 'index',
            render: (text, row, index) => index + 1,
        },
        {
            title: 'Thông tin BH',
            key: 'full_name',
            dataIndex: 'full_name',
            align: 'left',
            render: (text, row, index) => {
                const diff = Math.round(moment(row?.valid_to).diff(moment(), 'days', true))

                return (
                    <>
                        <div><b>Gói BH: {row?.product_name}</b></div>
                        <div>{row?.full_name}</div>
                        <div><i>Ngày hết hạn: {moment(row?.valid_to).format('DD/MM/YY')}</i></div>
                        <div className={`${diff < 0 ? 'text-danger' : 'text-warning'}`}>
                            <b>{diff > 0 ? 'Còn lại' : 'Quá hạn'}: {formatNumber(Math.abs(diff))} ngày</b>
                        </div>
                    </>
                )
            },
        },
        {
            title: '',
            key: 'button',
            render: (text, row, index) => <Button type="primary" onClick={() => showDrawer(row)}>Tái tục ngay</Button>,
            align: 'right'
        }
    ];
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const data = await getExpiresRequest();
        if (data?.data?.success) {
            setData(data?.data?.data);
        } else {
            message.error('Đã có lỗi xảy ra, vui lòng thử lại sau ít phút')
        }
    }
    const [visible, setVisible] = useState(false);
    const showDrawer = (e) => {
        setSelected(e);
        setVisible(true);
    };
    const onClose = () => {
        setSelected(null);
        setVisible(false);
    };
    return (
        <>
            <Head>
                <title key="title">{`Tái tục BH | Ezin`}</title>
                <meta property="og:title" key="og-title" content={`Tái tục BH | Ezin`} />
            </Head>
            <div>
                <h1 className="text-center">
                    Danh sách BH cần tái tục
                </h1>
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{
                        position: ['bottomCenter'],
                        size: 'small',
                        defaultPageSize: 5,
                        showSizeChanger: false,
                    }}
                />
            </div>
            <Drawer
                title="Chọn hình thức tái tục"
                placement="right"
                onClose={onClose}
                visible={visible}>
                <Card data={selected} />
                <div className='mt-5'><b>Vui lòng chọn 1 trong các hình thức tái tục sau:</b></div>
                <div className='mt-2'>
                    <CreditCardOutlined className="text-primary"/> {' '}<a href={`/tai-tuc/${selected?._id}`}>Thanh toán trực tiếp qua Ezin</a>
                </div>
                <div className='mt-2'>
                    <ShopOutlined className="text-primary"/> {' '}
                    Mua thẻ tại
                    {' '}<a target="_blank" rel="noreferrer" href="https://shopee.vn/baohiempviezin?categoryId=100642&itemId=8369412499">Shopee</a>,
                    {' '}<a target="_blank" rel="noreferrer" href="https://www.lazada.vn/ezin-123772244/">Lazada</a>,
                    {' '}<a target="_blank" rel="noreferrer" href="https://tiki.vn/cua-hang/ezin-viet-nam">Tiki</a>
                </div>
            </Drawer>
        </>
    );
}

const Wrapper = ProtectedRoute(TaiTuc);
Wrapper.getLayout = getLayout;
export default Wrapper;