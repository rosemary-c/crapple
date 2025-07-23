import ComeBet, { ComeBetProps } from "@/app/components/ComeBet";

/**
 * Dont Come Bet
 * - opposite of Come Bet
 */
export default function DontComeBet(props: ComeBetProps) {
  return (
    <div>
      <ComeBet {...props} onLose={props.onWin} onWin={props.onLose} />
    </div>
  );
}
