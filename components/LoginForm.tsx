"use client";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import mainStore from "../stores/MainStore";
import Link from "next/link";

const LoginForm = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login || !password) {
      setError("Введите логин и пароль");
      return;
    }
    setError("");
    mainStore.logIn(login, password);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Вход
      </h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl mt-4 hover:bg-blue-600 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
});

export default LoginForm;
