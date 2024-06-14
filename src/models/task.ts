import mongoose, { Document } from "mongoose";

//mongoDBはid自動付与のためidは不要
export interface Task {
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  id: string;
}

//TaskのプロパティとDocumentのプロパティを持つ、interfaceを定義
export interface TaskDocument extends Task, Document {
  createdAt: Date;
  updatedAt: Date;
}

//Taskデータのスキーマを定義
//mongoDBのデータ構造を定義するもの。フィールド名、データ名、制約、デフォルト値などを設定できる
const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } //第二引数にオブジェクトでtimestampsを追加することでcreatedAtとupdatedAtが自動追加される
);

//TaskSchemaを使ってモデルを作成
//すでにTaskモデルが存在しない場合、modelの名前'Task'とtaskSchemaを渡して新しくモデルを作成する
export const TaskModel =
  mongoose.models.Task || mongoose.model("Task", taskSchema);
