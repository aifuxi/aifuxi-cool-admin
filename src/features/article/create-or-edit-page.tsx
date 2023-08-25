import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Message,
  Switch,
  Typography,
} from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import useSWR from 'swr';

import { BytemdEditor } from '@/components/bytemd';
import UploadField from '@/components/upload-field/upload-field';
import { CODE } from '@/constants/code';
import { ROUTE_PATH } from '@/constants/path';
import {
  createArticle,
  getArticleByID,
  updateArticleByID,
} from '@/services/article';
import { CreateArticleRequest, UpdateArticleRequest } from '@/type/article';

const FormItem = Form.Item;

export const ArticleCreateOrEditPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { loading: createLoading, runAsync: runCreateArticle } = useRequest(
    createArticle,
    {
      manual: true,
    },
  );
  const { loading: updateLoading, runAsync: updateArticle } = useRequest(
    updateArticleByID,
    {
      manual: true,
    },
  );

  const loading = createLoading || updateLoading;
  const isEdit = Boolean(id);
  const title = id ? '编辑文章' : '创建文章';
  const btnText = id ? '修改' : '创建';

  const { data, isLoading } = useSWR(id ? '/auth/articles' + id : false, () =>
    getArticleByID(id!),
  );
  const editArticle = data?.data;

  useEffect(() => {
    if (!isLoading && editArticle) {
      form.setFieldsValue(editArticle);
    } else {
      form.resetFields();
    }
  }, [isLoading, editArticle, form]);

  return (
    <div>
      <Typography.Title heading={2} bold>
        {title}
      </Typography.Title>

      <Form
        form={form}
        layout="vertical"
        size="large"
        autoComplete="off"
        onSubmit={async (v) => {
          if (isEdit && id) {
            const res = await updateArticle(id, v as UpdateArticleRequest);
            if (res.code === CODE.Ok) {
              Message.success('编辑文章成功');
              navigate(ROUTE_PATH.ARTICLE_LIST);
            }
          } else {
            const res = await runCreateArticle(v as CreateArticleRequest);
            if (res.code === CODE.Ok) {
              Message.success('创建文章成功');
              navigate(ROUTE_PATH.ARTICLE_LIST);
            }
          }
        }}
      >
        <FormItem label="文章标题" field="title" rules={[{ required: true }]}>
          <Input placeholder="请输入文章标题" />
        </FormItem>
        <FormItem
          label="friendly_url"
          field="friendly_url"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入文章 friendly_url" />
        </FormItem>
        <FormItem
          label="文章描述"
          field="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="请输入文章描述" />
        </FormItem>
        <FormItem label="文章封面" field="cover">
          <UploadField />
        </FormItem>
        <FormItem label="是否置顶" field="is_top">
          <Switch />
        </FormItem>
        <FormItem label="置顶优先级" field="top_priority">
          <InputNumber
            className="w-[200px]"
            mode="button"
            min={0}
            max={10}
            step={1}
          />
        </FormItem>
        <FormItem label="内容" field="content" rules={[{ required: true }]}>
          <BytemdEditor />
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
    </div>
  );
};
