import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Typography } from "antd";
import { createStructuredSelector } from "reselect";
import {
  makeModalData,
  makeTransactionInfoVisible,
} from "../../src/store/modal/selector";
import { useDispatch, useSelector } from "react-redux";
import { toggleTransactionInfoModal } from "../../src/store/modal/actions";
import { formatDateTime } from "../../utils/helpers";
import { getTransactionInfo } from "../../pages/api";
import cityData from "../../src/resource/city";
import districtData from "../../src/resource/district";
import wardData from "../../src/resource/ward";

const mapStateToProps = createStructuredSelector({
  transactionInfoVisible: makeTransactionInfoVisible(),
  data: makeModalData(),
});

export default function TransactionInfoModal() {
  const { transactionInfoVisible, data } = useSelector(mapStateToProps);
  const { requestId } = data;
  const [transactionInfo, setTransactionInfo] = useState({});
  const dispatch = useDispatch();

  const close = () => {
    dispatch(toggleTransactionInfoModal());
  };

  useEffect(() => {
    if (requestId) getData(requestId);
  }, [requestId]);

  const getData = async (id) => {
    const { data } = await getTransactionInfo(id);
    setTransactionInfo(data.data);
  };
  if (!requestId) return null;
  const {
    url,
    PVIID,
    product_name,
    value_money,
    benefits,
    full_name,
    legal_id,
    address,
    ward,
    district,
    city,
    valid_from,
    valid_to,
    status_text,
    license_number,
    chassis_number,
    engine_number,
  } = transactionInfo;
  return (
    <Modal
      visible={transactionInfoVisible}
      onCancel={close}
      footer={null}
      destroyOnClose
    >
      <div>
        <Typography.Title level={3} className="text-primary text-center p-2">
          THÔNG TIN BẢO HIỂM
        </Typography.Title>

        <div className="pl-5 pr-5 mt-3">
          {PVIID && (
            <Row className="text-15">
              <Col xs={12} sm={8} md={8}>
                Số đơn BH:
              </Col>
              <Col xs={12} sm={16} md={16} className="font-weight-bold">
                <a
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                  }}
                  rel="noreferrer"
                  target="_blank"
                  href={url}
                >
                  {PVIID}
                </a>
              </Col>
            </Row>
          )}
          <Row className="text-15">
            <Col xs={12} sm={8} md={8}>
              Tên sản phẩm:
            </Col>
            <Col xs={12} sm={16} md={16} className="font-weight-bold">
              {product_name}
            </Col>
          </Row>

          <Row className="text-16">
            <Col xs={12} sm={8} md={8}>
              Số tiền bảo hiểm / Mức trách nhiệm:
            </Col>
            <Col xs={12} sm={16} md={16} className="font-weight-bold">
              {value_money}
            </Col>
          </Row>

          {benefits?.length > 0 && (
            <table width="100%" id="benefits" className="mt-3 shadow">
              <tr>
                <th colSpan="2"> QUYỀN LỢI ĐƯỢC BẢO HIỂM</th>
              </tr>

              {benefits &&
                benefits.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="font-weight-bold">{item[0]}</td>
                      <td className="italic">{item[1]}</td>
                    </tr>
                  );
                })}
            </table>
          )}

          <div className="font-weight-bold p-1  mt-3 bg-gray">
            NGƯỜI ĐƯỢC BẢO HIỂM
          </div>

          <Row className="text-14 pl-1">
            <Col xs={12} sm={6} md={6} className="italic">
              Họ và tên:
            </Col>
            <Col
              xs={12}
              sm={18}
              md={18}
              className="font-weight-bold text-right"
            >
              {full_name}
            </Col>
          </Row>

          <Row className="text-14 pl-1">
            <Col xs={12} sm={6} md={6} className="italic">
              CMND:
            </Col>
            <Col xs={12} sm={18} md={18} className="italic text-right">
              {legal_id}
            </Col>
          </Row>

          <Row className="text-14 pl-1">
            <Col xs={12} sm={6} md={6}>
              Địa chỉ:
            </Col>
            <Col xs={12} sm={18} md={18} className="italic text-right">
              {address}
            </Col>
          </Row>

          <Row className="text-14 pl-1">
            <Col xs={12} sm={6} md={6} className="italic">
              Phường:
            </Col>
            <Col xs={12} sm={18} md={18} className="italic text-right">
              {wardData?.[ward]?.name ?? ward}
            </Col>
          </Row>

          <Row className="text-14 pl-1">
            <Col xs={12} sm={6} md={6} className="italic">
              Quận:
            </Col>
            <Col xs={12} sm={18} md={18} className="italic text-right">
              {districtData?.[district]?.name ?? district}
            </Col>
          </Row>

          <Row className="text-14 pl-1">
            <Col xs={12} sm={6} md={6} className="italic">
              Thành phố:
            </Col>
            <Col xs={12} sm={18} md={18} className="italic text-right">
              {cityData?.[city]?.name ?? city}
            </Col>
          </Row>

          {license_number && (
            <Row className="text-14 pl-1">
              <Col xs={12} sm={6} md={6} className="italic">
                Biển kiểm soát:
              </Col>
              <Col xs={12} sm={18} md={18} className="italic text-right">
                {license_number}
              </Col>
            </Row>
          )}

          {(engine_number || chassis_number) && (
            <Row className="text-14 pl-1">
              <Col xs={12} sm={6} md={6} className="italic">
                Số máy / số khung:
              </Col>
              <Col xs={12} sm={18} md={18} className="italic text-right">
                {engine_number} / {chassis_number}
              </Col>
            </Row>
          )}

          <div className="p-2 mt-3 bg-gray d-flex flex-row justify-content-between">
            <div className="font-weight-bold">THỜI GIAN ÁP DỤNG:</div>
            <div className="italic">{`${formatDateTime(
              valid_from
            )} - ${formatDateTime(valid_to)}`}</div>
          </div>

          <div className="p-2 mt-3 bg-gray d-flex flex-row justify-content-between">
            <div className="font-weight-bold">TRẠNG THÁI:</div>
            <div className="italic">{status_text}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
