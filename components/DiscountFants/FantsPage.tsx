"use client";

import { useEffect } from "react";
import useFantsStore from "@/stores/useFantsStore";
import FantsActions from "./FantsActions";
import FantsForm from "./FantsForm";
import FantsSheet from "./FantsSheet";
import FantsTable from "./FantsTable";
import FantsUploader from "./FantsUploader";

export default function DiscountsPage() {
  const { loadFromLocalStorage } = useFantsStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Фанты для акций</h1>
      <FantsUploader />
      <FantsActions />
      <FantsForm />
      <FantsTable />
      <FantsSheet />
    </div>
  );
}
