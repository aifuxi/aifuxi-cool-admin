import React from 'react';

import { TableColumnProps, type Upload } from '@arco-design/web-react';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { OrderRequest } from '@/type';

type UploadItems = React.ComponentProps<typeof Upload>['fileList'];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genBearerToken(token: string) {
  return `Bearer ${token}`;
}
export function getTableOrder(
  data: OrderRequest,
  orderBy: OrderRequest['order_by'],
): TableColumnProps['sortOrder'] {
  if (data.order_by !== orderBy) {
    return;
  }

  if (data.order === 'desc') {
    return 'descend';
  }
  if (data.order === 'asc') {
    return 'ascend';
  }

  return;
}

export function genUploadItems(urls?: string[]): UploadItems {
  return urls?.map((url) => ({ url, uid: url }));
}
