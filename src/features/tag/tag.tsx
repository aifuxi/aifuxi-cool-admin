import { useState } from 'react';

import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  Table,
  TableColumnProps,
  Typography,
} from '@arco-design/web-react';
import NiceModal from '@ebay/nice-modal-react';
import { useRequest } from 'ahooks';
import useSWR from 'swr';

import {
  IconAddSquareBoldDuotone,
  IconMinimalisticMagniferBoldDuotone,
  IconPenNewSquareBoldDuotone,
  IconRestartSquareBoldDuotone,
  IconTrashBinTrashBoldDuotone,
} from '@/components/icons';
import { CODE } from '@/constants/code';
import { deleteTagByID, getTags } from '@/services/tag';
import { GetTagsRequest, Tag } from '@/type/tag';
import { getTableOrder } from '@/utils/helper';
import { formatTime } from '@/utils/time';

import { CreateTagModal } from './create-tag-modal';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

export const TagPage = () => {
  const [form] = Form.useForm();
  const [req, setReq] = useState<GetTagsRequest>({
    page: 1,
    page_size: 10,
    order: 'desc',
    order_by: 'created_at',
  });
  const { data, isLoading, mutate } = useSWR(
    '/auth/tags' + JSON.stringify(req),
    () => getTags(req),
  );
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
      dataIndex: 'created_at',
      sorter: true,
      sortOrder: getTableOrder(req, 'created_at'),
      render: (_, record) => (
        <Typography.Text>{formatTime(record.created_at)}</Typography.Text>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      sorter: true,
      sortOrder: getTableOrder(req, 'updated_at'),
      render: (_, record) => (
        <Typography.Text>{formatTime(record.updated_at)}</Typography.Text>
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

                    const currentPageRes = await mutate();
                    if (!currentPageRes?.data?.length) {
                      setReq({ ...req, page: req.page - 1 });
                    }
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
        标签管理
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

      <Form
        form={form}
        autoComplete="off"
        layout="inline"
        className="mb-2"
        onSubmit={(v) => {
          setReq({ ...req, ...v });
        }}
        onReset={() => {
          form.resetFields();
          setReq({
            page: 1,
            page_size: 10,
            order: 'desc',
            order_by: 'created_at',
          });
        }}
      >
        <FormItem label="标签名称" field="name">
          <Input
            className="w-[250px]"
            placeholder="请输入标签名称..."
            allowClear
          />
        </FormItem>
        <FormItem label="标签friendly_url" field="friendly_url">
          <Input
            className="w-[250px]"
            placeholder="请输入标签friendly_url..."
            allowClear
          />
        </FormItem>
        <FormItem>
          <Button
            htmlType="submit"
            type="primary"
            icon={<IconMinimalisticMagniferBoldDuotone />}
          >
            搜索
          </Button>
          <Button
            htmlType="reset"
            className="ml-2"
            icon={<IconRestartSquareBoldDuotone />}
          >
            重置
          </Button>
        </FormItem>
      </Form>

      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        data={data?.data || []}
        pagination={{
          total: data?.total,
          showTotal: true,
          current: req.page,
          pageSize: req.page_size,
          sizeCanChange: true,
          pageSizeChangeResetCurrent: true,
          onChange(pageNumber, pageSize) {
            setReq({ ...req, page: pageNumber, page_size: pageSize });
          },
        }}
        onChange={(_, sorter) => {
          console.log(sorter);
          if (Array.isArray(sorter)) {
            return;
          }

          const { field } = sorter;

          if (!field) {
            return;
          }

          if (field === req.order_by) {
            if (req.order === 'desc') {
              setReq({ ...req, order: 'asc' });
            }
            if (req.order === 'asc') {
              setReq({ ...req, order: 'desc' });
            }
          } else {
            setReq({
              ...req,
              order_by: field as GetTagsRequest['order_by'],
              order: 'desc',
            });
          }
        }}
      />
    </div>
  );
};
