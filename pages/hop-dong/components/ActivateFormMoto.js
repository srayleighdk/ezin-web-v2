import { Button, Col, Form, Row, Radio, message, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { formatVND, validateDOB } from '../../../utils/helpers';
import Field from '../../../src/container/activeCard/Field';
import DatePicker from 'react-mobile-datepicker';
import { useMediaQuery } from 'react-responsive';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import NewIcon from '../../../public/images/new-icon.gif';
import useAuth from '../../../src/container/auth-wrapper/auth.context';
import moment from 'moment';
import { getCities, getWards, getDistricts, getAccountMembers } from '../../api';
import Image from 'next/image';
import { detectVehicleRegistration } from '../../api';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../../../src/store/selector';
import { useSelector } from 'react-redux';

const layout = {
    wrapperCol: { span: 24 },
};

const mapStateToProps = createStructuredSelector({
    auth: makeSelectAuth(),
});

export default function ActivateFormMoto({ data, initData, onNext }) {
    const [form] = Form.useForm();
    const [openValidDate, setOpenValidDate] = useState(false);
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [listName, setListName] = useState([]);
    const [currentName, setCurrentName] = useState(null);
    const [showEngineNumber, setShowEngineNumber] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUpLoading] = useState(false);
    const [image1, setImage1] = useState(null);
    const valid_from_delay = data?.product_id?.valid_from_delay;
    const nextDay = moment().add(valid_from_delay, 'days').startOf('day');
    const isMobile = useMediaQuery({ maxWidth: 767 });
    let dobValue = form.getFieldValue('dob') ? moment(form.getFieldValue('dob'), 'DD/MM/YYYY') : moment();
    const minDate = moment().subtract(200, 'years').startOf('day').toDate();
    const maxDate = moment().subtract(1, 'years').endOf('day').toDate();
    // const { user } = useAuth();
    const { auth: user } = useSelector(mapStateToProps);

    const getInitData = async () => {
        const [res1] = await Promise.all([
            getCities(),
        ]);
        setCities(res1?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code, group: e.type })))
    }

    useEffect(() => {
        getInitData();
        loadListName();
    }, [data?._id]);

    useEffect(() => {
        if (initData) {
            form.setFieldsValue(initData);
            loadDistricts(initData?.city)
            loadWards(initData?.district)
        } else if (listName && listName.length > 0) {
            let mainAccIndex = Math.max(0, currentName
                // listName.findIndex(e => e.main_account)
            );
            if (mainAccIndex >= 0) {
                setCurrentName(mainAccIndex);
                onSelectUser(mainAccIndex + 1);
            }
        }
    }, [listName?.length]);

    const getDoBField = (value) => {
        // 631126800000 is time stamp of 1/1/1990
        let strDate;
        if (value == 'Invalid date' || value == '') {
            strDate = moment().format('DDMMYYYY');
        } else if (typeof value === 'string' && value.length == 8) {
            strDate = value;
        } else {
            strDate = moment(value).format('DDMMYYYY');
        }
        return { dob: moment(strDate, 'DDMMYYYY').format('DD/MM/YYYY') }
        //return { dob: isMobile? moment(strDate, 'DDMMYYYY').format('DD/MM/YYYY'): moment(moment(strDate, 'DDMMYYYY'))}
    };

    const onSelectUser = (val) => {
        if (val !== -1) {
            setCurrentName(val - 1);
            let currentClient = listName[val - 1];
            if (!currentClient.phone) {
                currentClient.phone = user?.username?.replace('+84', '0');
            }
            form.setFieldsValue({
                ...currentClient,
                ...getDoBField(currentClient.dob),
                valid_from: form.getFieldValue('valid_from')
            });
            loadDistricts(form.getFieldValue('city'))
            loadWards(form.getFieldValue('district'))
        } else {
            setCurrentName(val)
            const oldValues = form.getFieldsValue();
            form.resetFields();
            form.setFieldsValue({
                ...getDoBField(),
                phone: user?.username?.replace('+84', '0'),
                license_number: oldValues?.license_number,
                chassis_number: oldValues?.chassis_number,
                engine_number: oldValues?.engine_number
            });
            // setTimeout(() => name_ref?.current?.focus(), 0)

        }
    };
    const loadListName = async () => {
        let listName = await getAccountMembers();//await getListName();

        if (listName && listName.data && listName.data.data && listName.data.data.length > 0) {
            setListName(listName?.data?.data.slice(0, 5));
        } else {
            const currentMember = {
                address: user.address,
                city: user.city,
                city_name: user.city_name,
                district: user.district,
                district_name: user.district_name,
                dob: user.dob,
                email: user.email,
                full_name: user.full_name,
                legal_id: user.legal_id,
                main_account: true,
                phone: user?.phone?.replace('+84', '0'),
                sex: user.gender,
                ward: user.ward,
                ward_name: user.ward_name
            }
            setListName([currentMember]);
        }

    };

    const loadDistricts = async (value, clear = false) => {
        const res = await getDistricts(value)
        setDistricts(res?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
        if (clear) {
            form.setFieldsValue({
                district: null,
                ward: null
            })
        }

    }

    const loadWards = async (value, clear = false) => {
        const res = await getWards(value)
        setWards(res?.data?.data?.map(e => ({ label: e.name_with_type, value: e.code })))
        if (clear) {
            form.setFieldsValue({
                ward: null
            })
        }

    }

    const handleSelectValidDate = (time) => {
        setOpenValidDate(false);
        form.setFieldsValue({
            valid_from: moment(time).format('DD/MM/YYYY')
        });
    }

    const handleCancelValidDate = () => {
        setOpenValidDate(false)
    }

    const handleOpenValidDate = () => {
        setOpenValidDate(true);
    }

    const handleSelect = (time) => {
        setOpen(false);
        form.setFieldsValue({
            dob: moment(time).format('DD/MM/YYYY')
        });
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleOpenDate = () => {
        setOpen(true);
    }

    const onFinish = (values) => {
        onNext(values);
    };
    const handleFieldChange = (name, value) => {
        form.setFieldsValue({
            [name]: value
        });
    }
    const onFinishFailed = (errorInfo) => {
        let msg = errorInfo.errorFields.map(e => e.errors.join("\n")).join("\n");

        if (errorInfo?.errorFields?.length > 1) {
            msg = 'Vui lòng nhập đầy đủ thông tin';
        }
        message.error(msg);
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Chụp ảnh</div>
        </div>
    );
    const handleUpload = async (file) => {
        setImage1(file);
        setUpLoading(true)
        // setTimeout(() => {
        //   message.info('Xin vui lòng chờ trong giây lát...');
        // }, 1)
        const formData = new FormData();
        // TODO: phai append 2 mat
        formData.append('files[]', file);
        formData.append('files[]', file);
        const detectType = 'submit-registrations';
        try {
            const res = await detectVehicleRegistration(formData, detectType);
            if (res?.data?.success) {
                const infos = res?.data?.data?.data
                if (infos && infos.length > 0) {
                    const back = infos.find(e => e.type == 'vehicle_registration_back')?.info
                    const front = infos.find(e => e.type == 'vehicle_registration_front')?.info
                    if (!back && !front) {
                        message.warning('Rất tiếc Ezin không nhận dạng được thông tin giấy đăng ký của bạn. Bạn vui lòng chụp lại hoặc có thể điền bằng tay!')
                        return;
                    }
                    form.setFieldsValue({
                        license_number: back?.plate,
                        engine_number: back?.engine,
                        chassis_number: back?.chassis,
                        full_name: back?.name,
                        address: back?.address,
                    })
                    if (back?.engine || back?.chassis) {
                        setShowEngineNumber(true);
                    }
                }

                message.success('Ezin đã điền thông tin cho bạn, vui lòng kiểm tra lại')
            }
        } catch (ex) {
            message.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
        }

        setUpLoading(false)
    };
    return (<div>
        <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="form-ezin"
            form={form}
        >
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <div className="flex flex-row align-items-center text-primary" href="#">
                        <div className='mr-1'>
                            <Image alt="Tính năng mới" src={NewIcon} width={50} height={37} />
                        </div>
                        <div>
                            Bạn có thể điền thông tin nhanh hơn bằng cách chụp ảnh giấy đăng ký xe
                        </div>
                    </div>
                    <div style={{ width: 120, height: 120 }}>
                        <Upload
                            name="img1"
                            beforeUpload={(file) => { handleUpload(file) }}
                            onRemove={(file) => setImage1(null)}
                            listType="picture-card"
                            className="avatar-uploader"
                            accept={"image/*"}
                        >
                            {!image1 && uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <h3>Thời hạn bảo hiểm {data?.period} năm</h3>
                    <Row gutter={[8, 8]}>
                        <Col xs={{ span: 24 }} md={{ span: 24 }}>
                            <Field type="date"
                                label="Hiệu lực từ ngày"
                                required={true}
                                handleOpenDate={handleOpenValidDate}
                                initialValue={isMobile ? nextDay?.format('DD/MM/YYYY') : nextDay}
                                name="valid_from"
                                defaultValue={nextDay}
                                title="Hiệu lực từ"
                                onChange={handleFieldChange}
                                minDate={new Date(nextDay.year(), nextDay.month(), nextDay.date())}
                                onFieldChange={handleFieldChange}
                            />
                        </Col>
                        {/* <Col span={12}><Field name="valid_to" type="date" title="Ngày kết thúc" autoFocus={true} setFormValue={setFormValue} /></Col> */}
                    </Row>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <h3>Thông tin xe</h3>
                </Col>
                <Col span={24}>
                    {
                        data?.program_id?.capacity_options
                        && data?.program_id?.capacity_options?.length > 1
                        && (
                            <Col xs={{ span: 24 }} md={{ span: 24 }}>
                                <p className="ml-0 mb-0">* Vui lòng chọn loại xe của bạn</p>
                                <Form.Item
                                    name="capacity"
                                    rules={[
                                        {
                                            required: true,
                                            message: `Vui lòng chọn loại xe`,
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                    // onChange={(evt) => onChangeLicenseType(evt.target.value)}
                                    >
                                        {
                                            data.program_id.capacity_options.map(e => (
                                                <Radio value={e.value} style={{ display: 'block' }} key={e.label}>
                                                    {e.label}
                                                </Radio>
                                            ))
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        )
                    }
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <Field type="text" name="license_number" title="Biển số xe" rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value && !getFieldValue('chassis_number') && !getFieldValue('engine_number')) {
                                    return Promise.reject(new Error('Vui lòng nhập biển số hoặc số khung và số máy'));
                                }
                                if (value) {
                                    const tmp = value.trim().replace('-', '');
                                    if (tmp.length < 7 || tmp.length > 12) {
                                        return Promise.reject(new Error('Biển kiểm soát không hợp lệ, vui lòng nhập lại'));
                                    }
                                    if (!(/[a-zA-Z]/.test(tmp))) {
                                        return Promise.reject(new Error('Biển kiểm soát không hợp lệ, vui lòng nhập lại'));
                                    }
                                }
                                return Promise.resolve();
                            },
                        })
                    ]} />
                </Col>
                <Col span={24}>
                    <Button type={showEngineNumber ? 'danger' : 'primary'} className="full-w text-left text-11"
                        onClick={() => {
                            if (showEngineNumber) {
                                form.resetFields(['engine_number', 'chassis_number'])
                            }
                            setShowEngineNumber(!showEngineNumber)
                        }}
                    >
                        {!showEngineNumber ? `+ Thêm số máy/số khung/số chỗ ngồi` : `- Bỏ số máy/số khung/số chỗ ngồi`}
                    </Button>
                </Col>
                {showEngineNumber && (
                    <>
                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <Field type="text" name="engine_number" title="Số máy" />
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <Field type="text" name="chassis_number" title="Số khung" />
                        </Col>
                    </>
                )}

                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <h3>Thông tin chủ xe</h3>
                    {/* <div>
                        <Radio.Group value={1}>
                            <Radio value={1}>Chính tôi</Radio>
                            <Radio value={2}>Người thân</Radio>
                        </Radio.Group>
                    </div> */}
                </Col>
                <Col span={24}>
                    <p className="ml-0 mb-0 text-11">Chọn chủ xe (hoặc nhấn dấu + để thêm mới)</p>
                    {listName.map((item, index) => (
                        <Button key={index}
                            type="primary"
                            className={`text-11 text-white mr-1 mt-1 ${index == currentName ? 'bg-primary' : 'bg-dark'}`}
                            onClick={() => onSelectUser(index + 1)}
                        >
                            {item.full_name || item.username}
                        </Button>
                    ))}
                    <Button
                        type="link"
                        className={`text-12 mr-1 mt-1`}
                        icon={<PlusOutlined />}
                        title="Thêm người mới"
                        onClick={() => onSelectUser(-1)}>
                        Thêm chủ xe
                    </Button>
                </Col>
                {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Field type="select" name="sex" required={true} title="Danh xưng" datasource={[{ value: 0, label: 'Ông' }, { value: 1, label: 'Bà' }]} />
                </Col> */}
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <Field name="full_name" type="text" title="Họ tên" autoFocus={true} required={true} />
                </Col>
                {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Field name="legal_id" type="text" title="CMND/CCCD/Hộ chiếu" />
                </Col> */}
                {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Field type="date"
                        required={true}
                        handleOpenDate={handleOpenDate}
                        name="dob"
                        title="Ngày sinh"
                        onChange={handleFieldChange}
                        onFieldChange={handleFieldChange}
                        rules={[
                            {
                                validator: validateDOB
                            }
                        ]}
                    />
                </Col> */}

                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Field name="phone" type="text" title="Số điện thoại" required={true} />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <Field name="email" type="text" title="Email"
                        rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
                    />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <Field name="address" type="text" title="Địa chỉ chỗ ở hiện tại" required={true} />
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Field type="select" groups={{ 'thanh-pho': 'Thành phố', 'tinh': 'Tỉnh' }} required={true} name="city" title="Tỉnh thành" datasource={cities} onChange={(value) => loadDistricts(value, true)} />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Field type="select" required={true} name="district" title="Quận huyện" datasource={districts} onChange={(value) => loadWards(value, true)} />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <Field type="select" required={true} name="ward" title="Phường xã" datasource={wards} />
                </Col>

            </Row>
            <div>
                <div className={`fee ${data?.promotion_fee && data?.promotion_fee != data?.fee ? 'strike' : ''}`}>Tổng tiền: {formatVND(data?.fee)}</div>
                {data?.promotion_fee && data?.promotion_fee != data?.fee && (<div className="fee">Ezin tài trợ chỉ còn: {formatVND(data?.promotion_fee)}</div>)}
                <Button
                    type="primary"
                    className="p-button w-100"
                    htmlType="submit"
                    id="btn-next-step2"
                >
                    Tiếp tục
                </Button>
            </div>
        </Form>
        <DatePicker
            // isPopup={true}
            min={nextDay?.toDate()}
            // max={maxDate}
            value={nextDay?.toDate()}
            isOpen={openValidDate}
            onSelect={handleSelectValidDate}
            onCancel={handleCancelValidDate}
            confirmText="Chọn"
            cancelText="Đóng"
            headerFormat="Ngày: DD/MM/YYYY"
            theme={isMobile ? 'ios' : 'default'}
            showHeader={true}
            dateConfig={
                {
                    'date': {
                        format: 'DD',
                        caption: 'Ngày',
                        step: 1,
                    },
                    'month': {
                        format: 'MM',
                        caption: 'Tháng',
                        step: 1,
                    },
                    'year': {
                        format: 'YYYY',
                        caption: 'Năm',
                        step: 1,
                    },
                }
            }
        />
        <DatePicker
            // isPopup={true}
            min={minDate}
            // max={maxDate}
            value={dobValue.toDate()}
            isOpen={open}
            onSelect={handleSelect}
            onCancel={handleCancel}
            confirmText="Chọn"
            cancelText="Đóng"
            headerFormat="Ngày: DD/MM/YYYY"
            theme={isMobile ? 'ios' : 'default'}
            showHeader={true}
            dateConfig={
                {
                    'date': {
                        format: 'DD',
                        caption: 'Ngày',
                        step: 1,
                    },
                    'month': {
                        format: 'MM',
                        caption: 'Tháng',
                        step: 1,
                    },
                    'year': {
                        format: 'YYYY',
                        caption: 'Năm',
                        step: 1,
                    },
                }
            }
        />
    </div>
    );
}

