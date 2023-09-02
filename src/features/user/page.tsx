import { useState } from 'react';

import {
  Button,
  Form,
  Image,
  Input,
  Message,
  Modal,
  Table,
  TableColumnProps,
  Typography,
} from '@arco-design/web-react';
import NiceModal from '@ebay/nice-modal-react';

import {
  IconAddSquareBoldDuotone,
  IconMinimalisticMagniferBoldDuotone,
  IconPenNewSquareBoldDuotone,
  IconRestartSquareBoldDuotone,
  IconTrashBinTrashBoldDuotone,
} from '@/components/icons';
import { ORDER_ENUM } from '@/constants/unknown';
import { defaultGetUsersReq } from '@/features/user/config';
import { GetTagsRequest } from '@/type/tag';
import { GetUsersRequest, User } from '@/type/user';
import { getTableOrder } from '@/utils/helper';
import { formatTime } from '@/utils/time';

import { CreateUserModal } from './create-user-modal';
import { useDeleteUser, useUsers } from './hooks';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

export const UserPage = () => {
  const [form] = Form.useForm();
  const [req, setReq] = useState<GetUsersRequest>(defaultGetUsersReq);

  const { data, refetch, isError, isLoading } = useUsers(req);
  const handleDeleteUserSuccess = async () => {
    Message.success('删除成功');

    await refetch();

    if (data?.data) {
      if (req.page > 1) {
        setReq({ ...req, page: req.page - 1 });
      }
    }
  };
  const { mutate: deleteUser, isLoading: deleteLoading } = useDeleteUser(
    handleDeleteUserSuccess,
  );

  const columns: TableColumnProps<User>[] = [
    {
      title: '昵称',
      render: (_, record) => (
        <Typography.Text>{record.nickname}</Typography.Text>
      ),
    },
    {
      title: '邮箱',
      render: (_, record) => <Typography.Text>{record.email}</Typography.Text>,
    },
    {
      title: '头像',
      render: (_, record) =>
        record.avatar ? (
          <Image width={80} src={record.avatar} alt={record.nickname} />
        ) : (
          <Typography.Text>-</Typography.Text>
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
              NiceModal.show(CreateUserModal, { record, refetch });
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
                content: `你确定要删除用户【${record.nickname}】吗？`,
                confirmLoading: deleteLoading,
                okButtonProps: {
                  status: 'danger',
                },
                onOk: () => {
                  deleteUser(record.id);
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

  if (isError) {
    // TODO: 兜底出错情况
    return <div>出错了</div>;
  }

  return (
    <div>
      <Typography.Title heading={2} bold>
        用户管理
      </Typography.Title>

      <div className="mb-4">
        <Button
          type="primary"
          icon={<IconAddSquareBoldDuotone />}
          size="large"
          onClick={() => {
            NiceModal.show(CreateUserModal, { refetch });
          }}
        >
          创建用户
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
          setReq(defaultGetUsersReq);
        }}
      >
        <FormItem label="用户昵称" field="nickname">
          <Input
            className="w-[250px]"
            placeholder="请输入用户昵称..."
            allowClear
          />
        </FormItem>
        <FormItem label="用户邮箱" field="email">
          <Input
            className="w-[250px]"
            placeholder="请输入用户邮箱..."
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
            if (req.order === ORDER_ENUM.DESC) {
              setReq({ ...req, order: ORDER_ENUM.ASC });
            }
            if (req.order === ORDER_ENUM.ASC) {
              setReq({ ...req, order: ORDER_ENUM.DESC });
            }
          } else {
            setReq({
              ...req,
              order_by: field as GetTagsRequest['order_by'],
              order: ORDER_ENUM.DESC,
            });
          }
        }}
      />
    </div>
  );
};
