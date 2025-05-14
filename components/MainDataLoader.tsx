"use client";

import useMainStore from "@/stores/useMainStore";
import { useEffect, useState } from "react";

const MainDataLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuth, loadFromLocalStorage } = useMainStore();

  useEffect(() => {
    loadFromLocalStorage();
    setLoading(false);
    return () => {};
  }, []);

  return loading ? <>LOADING...</> : <>{children}</>;
};

export default MainDataLoader;
