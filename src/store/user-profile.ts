import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/type/user';

type State = {
  user?: User;
};

type Action = {
  setUserProfile: (user?: User) => void;
  clearUserProfile: () => void;
};

export const useUserProfileStore = create<State & Action>()(
  persist(
    (set) => ({
      user: undefined,
      setUserProfile: (user?: User) => set(() => ({ user })),
      clearUserProfile: () => set(() => ({ user: undefined })),
    }),
    { name: 'user_profile' },
  ),
);
