import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import {
  Button,
  Form,
  Image,
  Input,
  Message,
  Modal,
  Switch,
  Table,
  TableColumnProps,
  Typography,
} from '@arco-design/web-react';
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
import { ROUTE_PATH } from '@/constants/path';
import { deleteArticleByID, getArticles } from '@/services/article';
import { Article, GetArticlesRequest } from '@/type/article';
import { getTableOrder } from '@/utils/helper';
import { formatTime } from '@/utils/time';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

export const ArticlePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [req, setReq] = useState<GetArticlesRequest>({
    page: 1,
    page_size: 10,
    order: 'desc',
    order_by: 'created_at',
  });
  const { data, isLoading, mutate } = useSWR(
    '/auth/articles' + JSON.stringify(req),
    () => getArticles(req),
  );
  const { loading: deleteLoading, runAsync: deleteArticle } = useRequest(
    deleteArticleByID,
    {
      manual: true,
    },
  );

  const columns: TableColumnProps<Article>[] = [
    {
      title: '文章标题',
      render: (_, record) => <Typography.Text>{record.title}</Typography.Text>,
    },
    {
      title: '文章描述',
      render: (_, record) => (
        <Typography.Text>{record.description}</Typography.Text>
      ),
    },
    {
      title: '文章封面',
      render: (_, record) =>
        record.cover ? (
          <Image width={80} src={record.cover} alt={record.title} />
        ) : (
          <Typography.Text>-</Typography.Text>
        ),
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
      title: '是否置顶',
      render: (_, record) => <Switch defaultChecked={record.is_top} />,
    },
    {
      title: '置顶优先级',
      render: (_, record) => (
        <Typography.Text>{record.top_priority}</Typography.Text>
      ),
    },
    {
      title: '是否发布',
      render: (_, record) => <Switch defaultChecked={record.is_published} />,
    },
    {
      title: '操作',
      render: (_, record) => (
        <ButtonGroup>
          <Button
            type="text"
            icon={<IconPenNewSquareBoldDuotone />}
            onClick={() => {
              navigate(
                generatePath(`${ROUTE_PATH.ARTICLE_CREATE}/${record.id}`),
              );
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
                content: `你确定要删除文章【${record.title}】吗？`,
                confirmLoading: deleteLoading,
                okButtonProps: {
                  status: 'danger',
                },
                onOk: async () => {
                  const res = await deleteArticle(record.id);
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
        文章列表
      </Typography.Title>

      <div className="mb-4">
        <Button
          type="primary"
          icon={<IconAddSquareBoldDuotone />}
          size="large"
          onClick={() => {
            navigate(ROUTE_PATH.ARTICLE_CREATE);
          }}
        >
          创建文章
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
        <FormItem label="文章标题" field="title">
          <Input
            className="w-[250px]"
            placeholder="请输入文章标题..."
            allowClear
          />
        </FormItem>
        <FormItem label="文章friendly_url" field="friendly_url">
          <Input
            className="w-[250px]"
            placeholder="请输入文章friendly_url..."
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
              order_by: field as GetArticlesRequest['order_by'],
              order: 'desc',
            });
          }
        }}
      />
    </div>
  );
};
