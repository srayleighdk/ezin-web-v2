const { Upload, Spin, Alert, Space, Button, Divider } = require("antd");
const { useState } = require("react");

const DocumentDetection = () => {
    const [processing, setProcessing] = useState(false);
    const [file, setFile] = useState(null);
    const onSubmit = () => {
        
    }
    return (
        <>
            <Spin
                spinning={processing}
                size="large" tip="Please wait...">
                <Alert style={{ marginBottom: 10 }} showIcon type={'info'} message={'Please upload your document'}></Alert>
                <h3>1. Upload your document</h3>
                <div className='full-w'>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // beforeUpload={beforeUpload}
                        // onChange={handleChange}
                        accept="image/*"
                    >
                        {/* {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    height: '100px',
                                }}
                            />
                        ) : (
                            uploadButton
                        )} */}
                    </Upload>
                </div>

               
                <div className='mt-5'>
                    <Space>
                        <Button disabled={!file || loading} loading={processing} onClick={onSubmit} type="primary">Submit now!</Button>
                    </Space>
                </div>
                <Divider />
                <h3>3. Result</h3>
            </Spin>
        </>
    )
}

export default DocumentDetection;