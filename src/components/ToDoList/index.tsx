import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

type CheckBoxProps = {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedItems: { [key: string]: boolean };
  list: string[];
  handleDeleteTask: (item: string) => void;
};

const ITEMS_PER_PAGE = 5;

export default function ToDoList({ handleCheckboxChange, checkedItems, list, handleDeleteTask }: CheckBoxProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageItems = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col gap-2">
        {currentPageItems.map((item, index) => (
          <li className="w-full bg-zinc-800 rounded p-5" key={index}>
            <div className="flex items-baseline gap-4">
              <div className="flex gap-2 relative">
                <input
                  name={item}
                  type="checkbox"
                  checked={checkedItems[item] || false}
                  onChange={handleCheckboxChange}
                  className="peer relative appearance-none shrink-0 w-5 h-5 border-[3px] border-sky-400 rounded-full mt-1 bg-white
                            focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100 
                            checked:bg-violet-500 checked:border-0 disabled:border-steel-400 disabled:bg-steel-400"
                />
                <svg
                  className="absolute w-3 h-3 pointer-events-none 
                      hidden peer-checked:block stroke-white top-[0.5rem] left-[0.25rem] outline-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p className={`flex-1 text-zinc-200 ${checkedItems[item] ? "line-through text-zinc-500" : ""}`}>
                {item}
              </p>
              <button
                onClick={() => handleDeleteTask(item)}
                className=" text-zinc-300 p-[0.1rem] rounded hover:text-rose-500 hover:bg-zinc-600">
                <RiDeleteBin6Line />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="text-zinc-300 p-2 rounded bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-900"
        >
          Prev
        </button>
        <span className="text-zinc-300">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-zinc-300 p-2 rounded bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-900"
        >
          Next
        </button>
      </div>
    </div>
  );
}
