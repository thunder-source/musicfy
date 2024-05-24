'use client';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="absolute w-2/4 rounded-radius_6 border-2 border-transparent p-2 text-gray-300 focus-within:text-gray-600 md:w-[calc(100%-15rem)]  "
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row items-center justify-start">
        <FiSearch aria-hidden="true" className="ml-4 h-5 w-5" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 border-none bg-transparent p-4 text-base text-white placeholder-gray-400 outline-none focus-within:placeholder-gray-600 "
          placeholder="Search 132"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
