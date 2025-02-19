"use client"

import Link from "next/link";
import { useState } from "react";

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
      try {
        const data = JSON.parse(e.target?.result as string);
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при разборе JSON", error);
      }
    };
    reader.readAsText(file);
  };

  const printSection = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input type="file" accept=".json" onChange={handleFileUpload} className="p-2 border rounded" />
      <button onClick={printSection} className="px-4 py-2 bg-blue-500 text-white rounded print:hidden">Печать</button>
      <Link href="/" className="text-blue-500 print:hidden">Назад</Link>
      <div className="flex flex-wrap justify-center w-[297mm] mx-auto action-sheet">
        {products.flatMap((product, index) => (
          Array.from({ length: product.quantity }).map((_, i) => (
            <div key={`${index}-${i}`} className="w-[20%] h-[21mm] p-2 border flex items-center justify-center text-lg font-bold text-center action-tag">
              {product.name}
            </div>
          ))
        ))}
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
