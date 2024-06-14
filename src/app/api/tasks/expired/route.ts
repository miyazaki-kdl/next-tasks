//期限切れタスク一覧を取得するルートハンドラー

import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  // 今日の日付を取得し、ISO 8601 形式の文字列に変換
  const today = new Date().toISOString().split("T")[0];
  try {
    await connectDb(); //DBとの接続を確立

    const expiredTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: false,
      dueDate: { $lt: today },
    });

    return NextResponse.json({
      message: "タスク取得成功",
      tasks: expiredTasks,
    }); //メッセージと取得したデータを返却
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

//タスク取得のレスポンスはキャッシュを利用せず、リクエストごとに最新のデータを取得したいので↓を追加
export const dynamic = "force-dynamic";
