import ChipStack from "@/app/components/ChipStack";
import { BaseGameBet } from "@/app/types";
import { useEffect } from "react";

const oneToOneNumbers = [3, 4, 9, 10, 11];
const twoToOneNumbers = [2, 12];
const allFieldNumbers = [...oneToOneNumbers, ...twoToOneNumbers].sort(
  (a, b) => a - b
);

/**
 * Field Bet
 * pays:
 * - 1:1 on 3, 4, 9, 10, 11
 * - 2:1 on 2, 12
 * loses:
 * - on 5, 6, 7, 8
 */
export default function FieldBet({
  bet,
  diceRoll,
  onLose,
  onWin,
}: BaseGameBet) {
  useEffect(() => {
    if (bet) {
      if (oneToOneNumbers.includes(diceRoll)) {
        onWin?.(bet);
      } else if (twoToOneNumbers.includes(diceRoll)) {
        onWin?.(bet * 2);
      } else {
        onLose?.(bet);
      }
    }
  }, [diceRoll]);

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
        {allFieldNumbers.map((elm) => (
          <div key={`fieldnum_${elm}`}>{elm}</div>
        ))}
      </div>
      <ChipStack bet={bet} />
    </>
  );
}
