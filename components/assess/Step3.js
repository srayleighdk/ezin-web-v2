// Shortcut for kich-hoat
import React, { useState } from "react";
import { Modal, Row, Col, Button, Upload } from "antd";
import { getImageUrl } from "../../utils/helpers";
import { acceptImage, uploadAssess } from "../../pages/api";
import { IMAGE_TYPES } from "./constants";

const Step3 = ({ onNext, onPrev, data, onSetData }) => {
  const [processing, setProcessing] = useState(false);
  const onBack = () => {
    // if (data?.ntimes >= 3) {
    //     Modal.destroyAll();
    //     Modal.error({
    //         content: 'Rất tiếc bạn đã vượt quá số lần thử lại',
    //         okText: 'Đóng',
    //         onOk: () => {
    //             // inputCode.current.focus();
    //         }
    //     });
    // } else {
    //     onPrev();
    // }
  };
  const onAccept = async (type) => {
    const res = await acceptImage({ id: data._id, type });
    if (res?.data?.success) {
      onSetData(res?.data?.data);
    }
  };
  const onUpload = async (type, file) => {
    console.log("file", file);
    setProcessing(true);
    const formData = new FormData();
    formData.append("id", data._id);
    formData.append(type, file);
    try {
      const res = await uploadAssess(formData);
      if (res?.data?.success) {
        onSetData(res?.data?.data);
      } else {
        message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    } catch (ex) {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
    setProcessing(false);

    return false;
  };
  return (
    <>
      <Row gutter={[8, 10]}>
        <Col xs={24} sm={24}>
          <h3>3. Kết quả ({data?._id})</h3>
        </Col>
        <Col xs={24} sm={24}>
          <p className="ml-0 mb-0">
            Vui lòng kiểm tra kết quả và chọn đồng ý nếu kết quả giám định đúng,
            chọn chụp lại nếu không đồng ý.
          </p>
          <p className="ml-0 mb-0">
            <i>(* Bạn chỉ được chụp lại tối đa 3 lần)</i>
          </p>
          <hr className="my-2" />
        </Col>
        {Object.entries(IMAGE_TYPES).map(([type, value]) => {
          if (type == "img_registration") return null;

          const score =
            data?.images[type]?.scores?.length > 0
              ? Math.max(...data?.images[type]?.scores)
              : 0;
          return (
            <Col xs={24} sm={24} key={type}>
              <p className="ml-0 mb-0 text-success">{value?.title}</p>
              {data?.images[type] ? (
                <>
                  <div className="flex flex-row">
                    <div className="flex-1 mr-1">
                      <label className="text-primary">
                        <b>Kết quả:</b>
                      </label>
                      <img
                        src={getImageUrl(data?.images[type]?.result1)}
                        width="100%"
                      />
                      <p className="ml-0 mb-0">Độ chính xác: {score}</p>
                    </div>
                    <div className="flex-1 ml-1">
                      <label className="text-link">
                        <b>Kết quả bổ sung:</b>
                      </label>
                      <img
                        src={getImageUrl(data?.images[type]?.result2)}
                        width="100%"
                      />
                      <p className="ml-0 mb-0">Độ chính xác: {score}</p>
                    </div>
                  </div>
                  <div>
                    <p className="ml-0 mb-0">
                      Lần chụp lại thứ: {data?.images[type]?.ntimes || 1}
                    </p>
                  </div>
                  <div>
                    <div className="flex-row">
                      {data?.images[type]?.answer == "Y" ? (
                        <i className="text-success">
                          Bạn đã đồng ý với kết quả này
                        </i>
                      ) : data?.images[type]?.ntimes >= 4 ? (
                        <i className="text-danger">
                          Bạn đã vượt quá số lần chụp lại. Hồ sơ của bạn sẽ được
                          chúng tôi liên hệ trong thời gian sớm nhất
                        </i>
                      ) : (
                        <>
                          <div className="mr-1">
                            <Button
                              type="primary"
                              className="w-100"
                              onClick={() => onAccept(type)}
                            >
                              Đồng ý
                            </Button>
                          </div>
                          <div className="ml-1">
                            <Upload
                              beforeUpload={(file) => onUpload(type, file)}
                              fileList={[]}
                              style={{ width: "100%" }}
                            >
                              <Button
                                type="secondary"
                                className="w-100"
                                loading={processing}
                              >
                                Chụp lại
                              </Button>
                            </Upload>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <i>Không tìm thấy</i>
              )}
              <hr className="my-2" />
            </Col>
          );
        })}
        <Col xs={12} sm={12}>
          <Button
            type="primary"
            className="w-100 p-10"
            size="large"
            onClick={onNext}
          >
            Hoàn tất
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Step3;
