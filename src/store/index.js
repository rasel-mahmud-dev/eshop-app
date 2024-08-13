import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      auth: null,
      authLoaded: false,
      setAuth: (val) => set({ auth: val, authLoaded: true }),
      updateAuth: (val) => set((state) => ({ ...state, auth: { ...state.auth, ...val } })),
    }),
    {
      name: "auth-store-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useCategoryStore = create(
  persist(
    (set, get) => ({
      subCategories: {},
      categories: null,
      parentCategories: null,
      allDbCategories: [],
      setAllDbCategories: (val) => set((state) => ({ ...state, allDbCategories: val })),
      setParentCategories: (val) => set((state) => ({ ...state, parentCategories: val })),
      setSubCategories: (parentId, val) => set((state) => ({
        ...state, subCategories: {
          ...state.subCategories,
          [parentId]: val,
        },
      })),
      setCategories: (val) => set((state) => ({ ...state, categories: val })),
    }),
    {
      name: "categories-store-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useUsersStore = create(
  persist(
    (set, get) => ({
      users: [],
      setUsers: (val) => set({ users: val }),
    }),
    {
      name: "users-store-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useScrollPosition = create(
  (set, get) => ({
    position: {
      "user_list": 0,
    },
    setPosition: (name, y) => set((s) => ({
      position: {
        ...s,
        [name]: y,
      },
    })),
  }),
);

export const usePromptStore = create(
  (set, get) => ({
    position: "",
    openIds: [],
    setOpen: (openId) => set((s) => ({
      ...s,
      openIds: [openId],
    })),
    setClose: (openId) => set((s) => ({
      ...s,
      openIds: s.openIds.filter(el => el !== openId),
    })),
  }),
);
