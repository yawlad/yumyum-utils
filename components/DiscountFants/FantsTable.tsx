import useFantsStore from "@/stores/useFantsStore";

export default function FantsTable() {
  const { fants, updateFant, removeFant } = useFantsStore();

  const handleEditProduct = (
    id: number,
    field: keyof ProductForFant,
    value: string
  ) => {
    updateFant(id, {
      [field]:
        field === "quantity" || field === "type"
          ? parseInt(value, 10) || 0
          : value,
    });
  };

  const handleDeleteProduct = (id: number) => {
    removeFant(id);
  };

  return (
    <table className="container border-collapse border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Название</th>
          <th className="border p-2">Количество</th>
          <th className="border p-2">Тип приза</th>
          <th className="border p-2">Действия</th>
        </tr>
      </thead>
      <tbody>
        {fants.map((fant: ProductForFant) => (
          <tr key={fant.id} className="text-center">
            <td className="border p-2">
              <input
                type="text"
                value={fant.name}
                onChange={(e) =>
                  handleEditProduct(fant.id, "name", e.target.value)
                }
                className="border-none w-full text-center"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                value={fant.quantity}
                onChange={(e) =>
                  handleEditProduct(fant.id, "quantity", e.target.value)
                }
                className="border-none w-full text-center"
              />
            </td>
            <td className="border p-2">
              <select
                value={fant.type}
                onChange={(e) =>
                  handleEditProduct(fant.id, "type", e.target.value)
                }
                className="w-full text-center"
              >
                <option value={1}>Мелкий</option>
                <option value={2}>Средний</option>
                <option value={3}>Большой</option>
              </select>
            </td>
            <td className="border p-2">
              <button
                onClick={() => handleDeleteProduct(fant.id)}
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
}
