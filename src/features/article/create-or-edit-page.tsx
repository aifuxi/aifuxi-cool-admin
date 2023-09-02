import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Message,
  Switch,
  Tag,
  Typography,
  Upload,
} from '@arco-design/web-react';

import { BytemdEditor } from '@/components/bytemd';
import { CODE } from '@/constants/code';
import { ROUTE_PATH } from '@/constants/path';
import { getAllTagsReq } from '@/features/article/config';
import { useTags } from '@/features/tag/hooks';
import { uploadFile } from '@/services/upload';
import { genUploadItems } from '@/utils/helper';

import { useArticle, useCreateArticle, useUpdateArticle } from './hooks';

const FormItem = Form.Item;

export const ArticleCreateOrEditPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [cover, setCover] = useState('');
  const { id } = useParams<{ id?: string }>();
  const { data: tagData } = useTags(getAllTagsReq);
  const tags = tagData?.data;

  const handleSuccess = () => {
    let msg = '创建文章成功';
    if (isEdit && id) {
      msg = '编辑文章成功';
    }

    navigate(ROUTE_PATH.ARTICLE_LIST);
    Message.success(msg);
  };

  const { mutateAsync: runCreateArticle, isLoading: createLoading } =
    useCreateArticle(handleSuccess);
  const { mutateAsync: updateArticle, isLoading: updateLoading } =
    useUpdateArticle(handleSuccess);

  const loading = createLoading || updateLoading;
  const isEdit = Boolean(id);
  const title = id ? '编辑文章' : '创建文章';
  const btnText = id ? '修改' : '创建';

  const { data: editArticleData, isLoading } = useArticle(id || '');
  const editArticle = editArticleData?.data;

  useEffect(() => {
    const resetForm = () => {
      form.resetFields();
      form.setFieldValue('is_published', true);
      setCover('');
    };

    const initEditArticleForm = () => {
      form.setFieldsValue(editArticle);
      if (editArticle?.cover) {
        setCover(editArticle.cover);
        form.setFieldValue('cover', genUploadItems([editArticle.cover]));
      }

      const tagIDs = editArticle?.tags?.map((tag) => tag.id);
      if (tagIDs) {
        form.setFieldValue('tag_ids', tagIDs);
      }
    };

    if (!isLoading && editArticle) {
      initEditArticleForm();
    } else {
      resetForm();
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
        onSubmit={(v) => {
          if (isEdit && id) {
            updateArticle({
              ...v,
              cover,
              id,
            });
          } else {
            runCreateArticle({
              ...v,
              cover,
            });
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
        <FormItem label="文章封面" field="cover" triggerPropName="fileList">
          <Upload
            imagePreview
            listType={'picture-card'}
            limit={1}
            accept="image/*"
            customRequest={async (option) => {
              const { onSuccess, file } = option;

              const fd = new FormData();
              fd.append('file', file);

              const res = await uploadFile(fd);
              if (res.code === CODE.ResponseCodeOk && res.data) {
                onSuccess({ url: res.data });
                setCover(res.data);
                Message.success('上传成功');
              } else {
                Message.error('上传失败');
              }
            }}
          />
        </FormItem>
        <FormItem label="是否置顶" field="is_top" triggerPropName="checked">
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
        <FormItem
          label="是否发布"
          field="is_published"
          triggerPropName="checked"
        >
          <Switch />
        </FormItem>
        <FormItem label="文章标签" field="tag_ids">
          <Checkbox.Group>
            {tags?.map((tag) => {
              return (
                <Checkbox key={tag.id} value={tag.id}>
                  {({ checked }) => {
                    return (
                      <Tag key={tag.id} color={checked ? 'arcoblue' : ''}>
                        {tag.name}
                      </Tag>
                    );
                  }}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
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
