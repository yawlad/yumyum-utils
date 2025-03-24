"use client";

import PriceTag from "@/components/PriceTags/PriceTag";
import PriceTagDiscount from "@/components/PriceTags/PriceTagDiscount";
import Link from "next/link";
import { useState } from "react";
import * as XLSX from "xlsx";

interface Product {
  name: string;
  price: number;
  discount?: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

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
        .filter(
          (el) => el["Количество"] != 0 && !el["Имя"].includes("поставка")
        )
        .map((row) => ({
          name: row["Имя"],
          price: row["Цена"],
          discount: row["Скидка"],
        }));

      setProducts(parsedProducts);
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Имя", "Цена"],
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
      <div
        id="price-sheet"
        className="flex flex-wrap w-[297mm] mx-auto font-arista"
      >
        {products.map((product, index) =>
          product.discount ? (
            <PriceTagDiscount
              key={index}
              name={product.name}
              price={product.price}
              discount={product.discount}
            />
          ) : (
            <PriceTag key={index} name={product.name} price={product.price} />
          )
        )}{" "}
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
