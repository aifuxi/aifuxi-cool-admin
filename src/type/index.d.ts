type SignInRequest = {
  email: string;
  password: string;
};
type SignInResponse = {
  access_token: string;
};

export type GeneralResponse<T> = {
  code: number;
  data?: T;
  msg?: string;
};

export type TotalResponse<T> = GeneralResponse<T> & {
  total: number;
};

export type PaginationRequest = {
  page: number;
  page_size: number;
};
