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

interface Product {
  id: number;
  name: string;
  price: number;
  priceWithoutDiscount?: number;
  spicyLevel?: number;
}

interface MainStore {
  name: string;
  isAuth: boolean;
  products: Product[];
  logIn: (login: string, password: string) => void;
  logOut: () => void;
  loadFromLocalStorage: () => void;
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  clearProducts: () => void;
}

const useMainStore = create<MainStore>((set, get) => ({
  name: "",
  isAuth: false,
  products: [],

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
      JSON.stringify({ name: "", isAuth: false, products: get().products })
    );
  },

  loadFromLocalStorage: () => {
    const savedData = localStorage.getItem("zustandData");
    if (savedData) {
      const { name, isAuth, products } = JSON.parse(savedData);
      set({ name, isAuth, products: products || [] });
    }
  },

  addProduct: (product: Omit<Product, "id">) => {
    set((state) => {
      const newProduct: Product = {
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
        })
      );
      return { products: updatedProducts };
    });
  },

  updateProduct: (id: number, updates: Partial<Product>) => {
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
        })
      );
      return { products: updatedProducts };
    });
  },

  clearProducts: () => {
    set((state) => {
      const clearedProducts: Product[] = [];
      localStorage.setItem(
        "zustandData",
        JSON.stringify({
          name: state.name,
          isAuth: state.isAuth,
          products: clearedProducts,
        })
      );
      return { products: clearedProducts };
    });
  },
}));

export default useMainStore;
