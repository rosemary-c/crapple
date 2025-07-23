import ChipStack from "@/app/components/ChipStack";
import { BaseGameBet } from "@/app/types";
import { useEffect, useState } from "react";

export interface ComeBetProps extends BaseGameBet {
  point?: number;
  label?: string;
}

/**
 * Come Bet
 * if comeout
 *  wins: 7, 11
 *  loses: 2, 3, 12
 * else
 *  wins: on point
 *  loses: 7
 */
export default function ComeBet({
  selectedChipType,
  diceRoll,
  label = "COME",
  onLose,
  onWin,
  point,
}: ComeBetProps) {
  const [bet, setBet] = useState(0);
  useEffect(() => {
    if (bet) {
      if (point) {
        if (diceRoll === 7) {
          onLose?.(bet);
        } else if (diceRoll === point) {
          onWin?.(bet);
        }
      } else {
        // comeout
        if ([7, 11].includes(diceRoll)) {
          onWin?.(bet);
        } else if ([2, 3, 12].includes(diceRoll)) {
          onLose?.(bet);
        }
      }
    }
  }, [diceRoll]);

  return (
    <div>
      {label}
      <ChipStack bet={bet} />
    </div>
  );
}
