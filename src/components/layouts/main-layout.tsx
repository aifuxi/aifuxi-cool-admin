import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Typography,
} from '@arco-design/web-react';

import {
  IconHomeSmileBoldDuotone,
  IconLogout2BoldDuotone,
  IconNotebookBoldDuotone,
  IconTagHorizontalBoldDuotone,
  IconUserRoundedBoldDuotone,
} from '@/components/icons';
import { ROUTE_PATH } from '@/constants/path';
import { useCurrentUserStore } from '@/store/current-user.ts';

import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const userProfile = useCurrentUserStore((state) => state.user);
  const clearCurrentUser = useCurrentUserStore(
    (state) => state.clearCurrentUser,
  );

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);

  const dropList = (
    <Menu>
      <Menu.Item key="3">
        <div className="w-full h-full flex items-center space-x-2">
          <Button
            status="danger"
            type="text"
            icon={<IconLogout2BoldDuotone />}
            onClick={() => {
              Modal.confirm({
                title: '温馨提示',
                content: `你确定要退出登录吗？`,
                okButtonProps: {
                  status: 'danger',
                },
                onOk: async () => {
                  clearCurrentUser();
                  navigate(ROUTE_PATH.LOGIN, { replace: true });
                },
              });
            }}
          >
            退出登录
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="h-screen w-screen bg-arco-bg-1">
      <Sider collapsed={false} collapsible trigger={null} breakpoint="xl">
        <Typography.Title heading={4} className="text-center">
          F西后台管理系统
        </Typography.Title>
        <Menu
          selectedKeys={selectedKeys}
          autoOpen
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
              <span>标签管理</span>
            </div>
          </MenuItem>
          <SubMenu
            key={ROUTE_PATH.ARTICLE}
            title={
              <div className="w-full h-full flex items-center space-x-2">
                <IconNotebookBoldDuotone className="text-xl" />
                <span>文章管理</span>
              </div>
            }
          >
            <MenuItem key={ROUTE_PATH.ARTICLE_LIST}>
              <div className="w-full h-full flex items-center space-x-2">
                <span>文章列表</span>
              </div>
            </MenuItem>
            <MenuItem key={ROUTE_PATH.ARTICLE_CREATE}>
              <div className="w-full h-full flex items-center space-x-2">
                <span>创建文章</span>
              </div>
            </MenuItem>
          </SubMenu>
          <MenuItem key={ROUTE_PATH.USER}>
            <div className="w-full h-full flex items-center space-x-2">
              <IconUserRoundedBoldDuotone className="text-xl" />
              <span>用户管理</span>
            </div>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header className="h-[60px] flex items-center justify-end px-6 shadow-md sticky top-0 bg-arco-bg-1 z-[1]">
          <ThemeSwitcher />
          <Dropdown droplist={dropList} trigger="click" position="bl">
            <Avatar className="bg-[rgb(var(--primary-6))]">
              {userProfile?.avatar ? (
                <img alt={userProfile?.nickname} src={userProfile?.avatar} />
              ) : (
                userProfile?.nickname || '未知用户'
              )}
            </Avatar>
          </Dropdown>
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
