"use client";
import * as XLSX from "xlsx";
import React from "react";
import useMainStore from "@/stores/useMainStore";

export default function PriceUploader() {
  const { addProduct } = useMainStore();

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
        "Цена без скидки": number;
        Острота: number;
      }>(sheet);

      jsonData.forEach((row) => {
        addProduct({
          name: row["Имя"].replace(/\s*\(поставка\s*\d+\)\s*/gi, "").trim(),
          price: row["Цена"],
          priceWithoutDiscount: row["Цена без скидки"] || undefined,
          spicyLevel:
            row["Острота"] || row["Острота"] === 0 ? row["Острота"] : undefined,
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Имя", "Цена", "Цена без скидки", "Острота"],
      ["Пример", 1, 2, 0],
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Шаблон");
    XLSX.writeFile(workbook, "template.xlsx");
  };

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}
