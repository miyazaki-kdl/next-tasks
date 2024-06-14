//useFormStateを使用してserverActionsの戻り値を状態管理する

"use client"; //hookを使用するため
import { FormState, createTask } from "@/actions/task";
import { useFormState, useFormStatus } from "react-dom";

const NewTaskForm = () => {
  const initialState: FormState = { error: "" };
  //serverActionsの結果ととserverActionsと同じ機能を持つformAction関数を取得できる
  const [state, formAction] = useFormState(createTask, initialState); //createTaskはserverAction

  //serverActionの実行中にはボタン押下できないようにする
  //useFormStatusを直接呼び出せないので、別のコンポーネントでラップする
  const SubmitButton = () => {
    const { pending } = useFormStatus(); //serverActionの実行状態を取得する
    return (
      <button
        type="submit"
        className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
        disabled={pending}
      >
        Create
      </button>
    );
  };

  return (
    <div className="mt-10 mx-auto w-full max-w-sm">
      {/* formの内容がserverActionに送信され、Taskが作成される */}
      <form action={formAction}>
        {/* タイトル */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        {/* 説明 */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium">
            説明
          </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        {/* 期限 */}
        <div className="mt-6">
          <label htmlFor="dueDate" className="block text-sm font-medium">
            期限
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            min="2020-01-01"
            max="2999-12-31"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <SubmitButton />
        {state.error && (
          <p className="mt-2 text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
};

export default NewTaskForm;
