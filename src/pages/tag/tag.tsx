import { Table, TableColumnProps, Typography } from '@arco-design/web-react';
import useSWR from 'swr';

import { getTags } from '@/services/tag';
import { Tag } from '@/type/tag';

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
];

const TagPage = () => {
  const { data, isLoading } = useSWR('/auth/tags', getTags);

  return (
    <div>
      <Typography.Title heading={2} bold>
        文章标签
      </Typography.Title>

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
