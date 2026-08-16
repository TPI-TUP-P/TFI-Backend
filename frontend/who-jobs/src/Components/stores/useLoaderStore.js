import { create } from 'zustand';

export const useLoaderStore = create((set) => ({
  activeRequests: 0,
  showLoader: () =>
    set((state) => ({ activeRequests: state.activeRequests + 1 })),
  hideLoader: () =>
    set((state) => ({ activeRequests: Math.max(0, state.activeRequests - 1) })),
}));