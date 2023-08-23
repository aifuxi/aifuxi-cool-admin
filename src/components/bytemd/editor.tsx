import { Editor, type EditorProps } from '@bytemd/react';
import zh_Hans from 'bytemd/locales/zh_Hans.json';

import { plugins } from './config';

type Props = {
  value?: string;
  onChange?: (content: string) => void;
  editorProps?: Partial<EditorProps>;
};

const BytemdEditor: React.FC<Props> = ({ value, onChange, editorProps }) => {
  const handleUploadImages: EditorProps['uploadImages'] = async () => {
    return [
      {
        url: '',
      },
    ];
  };

  return (
    <Editor
      value={value || ''}
      plugins={plugins}
      placeholder="请输入内容..."
      onChange={onChange}
      uploadImages={handleUploadImages}
      locale={zh_Hans}
      {...editorProps}
    />
  );
};

export default BytemdEditor;
