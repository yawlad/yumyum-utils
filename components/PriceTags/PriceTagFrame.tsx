
import clsx from "clsx";
import React from "react";

interface PriceTagFrameProps {
  children: React.ReactNode;
  isDiscount?: boolean;
}

const PriceTagFrame = ({
  children,
  isDiscount = false,
}: PriceTagFrameProps) => {
  return (
    <div
      className={clsx(
        "box-border w-[74.25mm] h-[52.5mm] p-2 border flex flex-col items-center justify-center relative",
        {
          "bg-pink border-pink-b": isDiscount,
          "bg-orange border-orange-b": !isDiscount,
        }
      )}
    >
      <img
        src="./Price.svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90"
      />
      <div className="absolute top-0 left-0 w-full h-full">{children}</div>
    </div>
  );
};

export default PriceTagFrame;
