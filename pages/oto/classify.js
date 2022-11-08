import React, { useState } from "react";
import Head from "next/head";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, Progress } from "antd";
import { processAIClassifyCar } from "../api";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function AIClassifyCar() {
  // const [checkImg, setCheckImg] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  // const [imageUrl, setImageUrl] = useState();
  const [image1, setImage1] = useState(null);
  // const [uploading, setUpLoading] = useState(false);

  const fileList = [];
  // const clickCheck =() => {

  // }

  // const toDataURL = (url) =>
  // fetch(url)
  //     .then(response => response.blob())
  //     .then(blob => new Promise((resolve, reject) => {
  //         const reader = new FileReader()
  //         reader.onloadend = () => resolve(reader.result)
  //         reader.onerror = reject
  //         reader.readAsDataURL(blob)
  //     }))

  // toDataURL('')
  // .then(dataUrl => {
  //     setCheckImg(dataUrl);
  // })

  const handleChange = (info) => {
    setResult(null);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, async (url) => {
        setLoading(false);
        const res = await processAIClassifyCar({
          // data: url.slice(23),
          // data: url.split(',')[1]
          data: url,
        });
        // console.log('res', res);
        if (res) {
          setResult(res?.data);
        } else {
          setResult(null);
        }
        // setImageUrl(url);
      });
    }
  };

  const handleUpload = async (file) => {
    setImage1(file);
  };

  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chụp ảnh</div>
    </div>
  );

  const showPercent = () => {
    if (image1) {
      return result?.probability * 100;
    } else {
      return 0;
    }
  };

  // console.log('res', result?.result);

  return (
    <>
      <Head>
        <title key="title">{`AI classify car | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`AI classify car | Ezin`}
        />
      </Head>
      <div className="container">
        <h3 className="mt-2 AICar__title">Nhận dạng xe ô tô</h3>
        <div className="d-flex align-items-center px-2 mb-4 AICar__wrap shadow">
          <div className="w-50 AICar__form__load">
            <div className="mt-2 AICar__text">
              Vui lòng chọn ảnh để nhận dạng
            </div>
            <div className="AICar__img">
              <Upload
                name="img1"
                beforeUpload={(file) => {
                  handleUpload(file);
                }}
                onRemove={(file) => setImage1(null)}
                listType="picture-card"
                className="avatar-uploader"
                accept={"image/*"}
                onChange={handleChange}
              >
                {!image1 && uploadButton}
              </Upload>
            </div>
          </div>
          <div className="w-50 AICar__form__result">
            <h3 h3 className="AICar__result mt-2">
              Kết quả
            </h3>
            <Progress
              type="circle"
              className="d-flex AICar__verify"
              percent={showPercent()}
              status="normal"
              strokeColor={
                result?.result === "Car" ? "rgb(82, 196, 26)" : "#FF4D4F"
              }
            ></Progress>
            {showPercent() === 0 ? null : (
              <h3
                className={
                  result?.result === "Car"
                    ? "AICar__percent__car"
                    : "AICar__percent__other"
                }
              >
                {result?.result}
              </h3>
            )}
            {/* <Button
                    type="primary"
                    className="p-button mb-2 AICar__back"
                    onClick={() => {
                      setImage1(null);
                      setForm(false);
                    }}
                  >
                    Quay về
                  </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <h3 className="mt-2 AICar__title">Nhận dạng xe ô tô</h3>
            <div className="AICar__wrap shadow">
            
            <div className="mt-2 AICar__text">Vui lòng chọn ảnh để nhận dạng</div>
            <div className="AICar__img">
            <Upload
              name="img1"
              beforeUpload={(file) => {
                handleUpload(file);
              }}
              onRemove={(file) => setImage1(null)}
              listType="picture-card"
              className="avatar-uploader"
              accept={'image/*'}
              onChange={handleChange}
            >
              {!image1 && uploadButton}
            </Upload>
            <Button type="primary" className="p-button w-100 mt-1" htmlType="submit" onClick={handleForm}>
              Kiểm tra
            </Button>
            {result !== null ?
              <div className="AICar__form__result">
              <h3 h3 className="AICar__result">Kết quả</h3>
              <Progress type="circle" className="d-flex AICar__verify" percent={(result?.probability) * 100} ></ Progress>
              {(result?.probability) * 100 === 100 ? <div className="AICar__fullPercent">100%</div> : null}
              <h3 className="AICar__percent">{result?.result}</h3>
              </div>
            : null}
            </div>
            </div> */
}
