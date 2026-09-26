import { create } from "zustand";
import {persist} from "zustand/middleware"

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; 
  }
};

export const useAuthStore = create(persist(
    (set)=> ({
        token: null,
        user: null,
        setAuth: (token, user)=> set({token, user}),

        logout: ()=>set({token: null, user: null})
    }),
    
    {
        name: "auth-storage",
        onRehydrateStorage: ()=> (state)=> {
            if(state?.token && isTokenExpired(state.token)) {
                state.logout()
            }
        }
    }

))