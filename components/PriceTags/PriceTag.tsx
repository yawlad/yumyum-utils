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
    <PriceTagFrame isDiscount={Boolean(priceWithoutDiscount != price && priceWithoutDiscount)}>
      {spicyLevel == 0 || spicyLevel ? (
        <div className="absolute left-1/2 top-[7.5mm] -translate-x-1/2 -translate-y-1/2">
          <SpicyLevelRow level={spicyLevel} />
        </div>
      ) : (
        ""
      )}
      <div className="absolute leading-none top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold text-pink w-[80%] text-center">
        {name}
      </div>
      <div
        className={clsx(
          "absolute bottom-[6mm] right-[10mm] text-[28px] font-extrabold text-orange font-rotondac",
          {
            "flex gap-2 justify-center items-center": priceWithoutDiscount,
          }
        )}
      >
        {priceWithoutDiscount && priceWithoutDiscount != price ? (
          <span className="text-[18px] line-through">
            {priceWithoutDiscount.toFixed(2)}
          </span>
        ) : (
          ""
        )}

        <span>{price.toFixed(2)}</span>
      </div>
    </PriceTagFrame>
  );
}
