import React, { useRef, useState } from "react";
import Image from "next/image";
import NewVoucher from "../../public/images/new-voucher.png";
import SeriCode from "../../public/images/seri-code.png";
import Shopee from "../../public/images/shopee.png";
import TickImage from "../../public/images/tick.png";
import InputMask from "react-input-mask";
import { Input, message } from "antd";
import { getCardInfoByShortId, getCardInfo } from "../../pages/api/index.js";

const Tick = () => {
  return (
    <div className="tick">
      <Image width={20} height={20} src={TickImage} alt="tick" />
    </div>
  );
};
function ActiveMobile({ type = 0 }) {
  const inputCode = useRef(null);
  const [activeType, setActiveType] = useState(type);
  const [voucherV2, setVoucherV2] = useState("");
  const [serial, setSerial] = useState("");
  const [code, setCode] = useState("");
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newShortId, setNewShortId] = useState("");

  const handleChangeActiveType = (value) => {
    setActiveType(value);
    // setCardData(null)
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

  return (
    <>
      <div className="shadow-lg p-3 mb-5 bg-body rounded">
        <h2 className="text-center">CHỌN LOẠI THẺ</h2>

        <div className="d-flex">
          <div
            className={`activateOption ${
              activeType == 0 ? "activeMobile" : ""
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
            className={`activateOption ${
              activeType == 1 ? "activeMobile" : ""
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
            className={`activateOption ${
              activeType == 2 ? "activeMobile" : ""
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
          <div className="full-w my-1 text-center">
            <div className="text-center">Mã voucher</div>
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
          <div className="full-w my-1 text-center">
            <div className="text-center">Số seri</div>
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
            <div className="text-center">Mã cào</div>
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
          <div className="full-w my-1 text-center">
            <div className="text-center">Mã voucher</div>
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
      </div>
    </>
  );
}

export default ActiveMobile;
