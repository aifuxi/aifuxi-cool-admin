import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Button,
  Form,
  Input,
  Layout,
  Notification,
} from '@arco-design/web-react';

import TechLifeManagementPng from '@/assets/images/tech-life-management.png';
import { IconLetterBoldDuotone, IconLockBoldDuotone } from '@/components/icons';
import { ROUTE_PATH } from '@/constants/path';
import { REDIRECT } from '@/constants/unknown';
import { signIn } from '@/services/auth';
import { useCurrentUserStore } from '@/store/current-user';
import { SignInRequest } from '@/type';
import { cn, genBearerToken } from '@/utils/helper';

const FormItem = Form.Item;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);

  const { mutate, isLoading } = useMutation(
    (req: SignInRequest) => signIn(req),
    {
      onSuccess(res) {
        if (res.data?.access_token) {
          setCurrentUser(res.data.user, genBearerToken(res.data.access_token));

          Notification.success({
            title: '登录成功',
            content: `欢迎回来，${res.data.user.nickname}`,
          });
          if (redirectPath) {
            navigate(redirectPath);
          } else {
            // 跳到首页去
            navigate(ROUTE_PATH.HOME);
          }
        } else {
          Notification.clear();
          // 弹错误消息
          Notification.error({
            title: 'Error',
            content: res.msg || '系统错误',
          });
        }
      },
    },
  );

  const redirectPath = searchParams.get(REDIRECT);

  return (
    <Layout className="h-screen w-screen bg-arco-bg-1">
      <div
        className={cn(
          'w-[320px] mx-auto  p-12 rounded-2xl translate-y-1/4',
          'shadow-2xl dark:bg-arco-menu-light-bg',
        )}
      >
        <img
          src={TechLifeManagementPng}
          alt="Tech Life Management"
          className="block w-[180px] h-auto mx-auto"
        />
        <Form
          form={form}
          layout="vertical"
          size="large"
          initialValues={
            { email: 'aifuxi@email.com', password: '123456' } as SignInRequest
          }
          autoComplete="off"
          onSubmit={(v: SignInRequest) => {
            mutate(v);
          }}
        >
          <FormItem label="邮箱" field="email" rules={[{ required: true }]}>
            <Input
              prefix={<IconLetterBoldDuotone />}
              placeholder="请输入你的邮箱"
            />
          </FormItem>
          <FormItem label="密码" field="password" rules={[{ required: true }]}>
            <Input.Password
              prefix={<IconLockBoldDuotone />}
              placeholder="请输入你的密码"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              long
              size="large"
              loading={isLoading}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </Layout>
  );
};
