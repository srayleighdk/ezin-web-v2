import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "antd";
import Success from "../../../public/images/success.png";
import Fail from "../../../public/images/fail.png";
import { formatVND, formatDateTime } from "../../../utils/helpers";
import Image from "next/image";
import Link from "next/link";

export default function Complete() {
  return (
    <>
      <Head>
        <title key="title">{`Ghi nhận thành công | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`Ghi nhận thành công | Ezin`}
        />
      </Head>
      <div
        className="step-wrapper mt-5"
        style={{ maxWidth: 1000, margin: "0px auto" }}
      >
        <div className="container">
          <div className="ezin-card shadow text-center">
            <div>
              <Image
                width={96}
                height={96}
                src={Success}
                alt=""
                className="mr-2"
              />
              <h3>Ghi nhận kết quả thành công</h3>
              <p>Ezin xin chân thành cảm ơn sự đóng góp của bạn</p>
              {/* <p>Bảo hiểm đã được kích hoạt và bạn sẽ nhận được email/ sms đính kèm chứng chỉ bảo hiểm</p> */}
              <div>
                <div className="mt-1">
                  <Button type="primary" className="w-100">
                    <Link href="/oto/physicaldamages/test">
                      Thử với ảnh khác
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
          </div>
        </div>
      </div>
    </>
  );
}
