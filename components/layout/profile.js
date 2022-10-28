import React from 'react';
import { Row, Col, Menu, Divider, Avatar } from 'antd';
import { getLayout as getMainLayout } from './index';
import {
  UserOutlined,
  HistoryOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
  SyncOutlined
} from '@ant-design/icons';
import useAuth from '../../src/container/auth-wrapper/auth.context';
import { useRouter } from 'next/router';

function titleCase(str) {
  return str && str.toLowerCase().replace(/(^|\s)(\w)/g, function (x) {
    return x.toUpperCase();
  });
}
function ProfileLayout({ children }) {
  const router = useRouter();
  const { logout, user } = useAuth();
  const handleClick = ({ key }) => {
    if (key === '3') {
      logout();
    } else if (key === '2') {
      router.push('/profile/info');
    } else if (key === '1') {
      router.push('/profile/transaction');
    } else if (key === '4') {
      router.push('/profile/travel');
    } else if (key === '5') {
      router.push('/profile/nguoi-duoc-bao-hiem');
    } else if (key === '6') {
      router.push('/profile/cards');
    } else if (key === '7') {
      router.push('/profile/tai-tuc');
    }
  };

  const getActiveKey = () =>
    router.pathname.includes('/transaction')
      ? '1'
      : router.pathname.includes('/info')
        ? '2'
        : router.pathname.includes('/nguoi-duoc-bao-hiem') ? '5'
          : router.pathname.includes('/cards') ? '6' 
          : router.pathname.includes('/tai-tuc') ? '7' : '4';

  const menuSidebar = (
    <Menu
      defaultSelectedKeys={[getActiveKey()]}
      onClick={handleClick}
      mode={'vertical'}
    >
      <Menu.Item key="1" icon={<HistoryOutlined />}>
        Đơn bảo hiểm
      </Menu.Item>
      <Menu.Item key="6" icon={<CreditCardOutlined />}>
        Liên kết thẻ
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Tài khoản chính
      </Menu.Item>
      <Menu.Item key="5" icon={<UsergroupAddOutlined />}>
        Người được bảo hiểm
      </Menu.Item>
      <Menu.Item key="7" icon={<SyncOutlined />}>
        BH cần tái tục
      </Menu.Item>
      <Divider className="mb-2 mt-2" />
      <Menu.Item key="3" icon={<LogoutOutlined rotate={180} />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const menuSidebarMobile = (
    <Menu
      // style={{ width: 170 }}
      defaultSelectedKeys={[getActiveKey()]}
      onClick={handleClick}
      mode={'horizontal'}
    >
      <Menu.Item key="1" icon={<HistoryOutlined />}>
        Đơn bảo hiểm
      </Menu.Item>
      {/* <Menu.Item key="6" icon={<CreditCardOutlined />}>
        Liên kết thẻ
      </Menu.Item> */}
      <Menu.Item key="2" icon={<UserOutlined />}>
        Tài khoản
      </Menu.Item>
      <Menu.Item key="5" icon={<UsergroupAddOutlined />}>
        Người được bảo hiểm
      </Menu.Item>
      <Menu.Item key="7" icon={<SyncOutlined />}>
        BH cần tái tục
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="profile">
      <div className="container">
        <Row gutter={[40, 20]}>
          <Col lg={5} sm={24} md={24} xs={24}>
            <Avatar
              className="shadow d-inline mr-1"
              size={36}
              icon={<UserOutlined />}
            />
            <div className="user">
              <span>Tài khoản</span>
              <br />
              <strong>{titleCase(user?.full_name) || user?.username}</strong>
            </div>
            <br />
            <div className="profile-sidebar">{menuSidebar}</div>
            <div className="profile-sidebar-mobile">{menuSidebarMobile}</div>
          </Col>
          <Col lg={19} sm={24} md={24} xs={24}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export const getLayout = (page) =>
  getMainLayout(<ProfileLayout>{page}</ProfileLayout>);

export default ProfileLayout;
