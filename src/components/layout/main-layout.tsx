import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Avatar, Layout, Menu, Typography } from '@arco-design/web-react';
import { IconCalendar, IconHome } from '@arco-design/web-react/icon';

import { ROUTE_PATH } from '@/constants/path';

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
    <Layout className="h-screen w-screen">
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
            <IconHome />
            Home
          </MenuItem>
          <MenuItem key={ROUTE_PATH.TAG}>
            <IconCalendar />
            文章标签
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header className="h-[60px] flex items-center justify-end px-6 shadow-md">
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
<h2 className=""></h2>;

export default MainLayout;
