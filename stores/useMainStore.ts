import { create } from "zustand";

const users = [
  {
    login: "vlad",
    password: "vlad771",
    name: "Влад",
  },
  {
    login: "marina",
    password: "marina",
    name: "Марина",
  },
];

interface MainStore {
  name: string;
  isAuth: boolean;
  products: ProductForPrice[];
  fants: ProductForFant[]; // добавляем сюда

  logIn: (login: string, password: string) => void;
  logOut: () => void;
  loadFromLocalStorage: () => void;

  addProduct: (product: Omit<ProductForPrice, "id">) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, updates: Partial<ProductForPrice>) => void;
  clearProducts: () => void;

  addFant: (fant: Omit<ProductForFant, "id">) => void; // методы для fant
  removeFant: (id: number) => void;
  updateFant: (id: number, updates: Partial<ProductForFant>) => void;
  clearFants: () => void;
}

const useMainStore = create<MainStore>((set, get) => ({
  name: "",
  isAuth: false,
  products: [],
  fants: [],

  logIn: (login: string, password: string) => {
    const user = users.find(
      (user) => user.login === login && user.password === password
    );
    if (user) {
      set({ isAuth: true, name: user.name });
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: user.name,
          isAuth: true,
          products: get().products,
          fants: get().fants,
        })
      );
    } else {
      alert("Неверный логин или пароль");
    }
  },

  logOut: () => {
    set({ name: "", isAuth: false });
    localStorage.setItem(
      "zustandData",
      JSON.stringify({
        name: "",
        isAuth: false,
        products: get().products,
        fants: get().fants,
      })
    );
  },

  loadFromLocalStorage: () => {
    const savedData = localStorage.getItem("zustandData");
    if (savedData) {
      const { name, isAuth, products, fants } = JSON.parse(savedData);
      set({ name, isAuth, products: products || [], fants: fants || [] });
    }
  },

  addProduct: (product: Omit<ProductForPrice, "id">) => {
    set((state) => {
      const newProduct: ProductForPrice = {
        ...product,
        id: state.products.length
          ? Math.max(...state.products.map((p) => p.id)) + 1
          : 1,
      };
      const updatedProducts = [...state.products, newProduct];
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: updatedProducts,
          fants: state.fants,
        })
      );
      return { products: updatedProducts };
    });
  },

  removeProduct: (id: number) => {
    set((state) => {
      const updatedProducts = state.products.filter(
        (product) => product.id !== id
      );
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: updatedProducts,
          fants: state.fants,
        })
      );
      return { products: updatedProducts };
    });
  },

  updateProduct: (id: number, updates: Partial<ProductForPrice>) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      );
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: updatedProducts,
          fants: state.fants,
        })
      );
      return { products: updatedProducts };
    });
  },

  clearProducts: () => {
    set((state) => {
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: [],
          fants: state.fants,
        })
      );
      return { products: [] };
    });
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
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: state.products,
          fants: updatedFants,
        })
      );
      return { fants: updatedFants };
    });
  },

  removeFant: (id: number) => {
    set((state) => {
      const updatedFants = state.fants.filter((fant) => fant.id !== id);
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: state.products,
          fants: updatedFants,
        })
      );
      return { fants: updatedFants };
    });
  },

  updateFant: (id: number, updates: Partial<ProductForFant>) => {
    set((state) => {
      const updatedFants = state.fants.map((fant) =>
        fant.id === id ? { ...fant, ...updates } : fant
      );
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: state.products,
          fants: updatedFants,
        })
      );
      return { fants: updatedFants };
    });
  },

  clearFants: () => {
    set((state) => {
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: state.products,
          fants: [],
        })
      );
      return { fants: [] };
    });
  },
}));

export default useMainStore;
