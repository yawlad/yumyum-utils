"use client";
import useMainStore from "@/stores/useMainStore";
import PriceTag from "./PriceTag";

export default function PriceSheet() {
  const { products } = useMainStore();

  return (
    <>
      <div
        id="price-sheet"
        className="flex flex-wrap w-[297mm] mx-auto font-rotondac"
      >
        {products.map((product) => (
          <PriceTag
            key={product.id}
            name={product.name}
            price={product.price}
            priceWithoutDiscount={product.priceWithoutDiscount}
            spicyLevel={product.spicyLevel as any}
          />
        ))}
      </div>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #price-sheet, #price-sheet * {
              visibility: visible;
            }
            #price-sheet {
              position: absolute;
              left: 0;
              top: 0;
              width: 297mm;
              display: flex;
              flex-wrap: wrap;
              overflow: hidden;
              page-break-before: avoid;
            }
          }
        `}
      </style>
    </>
  );
}
