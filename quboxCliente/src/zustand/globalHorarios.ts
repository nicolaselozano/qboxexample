import { create } from 'zustand'
import defaultData from "../data/horariosData.json";



const useStore = create((set) => ({
  horarios: defaultData,
  hoarios: () => set((state:any) => ({ horarios:  })),
}))