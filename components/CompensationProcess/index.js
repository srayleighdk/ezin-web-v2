import { Steps, Image } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ButtonEzin from "../Common/Button";
const { Step } = Steps;

export default function Compensation() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  return (
    <section className="bg-process">
      <div className="container process py-4">
        <div className="text-center">
          <h3 className="title">
            Quy trình <span className="text-dark">bồi thường</span>
          </h3>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <img
              src="/images/boi-thuong.png"
              className="boi thuong"
              alt="Compensation"
            />
          </div>
          <div className="col-12 col-md-6">
            <Steps current={[3]} direction="vertical" className="mt-5 ps-4">
              <Step
                title="Bước 1"
                description={`Yêu cầu bảo hiểm (Điền biên bản bồi thường theo MẪU)`}
              />
              <Step
                title="Bước 2"
                description={`Bổ sung và hoàn tất hồ sơ yêu cầu bảo hiểm`}
              />
              <Step title="Bước 3" description={`Nhận bồi thường`} />
            </Steps>
          </div>
        </div>
        <div className="text-center">
          <ButtonEzin
            types="primary"
            className="py-2 bg-transparent btn-process"
            onClick={() => router.push("/#indemnify")}
          >
            Xem những trường hợp đã bồi thường
          </ButtonEzin>
        </div>
        <div className="text-center mt-5">
          <div className="customer">Khách hàng nhận bồi thường từ Ezin</div>
        </div>
        <div className="d-flex boi-thuong-img px-5 justify-content-center mt-3">
          <Image
            width={252}
            src="/images/boi-thuong/boi-thuong-kh1.png"
          />
          <Image
            width={348}
            src="/images/boi-thuong/boi-thuong-kh2.png"
          />
          <Image
            width={249}
            src="/images/boi-thuong/boi-thuong-kh3.png"
          />
        </div>
      </div>
    </section>
  );
}
