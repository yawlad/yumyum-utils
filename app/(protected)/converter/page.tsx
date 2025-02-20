"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const sellers = [
  {
    name_seller: "ИП Белов Владислав Олегович",
    address_seller:
      "692512, Приморский край, г. Уссурийск, ул. Крестьянская, д. 17, кв. 42",
    country_seller: "643",
    id_seller: "251114511209",
  },
  {
    name_seller: "ИП Андреевская Юлия Евгеньевна",
    address_seller:
      "630112, обл. Новосибирская, г. Новосибирск, ул. Кошурникова, д. 10, кв. 138",
    country_seller: "643",
    id_seller: "540123395982",
  },
];

export default function ExcelToXmlConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedSeller, setSelectedSeller] = useState(sellers[0]);
  const [declNum, setDeclNum] = useState("");
  const [declDate, setDeclDate] = useState("");
  const [order, setOrder] = useState("");
  const [numSpec, setNumSpec] = useState("");
  const [dateSpec, setDateSpec] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(
        worksheet,
        { defval: "" }
      );

      const xmlString = generateXml(jsonData);
      const blob = new Blob([xmlString], { type: "application/xml" });
      saveAs(blob, "output.xml");
    };
    reader.readAsArrayBuffer(file);
  };

  const generateXml = (data: Record<string, string>[]) => {
    let xml = `<?xml version="1.0" encoding="Windows-1251"?>\n`;
    xml += `<registry_document decl_num="${declNum}" decl_date="${declDate}" version_reason_id="1" id_seller="${selectedSeller.id_seller}" name_seller="${selectedSeller.name_seller}" address_seller="${selectedSeller.address_seller}" country_seller="${selectedSeller.country_seller}" id_buyer="193808810" name_buyer="ООО \"Дабл Уай\"" country_buyer="112" address_buyer="РБ" num_contract_1="317" date_contract_1="2024-12-12" leasing="false" processing="false" decl_head_name="Гришилов В.В." decl_head_date="2025-01-31" tax_department="ИМНС Московского района г.Минска">\n`;
    xml += `<spec_05 order="${order}" num_spec="${numSpec}" date_spec="${dateSpec}"/>\n`;

    data.forEach((row, index) => {
      xml += `<commodity order="${index + 1}" comm_name="${
        row["Наименование товара"] || ""
      }" unit_meas_id="796" comm_count="${
        row["Количество товара"] || ""
      }" comm_price="${row["Стоимость товара (работы)"] || ""}" currency="${
        row["Валюта код"] || ""
      }" rate="${row["Валюта курс"] || ""}" invoice_num="${
        row["Счет-фактура номер"] || ""
      }" invoice_date="${row["Счет-фактура дата"] || ""}" accepting_date="${
        row["Дата принятия на учет товара"] || ""
      }" nds_base="${row["Налоговая база НДС"] || ""}" nds_perc="${
        row["Ставки налога НДС"] || ""
      }" nds_sum="${row["Суммы налогов НДС"] || ""}">\n`;

      if (
        row["Транспортный (товаросопроводительный) документ серия, номер"] ||
        row["Транспортный (товаросопроводительный) документ дата"]
      ) {
        xml += `<transdocs transdoc_serie="${
          row["Транспортный (товаросопроводительный) документ серия, номер"] ||
          ""
        }" transdoc_date="${
          row["Транспортный (товаросопроводительный) документ дата"] || ""
        }"/>\n`;
      }
      xml += `</commodity>\n`;
    });

    xml += `</registry_document>`;
    return xml;
  };

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "Наименование товара",
        "Код товара ТН ВЭД",
        "Единица измерения товара",
        "Количество товара",
        "Стоимость товара (работы)",
        "Валюта код",
        "Валюта курс",
        "Транспортный (товаросопроводительный) документ серия, номер",
        "Транспортный (товаросопроводительный) документ дата",
        "Счет-фактура номер",
        "Счет-фактура дата",
        "Дата принятия на учет товара",
        "Налоговая база акцизов",
        "Налоговая база НДС",
        "Ставки налога акцизов твердые (специфические)",
        "Ставки налога акцизов адвалорные",
        "Ставки налога НДС",
        "Суммы налогов акцизов",
        "Суммы налогов НДС",
      ],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "template.xlsx");
  };

  return (
    <div className="flex flex-col items-start text-center gap-1 p-4 max-w-80 m-auto border mt-6">
      <h1 className="text-3xl font-bold mb-4 text-center w-full">Конвертер</h1>
      <label>Выберите поставщика:</label>
      <select
        onChange={(e) => setSelectedSeller(sellers[parseInt(e.target.value)])}
        className="block w-full border p-1"
      >
        {sellers.map((seller, index) => (
          <option key={index} value={index}>
            {seller.name_seller}
          </option>
        ))}
      </select>
      <label>Номер декларации:</label>
      <input
        type="text"
        value={declNum}
        onChange={(e) => setDeclNum(e.target.value)}
        className="block w-full border p-1"
      />
      <label>Дата декларации:</label>
      <input
        type="date"
        value={declDate}
        onChange={(e) => setDeclDate(e.target.value)}
        className="block w-full border p-1"
      />
      <label>Номер заказа:</label>
      <input
        type="number"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="block w-full border p-1"
      />
      <label>Номер спецификации:</label>
      <input
        type="number"
        value={numSpec}
        onChange={(e) => setNumSpec(e.target.value)}
        className="block w-full border p-1"
      />
      <label>Дата спецификации:</label>
      <input
        type="date"
        value={dateSpec}
        onChange={(e) => setDateSpec(e.target.value)}
        className="block w-full border p-1"
      />
      <label>Продукты:</label>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Конвертировать
      </button>
      <button
        onClick={handleDownloadTemplate}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Скачать шаблон для продуктов
      </button>
    </div>
  );
}
