"use client";

import { useState } from "react";
import useMainStore from "@/stores/useMainStore";

const PriceForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    priceWithoutDiscount: "",
    spicyLevel: "",
  });
  const { addProduct } = useMainStore();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Название и цена обязательны");
      return;
    }

    addProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      priceWithoutDiscount: newProduct.priceWithoutDiscount
        ? Number(newProduct.priceWithoutDiscount)
        : undefined,
    });

    setNewProduct({
      name: "",
      price: "",
      priceWithoutDiscount: "",
      spicyLevel: "",
    });
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Название"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Цена"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Цена без скидки"
        value={newProduct.priceWithoutDiscount}
        onChange={(e) =>
          setNewProduct({ ...newProduct, priceWithoutDiscount: e.target.value })
        }
        className="border p-2 rounded"
      />
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Острота"
        value={newProduct.spicyLevel}
        onChange={(e) =>
          setNewProduct({ ...newProduct, spicyLevel: e.target.value })
        }
        className="border p-2 rounded"
      />
      <button
        onClick={handleAddProduct}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Добавить
      </button>
    </div>
  );
};

export default PriceForm;
