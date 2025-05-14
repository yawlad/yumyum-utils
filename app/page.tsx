"use client";

import AccountInfo from "@/components/AccountInfo";
import LoginForm from "@/components/LoginForm";
import useMainStore from "@/stores/useMainStore";

const Home = () => {
  const { isAuth } = useMainStore();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {isAuth ? <AccountInfo /> : <LoginForm />}
    </div>
  );
};

export default Home;
