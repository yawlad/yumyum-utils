"use client";

import { useEffect } from "react";
import useMainStore from "@/stores/useMainStore";
import PriceUploader from "@/components/PriceTags/PriceUploader";
import PriceActions from "@/components/PriceTags/PriceActions";
import PriceForm from "@/components/PriceTags/PriceForm";
import PriceTable from "@/components/PriceTags/PriceTable";
import PriceSheet from "@/components/PriceTags/PriceSheet";

export default function PriceTagPage() {
  const { loadFromLocalStorage } = useMainStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Ценники</h1>

      <PriceUploader />
      <PriceActions />
      <PriceForm />
      <PriceTable />
      <PriceSheet />
    </div>
  );
}
