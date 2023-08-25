import { Button, Form, Input, Message, Modal } from '@arco-design/web-react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRequest } from 'ahooks';

import UploadField from '@/components/upload-field/upload-field';
import { CODE } from '@/constants/code';
import { createUser, updateUserByID } from '@/services/user';
import { CreateUserRequest, UpdateUserRequest, User } from '@/type/user';

const FormItem = Form.Item;
type Props = {
  refresh: () => void;
  record?: User;
};

export const CreateUserModal = NiceModal.create(
  ({ refresh, record }: Props) => {
    const modal = useModal();
    const [form] = Form.useForm();
    const { loading: createLoading, runAsync: runCreateUser } = useRequest(
      createUser,
      {
        manual: true,
      },
    );
    const { loading: updateLoading, runAsync: updateUser } = useRequest(
      updateUserByID,
      {
        manual: true,
      },
    );

    const loading = createLoading || updateLoading;
    const isEdit = Boolean(record?.id);
    const title = record?.id ? '编辑用户' : '创建用户';
    const btnText = record?.id ? '修改' : '创建';

    return (
      <Modal
        title={title}
        className="w-[360px]"
        maskClosable={false}
        visible={modal.visible}
        onCancel={() => modal.hide()}
        afterClose={() => modal.remove()}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={record}
          size="large"
          autoComplete="off"
          onSubmit={async (v) => {
            if (isEdit && record?.id) {
              const res = await updateUser(record.id, v as UpdateUserRequest);
              if (res.code === CODE.Ok) {
                Message.success('编辑用户成功');
                refresh();
                modal.hide();
              }
            } else {
              const res = await runCreateUser(v as CreateUserRequest);
              if (res.code === CODE.Ok) {
                Message.success('创建用户成功');
                refresh();
                modal.hide();
              }
            }
          }}
        >
          <FormItem
            label="昵称"
            field="nickname"
            rules={[{ required: !isEdit }]}
          >
            <Input placeholder="请输入用户昵称" />
          </FormItem>
          <FormItem label="头像" field="avatar">
            <UploadField />
          </FormItem>
          <FormItem label="email" field="email" rules={[{ required: !isEdit }]}>
            <Input placeholder="请输入用户邮箱" />
          </FormItem>
          <FormItem
            label="密码"
            field="password"
            rules={[{ required: !isEdit }]}
          >
            <Input.Password placeholder="请输入密码" />
          </FormItem>
          <FormItem
            label="确认密码"
            field="re_password"
            rules={[{ required: !isEdit }]}
          >
            <Input.Password placeholder="请输入再次输入密码" />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              long
              size="large"
              loading={loading}
            >
              {btnText}
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  },
);
