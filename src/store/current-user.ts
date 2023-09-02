import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/type/user';

type State = {
  user?: User;
  accessToken?: string;
};

type Action = {
  setCurrentUser: (user?: User, accessToken?: string) => void;
  clearCurrentUser: () => void;
};

export const useCurrentUserStore = create<State & Action>()(
  persist(
    (set) => ({
      user: undefined,
      accessToken: undefined,
      setCurrentUser: (user?: User, accessToken?: string) =>
        set(() => ({ user, accessToken })),
      clearCurrentUser: () =>
        set(() => ({ user: undefined, accessToken: undefined })),
    }),
    { name: 'current_user' },
  ),
);
