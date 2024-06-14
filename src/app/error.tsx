"use client"; //errorページはクライアントコンポーネント

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-50 text-gray-900">
      <h1 className="text-8xl font-bold">Error</h1>
      <p className="text-4xl font-medium">Unexpected error occurred</p>
      <Link
        href="/"
        className="mt-4 text-xl text-white hover:underline border px-4 py-2 rounded-full shadow-sm bg-sky-400"
      >
        Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;
