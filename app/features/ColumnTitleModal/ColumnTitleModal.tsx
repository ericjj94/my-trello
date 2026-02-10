"use client";

import { useState } from "react";

interface ColumnTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (titles: string[]) => void;
}

export default function ColumnTitleModal({ isOpen, onClose, onSave }: ColumnTitleModalProps) {
  const [titles, setTitles] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      setTitles([...titles, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    setTitles(titles.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(titles);
    setTitles([]);
    setInputValue("");
    onClose();
  };

  const handleCancel = () => {
    setTitles([]);
    setInputValue("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Create Kanban Columns</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Input Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter column title (e.g., To Do, In Progress)"
              className="flex-1 px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <span className="text-xl">+</span>
              Add
            </button>
          </div>

          {/* Display Added Titles */}
          {titles.length > 0 && (
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Column Titles ({titles.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {titles.map((title, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 group hover:border-gray-300 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{title}</span>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove column"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview Section */}
          {titles.length > 0 && (
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-4">Board Preview</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {titles.map((title, index) => (
                  <div
                    key={index}
                    className="min-w-[200px] bg-white rounded-lg shadow-sm p-4 border-2 border-gray-200"
                  >
                    <h4 className="font-bold text-gray-700 mb-2">{title}</h4>
                    <div className="h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm">
                      Cards go here
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={titles.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Create Board
          </button>
        </div>
      </div>
    </div>
  );
}
