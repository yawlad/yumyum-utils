import useMainStore from "@/stores/useMainStore"; // Adjust the import path
import FantsTag from "./FantsTag";

export default function FantsSheet() {
  const { fants } = useMainStore();

  return (
    <div>
      <div className="flex flex-wrap justify-center w-[297mm] mx-auto action-sheet">
        {fants.flatMap((fant: ProductForFant) =>
          Array.from({ length: fant.quantity }).map((_, i) => (
            <FantsTag
              name={fant.name}
              type={fant.type}
              index={i}
              fantId={i}
              key={i}
            />
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
