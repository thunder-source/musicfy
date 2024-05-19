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
      autoComplete='off'
      className='p-2 text-gray-300 focus-within:text-gray-600 w-2/4 border-transparent border-2 rounded-radius_6 absolute md:w-[calc(100%-15rem)]  '>
      <label htmlFor='search-field' className='sr-only'>
        Search all files
      </label>
      <div className='flex flex-row justify-start items-center'>
        <FiSearch aria-hidden='true' className='w-5 h-5 ml-4' />
        <input
          name='search-field'
          autoComplete='off'
          id='search-field'
          className='flex-1 bg-transparent border-none placeholder-gray-400 outline-none text-base text-white p-4 focus-within:placeholder-gray-600 '
          placeholder='Search 132'
          type='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
