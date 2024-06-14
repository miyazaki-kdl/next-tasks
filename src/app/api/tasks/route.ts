//タスク一覧を取得するルートハンドラー

import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb(); //DBとの接続を確立
    const allTasks: TaskDocument[] = await TaskModel.find();

    return NextResponse.json({ message: "タスク取得成功", tasks: allTasks }); //メッセージと取得したデータを返却
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

//タスク取得のレスポンスはキャッシュを利用せず、リクエストごとに最新のデータを取得したいので↓を追加
export const dynamic = "force-dynamic";
