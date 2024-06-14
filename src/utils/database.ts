import mongoose from "mongoose";

//DBと接続するための非同期関数を定義する
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI || "");
  } catch (error) {
    console.log("DB接続に失敗しました");
    throw new Error();
  }
};
