import GameBoard from "@/app/components/GameBoard";

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen">
      <main className="flex flex-col items-center sm:items-start">
        <GameBoard />
      </main>
    </div>
  );
}
