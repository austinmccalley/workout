import { useLocalStore } from 'mobx-react';

export type Store = ReturnType<typeof useStore>;
export const useStore = () => {
  const store = useLocalStore(() => ({
  
  }));
  return store;
};
