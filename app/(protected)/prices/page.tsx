"use client";
import Link from "next/link";
import { useState } from "react";
interface Product {
  name: string;
  price: number;
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
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="p-2 border rounded"
      />
      <button
        onClick={printSection}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Печать
      </button>
      <Link href="/" className="text-blue-500">
        Назад
      </Link>
      <div id="price-sheet" className="flex flex-wrap w-[297mm] mx-auto font-arista">
        {products.map((product, index) => (
          <div
            key={index}
            className="box-border w-[74.25mm] h-[52.5mm] p-2 border flex flex-col items-center justify-center relative bg-price bg-contain bg-center"
          >
            <div className="absolute top-[7mm] left-1/2 -translate-x-1/2 text-[32px] font-bold text-pink w-fit">
              Yum&nbsp;Yum
            </div>
            <div className="absolute leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22px] font-bold text-pink w-[85%] text-center">
              {product.name}
            </div>
            <div className="absolute bottom-[6.5mm] right-[6.5mm] text-[28px] font-extrabold text-orange font-rotondac">
              {product.price.toFixed(2)}
            </div>
            <div className="absolute bottom-[0.7mm] right-[1mm] text-[10px] text-pink-light">
              ООО Дабл Уай
            </div>
          </div>
        ))}
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
          }
        `}
      </style>
    </div>
  );
}
