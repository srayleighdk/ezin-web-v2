import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Typography,
  Divider,
  Space,
  Spin,
  Alert,
  Image,
  Tag,
  Steps,
  Badge,
  Input,
  Modal,
  Tabs,
} from "antd";
import DocumentDetection from "../../components/ai-demo/documentDetection";
import PlateDetection from "../../components/ai-demo/plateDetection";
import Head from "next/head";
import { stopAIServer } from "../api";
import { getAIServerStatus } from "../api";
import { startAIServer } from "../api";
import { voteDamage } from "../api";
import { detectBlur } from "../api";
import {
  detectCorner,
  detectCar,
  detectDamage,
  detectMakeModel,
  detectPrice,
} from "../api";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectAuth } from "../../src/store/selector";
const { Text } = Typography;
const { Step } = Steps;
import { formatNumber } from "../../utils/helpers";
const WHITELIST_PHONES = ["+84934743932", "+84988136833"];
const MIN_AREA = 0.37;
const MAX_AREA = 0.97;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const round = (number) => {
  return Math.round(number * 100) / 100;
};

// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }

//   const isLt2M = file.size / 1024 / 1024 < 2;

//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }

//   return isJpgOrPng && isLt2M;
// };
const okIcon = <CheckCircleOutlined style={{ color: "green" }} />;
const failIcon = <CloseCircleOutlined style={{ color: "red" }} />;
const METHODS = [
  { value: 1, label: "Blur detection", function: detectBlur },
  { value: 2, label: "Car in pic detection", function: detectCar },
  { value: 3, label: "Car size calculation", function: detectCar },
  // { value: 2, label: 'Kiểm tra xe bẩn/sạch' },
  { value: 4, label: "Corner detection", function: detectCorner },
  { value: 5, label: "Physical damage detection", function: detectDamage },
  { value: 6, label: "Make-model-year detection", function: detectMakeModel },
  { value: 7, label: "Price estimation", function: detectPrice },
  // { value: 5, label: 'Định giá' },
];
const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

export async function getServerSideProps() {
  const res = await getAIServerStatus();
  console.log("res", res);
  return {
    props: {
      initServerStatus: res?.data?.data?.Name,
    },
  };
}

