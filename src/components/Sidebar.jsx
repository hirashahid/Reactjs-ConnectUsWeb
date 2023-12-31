import React from 'react';
import { Menu, Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserOutlined, LogoutOutlined, SettingOutlined, EditOutlined
} from '@ant-design/icons';

function Sidebar({ isMenuVisible, hideDrawer }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  let name = 'No name';

  if (user) name = user.first_name;

  const onSelectMenu = (item) => {
    navigate(item.key);
  };
  const MenuList = [
    {
      key: '/profile',
      label: name,
      icon: <UserOutlined />
    },
    {
      key: '/editprofile',
      label: 'Edit Profile',
      icon: <EditOutlined />,
    },
    {
      key: '/settings',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      key: '/genericSlots',
      label: 'Generic Slots',
      icon: <SettingOutlined />,
    },
    {
      key: '/exceptionSlots',
      label: 'Exception Slots',
      icon: <SettingOutlined />,
    },
    {
      key: '/',
      label: 'Log Out',
      icon: <LogoutOutlined />,
    }
  ];
  return (
    <Drawer
      className="ant-layout-sider-dark"
      placement="left"
      onClose={() => {
        <Link to="/calendar"> </Link>;
        hideDrawer();
      }}
      open={isMenuVisible}
      width={250}
    >
      <Menu theme="light" mode="inline" items={MenuList} onClick={onSelectMenu} />
    </Drawer>
  );
}

export default Sidebar;
