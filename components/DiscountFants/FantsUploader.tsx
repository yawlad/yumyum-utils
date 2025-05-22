import * as XLSX from "xlsx";
import useMainStore from "@/stores/useMainStore"; // Adjust the import path

export default function FantsUploader() {
  const { clearFants, addFant } = useMainStore();

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
        Тип: number;
      }>(sheet);

      // Clear existing fants before adding new ones
      clearFants();

      // Add parsed fants to the store
      jsonData.forEach((row) => {
        addFant({
          name: row["Имя"],
          quantity: row["Количество"],
          type: row["Тип"],
        });
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadTemplate = () => {
    const XLSX = require("xlsx");
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Имя", "Количество", "Тип"],
      ["Пример", 1, 1],
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
