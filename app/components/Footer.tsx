import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-gray-800">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col items-center justify-center px-4 py-4 text-center sm:flex-row sm:space-x-4">
        {/* About Us */}
        <a href="/about" className="text-sm text-white-600 hover:text-blue-200">
          About Us
        </a>

        {/* Divider (only on larger screens) */}
        <span className="hidden sm:inline text-white-400">|</span>

        {/* Copyright */}
        <p className="text-sm text-white-500">
          © {new Date().getFullYear()} My Trello. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
