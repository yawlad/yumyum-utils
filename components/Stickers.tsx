"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export default function PdfProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const processPdf = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      const pageTexts = new Map();
      const newPdf = await PDFDocument.create();

      for (let i = 0; i < pages.length; i++) {
        const copiedPage = await newPdf.copyPages(pdfDoc, [i]);
        const text = await pages[i].getTextContent();

        const pageText = text.items.map((item) => (item as any).str).join(" ");

        if (!pageTexts.has(pageText)) {
          pageTexts.set(pageText, true);
          newPdf.addPage(copiedPage[0]);
        }
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      saveAs(blob, "processed.pdf");
    } catch (error) {
      console.error("Ошибка обработки PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-lg font-semibold mb-2">
        Удаление дубликатов страниц PDF
      </h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={processPdf}
        disabled={!file || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Обработка..." : "Удалить дубликаты"}
      </button>
    </div>
  );
}
