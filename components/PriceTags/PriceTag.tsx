import clsx from "clsx";
import PriceTagFrame from "./PriceTagFrame";
import SpicyLevelRow from "./SpicyLevelRow";

interface PriceTagProps {
  name: string;
  price: number;
  priceWithoutDiscount?: number;
  spicyLevel?: 0 | 1 | 2 | 3 | 4 | 5;
}

export default function PriceTag({
  name,
  price,
  priceWithoutDiscount,
  spicyLevel,
}: PriceTagProps) {
  return (
    <PriceTagFrame isDiscount={Boolean(priceWithoutDiscount)}>
      {spicyLevel == 0 || spicyLevel ? (
        <div className="absolute left-1/2 top-[8.5mm] -translate-x-1/2 -translate-y-1/2">
          <SpicyLevelRow level={spicyLevel} />
        </div>
      ) : (
        ""
      )}
      <div className="absolute leading-none top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22px] font-bold text-pink w-[80%] text-center">
        {name}
      </div>
      <div
        className={clsx(
          "absolute bottom-[7mm] right-[10mm] text-[32px] font-extrabold text-orange font-rotondac",
          {
            "flex gap-2 justify-center items-center": priceWithoutDiscount,
          }
        )}
      >
        {priceWithoutDiscount ? (
          <span className="text-[20px] line-through">
            {priceWithoutDiscount.toFixed(2)}
          </span>
        ) : (
          ""
        )}

        <span>{price.toFixed(2)}</span>
      </div>
      <div className="absolute bottom-[0.7mm] right-[1mm] text-[10px] text-white">
        ООО Дабл Уай
      </div>
    </PriceTagFrame>
  );
}
