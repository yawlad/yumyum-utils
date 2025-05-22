import useMainStore from "@/stores/useMainStore"; // Adjust the import path

export default function FantsSheet() {
  const { fants } = useMainStore();

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
    <div>
      <div className="flex flex-wrap justify-center w-[297mm] mx-auto action-sheet">
        {fants.flatMap((fant: ProductForFant) =>
          Array.from({ length: fant.quantity }).map((_, i) => (
            <div
              key={`${fant.id}-${i}`}
              className={`w-[20%] h-[21mm] p-2 border flex items-center justify-center text-[16px] leading-none font-bold text-center action-tag ${getPrizeColor(
                fant.type
              )}`}
            >
              {fant.name}
            </div>
          ))
        )}
      </div>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .action-sheet, .action-sheet * {
              visibility: visible;
            }
            .action-sheet {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
