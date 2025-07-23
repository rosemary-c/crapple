import clsx from "clsx";

export enum ChipType {
  WHITE = 1,
  RED = 5,
  GREEN = 25,
  BLACK = 100,
  PURPLE = 500,
}

export const CHIP_VALUES = Object.values(ChipType)
  .filter((chip) => typeof chip === "number")
  .sort((a, b) => b - a);

interface CasinoChipSetProps {
  onSelect: (chip: ChipType) => void;
  selectedChipType: ChipType;
}

/**
 *
 */
export default function CasinoChipSet({
  onSelect,
  selectedChipType,
}: CasinoChipSetProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
      {Object.values(ChipType)
        .filter((v) => typeof v === "number")
        .map((value) => (
          <button
            key={`chiptype_${value}`}
            className={clsx(
              `bg-${ChipType[value].toLowerCase()}-500`,
              selectedChipType === value &&
                "font-bold border-gray-700 border-2",
              "sm:col-span-1 border-1 rounded-full",
              value === 1 && "bg-white",
              value === 100 && "bg-black text-white"
            )}
            onClick={() => onSelect(value as ChipType)}
          >
            {value}
          </button>
        ))}
    </div>
  );
}
