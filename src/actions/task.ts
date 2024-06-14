"use server";

import { Task, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { redirect } from "next/navigation";

//serverActions内でエラーが起きた時にその内容を返却するための型定義
export interface FormState {
  error: string;
}

// Task作成のための関数
export const createTask = async (state: FormState, formData: FormData) => {
  //formデータを元に新規作成するtaskDataを作成
  const newTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: false,
  };
  //newTaskをDBに登録
  try {
    await connectDb();
    await TaskModel.create(newTask); //新しいタスクを登録
  } catch (error) {
    state.error = "タスクの作成に失敗しました";
    return state; //stateを返却する
  }
  //taskが正常に作成されたらメイン画面にリダイレクト
  redirect("/");
};

// Task更新のための関数
export const updateTask = async (
  id: string,
  state: FormState,
  formData: FormData
) => {
  //formデータを元に更新するtaskDataを作成
  const updateTask: Task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: Boolean(formData.get("isCompleted")), //formDateから取得、booleanに型変換する
  };
  //updateTaskをDBに登録
  try {
    await connectDb();
    await TaskModel.updateOne({ _id: id }, updateTask); //更新されたタスクを登録、(_id:更新条件, 更新するデータ)
  } catch (error) {
    state.error = "タスクの更新に失敗しました";
    return state; //stateを返却する
  }
  //taskが正常に更新されたらメイン画面にリダイレクト
  redirect("/");
};

// Task削除のための関数
export const deleteTask = async (id: string, state: FormState) => {
  try {
    await connectDb();
    await TaskModel.deleteOne({ _id: id }); //登録されたタスクを削除
  } catch (error) {
    state.error = "タスクの削除に失敗しました";
    return state; //stateを返却する
  }
  //taskが正常に削除されたらメイン画面にリダイレクト
  redirect("/");
};
