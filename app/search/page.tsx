'use client';
import { useSearchSongByNameQuery } from '@/redux/services/search';
import { IconButton } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { RiSearchLine } from 'react-icons/ri';
export default function Page({}) {
  const [isInputActive, setIsInputActive] = useState(false);
  return (
    <div className="my-auto h-full w-full">
      <div className="group relative flex w-full items-center justify-center  ">
        <input
          type="search"
          id="search"
          name="search"
          className="peer h-full w-full rounded-full bg-gray_a3 p-2 px-11 outline-none "
          placeholder=""
        />
        <IconButton
          onClick={() => {
            setIsInputActive(false);
          }}
          variant="soft"
          className="absolute right-1 hidden rounded-full peer-focus:block"
        >
          <IoIosClose size={30} />
        </IconButton>

        <label
          id="search"
          onClick={() => {
            setIsInputActive(true);
          }}
          className="  absolute left-1/2 mx-auto h-10 -translate-x-1/2 transform rounded-full p-2 transition-all duration-500 ease-in peer-focus:left-0 peer-focus:right-auto peer-focus:translate-x-0"
        >
          <IconButton variant="ghost" className="rounded-full ">
            <RiSearchLine size={20} />
          </IconButton>
          Search
        </label>
      </div>
    </div>
  );
}

// {
//   isInputActive ? (
//     <>
//       <input
//         type='search'
//         className='w-full p-2 px-11 h-full rounded-full outline-none bg-gray_a3'
//         placeholder='Search...'
//       />
//       <IconButton
//         onClick={() => {
//           setIsInputActive(false);
//         }}
//         variant='soft'
//         className='rounded-full absolute right-1 '>
//         <IoIosClose size={30} />
//       </IconButton>
//     </>
//   ) : (
//     <div
//       onClick={() => {
//         setIsInputActive(true);
//       }}
//       className='bg-gray_a3 w-full p-2 h-10 top-0 rounded-full absolute z-10 flex justify-center items-center gap-2'>
//       <motion.div className=''>
//         <IconButton variant='ghost' className='rounded-full '>
//           <RiSearchLine size={20} />
//         </IconButton>
//       </motion.div>
//       Search
//     </div>
//   );
// }
