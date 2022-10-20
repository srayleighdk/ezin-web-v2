import { Modal, Button, Checkbox } from "antd";
import React, { useState } from "react";
import { formatVND } from "../../../utils/helpers";
import TableInfo from "../components/TableInfo";
import moment from "moment";
import {
  SoundOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";

export default function XacNhan({ data, onSubmit, onPrev, submitData }) {
  const [tos, setTos] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showMoreReceiver, setShowMoreReceiver] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAudio, setVisibleAudio] = useState(false);
  const fee = data?.promotion_fee || data?.fee;
  const renderContent = (type) => {
    let tableDataInfo = [
      ["Tên bảo hiểm", `${data?.product_id?.name}`],
      ["Gói bảo hiểm", `${data?.name}`],
    ];
    if (showMore) {
      tableDataInfo = tableDataInfo.concat([
        ["Nhà cung cấp", "PVI"],
        [
          "Hiệu lực từ ngày",
          moment(submitData?.valid_from, "DD/MM/YYYY").format("DD/MM/YYYY"),
        ],
        ["Giá trị bảo hiểm", `${data?.program_id?.total_fee}`],
        [
          "Thời hạn bảo hiểm",
          `${data?.period?.toString()?.padStart(2, "0")} năm`,
        ],
        // ['Thời hạn bảo hiểm đến', moment(data?.valid_to).format('DD/MM/YYYY')],
        // ['Số người được BH', '01'],
      ]);
    }
    tableDataInfo.push(["Phí bảo hiểm", `${formatVND(fee)}`]);
    let dataReceiver = [
      ["Họ và tên", submitData?.full_name],
      ["CMND/CCCD/Hộ chiếu", submitData?.legal_id],
      ["Ngày sinh", submitData?.dob],
    ];
    if (showMoreReceiver) {
      dataReceiver = dataReceiver.concat([
        ["Địa chỉ chỗ ở hiện tại", submitData?.address],
        ["Số điện thoại", submitData?.phone],
        ["Email", submitData?.email],
      ]);
    }
    if (["OTO", "XE_MAY"].includes(type)) {
      tableDataInfo = [
        ["Tên bảo hiểm", `${data?.product_id?.name}`],
        ["Gói bảo hiểm", `${data?.name}`],
        ["Biển số xe", submitData?.license_number],
      ];

      dataReceiver = [
        ["Họ và tên", submitData?.full_name],
        // ['CMND/CCCD/Hộ chiếu', submitData?.legal_id],
        // ['Ngày sinh', submitData?.dob],
      ];
      dataReceiver = dataReceiver.concat([
        ["Địa chỉ chỗ ở hiện tại", submitData?.address],
        ["Số điện thoại", submitData?.phone],
        ["Email", submitData?.email],
      ]);

      // if (showMore) {
      //     tableDataInfo = tableDataInfo.concat([
      //         ['Số máy', submitData?.engine_number],
      //         ['Số khung', submitData?.chassis_number],
      //         ['Tên chủ xe', submitData?.full_name],
      //         ['Nhà cung cấp', 'PVI'],
      //         ['Giá trị bảo hiểm', `${data?.program_id?.total_fee}`],
      //         ['Thời hạn bảo hiểm', `${moment(submitData?.valid_from, 'DD/MM/YYYY').format('DD/MM/YYYY')} - ${moment(submitData?.valid_from, 'DD/MM/YYYY').add(data?.period, 'years').format('DD/MM/YYYY')}`],
      //     ])
      // }
      tableDataInfo.push(["Phí bảo hiểm", `${formatVND(fee)}`]);
      // if (showMoreReceiver) {
      //     dataReceiver = dataReceiver.concat([
      //         ['Địa chỉ chỗ ở hiện tại', submitData?.address],
      //         ['Số điện thoại', submitData?.phone],
      //         ['Email', submitData?.email],
      //     ])
      // }
      return (
        <>
          <TableInfo tableData={tableDataInfo} />
          <Button
            type="link"
            icon={showMore ? <CaretUpOutlined /> : <CaretDownOutlined />}
            className="mb-1 xac-nhan__btn"
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? "Xem thêm" : "Ẩn bớt"}
          </Button>
          <h3>Người nhận bảo hiểm</h3>
          <TableInfo tableData={dataReceiver} />
          <Button
            type="link"
            icon={
              showMoreReceiver ? <CaretUpOutlined /> : <CaretDownOutlined />
            }
            className="mb-1 xac-nhan__btn"
            onClick={() => setShowMoreReceiver(!showMoreReceiver)}
          >
            {!showMoreReceiver ? "Xem thêm" : "Ẩn bớt"}
          </Button>
        </>
      );
    }
    return (
      <>
        <TableInfo tableData={tableDataInfo} />
        <Button
          type="link"
          icon={showMore ? <CaretUpOutlined /> : <CaretDownOutlined />}
          className="mb-1 xac-nhan__btn"
          onClick={() => setShowMore(!showMore)}
        >
          {!showMore ? "Xem thêm" : "Ẩn bớt"}
        </Button>
        <h3>Thông tin người được bảo hiểm</h3>
        <TableInfo tableData={dataReceiver} />
        <Button
          type="link"
          icon={showMoreReceiver ? <CaretUpOutlined /> : <CaretDownOutlined />}
          className="mb-1 xac-nhan__btn"
          onClick={() => setShowMoreReceiver(!showMoreReceiver)}
        >
          {!showMoreReceiver ? "Xem thêm" : "Ẩn bớt"}
        </Button>
      </>
    );
  };

  return (
    <div>
      <h3>Thông tin bảo hiểm</h3>
      {renderContent(data?.type)}

      <div>
        <div className="d-flex hopdong__xacnhan">
          <Checkbox
            className="hopdong__xacnhan__checkbox"
            checked={tos}
            onChange={(e) => setTos(e.target.checked)}
          >
            Tôi đã đọc và đồng ý với các điều kiện và điều khoản về{" "}
            <a
              className="text-link hopdong__xacnhan__audio"
              href={`#`}
              onClick={() => setVisible(true)}
            >
              Quy tắc bảo hiểm áp dụng
            </a>
          </Checkbox>
        </div>
        {data?.product_id?.rule_video && (
          <div className="mt-2">
            <iframe
              width="100%"
              height="315"
              src={`${data?.product_id?.rule_video}?autoplay=1`}
              title="Quy tắc bảo hiểm"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <Modal
          title="Quy tắc bảo hiểm"
          visible={visible}
          onOk={() => {
            setTos(true);
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
          okText="Đồng ý"
          cancelText="Đóng"
          closable={true}
        >
          <div
            id="tos"
            style={{
              height: "300px",
              overflow: "auto",
              border: "2px solid #E5E7EB",
              borderRadius: "10px",
              wordWrap: "break-word",
              padding: "10px",
              textAlign: "justify",
              fontSize: "12px",
            }}
            dangerouslySetInnerHTML={{ __html: data?.product_id?.rule_content }}
          ></div>
        </Modal>
        {visibleAudio ? (
          <Modal
            title="Quy tắc bảo hiểm"
            visible={visibleAudio}
            onOk={() => setVisibleAudio(false)}
            onCancel={() => setVisibleAudio(false)}
            okText="Đồng ý"
            cancelText="Đóng"
            closable={true}
          >
            <div
              style={{
                height: "auto",
                overflow: "auto",
                border: "2px solid #E5E7EB",
                borderRadius: "10px",
                wordWrap: "break-word",
                padding: "10px",
                textAlign: "justify",
                fontSize: "12px",
              }}
            >
              <iframe
                width="100%"
                height="315"
                src={`${data?.product_id?.rule_video}?autoplay=1`}
                title="Quy tắc bảo hiểm"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Modal>
        ) : null}
        <div>
          <Button
            type="primary"
            className="p-button w-100 mt-2"
            onClick={onSubmit}
            disabled={!tos}
            id="btn-next-step3"
          >
            Thanh toán
          </Button>
        </div>
        <div>
          <Button
            type="default"
            className="p-button w-100 mt-2"
            onClick={() => onPrev(submitData)}
            // disabled={loading}
          >
            Quay về
          </Button>
        </div>
      </div>
    </div>
  );
}
