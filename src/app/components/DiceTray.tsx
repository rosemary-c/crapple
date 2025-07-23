import Image from "next/image";

interface DiceTrayProps {
  dices: [number, number];
  setDices: (dices: [number, number]) => void;
}

// returns value 1 - 6
const generateRandomDiceValue = () => Math.floor(Math.random() * 6) + 1;

/**
 * Dice Tray
 * - opposite of Come Bet
 */
export default function DiceTray({ dices, setDices }: DiceTrayProps) {
  return (
    <button
      className="flex"
      onClick={() => {
        setDices([generateRandomDiceValue(), generateRandomDiceValue()]);
      }}
    >
      <Image
        aria-hidden
        src={`/craps/dice-${dices[0]}.svg`}
        alt="File icon"
        width={26}
        height={26}
      />
      <Image
        aria-hidden
        src={`/craps/dice-${dices[1]}.svg`}
        alt="File icon"
        width={26}
        height={26}
      />
    </button>
  );
}
