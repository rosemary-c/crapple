import { ChipType } from "@/app/components/CasinoChipSet";

export interface BaseGameBet {
  diceRoll: number;
  selectedChipType: ChipType;
  onWin?: (payout: number) => void;
  onLose?: (payout: number) => void;
  onChangeBet?: (totalBet: number) => void;
}
