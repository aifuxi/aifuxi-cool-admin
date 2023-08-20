import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Avatar, Layout, Menu, Typography } from '@arco-design/web-react';

import { ROUTE_PATH } from '@/constants/path';
import {
  IconHomeSmileBoldDuotone,
  IconTagHorizontalBoldDuotone,
} from '@/icons';

import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

const MenuItem = Menu.Item;
// const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  return (
    <Layout className="h-screen w-screen dark:bg-[var(--color-bg-1)]">
      <Sider collapsed={false} collapsible trigger={null} breakpoint="xl">
        <Typography.Title heading={4} className="text-center">
          F西后台管理系统
        </Typography.Title>
        <Menu
          selectedKeys={selectedKeys}
          onClickMenuItem={(key) => {
            setSelectedKeys([key]);
            navigate(key);
          }}
          style={{ width: '100%' }}
        >
          <MenuItem key={ROUTE_PATH.HOME}>
            <div className="w-full h-full flex items-center space-x-2">
              <IconHomeSmileBoldDuotone className="text-xl" />
              <span>Home</span>
            </div>
          </MenuItem>
          <MenuItem key={ROUTE_PATH.TAG}>
            <div className="w-full h-full flex items-center space-x-2">
              <IconTagHorizontalBoldDuotone className="text-xl" />
              <span>文章标签</span>
            </div>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header className="h-[60px] flex items-center justify-end px-6 shadow-md">
          <ThemeSwitcher />
          <Avatar>
            <img
              alt="avatar"
              src="https://aifuxi.oss-cn-shanghai.aliyuncs.com/self/avatar.jpeg"
            />
          </Avatar>
        </Header>
        <Layout className="px-6">
          <Content>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
