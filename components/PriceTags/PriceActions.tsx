"use client";
import useMainStore from "@/stores/useMainStore";
import Link from "next/link";

export default function PriceActions() {
  const { clearProducts, products } = useMainStore();

  const printSection = () => {
    window.print();
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        onClick={printSection}
        className="px-4 py-2 bg-blue-500 text-white rounded print:hidden"
      >
        Печать
      </button>
      <button
        onClick={clearProducts}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Очистить
      </button>
      <div className="px-4 py-2 bg-gray-700 text-white rounded">
        {products.length}
      </div>
      <Link href="/" className="text-blue-500 print:hidden">
        На главную
      </Link>
    </div>
  );
}
