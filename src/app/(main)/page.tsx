import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";
import Link from "next/link";
import { MdAddTask } from "react-icons/md";

const getAllTasks = async (): Promise<TaskDocument[]> => {
  //fetch(apiのエンドポイント(共通部分は環境変数で管理),  dataが頻繁に変更されるのでキャッシュ無効化)
  const response = await fetch(`${process.env.API_URL}/tasks`, {
    cache: "no-store",
  });

  //リクエストが失敗した場合
  if (response.status !== 200) {
    throw new Error();
  }
  //リクエストに成功した場合
  const data = await response.json();
  return data.tasks as TaskDocument[]; //taskデータを返却
};

export default async function MainPage() {
  const allTasks = await getAllTasks(); //タスク一覧を取得
  console.log(allTasks);
  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">All Tasks</h1>
        <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>Add Task </div>
        </Link>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {allTasks.map((task) => (
          <TaskCard key={task._id as string} task={task} />
        ))}
      </div>
    </div>
  );
}
