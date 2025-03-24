interface PriceTagProps {
  name: string;
  price: number;
}

export default function PriceTag({ name, price }: PriceTagProps) {
  return (
    <div className="box-border w-[74.25mm] h-[52.5mm] p-2 border flex flex-col items-center justify-center relative bg-price bg-contain bg-center">
      <div className="absolute leading-none top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22px] font-bold text-pink w-[70%] text-center">
        {name}
      </div>
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26px] font-extrabold text-orange font-rotondac">
        {price.toFixed(2)}
      </div>
      <div className="absolute bottom-[0.7mm] right-[1mm] text-[10px] text-white">
        ООО Дабл Уай
      </div>
    </div>
  );
}
