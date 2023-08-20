import {
  Button,
  Message,
  Modal,
  Table,
  TableColumnProps,
  Typography,
} from '@arco-design/web-react';
import NiceModal from '@ebay/nice-modal-react';
import { useRequest } from 'ahooks';
import useSWR from 'swr';

import { CODE } from '@/constants/code';
import {
  IconAddSquareBoldDuotone,
  IconPenNewSquareBoldDuotone,
  IconTrashBinTrashBoldDuotone,
} from '@/icons';
import { deleteTagByID, getTags } from '@/services/tag';
import { Tag } from '@/type/tag';

import { CreateTagModal } from './create-tag-modal';

const ButtonGroup = Button.Group;

const TagPage = () => {
  const { data, isLoading, mutate } = useSWR('/auth/tags', getTags);
  const { loading: deleteLoading, runAsync: deleteTag } = useRequest(
    deleteTagByID,
    {
      manual: true,
    },
  );

  const columns: TableColumnProps<Tag>[] = [
    {
      title: '标签名称',
      render: (_, record) => <Typography.Text>{record.name}</Typography.Text>,
    },
    {
      title: 'friendly_url',
      render: (_, record) => (
        <Typography.Text>{record.friendly_url}</Typography.Text>
      ),
    },
    {
      title: '创建时间',
      render: (_, record) => (
        <Typography.Text>{record.created_at}</Typography.Text>
      ),
    },
    {
      title: '更新时间',
      render: (_, record) => (
        <Typography.Text>{record.updated_at}</Typography.Text>
      ),
    },
    {
      title: '操作',
      render: (_, record) => (
        <ButtonGroup>
          <Button
            type="text"
            icon={<IconPenNewSquareBoldDuotone />}
            onClick={() => {
              NiceModal.show(CreateTagModal, { record, refresh: mutate });
            }}
          >
            编辑
          </Button>
          <Button
            type="text"
            status="danger"
            icon={<IconTrashBinTrashBoldDuotone />}
            onClick={() => {
              Modal.confirm({
                title: '温馨提示',
                content: `你确定要删除标签【${record.name}】吗？`,
                confirmLoading: deleteLoading,
                okButtonProps: {
                  status: 'danger',
                },
                onOk: async () => {
                  const res = await deleteTag(record.id);
                  if (res.code === CODE.Ok) {
                    Message.success('删除成功');
                    mutate();
                  }
                },
              });
            }}
          >
            删除
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title heading={2} bold>
        文章标签
      </Typography.Title>

      <div className="mb-4">
        <Button
          type="primary"
          icon={<IconAddSquareBoldDuotone />}
          size="large"
          onClick={() => {
            NiceModal.show(CreateTagModal, { refresh: mutate });
          }}
        >
          创建标签
        </Button>
      </div>

      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        data={data?.data || []}
      />
    </div>
  );
};

export default TagPage;
