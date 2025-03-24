interface PriceTagDiscountProps {
  name: string;
  price: number;
  discount: number;
}

export default function PriceTagDiscount({
  name,
  price,
  discount,
}: PriceTagDiscountProps) {
  return (
    <div className="box-border w-[74.25mm] h-[52.5mm] p-2 border flex flex-col items-center justify-center relative bg-price-discount bg-contain bg-center">
      <div className="absolute leading-none top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22px] font-bold text-pink w-[70%] text-center">
        {name}
      </div>
      <div className="flex gap-1 items-center absolute bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26px] font-extrabold text-orange font-rotondac">
        <span className="text-[20px] line-through">{price.toFixed(2)}</span>
        <span className="text-[32px]">{discount.toFixed(2)}</span>
      </div>
      <div className="absolute bottom-[0.7mm] right-[1mm] text-[10px] text-white">
        ООО Дабл Уай
      </div>
    </div>
  );
}
