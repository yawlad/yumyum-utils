"use client";
import AccountInfo from "@/components/AccountInfo";
import LoginForm from "@/components/LoginForm";
import mainStore from "@/stores/MainStore";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {mainStore.isAuth ? <AccountInfo /> : <LoginForm />}
    </div>
  );
});

export default Home;
