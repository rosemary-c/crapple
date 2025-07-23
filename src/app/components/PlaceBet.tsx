import clsx from "clsx";

import { ChipType } from "@/app/components/CasinoChipSet";
import { useEffect, useState } from "react";
import { BaseGameBet } from "@/app/types";
import ChipStack from "@/app/components/ChipStack";

interface PayoutMap {
  4: number;
  5: number;
  6: number;
  8: number;
  9: number;
  10: number;
}

export const placePayoutMap: PayoutMap = {
  4: 9 / 5, // what about buy bets?
  5: 7 / 5,
  6: 7 / 6,
  8: 7 / 6,
  9: 7 / 5,
  10: 9 / 5, // what about buy bets?
};

export const buyPayoutMap: PayoutMap = {
  4: 2, // what about buy bets?
  5: 3 / 2,
  6: 6 / 5,
  8: 6 / 5,
  9: 3 / 2,
  10: 2, // what about buy bets?
};

interface PlaceBetProps extends BaseGameBet {
  selectedChipType: ChipType;
}

const PLACE_NUMBERS = [4, 5, 6, 8, 9, 10];

/**
 * Place Bets
 * wins: 4, 5, 6, 8, 9, 10
 *  - see payout
 * loses: 7
 */
export default function PlaceBet({
  diceRoll,
  selectedChipType,
  onLose,
  onWin,
}: PlaceBetProps) {
  const [placeBets, setPlaceBets] = useState(
    PLACE_NUMBERS.reduce((acc, num) => {
      acc[num] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  useEffect(() => {
    if (PLACE_NUMBERS.includes(diceRoll)) {
      const isBuyBet = placeBets[diceRoll] >= 20 ? 1 : 0;
      const payoutMap: PayoutMap = isBuyBet ? buyPayoutMap : placePayoutMap;
      const vig = isBuyBet * (placeBets[diceRoll] / 20);

      onWin?.(
        placeBets[diceRoll] * payoutMap[diceRoll as keyof PayoutMap] - vig
      );
    } else if (diceRoll === 7) {
      let totalBets = 0;
      for (const bet of Object.values(placeBets)) {
        totalBets += bet;
      }
      onLose?.(totalBets);
    }
  }, [diceRoll]);

  return (
    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      {PLACE_NUMBERS.map((placeNum) => (
        <button
          key={`placenum_${placeNum}`}
          onClick={() => {
            const newBets = { ...placeBets };
            newBets[placeNum] += selectedChipType;
            setPlaceBets(newBets);
          }}
          onContextMenu={() => setPlaceBets({ ...placeBets, [placeNum]: 0 })}
        >
          {placeNum}
          <ChipStack bet={placeBets[placeNum]} />
        </button>
      ))}
    </div>
  );
}
