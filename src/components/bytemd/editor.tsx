import { Message } from '@arco-design/web-react';
import { Editor, type EditorProps } from '@bytemd/react';
import zh_Hans from 'bytemd/locales/zh_Hans.json';

import { CODE } from '@/constants/code';
import { uploadFile } from '@/services/upload';

import { plugins } from './config';

type Props = {
  value?: string;
  onChange?: (content: string) => void;
  editorProps?: Partial<EditorProps>;
};

const BytemdEditor: React.FC<Props> = ({ value, onChange, editorProps }) => {
  const handleUploadImages: EditorProps['uploadImages'] = async (files) => {
    const fd = new FormData();
    fd.append('file', files[0]);
    const res = await uploadFile(fd);

    console.log(res);
    

    if (res.code !== CODE.ResponseCodeOk || !res.data) {
      Message.error('上传图片失败');
      return [];
    }
    return [
      {
        url: res.data,
      },
    ];
  };

  return (
    <div id="aifuxi-content-editor">
      <Editor
        value={value || ''}
        plugins={plugins}
        placeholder="请输入内容..."
        onChange={onChange}
        uploadImages={handleUploadImages}
        locale={zh_Hans}
        {...editorProps}
      />
    </div>
  );
};

export default BytemdEditor;
