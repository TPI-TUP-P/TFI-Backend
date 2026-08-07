import {create} from "zustand";


// const ROLE_MAP = {
// candidato: 0,
// reclutador: 1
// };

const initialState = {
    initialEmail: '',
    selectedRole: "candidato"
}

export const useAuthLandingStore = create((set)=> ({
    ...initialState,
    

    // Setea el email, el rol o ambos según convenga
  setData: (data) =>
    set((state) => ({ ...state, ...data })),

    resetData: ()=> set(initialState)
}))