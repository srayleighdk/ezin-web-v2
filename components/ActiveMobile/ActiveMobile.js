import React, { useRef, useState, useEffect } from "react";
import NewVoucher from "../../public/images/new-voucher.png";
import SeriCode from "../../public/images/seri-code.png";
import Shopee from "../../public/images/shopee.png";
import TickImage from "../../public/images/tick.png";
import { getCardInfoByShortId, getCardInfo } from "../../pages/api/index.js";
import { getImageUrl, formatVND, elipse } from "../../utils/helpers";
import { Input, message } from "antd";
import InputMask from "react-input-mask";
import Router from "next/router";
import { setActivation } from "../../src/store/actions";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { SyncOutlined } from "@ant-design/icons";
import styles from "../../styles/Activate.module.scss";
const Tick = () => {
  return (
    <div className="tick">
      <Image width={20} height={20} src={TickImage} alt="tick" />
    </div>
  );
};
export default function ActivateMobile({ id, type = 0 }) {
  const inputCode = useRef(null);
  const [activeType, setActiveType] = useState(type);
  const [newShortId, setNewShortId] = useState("");
  const [voucherV2, setVoucherV2] = useState("");
  const [serial, setSerial] = useState("");
  const [code, setCode] = useState("");
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      const checkId = id.replace(/[\-\s]/g, "");
      if (checkId?.length == 6) {
        setActiveType(2);
        setNewShortId(checkId);
        getCardByShortId(checkId, 6);
      } else if (checkId?.length == 10) {
        setActiveType(0);
        setVoucherV2(checkId);
        getCardByShortId(checkId, 10);
      }
    }
  }, id);
  const cardImage = cardData?.package_id?.product_id?.image_card
    ? `${getImageUrl()}/${cardData?.package_id?.product_id?.image_card?.path}`
    : "";
  const handleChangeActiveType = (value) => {
    setActiveType(value);
    setCardData(null);
  };
  const getCardByShortId = async (value, maxlen) => {
    let short_id = value?.trim()?.replace(/[_-]/g, "");
    if (short_id.length >= maxlen) {
      setLoading(true);
      const res = await getCardInfoByShortId({ short_id: value });
      if (res?.success) {
        setCardData(res?.data);
      } else {
        message.error(res?.msg);
        setCardData(null);
      }
      setLoading(false);
    } else {
      setCardData(null);
    }
  };
  const getCardInfoBySerial = async (serial, code) => {
    serial = serial?.trim()?.replace(/[_-]/g, "");
    code = code.trim().replace(/[_-]/g, "");
    if (serial.length >= 12) {
      inputCode.current && inputCode.current.focus();
    }
    if (serial.length >= 12 && code.length >= 8) {
      setLoading(true);
      const res = await getCardInfo({ seri: serial, code });
      if (res?.success) {
        setCardData(res?.data);
      } else {
        message.error(res?.msg);
        setCardData(null);
      }
      setLoading(false);
    } else {
      setCardData(null);
    }
  };
  const onNewShortIdChange = (e) => {
    const value = e.target.value;
    setNewShortId(e.target.value);
    getCardByShortId(value, 6);
  };
  const onVoucherV2Change = (e) => {
    const value = e.target.value;
    setVoucherV2(e.target.value);
    getCardByShortId(value, 10);
  };
  const onSerialChange = (e) => {
    const value = e.target.value;
    setSerial(e.target.value);
    getCardInfoBySerial(value, code);
  };
  const onCodeChange = (e) => {
    const value = e.target.value;
    setCode(e.target.value);
    getCardInfoBySerial(serial, value);
  };
  const onSubmit = () => {
    dispatch(setActivation(cardData));

    Router.push({ pathname: "/kich-hoat" });
  };
  return (
    <section
      className={`${styles["bg-gray"]} section ${styles.activateMobileSection}`}
    >
      <div className="container d-flex justify-content-center">
        <div className={`service-card shadow ${styles.activateContainer}`}>
          <h2>CHỌN LOẠI THẺ</h2>
          <div className="flex flex-row justify-content-around full-w">
            <div
              className={`${styles.activateOption} ${
                activeType == 0 ? styles.active : ""
              }`}
              onClick={() => handleChangeActiveType(0)}
            >
              <div>
                <Image
                  width={25}
                  height={18}
                  src={NewVoucher}
                  alt="Voucher mới"
                />
              </div>
              <div className="text-11">Voucher mới</div>
              {activeType == 0 && <Tick />}
            </div>
            <div
              className={`${styles.activateOption} ${
                activeType == 1 ? styles.active : ""
              }`}
              onClick={() => handleChangeActiveType(1)}
            >
              <div>
                <Image width={25} height={18} src={SeriCode} alt="Seri/Code" />
              </div>
              <div className="text-11">Seri/code</div>
              {activeType == 1 && <Tick />}
            </div>
            <div
              className={`${styles.activateOption} ${
                activeType == 2 ? styles.active : ""
              }`}
              onClick={() => handleChangeActiveType(2)}
            >
              <div>
                <Image width={25} height={18} src={Shopee} alt="Shopee" />
              </div>
              <div className="text-11">Shopee/Lazada</div>
              {activeType == 2 && <Tick />}
            </div>
          </div>
          {activeType == 0 && (
            <div className="full-w my-1">
              <div className="text-left">Mã voucher</div>
              <div>
                {/* <MaskedInput
                                    autoFocus={true}
                                    placeholder="Ví dụ: [abc]-[abcd]-[abc]"
                                    mask="***-****-***"
                                    size="large"
                                    onChange={onVoucherV2Change}
                                    value={voucherV2}
                                    autoCapitalize="none"
                                /> */}
                <InputMask
                  mask="***-****-***"
                  placeholder="Ví dụ: [abc]-[abcd]-[abc]"
                  autoFocus={true}
                  maskChar="_"
                  value={voucherV2}
                  autoCapitalize="none"
                  onChange={onVoucherV2Change}
                >
                  {(inputProps) => <Input {...inputProps} />}
                </InputMask>
              </div>
            </div>
          )}
          {activeType == 1 && (
            <div className="full-w my-1">
              <div className="text-left">Số seri</div>
              <div>
                {/* <MaskedInput
                                    autoFocus={true}
                                    placeholder="Ví dụ: [abcd]-[abcd]-[abcd]"
                                    mask="1111-1111-1111"
                                    size="large"
                                    inputMode="numeric"
                                    onChange={onSerialChange}
                                    value={serial}
                                    autoCapitalize="none"
                                /> */}
                <InputMask
                  mask="9999-9999-9999"
                  placeholder="Ví dụ: [abcd]-[abcd]-[abcd]"
                  autoFocus={true}
                  maskChar="_"
                  value={serial}
                  autoCapitalize="none"
                  onChange={onSerialChange}
                >
                  {(inputProps) => <Input {...inputProps} />}
                </InputMask>
              </div>
              <div className="text-left">Mã cào</div>
              <div>
                {/* <MaskedInput
                                    placeholder="Ví dụ: [abcd]"
                                    mask="1111-1111"
                                    size="large"
                                    inputMode="numeric"
                                    onChange={onCodeChange}
                                    value={code}
                                    ref={inputCode}
                                    autoCapitalize="none"
                                /> */}
                <InputMask
                  mask="9999-9999"
                  placeholder="Ví dụ: [abcd]"
                  // autoFocus={true}
                  maskChar="_"
                  value={code}
                  autoCapitalize="none"
                  onChange={onCodeChange}
                >
                  {(inputProps) => <Input {...inputProps} ref={inputCode} />}
                </InputMask>
              </div>
            </div>
          )}
          {activeType == 2 && (
            <div className="full-w my-1">
              <div className="text-left">Mã voucher</div>
              <div>
                {/* <MaskedInput
                                    autoFocus={true}
                                    placeholder="Ví dụ: [abc]-[abc]"
                                    mask="***-***"
                                    size="large"
                                    onChange={onNewShortIdChange}
                                    value={newShortId}
                                    autoCapitalize="none"
                                /> */}
                <InputMask
                  mask="***-***"
                  placeholder="Ví dụ: [abc]-[abc]"
                  autoFocus={true}
                  maskChar="_"
                  value={newShortId}
                  autoCapitalize="none"
                  onChange={onNewShortIdChange}
                >
                  {(inputProps) => <Input {...inputProps} />}
                </InputMask>
              </div>
            </div>
          )}
          {loading && (
            <div className={`my-1 full-w ${styles.cardContainer}`}>
              <SyncOutlined className={styles.loading} spin />
            </div>
          )}
          {!loading && cardData?.package_id?.product_id?.image_card && (
            <>
              <div className={`my-1 full-w ${styles.cardContainer}`}>
                <img src={cardImage} alt="Thẻ bảo hiểm" />
                <div className={styles.goiBaoHiem}>GÓI BẢO HIỂM</div>
                <div className={styles.tenBaoHiem}>
                  {cardData?.package_id?.product_id?.name}
                </div>
                <div className={styles.tenGoiBaoHiem}>
                  {cardData?.package_id?.name}
                </div>
                <div className={styles.phiBaoHiem}>Phí bảo hiểm</div>
                <div className={styles.giaTriBaoHiem}>Giá trị bảo hiểm</div>
                <div className={styles.phiBaoHiemValue}>
                  {elipse(formatVND(cardData?.package_id?.fee), 15)}
                </div>
                <div
                  className={styles.giaTriBaoHiemValue}
                  title={cardData?.package_id?.program_id?.total_fee}
                >
                  {elipse(cardData?.package_id?.program_id?.total_fee, 15)}
                </div>
              </div>
              <div className="full-w my-1">
                <button className="full-w btn btn-secondary" onClick={onSubmit}>
                  Kích hoạt ngay
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
