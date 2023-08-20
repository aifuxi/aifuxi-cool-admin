export type Tag = {
  id: string;
  name: string;
  friendly_url: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

export type CreateTagRequest = {
  name: string;
  friendly_url: string;
};

export type UpdateTagRequest = Partial<CreateTagRequest>;
