"use client";

import React, { ChangeEvent } from "react";
import { useStickersStore } from "@/stores/useStickersStore";
import Image from "next/image";

const mmToPx = (mm: number) => mm * 3.7795275591; // mm -> px примерное

export default function StickersPage() {
  const {
    images,
    format,
    sizeMM,
    gapMM,
    padMM,
    setFormat,
    setSizeMM,
    setGapMM,
    setPadMM,
    addImages,
    updateRepeat,
    removeImage,
  } = useStickersStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      addImages(Array.from(files));
    }
  };

  const paperSize =
    format === "A4" ? { width: 210, height: 297 } : { width: 148, height: 210 };

  const handlePrint = () => {
    const printContents = document.getElementById("print-area")?.innerHTML;
    if (!printContents) return;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    // Добавим минимальные стили для печати
    printWindow.document.write(`
      <html>
        <head>
          <title>Печать наклеек</title>
          <style>
            @media print {
              body {
                margin: 0;
                -webkit-print-color-adjust: exact;
              }
            }
            body {
              margin: 0;
              padding: 0;
            }
            img {
              page-break-inside: avoid;
              max-width: 100%;
              height: auto;
              object-fit: cover;
            }
          </style>
        </head>
        <body>
          <div>${printContents}</div>
          <script>
            window.onload = function() {
              window.focus();
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Создание наклеек</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block font-medium">Формат</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "A4" | "A5")}
            className="border p-2 rounded"
          >
            <option value="A4">A4 (210x297 мм)</option>
            <option value="A5">A5 (148x210 мм)</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Размер квадрата (мм)</label>
          <input
            type="number"
            value={sizeMM}
            onChange={(e) => setSizeMM(Number(e.target.value))}
            className="border p-2 rounded w-24"
          />
        </div>

        <div>
          <label className="block font-medium">Расстояние между (мм)</label>
          <input
            type="number"
            value={gapMM}
            onChange={(e) => setGapMM(Number(e.target.value))}
            className="border p-2 rounded w-24"
          />
        </div>

        <div>
          <label className="block font-medium">Отступы (мм)</label>
          <input
            type="number"
            value={padMM}
            onChange={(e) => setPadMM(Number(e.target.value))}
            className="border p-2 rounded w-24"
          />
        </div>

        <div>
          <label className="block font-medium">Загрузить изображения</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded w-64"
          />
        </div>

        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Печать листа наклеек
        </button>
      </div>

      {/* Grid Preview */}
      <div
        id="print-area"
        className="border mt-6 bg-white shadow-lg overflow-auto"
        style={{
          width: mmToPx(paperSize.width),
          height: mmToPx(paperSize.height),
          position: "relative",
          margin: "auto",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        {images
          .flatMap((img) =>
            Array(img.repeat)
              .fill(null)
              .map((_, i) => ({
                key: `${img.id}-${i}`,
                url: img.url,
              }))
          )
          .map((item, i) => {
            const colCount = Math.floor(
              (paperSize.width + gapMM) / (sizeMM + gapMM)
            );
            const x = i % colCount;
            const y = Math.floor(i / colCount);
            const left = mmToPx(x * (sizeMM + gapMM) + padMM);
            const top = mmToPx(y * (sizeMM + gapMM) + padMM);

            return (
              <img
                key={item.key}
                src={item.url}
                alt=""
                style={{
                  width: mmToPx(sizeMM),
                  height: mmToPx(sizeMM),
                  position: "absolute",
                  left,
                  top,
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            );
          })}
      </div>
      {/* Table */}
      {images.length > 0 && (
        <table className="w-full text-left border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Превью</th>
              <th className="p-2 border">Кол-во повторов</th>
              <th className="p-2 border">Удалить</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img.id}>
                <td className="p-2 border">
                  <Image
                    src={img.url}
                    alt="preview"
                    width={60}
                    height={60}
                    className="object-cover rounded"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    min={1}
                    value={img.repeat}
                    onChange={(e) =>
                      updateRepeat(img.id, Number(e.target.value))
                    }
                    className="border p-1 rounded w-20"
                  />
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => removeImage(img.id)}
                    className="text-red-500 hover:underline"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
