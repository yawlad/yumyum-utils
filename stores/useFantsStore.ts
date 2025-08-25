import { create } from "zustand";

interface FantsStore {
  fants: ProductForFant[]; // добавляем сюда

  loadFromLocalStorage: () => void;

  addFant: (fant: Omit<ProductForFant, "id">) => void; // методы для fant
  removeFant: (id: number) => void;
  updateFant: (id: number, updates: Partial<ProductForFant>) => void;
  clearFants: () => void;
}

const useFantsStore = create<FantsStore>((set, get) => ({
  fants: [],

  loadFromLocalStorage: () => {
    const savedData = localStorage.getItem("zustandData");
    if (savedData) {
      const { fants } = JSON.parse(savedData);
      set({ fants: fants || [] });
    }
  },

  // Методы для fants

  addFant: (fant: Omit<ProductForFant, "id">) => {
    set((state) => {
      const newFant: ProductForFant = {
        ...fant,
        id: state.fants.length
          ? Math.max(...state.fants.map((f) => f.id)) + 1
          : 1,
      };
      const updatedFants = [...state.fants, newFant];
      state.fants = updatedFants;
      localStorage.setItem("zustandData", JSON.stringify(state));
      return { fants: updatedFants };
    });
  },

  removeFant: (id: number) => {
    set((state) => {
      const updatedFants = state.fants.filter((fant) => fant.id !== id);
      state.fants = updatedFants;
      localStorage.setItem("zustandData", JSON.stringify(state));
      return { fants: updatedFants };
    });
  },

  updateFant: (id: number, updates: Partial<ProductForFant>) => {
    set((state) => {
      const updatedFants = state.fants.map((fant) =>
        fant.id === id ? { ...fant, ...updates } : fant
      );
      state.fants = updatedFants;
      localStorage.setItem("zustandData", JSON.stringify(state));
      return { fants: updatedFants };
    });
  },

  clearFants: () => {
    set((state) => {
      state.fants = [];
      localStorage.setItem("zustandData", JSON.stringify(state));
      return { fants: [] };
    });
  },
}));

export default useFantsStore;
