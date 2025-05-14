
import React from "react";
import Flame from "./Flame";

interface SpicyLevelRowProps {
  level: 0 | 1 | 2 | 3 | 4 | 5;
}

const SpicyLevelRow = ({ level }: SpicyLevelRowProps) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }, (_, index) => (
        <Flame key={index} active={index < level} />
      ))}
    </div>
  );
};

export default SpicyLevelRow;
