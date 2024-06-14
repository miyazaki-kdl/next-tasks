import { TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

//ダイナミックルートなのでidを引数で受け取ることができる
//第一引数にNextRequest型のrequest,第二引数にダイナミックルートのパラメータ
export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDb(); //DBとの接続を確立
    const task = await TaskModel.findById(params.id); //idをkeyにタスクを検索する

    //タスクが存在しなかった場合
    if (!task) {
      return NextResponse.json(
        { message: "タスクが存在しません" },
        { status: 404 }
      );
    }

    //その他の場合
    return NextResponse.json({ message: "タスク取得成功", task });
  } catch (error) {
    // errorの場合
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};

//キャッシュを利用せずにリクエストごとに実行される
export const dynamic = "force-dynamic";
