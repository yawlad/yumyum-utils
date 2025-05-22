import Link from "next/link";
import useMainStore from "@/stores/useMainStore"; // Adjust the import path

export default function FantsActions() {
  const { clearFants, fants } = useMainStore();

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
        onClick={clearFants}
        className="px-4 py-2 bg-red-500 text-white rounded print:hidden"
      >
        Очистить таблицу
      </button>
      <div className="px-4 py-2 bg-gray-700 text-white rounded">
        {fants.length}
      </div>
      <Link href="/" className="text-blue-500 print:hidden">
        На главную
      </Link>
    </div>
  );
}
