// Shortcut for kich-hoat
import React, { useState } from 'react';
import { Modal, Row, Col, Button, Input, Radio } from 'antd';
import { getImageUrl } from 'utils/helpers';
import Link from 'next/link';
const Step3 = ({ onNext, onPrev, data }) => {
    return (
        <>
            <Row gutter={[8, 10]}>
                <Col xs={24} sm={24}>
                    <h3>4. Hoàn tất</h3>
                </Col>
                <Col xs={24} sm={24}>
                    <p className="ml-0 mb-0">Xin cảm ơn bạn đã cung cấp thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>
                </Col>
                <Col xs={12} sm={12}>
                <Button type="secondary" className="w-100 p-10" size="large"><Link href="/">Về trang chủ</Link></Button>
                </Col>
                <Col xs={12} sm={12}>
                    <Button type="primary" className="w-100 p-10" size="large" onClick={() => window.location.reload()}>Giám định tiếp</Button>
                </Col>
            </Row>
        </>
    );
};

export default Step3;
