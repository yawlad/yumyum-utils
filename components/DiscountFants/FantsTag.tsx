interface FantTagProps {
  name: string;
  type: number;
  index: number;
  fantId: number;
}

export default function FantsTag({ name, type, index, fantId }: FantTagProps) {
  const getPrizeColor = (type: number) => {
    switch (type) {
      case 1:
        return "text-green-500"; // мелкий
      case 2:
        return "text-orange-500"; // средний
      case 3:
        return "text-red-500"; // большой
      default:
        return "text-gray-300";
    }
  };

  return (
    <div
      key={`${fantId}-${index}`}
      className={`w-[20%] h-[21mm] p-2 border flex items-center justify-center text-[16px] leading-none font-bold text-center action-tag ${getPrizeColor(
        type
      )}`}
    >
      {name}
    </div>
  );
}
