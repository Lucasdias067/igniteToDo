import Image from "next/image";
import ClipboardIcon from "../../../public/clipboard.svg";

export default function EmptyToDoList() {
  return (
    <div className="flex flex-col gap-4 items-center border-t-2 border-zinc-700 rounded-lg p-40">
      <Image src={ClipboardIcon} alt="Clipboard" />
      <div className="text-center">
        <p className="text-zinc-500 flex flex-col">
          <strong>Você ainda não tem tarefas cadastradas</strong>
          Crie tarefas e organize seus itens a fazer
        </p>
      </div>
    </div>
  );
}