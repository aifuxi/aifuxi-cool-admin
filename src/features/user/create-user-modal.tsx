import { Button, Form, Input, Message, Modal } from '@arco-design/web-react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import UploadField from '@/components/upload-field/upload-field';
import { User } from '@/type/user';

import { useCreateUser, useUpdateUser } from './hooks';

const FormItem = Form.Item;
type Props = {
  refetch: () => void;
  record?: User;
};

export const CreateUserModal = NiceModal.create(
  ({ refetch, record }: Props) => {
    const modal = useModal();
    const [form] = Form.useForm();
    const isEdit = Boolean(record?.id);
    const title = record?.id ? '编辑用户' : '创建用户';
    const btnText = record?.id ? '修改' : '创建';

    const handleSuccess = () => {
      let msg = '创建用户成功';
      if (isEdit && record?.id) {
        msg = '编辑用户成功';
      }
      Message.success(msg);
      refetch();
      modal.hide();
    };

    const { mutateAsync: runCreateUser, isLoading: createLoading } =
      useCreateUser(handleSuccess);
    const { mutateAsync: updateUser, isLoading: updateLoading } =
      useUpdateUser(handleSuccess);

    const loading = createLoading || updateLoading;

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
          onSubmit={(v) => {
            if (isEdit && record?.id) {
              updateUser({
                ...v,
                id: record.id,
              });
            } else {
              runCreateUser(v);
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
