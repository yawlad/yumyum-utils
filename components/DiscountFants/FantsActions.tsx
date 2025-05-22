import Link from "next/link";
import useMainStore from "@/stores/useMainStore"; // Adjust the import path

export default function FantsActions() {
  const { clearFants } = useMainStore();

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

  const printSection = () => {
    window.print();
  };

  const handleClearTable = () => {
    clearFants();
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center">
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
      <button
        onClick={handleClearTable}
        className="px-4 py-2 bg-red-500 text-white rounded print:hidden"
      >
        Очистить таблицу
      </button>
      <Link href="/" className="text-blue-500 print:hidden">
        Назад
      </Link>
    </div>
  );
}
