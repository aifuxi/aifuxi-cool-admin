import { Button, Form, Input, Message, Modal } from '@arco-design/web-react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useCreateTag, useUpdateTag } from '@/features/tag/hooks.ts';
import { Tag } from '@/type/tag';

const FormItem = Form.Item;
type Props = {
  refetch: () => void;
  record?: Tag;
};

export const CreateTagModal = NiceModal.create(({ refetch, record }: Props) => {
  const modal = useModal();
  const [form] = Form.useForm();

  const isEdit = Boolean(record?.id);
  const title = record?.id ? '编辑标签' : '创建标签';
  const btnText = record?.id ? '修改' : '创建';

  const handleSuccess = () => {
    let msg = '创建标签成功';
    if (isEdit && record?.id) {
      msg = '编辑标签成功';
    }
    Message.success(msg);
    refetch();
    modal.hide();
  };

  const { mutateAsync: runCreateTag, isLoading: createLoading } =
    useCreateTag(handleSuccess);
  const { mutateAsync: updateTag, isLoading: updateLoading } =
    useUpdateTag(handleSuccess);

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
        onSubmit={async (v) => {
          if (isEdit && record?.id) {
            await updateTag({
              ...v,
              id: record.id,
            });
          } else {
            await runCreateTag(v);
          }
        }}
      >
        <FormItem label="名称" field="name" rules={[{ required: true }]}>
          <Input placeholder="请输入标签名称" />
        </FormItem>
        <FormItem
          label="friendly_url"
          field="friendly_url"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入标签 friendly_url" />
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
});
