"use client";
import mainStore from "@/stores/MainStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = observer(({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    if (!mainStore.isAuth) {
      router.push("/");
    }
    return () => {};
  }, []);

  return mainStore.isAuth ? <>{children}</> : <></>;
});

export default Layout;
