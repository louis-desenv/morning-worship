
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Morning Worship Reader
        </h1>
        <p className="text-sm text-gray-500 mt-1">Daily Spiritual Refreshment, in Text</p>
      </div>
    </header>
  );
};

export default Header;
