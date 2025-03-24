"use client";

import Link from "next/link";
import { useState } from "react";
import * as XLSX from "xlsx";

interface Product {
  id: number;
  name: string;
  quantity: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: "" });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<{
        Имя: string;
        Количество: number;
      }>(sheet);

      const parsedProducts = jsonData.map((row, index) => ({
        id: index + 1,
        name: row["Имя"],
        quantity: row["Количество"],
      }));

      setProducts(parsedProducts);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.quantity) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: newProduct.name,
        quantity: parseInt(newProduct.quantity, 10),
      },
    ]);
    setNewProduct({ name: "", quantity: "" });
  };

  const handleEditProduct = (
    id: number,
    field: keyof Product,
    value: string
  ) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              [field]: field === "quantity" ? parseInt(value, 10) || 0 : value,
            }
          : p
      )
    );
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Имя", "Количество"],
      ["Пример", 1],
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Шаблон");
    XLSX.writeFile(workbook, "template.xlsx");
  };

  const printSection = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Фанты для акций</h1>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="p-2 border rounded"
      />
      <button
        onClick={downloadTemplate}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Скачать шаблон
      </button>
      <button
        onClick={printSection}
        className="px-4 py-2 bg-blue-500 text-white rounded print:hidden"
      >
        Печать
      </button>
      <Link href="/" className="text-blue-500 print:hidden">
        Назад
      </Link>

      {/* Форма добавления нового фантика */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Название"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
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
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Добавить
        </button>
      </div>

      {/* Таблица редактирования фантиков */}
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Название</th>
            <th className="border p-2">Количество</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border p-2">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    handleEditProduct(product.id, "name", e.target.value)
                  }
                  className="border-none w-full text-center"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleEditProduct(product.id, "quantity", e.target.value)
                  }
                  className="border-none w-full text-center"
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Фанты для печати */}
      <div className="flex flex-wrap justify-center w-[297mm] mx-auto action-sheet">
        {products.flatMap((product) =>
          Array.from({ length: product.quantity }).map((_, i) => (
            <div
              key={`${product.id}-${i}`}
              className="w-[20%] h-[21mm] p-2 border flex items-center justify-center text-[16px] leading-none font-bold text-center action-tag"
            >
              {product.name}
            </div>
          ))
        )}
      </div>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .action-sheet, .action-sheet * {
              visibility: visible;
            }
            .action-sheet {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
