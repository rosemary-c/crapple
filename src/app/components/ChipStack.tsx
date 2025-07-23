import { CHIP_VALUES, ChipType } from "@/app/components/CasinoChipSet";
import { useEffect, useState } from "react";

interface ChipStackProps {
  bet?: number;
}
/**
 * ChipStack
 * - should render the shortest stack of chips as possible given the bet value
 */
export default function ChipStack({ bet }: ChipStackProps) {
  const [stack, setStack] = useState<ChipType[]>([]);

  useEffect(() => {
    if (bet) {
      const newStack: ChipType[] = [];
      for (const chipVal of CHIP_VALUES) {
        if (bet === 0) break;
        if (chipVal <= bet) {
          const count = Math.floor(bet / chipVal);
          bet -= count * chipVal;

          for (let i = 0; i < count; i++) {
            newStack.push(chipVal);
          }
        }
      }
      setStack(newStack.reverse());
    } else {
      setStack([]);
    }
  }, [bet]);

  return bet ? (
    <div>
      {stack.map((chipVal, i) => (
        <div key={`chipstack_${i}`}>{ChipType[chipVal]}</div>
      ))}
    </div>
  ) : undefined;
}
