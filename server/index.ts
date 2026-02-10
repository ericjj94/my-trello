import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface Board {
  id: string;
  name: string;
  columns: string[];
  createdAt: string;
}

// Mock data fetching function - replace with actual DB call later
const fetchBoardsFromDB = (): Promise<Board[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data - replace with actual database query
      const boards: Board[] = [
        {
          id: "1",
          name: "My Project",
          columns: ["To Do", "In Progress", "Done"],
          createdAt: new Date().toISOString(),
        },
      ];
      resolve(boards);
    }, 500); // Simulating database delay
  });
};

// GET /api/boards - Get all boards for a user
app.get("/api/boards", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string; // Get userId from query params

    // For now, we ignore userId and return mock data
    const boards = await fetchBoardsFromDB();

    res.json({
      success: true,
      boards,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch boards",
    });
  }
});

// GET /api/boards/:id - Get a specific board
app.get("/api/boards/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Mock single board fetch
    const board: Board = {
      id,
      name: "My Project",
      columns: ["To Do", "In Progress", "Done"],
      createdAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      board,
    });
  } catch (error) {
    console.error("Error fetching board:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch board",
    });
  }
});

// POST /api/boards - Create a new board
app.post("/api/boards", async (req: Request, res: Response) => {
  try {
    const { name, columns, userId } = req.body;

    if (!name || !columns || !Array.isArray(columns)) {
      return res.status(400).json({
        success: false,
        error: "Name and columns array are required",
      });
    }

    // Mock board creation - replace with actual DB insert
    const newBoard: Board = {
      id: Date.now().toString(),
      name,
      columns,
      createdAt: new Date().toISOString(),
    };

    // Simulate async DB operation
    await new Promise((resolve) => setTimeout(resolve, 200));

    res.status(201).json({
      success: true,
      board: newBoard,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create board",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Boards API: http://localhost:${PORT}/api/boards`);
});

export default app;
