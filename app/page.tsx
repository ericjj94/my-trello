import Link from "next/link";
import { IBoard } from "./models/boards";

async function getUserBoards() {
  try {
    const response = await fetch("http://localhost:8080/api/boards", {
      cache: "no-store", // Don't cache - always get fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch boards");
    }

    const data = await response.json();
    return { success: true, boards: data };
  } catch (error) {
    console.error("Error fetching boards:", error);
    return { success: false, boards: [] };
  }
}

export default async function Home() {
  const data = await getUserBoards();

  const hasBoard = data.success && data.boards && data.boards.length > 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans light:bg-white">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white light:bg-white sm:items-start">
        {hasBoard ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-black">Your Boards</h1>
            <div className="d-flex aligncenter gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.boards.map((board: IBoard) => (
                <div
                  key={board.id}
                  className="p-4 border rounded-lg hover:shadow-lg bg-grey light:bg-grey"
                >
                  <h2 className="font-semibold text-black">{board.name}</h2>
                  <Link
                    href={`/boards/${board.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View board →
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/kanban" className="text-blue-600 hover:underline">
              + Create another board
            </Link>
          </div>
        ) : (
          <div>
            <span className="text-black">You do not have any selected templates. </span>
            <Link href="/kanban" className="text-blue-600 hover:underline">
              Click to add a kanban template
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
