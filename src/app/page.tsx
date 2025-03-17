import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-md">
          <h2 className="text-center font-bold mb-6 text-lg text-slate-700 dark:text-slate-300">
            デバッグ用ナビゲーション
          </h2>
          <div className="flex gap-4 flex-col sm:flex-row justify-center">
            <Link
              href="/my/assessment"
              className="rounded-md border border-solid border-transparent bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-sm font-medium h-12 px-4 w-full sm:w-auto transition-colors"
            >
              入力ページ
            </Link>
            <Link
              href="/my/result"
              className="rounded-md border border-solid border-green-600 hover:bg-green-600 hover:text-white text-green-600 flex items-center justify-center text-sm font-medium h-12 px-4 w-full sm:w-auto transition-colors"
            >
              結果ページ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
