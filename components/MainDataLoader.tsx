"use client";
import mainStore from "@/stores/MainStore";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const MainDataLoader = observer(
  ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      mainStore.loadFromLocalStorage();
      setLoading(false);
      return () => {};
    }, []);

    return loading ? <>LOADING...</> : <>{children}</>;
  }
);

export default MainDataLoader;
