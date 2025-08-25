import { useState } from "react";
import useFantsStore from "@/stores/useFantsStore";

export default function FantsForm() {
  const { addFant } = useFantsStore();
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    type: "1",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.quantity) return;

    addFant({
      name: newProduct.name,
      quantity: parseInt(newProduct.quantity, 10),
      type: parseInt(newProduct.type, 10),
    });

    setNewProduct({ name: "", quantity: "", type: "1" });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Название"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Количество"
        value={newProduct.quantity}
        onChange={(e) =>
          setNewProduct({ ...newProduct, quantity: e.target.value })
        }
        className="border p-2 rounded"
      />
      <select
        value={newProduct.type}
        onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="1">Мелкий (Зелёный)</option>
        <option value="2">Средний (Оранжевый)</option>
        <option value="3">Большой (Красный)</option>
      </select>
      <button
        onClick={handleAddProduct}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Добавить
      </button>
    </div>
  );
}
