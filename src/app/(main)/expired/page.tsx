import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";

const getExpiredTasks = async (): Promise<TaskDocument[]> => {
  //fetch(apiのエンドポイント(共通部分は環境変数で管理),  dataが頻繁に変更されるのでキャッシュ無効化)
  const response = await fetch(`${process.env.API_URL}/tasks/expired`, {
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

const expiredTaskPage = async () => {
  const expiredTasks = await getExpiredTasks(); //タスク一覧を取得
  console.log(expiredTasks);
  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">Expired Tasks</h1>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {expiredTasks.map((task) => (
          <TaskCard key={task._id as string} task={task} />
        ))}
      </div>
    </div>
  );
};

export default expiredTaskPage;
