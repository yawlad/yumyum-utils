"use client";
import useMainStore from "@/stores/useMainStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuth = useMainStore((state) => state.isAuth);

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
    return () => {};
  }, [isAuth, router]);

  return isAuth ? <>{children}</> : <></>;
};

export default Layout;