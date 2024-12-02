import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiEdit2Line } from "react-icons/ri";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';


type CheckBoxProps = {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedItems: { [key: string]: boolean };
  setCheckedItems: React.Dispatch<React.SetStateAction<{
    [key: string]: boolean;
  }>>
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>
  setDoneTask: (value: React.SetStateAction<number>) => void
  doneTask: number
};

const ITEMS_PER_PAGE = 5;

export default function ToDoList({ setDoneTask, doneTask, handleCheckboxChange, checkedItems, setCheckedItems, list, setList }: CheckBoxProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [newListEdit, setNewListEdit] = useState('');

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageItems = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  function handleDeleteTask(task: string) {
    const newList = list.filter((name) => name !== task);
    const newTotalPages = Math.ceil(newList.length / ITEMS_PER_PAGE);
    if (doneTask > 0 && checkedItems[task]) setDoneTask(prev => prev - 1);

    setList(newList);
    setCheckedItems(prev => ({ ...prev, [task]: false, }));
    setCurrentPage(newTotalPages)
    localStorage.setItem('tasks', JSON.stringify(newList));
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }


  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewListEdit(e.target.value);
  }

  function handleEditTask(item: string) {
    const newList = [...list]
    const itemIndex = newList.indexOf(item)
    newList[itemIndex] = newListEdit

    const itemEmpty = newList[itemIndex].trim() === ''
    const itemDuplicate = list.includes(newList[itemIndex])

    if (itemEmpty) {
      alert('Preencha o campo');
      setNewListEdit('')
      return;
    }

    if (itemDuplicate) {
      alert('Esta tarefa já existe na sua lista!');
      setNewListEdit('')
      return;
    }

    setList(newList)
    setNewListEdit('')
  }

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col gap-2">
        {currentPageItems.map((item, index) => (
          <li className="w-full bg-zinc-800 rounded p-5" key={index}>
            <label htmlFor={item} className="flex items-center gap-4 cursor-pointer">
              <div className="flex gap-2 relative justify-center">
                <input
                  name={item}
                  id={item}
                  type="checkbox"
                  checked={checkedItems[item] || false}
                  onChange={handleCheckboxChange}
                  className="peer relative appearance-none shrink-0 w-5 h-5 border-[3px] border-sky-400 rounded-full bg-white
                            focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100 
                            checked:bg-violet-500 checked:border-0 disabled:border-steel-400 disabled:bg-steel-400"
                />
                <svg
                  className="absolute w-3 h-3 pointer-events-none 
                      hidden peer-checked:block stroke-white top-[0.3rem] left-[0.25rem] outline-none"
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
              <p className={`flex-1 text-zinc-200 ${checkedItems[item] ? "line-through text-zinc-500" : ""}`} >
                {item}
              </p>
              <div className="flex gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      disabled={checkedItems[item]}
                      className="text-zinc-300 p-1 rounded hover:text-teal-500">
                      <RiEdit2Line />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-min bg-zinc-900">
                    <DialogHeader className='space-y-5'>
                      <DialogTitle className="text-zinc-300 text-center">Editar Tarefa</DialogTitle>
                      <DialogDescription>Tarefa anterior: {item}</DialogDescription>
                      <div className="flex gap-4">
                        <input
                          value={newListEdit}
                          onChange={handleEditChange}
                          type="text"
                          placeholder='Escreva a nova tarefa'
                          className="p-2 border text-zinc-200 border-black rounded text-sm bg-zinc-800 placeholder:text-zinc-500"
                        />
                        <DialogClose asChild>
                          <button
                            disabled={!newListEdit}
                            onClick={() => handleEditTask(item)}
                            className="font-bold rounded min-w-16 text-white text-sm bg-sky-700 hover:bg-sky-800">
                            Salvar
                          </button>
                        </DialogClose>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <button
                  onClick={() => handleDeleteTask(item)}
                  className="text-zinc-300 p-1 rounded hover:text-rose-500">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="text-white p-2 font-bold rounded bg-sky-700 hover:bg-sky-600 disabled:bg-zinc-900 disabled:text-zinc-300 disabled:font-normal"
        >
          Prev
        </button>
        <span className="text-zinc-300">{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-white p-2 rounded font-bold bg-sky-700 hover:bg-sky-600 disabled:bg-zinc-900 disabled:text-zinc-300 disabled:font-normal"
        >
          Next
        </button>
      </div>
    </div>
  );
}
