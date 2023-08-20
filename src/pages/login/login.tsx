import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Form, Input, Message } from '@arco-design/web-react';

import TechLifeManagementPng from '@/assets/images/tech-life-management.png';
import { ROUTE_PATH } from '@/constants/path';
import { STORAGE_KEY } from '@/constants/storage';
import { REDIRECT } from '@/constants/unknow';
import { IconLetterBoldDuotone, IconLockBoldDuotone } from '@/icons';
import { signIn } from '@/services/auth';
import { SignInRequest } from '@/type';

const FormItem = Form.Item;

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();

  const redirectPath = searchParams.get(REDIRECT);

  return (
    <div className="w-[320px] mx-auto shadow-2xl p-12 rounded-2xl translate-y-1/4">
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
          { email: '123@qq.com', password: '123456' } as SignInRequest
        }
        autoComplete="off"
        onSubmit={async (v: SignInRequest) => {
          const res = await signIn(v);
          if (res.data?.access_token) {
            localStorage.setItem(
              STORAGE_KEY.ACCESS_TOKEN,
              res.data.access_token,
            );

            Message.success('登录成功');

            if (redirectPath) {
              navigate(redirectPath);
            } else {
              // 跳到首页去
              navigate(ROUTE_PATH.HOME);
            }
          } else {
            Message.clear();
            // 弹错误消息
            Message.error(res.msg || '系统错误');
          }
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
          <Button type="primary" htmlType="submit" long size="large">
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Login;
