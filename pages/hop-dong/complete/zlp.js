import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "antd";
import Success from "../../../public/images/success.png";
import Fail from "../../../public/images/fail.png";
import { formatVND, formatDateTime } from "../../../utils/helpers";
import Image from "next/image";
import Link from "next/link";
import {
  getRequestFromPayment,
  getAllNodeProducts,
  getHeader,
} from "../../api";
import TableInfo from "../components/TableInfo";

export default function Complete({ data }) {
  // const [data, setData] = useState(null);
  const router = useRouter();
  // console.log('router', router)
  const { status, apptransid, code } = router.query;
  // console.log('status', status)
  // const getData = async () => {
  //   const { apptransid } = router.query;
  //   const { data } = await getRequestFromPayment(apptransid.slice(7));
  //   setData(data?.data)
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  const renderContent = ({ success }) => {
    if (success) {
      return (
        <>
          <Head>
            <title key="title">{`Thanh toán thành công | Ezin`}</title>
            <meta
              property="og:title"
              key="og-title"
              content={`Thanh toán thành công | Ezin`}
            />
          </Head>
          <div>
            <Image
              width={96}
              height={96}
              src={Success}
              alt=""
              className="mr-2"
            />
            <h3>Thanh toán thành công</h3>
            <p>Cảm ơn bạn đã tham gia bảo hiểm cùng EZIN</p>

            <TableInfo
              className="rounded"
              tableData={[
                ["Thời gian", formatDateTime(data?.added_at)],
                // ['Số đơn bảo hiểm', ''],
                [
                  "Tên bảo hiểm",
                  `${data?.package_id?.program_id?.product_id?.name} - ${data?.package_id?.program_id?.name} (${data?.package_id?.name})`,
                ],
                ["Hình thức thanh toán", "ZALOPAY"],
                ["Phí bảo hiểm", formatVND(data?.fee || data?.fee_value)],
                ["Giảm giá", formatVND(data?.discount || 0)],
                [
                  "Thanh toán",
                  formatVND(
                    data?.total != null
                      ? data?.total
                      : data?.fee || data?.fee_value
                  ),
                ],
              ]}
            />

            <p>
              Bảo hiểm đã được kích hoạt và bạn sẽ nhận được email/ sms đính kèm
              chứng chỉ bảo hiểm
            </p>
            <div>
              <div className="mt-1">
                <Button type="primary" className="w-100">
                  <Link href="/profile/transaction">Hợp đồng của tôi</Link>
                </Button>
              </div>
              <div className="mt-1">
                <Button type="default" className="w-100">
                  <Link href="/">Về trang chủ</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Head>
          <title key="title">{`Thanh toán thất bại | Ezin`}</title>
          <meta
            property="og:title"
            key="og-title"
            content={`Thanh toán thất bại | Ezin`}
          />
        </Head>
        <div>
          <Image width={96} height={96} src={Fail} alt="" className="mr-2" />
          <h3>Thanh toán thất bại</h3>
          <p>Vui lòng thanh toán lại hoặc chọn phương thức thanh toán khác.</p>
          <TableInfo
            className="rounded"
            tableData={[
              ["Thời gian", formatDateTime(data?.added_at)],
              [
                "Tên bảo hiểm",
                `${data?.package_id?.program_id?.product_id?.name} - ${data?.package_id?.program_id?.name} (${data?.package_id?.name})`,
              ],
              ["Hình thức thanh toán", "ZALOPAY"],
              ["Phí bảo hiểm", formatVND(data?.fee || data?.fee_value)],
              ["Giảm giá", formatVND(data?.discount || 0)],
              [
                "Thanh toán",
                formatVND(data?.total || data?.fee || data?.fee_value),
              ],
            ]}
          />
          <div>
            <div className="mt-1">
              <Button type="primary" className="w-100">
                <Link
                  href={`/hop-dong/${data?.package_id?.package_id}/${data?.package_id?.name}`}
                >
                  Thanh toán lại
                </Link>
              </Button>
            </div>
            <div className="mt-1">
              <Button type="default" className="w-100">
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };
  if (!data) {
    return <></>;
  }
  return (
    <>
      <Head>
        {/* <title key="title">{`Gói BH - ${data && data.name} | Ezin`}</title>
        <meta property="og:title" key="og-title" content={`Gói BH - ${data && data.name} | Ezin`} /> */}
        {/* <meta property="og:image" key="og-image" content={data && data.image && `${getImageUrl()}/${data.image.path}`} /> */}
        {/* <meta property="og:description" key="og-description" content={data && data.desc} /> */}
      </Head>
      <div id="activation">
        <div className="main-section content-section">
          <div className="container">
            <div className="ezin-card shadow text-center">
              {renderContent({ success: status === "1" || code === "1" })}
            </div>
            <input
              id="conversion_status"
              type="hidden"
              value={status == "1" || code === "1" ? "1" : "0"}
            />
            <input
              type="hidden"
              value={data?.fee || data?.fee_value}
              id="conversion_value"
            />
            <input
              type="hidden"
              value={`${apptransid}-ZLP-${data?.package_id?.program_id?.product_id?.name} - ${data?.package_id?.program_id?.name} (${data?.package_id?.name})`}
              id="conversion_transactionid"
            />
          </div>
        </div>
      </div>
    </>
  );
}

// This function gets called at build time
export async function getServerSideProps(context) {
  const { vnp_txn_ref } = context.query;
  const [res, allNodeProducts, data] = await Promise.all([
    getHeader(),
    getAllNodeProducts(),
    getRequestFromPayment(vnp_txn_ref),
  ]);
  return {
    props: {
      headers: res?.data?.data,
      allNodeProducts: allNodeProducts?.data?.data,
      data: data?.data?.data || null,
    }, // will be passed to the page component as props
  };
}
