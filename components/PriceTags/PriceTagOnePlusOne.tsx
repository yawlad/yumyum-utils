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
      <div className="absolute top-[7mm] left-1/2 -translate-x-1/2 text-[32px] font-bold text-pink w-fit">
        Yum&nbsp;Yum
      </div>
      <div className="absolute leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22px] font-bold text-pink w-[85%] text-center">
        {name}
      </div>
      <div className="absolute bottom-[6.5mm] right-[6.5mm] text-[28px] font-extrabold text-orange font-rotondac flex gap-2 items-center">
        {discount.toFixed(2)}
        <span className="text-[18px] line-through text-opacity-50">
          {price.toFixed(2)}
        </span>
      </div>
      <div className="absolute bottom-[0.7mm] right-[1mm] text-[10px] text-white">
        ООО Дабл Уай
      </div>
    </div>
  );
}