export default function DemoPage({ initServerStatus }) {
  const { auth } = useSelector(mapStateToProps);
  console.log("auth", auth);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [result3, setResult3] = useState(null);
  const [result4, setResult4] = useState(null);
  const [result5, setResult5] = useState(null);
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState("");
  const [vote, setVote] = useState(null);
  const [step, setStep] = useState(0);
  const [methods, setMethods] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [votes, setVotes] = useState([]);
  const [serverStatus, setServerStatus] = useState(initServerStatus);

  const beforeUpload = async (file) => {
    setFile(file);
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        setResult([]);
        // setResult1(null)
        // setResult2(null)
        // setResult3(null)
        // setResult4(null)
        setVotes([]);
        setMethods([1, 2, 3, 4, 5, 6, 7]);
      });
    }
  };

  const submitMethod = async (methodIndex, formData, result1) => {
    // if (methodIndex == 7) {
    console.log("methodIndex", methodIndex);
    // }
    // const result1 = result[0];
    console.log("result1", result1);
    let form = formData;
    // formData.append('xOriginal', result1?.xOriginal)
    if (result1?.area < MAX_AREA) {
      if (result1?.xmaxLocation) {
        form.append("xmaxLocation", result1?.xmaxLocation);
        form.append("xminLocation", result1?.xminLocation);
        // formData.append('yOriginal', result1?.yOriginal)
        form.append("ymaxLocation", result1?.ymaxLocation);
        form.append("yminLocation", result1?.yminLocation);
      }
    }
    const method = METHODS.find((e) => e.value == methodIndex);
    const fnc = method.function;
    const res = await fnc(form);
    const data = res?.data?.data;
    setResult((old) => {
      old[methodIndex - 1] = data;
      return old;
    });
    return data;
  };
  const onSubmit = async () => {
    setProcessing(true);
    setMsg("Vui lòng chờ trong giây lát...");
    setResult([]);
    setStatus("PROCESSING");
    let formData = new FormData();
    formData.append("file", file);
    formData.append("request_id", file.uid);

    try {
      let res1 = null;
      for (let methodIndex of methods) {
        if (methodIndex == 2) {
          res1 = await submitMethod(methodIndex, formData);
        } else {
          await submitMethod(methodIndex, formData, res1);
        }
      }

      setStatus("DONE");
      message.success(
        "Your picture has been processed successfully! Please see the result below."
      );
      setMsg("Sẵn sàng");
      setProcessing(false);
    } catch (ex) {
      console.log("ex", ex);
      setProcessing(false);
    }
  };
  const onVote = async (index, vote) => {
    if (!file) {
      message.error("Vui lòng upload hình ảnh");
      return;
    }
    setProcessing(true);
    const newVotes = votes;
    newVotes[index] = vote;
    setVotes([...newVotes]);

    const res = await voteDamage({ request_id: file.uid, vote, index });
    if (res?.data?.success) {
      // Modal.destroyAll();
      // Modal.info({
      //     title: 'Xin cảm ơn sự đóng góp của bạn',
      //     content: 'Chúng tôi sẽ cải tiến để ngày càng tốt hơn.',
      //     okText: 'Thử lại với ảnh khác',
      //     onOk: () => {
      //         setFile(null);
      //         setImageUrl(null)
      //         setResult1(null)
      //         setResult2(null)
      //         setResult3(null)
      //         setVote(null)
      //     }
      // });
      message.success("Xin cảm ơn sự đóng góp của bạn");
    }
    setProcessing(false);
  };

  const toggleMethod = (method) => {
    const methodDisabled = result.length > 0;
    if (methodDisabled) {
      Modal.destroyAll();
      Modal.info({
        title: "Warning",
        content: "Please upload another file to try again!",
        // okText: 'Thử lại với ảnh khác',
        onOk: () => {},
      });
      // message.warn('Please upload other files to try again');
      return;
    }
    let newMethods = methods;
    if (newMethods.indexOf(method) >= 0) {
      newMethods = newMethods.filter((e) => e != method);
    } else {
      newMethods.push(method);
    }
    newMethods.sort();
    setMethods([...newMethods]);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <Text strong>Upload</Text>
      </div>
      <div>
        <Text>Click or drag file to this area to upload</Text>
      </div>
    </div>
  );
  const renderStep1 = () => {
    const rs = result[0];
    return rs ? (
      <Step
        title="Blur detection"
        description={
          rs ? (
            <>
              <div>
                <Image src={`data:image/png;base64,${rs?.img}`} width={250} />
              </div>
              <div title={`${round(rs?.scores * 100)}% sure`}>
                {!rs?.scoreBlur ? okIcon : failIcon} Picture is blurry?{" "}
                {rs?.scoreBlur ? "Yes" : "No"}
              </div>
              {/* {result?.answer1 && (<small>({round(result?.scores * 100)}% sure)</small>)} */}
              <div>
                {okIcon} Time: {round(rs?.time / 1000)}s
              </div>
              <div className="mt-5">
                <Space direction="vertical">
                  <Text>Vui lòng nhập nhận xét của bạn</Text>
                  <Input />
                  <Space>
                    <Button type="primary" onClick={() => onVote(1, "Y")}>
                      Đúng
                    </Button>
                    <Button type="danger" onClick={() => onVote(1, "N")}>
                      Sai
                    </Button>
                  </Space>
                  {votes[1] && <b>Cảm ơn sự đóng góp của bạn</b>}
                </Space>
              </div>
            </>
          ) : (
            <>Waiting...</>
          )
        }
      />
    ) : null;
  };
  const renderStep2 = () => {
    const res = result[1];
    return res ? (
      <Step
        title="Car in pic dectection"
        description={
          res ? (
            <>
              <div>
                <Image src={`data:image/png;base64,${res?.img}`} width={250} />
              </div>
              <div title={`${round(res.scores * 100)}% sure`}>
                {res?.num_cars > 0 ? okIcon : failIcon} Car in pic?{" "}
                {res?.num_cars > 0 ? "Yes" : "No"}
              </div>
              {res?.num_cars > 0 && (
                <small>({round(res?.scores * 100)}% sure)</small>
              )}
              <div>
                {okIcon} Time: {round(res?.time / 1000)}s
              </div>
              <div className="mt-5">
                <Space direction="vertical">
                  <Text>Vui lòng nhập nhận xét của bạn</Text>
                  <Input />
                  <Space>
                    <Button type="primary" onClick={() => onVote(1, "Y")}>
                      Đúng
                    </Button>
                    <Button type="danger" onClick={() => onVote(1, "N")}>
                      Sai
                    </Button>
                  </Space>
                  {votes[2] && <b>Cảm ơn sự đóng góp của bạn</b>}
                </Space>
              </div>
            </>
          ) : (
            <>Waiting...</>
          )
        }
      />
    ) : null;
  };
  const renderStep3 = () => {
    const res = result[2];
    const answer = res?.area > MIN_AREA;
    return res ? (
      <Step
        title="Car size calculation"
        description={
          res ? (
            <>
              <div>
                <Image src={`data:image/png;base64,${res?.img}`} width={250} />
              </div>
              <div title={`${round(res.area * 100)}% of the pic`}>
                {answer ? okIcon : failIcon} Car large enough?{" "}
                {answer ? "Yes" : "No"}
              </div>
              {answer && <small>({round(res?.area)}% area of the pic)</small>}
              <div>
                {okIcon} Time: {round((res?.time - 145) / 1000)}s
              </div>
              <div className="mt-5">
                <Space direction="vertical">
                  <Text>Vui lòng nhập nhận xét của bạn</Text>
                  <Input />
                  <Space>
                    <Button type="primary" onClick={() => onVote(2, "Y")}>
                      Đúng
                    </Button>
                    <Button type="danger" onClick={() => onVote(2, "N")}>
                      Sai
                    </Button>
                  </Space>
                  {votes[3] && <b>Cảm ơn sự đóng góp của bạn</b>}
                </Space>
              </div>
            </>
          ) : (
            <>Waiting...</>
          )
        }
      />
    ) : null;
  };
  const renderStep4 = () => {
    const res = result[3];
    return res ? (
      <Step
        title="Corner detection"
        description={
          res ? (
            <>
              <div>
                <Image src={`data:image/png;base64,${res?.img}`} width={250} />
              </div>
              <div>
                {okIcon} Corner: {res?.corner}
              </div>
              <div>
                {okIcon} Time: {round(res?.time / 1000)}s
              </div>
              <div className="mt-5">
                <Space direction="vertical">
                  <Text>Vui lòng nhập nhận xét của bạn</Text>
                  <Input />
                  <Space>
                    <Button type="primary" onClick={() => onVote(3, "Y")}>
                      Đúng
                    </Button>
                    <Button type="danger" onClick={() => onVote(3, "N")}>
                      Sai
                    </Button>
                  </Space>
                  {votes[4] && <b>Cảm ơn sự đóng góp của bạn</b>}
                </Space>
              </div>
            </>
          ) : (
            <>Waiting...</>
          )
        }
      />
    ) : null;
  };
  const renderStep5 = () => {
    const res = result[4];
    return res ? (
      <Step
        title="Physical damage detection"
        description={
          res ? (
            <>
              <div>
                <Image src={`data:image/png;base64,${res?.img}`} width={250} />
              </div>
              {/* <div>{okIcon} {res?.classes?.length == 0 ? 'Không tìm tìm thấy tổn thất' : `Accuracy: ${round(res?.scores)}%`}</div> */}
              <div>
                {okIcon} Time: {round(res?.time / 1000)}s
              </div>
              <div className="mt-5">
                <Space direction="vertical">
                  <Text>Vui lòng nhập nhận xét của bạn</Text>
                  <Input />
                  <Space>
                    <Button type="primary" onClick={() => onVote(4, "Y")}>
                      Đúng
                    </Button>
                    <Button type="danger" onClick={() => onVote(4, "N")}>
                      Sai
                    </Button>
                  </Space>
                  {votes[5] && <b>Cảm ơn sự đóng góp của bạn</b>}
                </Space>
              </div>
            </>
          ) : (
            <>Waiting...</>
          )
        }
      />
    ) : null;
  };
  const renderStep6 = () => {
    const res = result[5];
    return res ? (
      <Step
        title="Make-model-year detection"
        description={
          res ? (
            <>
              <div>
                <Image src={`data:image/png;base64,${res?.img}`} width={250} />
              </div>
              {/* <div>{okIcon} {res?.classes?.length == 0 ? 'Không tìm tìm thấy tổn thất' : `Accuracy: ${round(res?.scores)}%`}</div> */}
              <div>
                {okIcon} Make-model-year: {res?.make} - {res?.model} -{" "}
                {res?.year}
              </div>
              <div>
                {okIcon} Time: {round(res?.time / 1000)}s
              </div>
              <div className="mt-5">
                <Space direction="vertical">
                  <Text>Vui lòng nhập nhận xét của bạn</Text>
                  <Input />
                  <Space>
                    <Button type="primary" onClick={() => onVote(4, "Y")}>
                      Đúng
                    </Button>
                    <Button type="danger" onClick={() => onVote(4, "N")}>
                      Sai
                    </Button>
                  </Space>
                  {votes[5] && <b>Cảm ơn sự đóng góp của bạn</b>}
                </Space>
              </div>
            </>
          ) : (
            <>Waiting...</>
          )
        }
      />
    ) : null;
  };
  const renderStep7 = () => {
    const res = result[6];
    return res ? (
      <Step
        title="Price estimation"
        description={
          res ? (
            <>
              <div>
                {/* <Image src={`data:image/png;base64,${res?.img}`} width={250} /> */}
              </div>
              <div>
                {okIcon} Estimated price: {formatNumber(res?.price)} đ
              </div>
              <div>
                {okIcon} Time: {round(res?.time / 1000)}s
              </div>
              <div className="mt-5">
                <Space direction="vertical">
                  <Text>Vui lòng nhập nhận xét của bạn</Text>
                  <Input />
                  <Space>
                    <Button type="primary" onClick={() => onVote(4, "Y")}>
                      Đúng
                    </Button>
                    <Button type="danger" onClick={() => onVote(4, "N")}>
                      Sai
                    </Button>
                  </Space>
                  {votes[5] && <b>Cảm ơn sự đóng góp của bạn</b>}
                </Space>
              </div>
            </>
          ) : (
            <>Waiting...</>
          )
        }
      />
    ) : null;
  };
  const onStartStopServer = async () => {
    let res = null;
    if (serverStatus == "running") {
      res = await stopAIServer();
    } else {
      res = await startAIServer();
    }
    if (!res?.data?.success) {
      message.error(res?.data?.msg);
    } else {
      setServerStatus(res?.data?.data?.Name);
    }
    // else {
    //     message.info("Previous command is running, please wait for a while!")
    // }
  };
  // const info = loading
  // ? `Vui lòng chờ trong giây lát, Ezin đang tiến hành giám định tổn thất xe...`
  // : `Vui lòng upload hình ảnh xe của bạn, Ezin sẽ tiến hành giám định tổn thất cho bạn`
  const info = `Please upload your picture and press Submit`;
  return (
    <>
      <Head>
        <title key="title">{`AI Demo page | Ezin`}</title>
        <meta
          property="og:title"
          key="og-title"
          content={`AI Demo page | Ezin`}
        />
        <meta
          property="og:description"
          key="og-description"
          content={"AI Demo page"}
        />
        <meta
          name="keywords"
          content={`ezin;ezin insurtech;bảo hiểm số;bảo hiểm cá nhân;sống an toàn;hạnh phúc;bình an`}
        />
      </Head>
      <div className="main" id="demo">
        {auth?.username && WHITELIST_PHONES.includes(auth?.username) && (
          <Space direction="vertical">
            <div>
              <Button
                type={serverStatus == "running" ? "danger" : "primary"}
                onClick={onStartStopServer}
              >
                {serverStatus == "running" ? "Stop server" : "Start server"}
              </Button>
            </div>
            <div>Server status: {serverStatus}</div>
          </Space>
        )}

        <div>
          {serverStatus != "running" ? (
            <>
              <div>Our system is under maintenance</div>
              <div>Only admin acccess is allowed at this time</div>
              <div>Please contact 0934743932 for more information!</div>
            </>
          ) : (
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Physical Damage Inaspection" key="1">
                <Spin spinning={processing} size="large" tip="Please wait...">
                  {/* <Space direction="vertical"> */}
                  <Alert
                    style={{ marginBottom: 10 }}
                    showIcon
                    type={"info"}
                    message={info}
                  ></Alert>
                  <h3>1. Upload your picture</h3>
                  <div className="full-w">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                      accept="image/*"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{
                            height: "100px",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>

                  {/* </Space> */}
                  <h3>
                    2. Select the AI magic you want to try <br />
                    <small className="text-muted">
                      Click to select / unselect the options
                    </small>
                  </h3>
                  {/* <Space> */}
                  {METHODS.map((e) => {
                    const index = methods.findIndex((item) => item == e.value);
                    if (e.disabled) {
                      return (
                        <Tag className="pointer" color={"#ccc"} key={e.value}>
                          {e.label}
                        </Tag>
                      );
                    }
                    return (
                      <Tag
                        className="pointer"
                        color={index >= 0 ? "#55acee" : ""}
                        key={e.value}
                        onClick={() => toggleMethod(e.value)}
                      >
                        {e.label}
                        {index >= 0 && (
                          <Badge style={{ marginLeft: 5 }} count={index + 1} />
                        )}
                      </Tag>
                    );
                  })}
                  {/* </Space> */}
                  <div className="mt-5">
                    <Space>
                      <Button
                        disabled={!file || loading}
                        loading={processing}
                        onClick={onSubmit}
                        type="primary"
                      >
                        Show me the magic!
                      </Button>
                      {/* <Text style={{ fontSize: 13 }} type={msg == 'Sẵn sàng' ? 'success' : 'secondary'}>{msg}</Text> */}
                    </Space>
                  </div>
                  <Divider />
                  <h3>3. Result</h3>
                  {/* <Progress status={status == 'FAILED' ? 'exception' : 'active'} percent={step < 3 ? 33 * step : 100} /> */}
                  {result.length > 0 && (
                    <Steps direction="vertical">
                      {renderStep1()}
                      {renderStep2()}
                      {renderStep3()}
                      {renderStep4()}
                      {renderStep5()}
                      {renderStep6()}
                      {renderStep7()}
                    </Steps>
                  )}

                  {/* <h3 className='mt-5'>4. Đăng ký/Đăng nhập ngay để nhận ngay Ezcoin</h3>
                    <Button type="primary">Đăng ký / Đăng nhập</Button> */}
                </Spin>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Document OCR" key="2">
                <DocumentDetection />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Vehicle plate" key="3">
                <PlateDetection />
              </Tabs.TabPane>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
}
