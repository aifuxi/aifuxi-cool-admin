import { Notification } from '@arco-design/web-react';
import axios from 'axios';

import { CODE } from '@/constants/code';
import { ROUTE_PATH } from '@/constants/path';
import { REDIRECT } from '@/constants/unknown';
import { useCurrentUserStore } from '@/store/current-user';

import { obj2QueryString } from './url';

export const x = axios.create({
  baseURL: '/admin-api',
});

x.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = useCurrentUserStore.getState().accessToken;
    if (config.url?.includes('/auth') && token) {
      config.headers.Authorization = token;
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
    if (response.data.code === CODE.ResponseCodeOk) {
      return response.data;
    }

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const needRedirectCode = [
      CODE.ResponseCodeInvalidToken,
      CODE.ResponseCodeNoAuthorized,
      CODE.ResponseCodeTokenExpired,
    ];

    Notification.error({
      title: 'Error',
      content: response.data.msg,
    });

    if (needRedirectCode.includes(response.data.code)) {
      useCurrentUserStore.getState().clearCurrentUser();

      window.setTimeout(() => {
        const query = obj2QueryString({ [REDIRECT]: location.pathname });
        location.href = `${ROUTE_PATH.LOGIN}${query}`;
      }, 1000);
    }

    return Promise.reject(new Error(response.data.msg));
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
