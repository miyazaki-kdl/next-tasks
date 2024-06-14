// 親コンポーネントから受け取ったタスクのidを使用して、対応するタスクの編集ページへ遷移する機能を持つ

import Link from "next/link";
import { FaPen } from "react-icons/fa";

interface TaskEditButtonProps {
  id: string;
}

const TaskEditButton: React.FC<TaskEditButtonProps> = ({ id }) => {
  return (
    <Link href={`/edit/${id}`}>
      <FaPen className="hover: text-gray-700 text-lg cursor-pointer" />
    </Link>
  );
};

export default TaskEditButton;
