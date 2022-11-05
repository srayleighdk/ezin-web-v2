import { useRouter } from "next/router";
import ButtonEzin from "./Button";

export default function ProcessBuy() {
    const router = useRouter();
  return (
    <section className="processbuy">
      <div className="container">
        <img
          src="/images/processBuy.png"
          className="img-bg"
          alt="quy trinh boi thuong"
        />
        <div className="pb-5">
          <h3 className="title text-center">Quy trình mua bảo hiểm Ezin</h3>
        </div>
        <div className="step d-flex align-items-center justify-content-center">
          <div className="circle rounded-circle">
            <img
              src="/images/process-buy/cart.png"
              className=""
              alt="gio hang"
            />
          </div>
          <img
            src="/images/process-buy/arrow-up.png"
            className="arrow mb-4 mx-3"
            alt="tiep tuc"
          />

          <div className="circle rounded-circle">
            <img
              src="/images/process-buy/personal-data.png"
              className=""
              alt="du lieu khach hang"
            />
          </div>
          <img
            src="/images/process-buy/arrow-down.png"
            className="arrow mt-4 mx-3"
            alt="tiep tuc"
          />

          <div className="circle rounded-circle">
            <img
              src="/images/process-buy/credit-card.png"
              className=""
              alt="the thanh toan"
            />
          </div>
          <img
            src="/images/process-buy/arrow-up-2.png"
            className="arrow mb-4 mx-3"
            alt="tiep tuc"
          />

          <div className="circle rounded-circle">
            <img
              src="/images/process-buy/profile.png"
              className=""
              alt="thong tin"
            />
          </div>
        </div>
        <div className="row mt-3 content">
          <div className="col-3 text-center">
            <div className="header">Bước 1</div>
            <div className="title">Chọn loại và gói bảo hiểm</div>
          </div>
          <div className="col-3 text-center">
            <div className="header">Bước 2</div>
            <div className="title">Nhập thông tin</div>
          </div>
          <div className="col-3 text-center">
            <div className="header">Bước 3</div>
            <div className="title">Thanh toán</div>
          </div>
          <div className="col-3 text-center">
            <div className="header">Bước 4</div>
            <div className="title">Nhận hợp đồng online</div>
          </div>
        </div>
        <div className="text-center btn-process-buy">
          <ButtonEzin types="secondary" onClick={() => router.push("/#san-pham")}>Mua bảo hiểm ngay</ButtonEzin>
        </div>
      </div>
    </section>
  );
}
