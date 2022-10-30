import { Modal, Radio, Typography } from "antd";
import React, { useMemo, useState } from "react";
import { createMarkupNormal } from "../../../utils/auth.helper";
import { useRouter } from "next/router";
import ButtonEzin from "../../../components/Common/Button";

const { Text, Title } = Typography;

export default function Second({
  onPrevStep,
  onNextStep,
  cardInfo,
  btnBack,
  submitData,
}) {
  const route = useRouter();
  const dataQnA = () => {
    if (btnBack === 0) {
      return cardInfo?.qna ?? [];
    } else {
      return cardInfo?.package_id?.product_id?.qna ?? [];
    }
  };
  const QnA = dataQnA();
  const [arrAnswer, setAnswer] = useState(cardInfo?.answers ?? []);
  const QnAResult = useMemo(
    () => QnA.map((item) => item.answer).toString(),
    [QnA]
  );

  const onAnswer = (nOrder, val) => {
    arrAnswer[nOrder] = val;
    setAnswer([...arrAnswer]);
  };

  const onNext = () => {
    if (QnA.length !== arrAnswer.length) {
      return Modal.error({
        // title: 'Thông báo',
        content: "Xin vui lòng trả lời tất cả câu hỏi",
        okText: "Đóng",
      });
    }

    if (QnAResult !== arrAnswer.toString()) {
      return Modal.error({
        // title: 'Thông báo',
        content:
          "Rất tiếc bạn không đáp ứng các điều kiện của gói bảo hiểm này",
        okText: "Đóng",
      });
    }

    onNextStep({ answers: arrAnswer });
  };

  const onPrev = () => {
    onPrevStep();
  };

  return (
    <div className="step-wrapper" style={{ maxWidth: 800, margin: "0px auto" }}>
      <div className="p-2 ezin-card">
        <div className="text-center">
          <Title level={2} className="text-primary mb-4 text-center">
            TRẢ LỜI CÂU HỎI
          </Title>
          <Text className="text-primary">
            Vui lòng trả lời các câu hỏi bên dưới để kiểm tra bạn có thuộc đối
            tượng bảo hiểm được áp dụng:
          </Text>
        </div>
        {QnA.map((item, index) => (
          <div className="my-4" key={item._id}>
            <Typography.Title level={5} className="text-primary text-left">
              <div
                className=""
                dangerouslySetInnerHTML={createMarkupNormal(item.question)}
              />
            </Typography.Title>

            {item.node != "" && (
              <div className="text-12">
                <i>{item.note}</i>
              </div>
            )}
            <Radio.Group
              onChange={(evt) => onAnswer(index, evt.target.value)}
              defaultValue={arrAnswer[index]}
            >
              <Radio value={"Y"} style={{ display: "block" }}>
                Có
              </Radio>
              <Radio value={"N"} style={{ display: "block" }}>
                Không
              </Radio>
            </Radio.Group>
          </div>
        ))}
      </div>
      <div className="my-4 d-flex justify-content-around pt-3">
        {btnBack === 1 ? (
          // <Button
          //   type="second"
          //   onClick={onPrev}
          //   style={{ width: "42%", paddingTop: "1rem", paddingBottom: "2rem" }}
          // >
          //   Trở về
          // </Button>
          <ButtonEzin
            // className="mx-3 btn-buy-banner text-center shadow align-self-center"
            onClick={onPrev}
            types="default"
          >
            Trở về
          </ButtonEzin>
        ) : (
          // <Button
          //   type="default"
          //   onClick={() => route.push("/#san-pham")}
          //   style={{ width: "42%", paddingTop: "1rem", paddingBottom: "2rem" }}
          // >
          //   Về trang sản phẩm
          // </Button>
          <ButtonEzin
            onClick={() => route.push("/#san-pham")}
            types="primary"
          >
            Về trang sản phẩm
          </ButtonEzin>
        )}
        {/* <Button
          type="second"
          onClick={onPrev}
          style={{ width: '42%', paddingTop: '1rem', paddingBottom: '2rem' }}
        >
          Trở về
        </Button> */}
        {/* <Button
          type="primary"
          onClick={() => onNextStep(submitData)}
          style={{ width: "42%", paddingTop: "1rem", paddingBottom: "2rem" }}
        >
          Tiếp tục
        </Button> */}
        <ButtonEzin
          // className="mx-3 btn-buy-banner text-center shadow align-self-center"
          onClick={() => onNextStep(submitData)}
          types="primary"
        >
          Mua bảo hiểm ngay
        </ButtonEzin>
      </div>
    </div>
  );
}
