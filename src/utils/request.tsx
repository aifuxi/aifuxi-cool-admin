import { Message } from '@arco-design/web-react';
import axios from 'axios';

import { CODE } from '@/constants/code';
import { ROUTE_PATH } from '@/constants/path';
import { REDIRECT } from '@/constants/unknow';

import { getBearerToken } from './helper';
import { obj2QueryString } from './url';

export const x = axios.create({
  baseURL: '/admin/api',
});

x.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.url?.includes('/auth')) {
      config.headers.Authorization = getBearerToken();
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
x.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.code !== CODE.Ok) {
      Message.error(response.data.msg);

      if (response.data.code === CODE.NoAuthorized) {
        const query = obj2QueryString({ [REDIRECT]: location.pathname });
        location.href = `${ROUTE_PATH.LOGIN}${query}`;
      }

      return Promise.reject(new Error(response.data.msg));
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
