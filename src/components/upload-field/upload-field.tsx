import React, { useEffect, useState } from 'react';

import { Message, Upload } from '@arco-design/web-react';

import { CODE } from '@/constants/code';
import { uploadFile } from '@/services/upload';

type Props = {
  value?: string;
  onChange?: (content?: string) => void;
};

type FileList = React.ComponentProps<typeof Upload>['fileList'];

const UploadField = ({ value, onChange }: Props) => {
  const [fileList, setFileList] = useState<FileList>();

  useEffect(() => {
    if (value) {
      setFileList([{ url: value, uid: value }]);
    }
  }, [value]);

  return (
    <Upload
      fileList={fileList}
      onChange={setFileList}
      imagePreview
      listType={'picture-card'}
      limit={1}
      accept="image/*"
      customRequest={async (option) => {
        const { onSuccess, file } = option;

        const fd = new FormData();
        fd.append('file', file);

        const res = await uploadFile(fd);
        if (res.code === CODE.Ok && res.data) {
          onSuccess({ url: res.data, uid: res.data });
          Message.success('上传成功');
          onChange?.(res.data);
        } else {
          Message.error('上传失败');
        }
      }}
    />
  );
};

export default UploadField;
