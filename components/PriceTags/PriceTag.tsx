interface PriceTagProps {
  name: string;
  price: number;
}

export default function PriceTag({ name, price }: PriceTagProps) {
  return (
    <div className="box-border w-[74.25mm] h-[52.5mm] p-2 border flex flex-col items-center justify-center relative bg-price bg-contain bg-center">
      <div className="absolute top-[7mm] left-1/2 -translate-x-1/2 text-[32px] font-bold text-pink w-fit">
        Yum&nbsp;Yum
      </div>
      <div className="absolute leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22px] font-bold text-pink w-[85%] text-center">
        {name}
      </div>
      <div className="absolute bottom-[6.5mm] right-[6.5mm] text-[28px] font-extrabold text-orange font-rotondac">
        {price.toFixed(2)}
      </div>
      <div className="absolute bottom-[0.7mm] right-[1mm] text-[10px] text-pink-light">
        ООО Дабл Уай
      </div>
    </div>
  );
}
