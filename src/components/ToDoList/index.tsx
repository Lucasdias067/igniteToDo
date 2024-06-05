import { RiDeleteBin6Line } from "react-icons/ri";

type isCheckedProps = {
  [key: string]: boolean
}

interface checkBoxProps {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteTask: (task: string) => void
  checkedItems: isCheckedProps
  list: string[]
}

export default function ToDoList({ handleCheckboxChange, checkedItems, list, handleDeleteTask }: checkBoxProps) {

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {list.map((item, index) => (
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
    </div>
  );
}