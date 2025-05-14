"use client";

import useMainStore from "@/stores/useMainStore";

const PriceTable = () => {
  const { products, updateProduct, removeProduct } = useMainStore();

  return (
    <table className="container border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Название</th>
          <th className="border p-2">Цена</th>
          <th className="border p-2">Цена без скидки</th>
          <th className="border p-2">Уровень остроты</th>
          <th className="border p-2">Действия</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="text-center">
            <td className="border p-2">
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  updateProduct(product.id, { name: e.target.value })
                }
                className="border-none w-full text-center"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  updateProduct(product.id, { price: Number(e.target.value) })
                }
                className="border-none w-full text-center"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                value={product.priceWithoutDiscount ?? ""}
                onChange={(e) =>
                  updateProduct(product.id, {
                    priceWithoutDiscount: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="border-none w-full text-center"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                min={0}
                max={5}
                value={product.spicyLevel ?? ""}
                onChange={(e) =>
                  updateProduct(product.id, {
                    spicyLevel: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="border-none w-full text-center"
              />
            </td>
            <td className="border p-2">
              <button
                onClick={() => removeProduct(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
