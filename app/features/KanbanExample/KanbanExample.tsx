"use client";

import { useState } from "react";
import ColumnTitleModal from "../../features/ColumnTitleModal/ColumnTitleModal";

export default function KanbanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardColumns, setBoardColumns] = useState<string[]>([]);

  const handleSaveColumns = (titles: string[]) => {
    setBoardColumns(titles);
    console.log("Saved columns:", titles);
    // Here you can save to database or state management
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Kanban Board</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            + Create New Board
          </button>
        </div>

        {/* Display Board Columns */}
        {boardColumns.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {boardColumns.map((column, index) => (
              <div key={index} className="min-w-[300px] bg-white rounded-lg shadow p-4">
                <h2 className="font-bold text-lg text-gray-800 mb-4">{column}</h2>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-500">
                    No cards yet
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No board created yet</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first board →
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ColumnTitleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveColumns}
      />
    </div>
  );
}
