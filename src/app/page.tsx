import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_auto_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="row-start-3 w-full max-w-md mx-auto px-4">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <h2 className="text-center font-bold mb-3 text-sm text-slate-500 dark:text-slate-400">
            デバッグ用ナビゲーション
          </h2>
          <div className="flex gap-4 flex-col sm:flex-row justify-center">
            <Link
              href="/my/assessment"
              className="rounded-md border border-solid border-transparent bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-sm font-medium h-10 px-4 w-full sm:w-auto transition-colors"
            >
              入力ページ
            </Link>
            <Link
              href="/my/result"
              className="rounded-md border border-solid border-green-600 hover:bg-green-600 hover:text-white text-green-600 flex items-center justify-center text-sm font-medium h-10 px-4 w-full sm:w-auto transition-colors"
            >
              結果ページ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
