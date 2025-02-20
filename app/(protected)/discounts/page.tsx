"use client";

import Link from "next/link";
import { useState } from "react";
import * as XLSX from "xlsx";

interface Product {
  name: string;
  quantity: number;
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
        Количество: number;
      }>(sheet);

      const parsedProducts = jsonData.map((row) => ({
        name: row["Имя"],
        quantity: row["Количество"],
      }));

      setProducts(parsedProducts);
    };
    reader.readAsArrayBuffer(file);
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
      <div className="flex flex-wrap justify-center w-[297mm] mx-auto action-sheet">
        {products.flatMap((product, index) =>
          Array.from({ length: product.quantity }).map((_, i) => (
            <div
              key={`${index}-${i}`}
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
