import { Button, Form, Input, Message, Modal } from '@arco-design/web-react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useRequest } from 'ahooks';

import { CODE } from '@/constants/code';
import { createTag, updateTagByID } from '@/services/tag';
import { CreateTagRequest, Tag, UpdateTagRequest } from '@/type/tag';

const FormItem = Form.Item;
type Props = {
  refresh: () => void;
  record?: Tag;
};

export const CreateTagModal = NiceModal.create(({ refresh, record }: Props) => {
  const modal = useModal();
  const [form] = Form.useForm();
  const { loading: createLoading, runAsync: runCreateTag } = useRequest(
    createTag,
    {
      manual: true,
    },
  );
  const { loading: updateLoading, runAsync: updateTag } = useRequest(
    updateTagByID,
    {
      manual: true,
    },
  );

  const loading = createLoading || updateLoading;
  const isEdit = Boolean(record?.id);
  const title = record?.id ? '编辑标签' : '创建标签';
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
            const res = await updateTag(record.id, v as UpdateTagRequest);
            if (res.code === CODE.Ok) {
              Message.success('编辑标签成功');
              refresh();
              modal.hide();
            }
          } else {
            const res = await runCreateTag(v as CreateTagRequest);
            if (res.code === CODE.Ok) {
              Message.success('创建标签成功');
              refresh();
              modal.hide();
            }
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
