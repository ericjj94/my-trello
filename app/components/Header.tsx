import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full border-b bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">MyApp</span>
          </Link>
        </div>

        <div className="flex flex-1 justify-center px-4">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center flex-shrink-0">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
            <span className="sr-only">User menu</span>
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
