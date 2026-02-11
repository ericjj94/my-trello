"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleBoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState({ id: "", name: "" });

  useEffect(() => {
    fetch(`/api/boards/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Board data for a single item:", data);
        setBoard(data);
      })
      .catch((error) => {
        console.error("Error fetching board data:", error);
      });
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Board Details</h1>
      <p className="text-white">Board ID: {board.id}</p>
      <p className="text-white">Board Name: {board.name}</p>
    </div>
  );
};
export default SingleBoardPage;
