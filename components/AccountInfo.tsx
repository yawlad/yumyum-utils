"use client";

import useMainStore from "@/stores/useMainStore";
import Link from "next/link";

const AccountInfo = () => {
  const { name, logOut } = useMainStore();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        {`Привет, ${name}!`}
      </h2>
      <div className="flex flex-wrap gap-4 justify-evenly">
        <Link
          className="px-6 py-1 bg-gray-100 rounded-md shadow-md"
          href={"/discounts/"}
        >
          Акции
        </Link>
        <Link
          className="px-6 py-1 bg-gray-100 rounded-md shadow-md"
          href={"/prices/"}
        >
          Ценники
        </Link>
        <Link
          className="px-6 py-1 bg-gray-100 rounded-md shadow-md"
          href={"/converter/"}
        >
          Конвертер
        </Link>
      </div>
      <button
        className="w-full bg-red-500 text-white py-2 rounded-xl mt-4 hover:bg-red-600 transition"
        onClick={() => logOut()}
      >
        Выйти
      </button>
    </div>
  );
};

export default AccountInfo;
