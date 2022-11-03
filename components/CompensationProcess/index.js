import { Steps } from "antd";
import React, { useState } from "react";
import ButtonEzin from "../Common/Button";
const { Step } = Steps;

export default function Compensation() {
  const description = "This is a description.";
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };
  return (
    <section className="bg-process">
      <div className="container process pt-4">
        <div className="text-center">
          <h3 className="title">
            Quy trình <span className="text-dark">bồi thường</span>
          </h3>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <img src="/images/boi-thuong.png" className="boi thuong" alt="Compensation" />
          </div>
          <div className="col-12 col-md-6">
            <Steps current={[3]} direction="vertical" className="mt-5 ps-4">
              <Step
                title="Bước 1"
                description={`Yêu cầu bảo hiểm (Điền biên bản bồi thường theo MẪU) https://www.ezin.vn/yeucauboithuong`}
              />
              <Step
                title="Bước 2"
                description={`Bổ sung và hoàn tất hồ sơ yêu cầu bảo hiểm`}
              />
              <Step title="Bước 3" description={`Nhận bồi thường`} />
            </Steps>
          </div>
        </div>
        <div className="text-center" >
            <ButtonEzin types="primary" className="py-2 bg-transparent btn-process">
                Xem những trường hợp đã bồi thường
            </ButtonEzin>
        </div>
      </div>
    </section>
  );
}
