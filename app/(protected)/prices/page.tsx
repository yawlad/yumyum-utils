"use client";

import PriceTag from "@/components/PriceTags/PriceTag";
import PriceTagDiscount from "@/components/PriceTags/PriceTagDiscount";
import Link from "next/link";
import { useState } from "react";
import * as XLSX from "xlsx";

interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    discount: "",
  });

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
        Цена: number;
        Скидка: number;
        Количество: number;
      }>(sheet);

      const parsedProducts = jsonData
        .filter((el) => el["Количество"] !== 0)
        .map((row, index) => ({
          id: index + 1,
          name: row["Имя"].replace(/\s*\(поставка\s*\d+\)\s*/gi, "").trim(),
          price: row["Цена"],
          discount: row["Скидка"] || 0,
        }));

      setProducts(parsedProducts);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        discount: newProduct.discount ? parseFloat(newProduct.discount) : 0,
      },
    ]);
    setNewProduct({ name: "", price: "", discount: "" });
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
              [field]:
                field === "price" || field === "discount"
                  ? parseFloat(value) || 0
                  : value,
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
      ["Имя", "Цена", "Скидка"],
      ["Пример", 1, 0],
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Шаблон");
    XLSX.writeFile(workbook, "template.xlsx");
  };

  const printSection = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 ">
      <h1 className="text-3xl font-bold">Ценники</h1>
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

      {/* Форма добавления нового товара */}
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
          placeholder="Цена"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Скидка"
          value={newProduct.discount}
          onChange={(e) =>
            setNewProduct({ ...newProduct, discount: e.target.value })
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

      {/* Список товаров */}
      <table className="container border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Название</th>
            <th className="border p-2">Цена</th>
            <th className="border p-2">Скидка</th>
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
                  value={product.price}
                  onChange={(e) =>
                    handleEditProduct(product.id, "price", e.target.value)
                  }
                  className="border-none w-full text-center"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={product.discount}
                  onChange={(e) =>
                    handleEditProduct(product.id, "discount", e.target.value)
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

      {/* Ценники для печати */}
      <div
        id="price-sheet"
        className="flex flex-wrap w-[297mm] mx-auto font-arista"
      >
        {products.map((product) =>
          product.discount ? (
            <PriceTagDiscount
              key={product.id}
              name={product.name}
              price={product.price}
              discount={product.discount}
            />
          ) : (
            <PriceTag
              key={product.id}
              name={product.name}
              price={product.price}
            />
          )
        )}
      </div>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #price-sheet, #price-sheet * {
              visibility: visible;
            }
            #price-sheet {
              position: absolute;
              left: 0;
              top: 0;
              width: 297mm;
              display: flex;
              flex-wrap: wrap;
              overflow: hidden;
              page-break-before: avoid;
            }
          }
        `}
      </style>
    </div>
  );
}
