'use client'
import Image from "next/image";
import RocketLogo from "../../public/rocketLogo.svg";
import Plus from "../../public/plus.svg";
import { useEffect, useState } from "react";
import ToDoList from "@/components/ToDoList";
import EmptyToDoList from "@/components/EmptyToDoList";

export default function ListToDo() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [list, setList] = useState<string[]>([]);
  const [task, setTask] = useState('');
  const [doneTask, setDoneTask] = useState(0);

  let doneTaskCount = 0;

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setCheckedItems(prev => ({
      ...prev,
      [name]: checked,
    }));
    if (checked) {
      setDoneTask(prev => prev + 1);
    } else if (doneTask > 0) {
      setDoneTask(prev => prev - 1);
    }
  }

  function handleTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isSameTask = list.includes(task.trim());
    if (isSameTask || task.trim() === '') {
      alert('Tente novamente!');
      setTask('');
      return;
    }

    setList([...list, task]);
    setTask('');
  }

  function handleDeleteTask(task: string) {
    const newList = list.filter((name) => name !== task);
    if (doneTask > 0 && checkedItems[task]) setDoneTask(prev => prev - 1);

    setList(newList);
    setCheckedItems(prev => ({ ...prev, [task]: false, }));
    localStorage.setItem('tasks', JSON.stringify(newList));
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    ;
  }


  useEffect(() => {
    if (list.length) localStorage.setItem('tasks', JSON.stringify(list));
    if (Object.values(checkedItems).length) {
      localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
      Object.values(checkedItems).forEach((item) => item === true && doneTaskCount++)
      localStorage.setItem('doneTaskCount', JSON.stringify(doneTaskCount));
    };

  }, [list, checkedItems, doneTask, doneTaskCount]);

  useEffect(() => {
    const myTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const myCheckedItems = JSON.parse(localStorage.getItem('checkedItems') || '{}');
    const myDoneTaskCount = JSON.parse(localStorage.getItem('doneTaskCount') || '0');

    setCheckedItems(myCheckedItems);
    setList([...myTasks]);
    setDoneTask(myDoneTaskCount);
  }, [doneTaskCount]);

  return (
    <main className="relative">
      <header className="bg-zinc-950 h-[12.5rem] flex items-center justify-center">
        <Image src={RocketLogo} alt="Rocket Logo" />
      </header>
      <form
        onSubmit={handleCreateTask}
        className="absolute top-[10.7rem] left-1/2 transform -translate-x-1/2 flex gap-2 justify-center h-14 w-full max-w-3xl px-4">
        <input
          value={task}
          maxLength={50}
          onChange={handleTaskChange}
          type="text"
          className="p-2 flex-1 border text-zinc-200 border-black rounded bg-zinc-800 placeholder:text-zinc-500"
          placeholder="Adicione uma nova tarefa"
        />
        <button
          className="font-bold rounded flex min-w-20 items-center justify-center gap-2 text-white text bg-sky-700 hover:bg-sky-800">
          Criar
          <Image src={Plus} alt="Plus" />
        </button>
      </form>
      <div className="bg-zinc-900 h-screen">
        <div className="max-w-3xl mx-auto py-24 px-4 flex flex-col gap-6">
          <div className="text-sm flex items-center justify-between font-bold">
            <p className="text-sky-400 ">
              Tarefas criadas
              <span className="bg-zinc-800 rounded px-2 ml-2 text-white">{list.length}</span>
            </p>
            <p className="text-violet-400">
              Concluídas
              <span className="bg-zinc-800 rounded px-2 ml-2 text-white">{doneTask} de {list.length}</span>
            </p>
          </div>
          {list.length > 0
            ? <ToDoList
              handleDeleteTask={handleDeleteTask}
              list={list}
              handleCheckboxChange={handleCheckboxChange}
              checkedItems={checkedItems} />
            : <EmptyToDoList />
          }
        </div>
      </div>
    </main>
  );
}


