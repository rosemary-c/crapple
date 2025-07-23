"use client";
import CasinoChipSet, { ChipType } from "@/app/components/CasinoChipSet";
import ComeBet from "@/app/components/ComeBet";
import DiceTray from "@/app/components/DiceTray";
import DontComeBet from "@/app/components/DontComeBet";
import FieldBet from "@/app/components/FieldBet";
import PlaceBet from "@/app/components/PlaceBet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function GameBoard() {
  const [point, setPoint] = useState<number>();
  const [bankRoll, setBankRoll] = useState(1000);
  const [amountInPlay, setAmountInPlay] = useState(0);
  const [selectedChip, setSelectedChip] = useState(ChipType.WHITE);
  const [dices, setDices] = useState<[number, number]>([3, 3]);

  const diceRoll = dices[0] + dices[1];

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Label htmlFor="bank-roll">Bank Roll</Label>
          <Input
            className="mt-2"
            id="bank-roll"
            type="number"
            onChange={(e) => {
              setBankRoll(parseInt(e.currentTarget.value));
            }}
            value={bankRoll}
          />
        </div>
        <div className="sm:col-span-3">
          <Label htmlFor="amount-in-play">Amount in Play</Label>
          <Input
            className="mt-2"
            id="amount-in-play"
            type="number"
            disabled
            value={amountInPlay}
          />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
        <div className="sm:col-span-6">
          <CasinoChipSet
            selectedChipType={selectedChip}
            onSelect={setSelectedChip}
          />
        </div>
        <div className="sm:col-span-1">
          <DiceTray dices={dices} setDices={setDices} />
        </div>
      </div>
      <hr className="mt-5" />
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-5">
          <PlaceBet diceRoll={diceRoll} selectedChipType={selectedChip} />
        </div>
        <div className="sm:col-span-1">
          <DontComeBet label="DONT COME" diceRoll={diceRoll} bet={100} />
        </div>
      </div>
      <div className="mt-5 flex">
        <div className="mx-auto">
          <ComeBet diceRoll={diceRoll} bet={100} />
        </div>
      </div>
      <FieldBet diceRoll={12} bet={60} />
      <div className="mt-5 flex">
        <div className="mx-auto">
          <DontComeBet label="DONT PASS BAR" diceRoll={diceRoll} bet={100} />
        </div>
      </div>
      <div className="mt-5 flex">
        <div className="mx-auto">
          <ComeBet label="PASSLINE" diceRoll={diceRoll} bet={100} />
        </div>
      </div>
    </div>
  );
}
