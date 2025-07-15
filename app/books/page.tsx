import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import type { Book } from '@/lib/db/schema';
import { generateUUID } from '@/lib/utils';

async function getBooks(): Promise<Book[]> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${appUrl}/api/books`, {
      headers: {
        Cookie: cookies().toString(),
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch books: ${res.status} ${res.statusText}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const books = await getBooks();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-yellow-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-10 w-10 rounded-lg object-cover"
              //onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              智言
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button
                type="button"
                className="px-6 py-2 rounded-lg border border-amber-200 text-amber-700 font-semibold bg-transparent hover:bg-amber-50 transition-all duration-200"
              >
                学习中心
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="flex flex-col items-center w-full px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          欢迎来到
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            英语书库
          </span>
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          选择你喜欢的英语教材，开始与AI老师的精彩对话学习吧！
        </p>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center place-items-center">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="bg-white/80 backdrop-blur-sm border border-yellow-100 rounded-xl shadow-lg flex flex-col p-6 transition hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-yellow-100 text-amber-700 px-2 py-0.5 rounded font-semibold">
                      英语教材
                    </span>
                  </div>
                  <div className="font-bold text-lg text-gray-800 truncate mb-1">
                    {book.title}
                  </div>
                  <div className="text-sm text-amber-600 mb-4">
                    {book.author || '未知作者'}
                  </div>
                  <div className="w-full h-40 flex items-center justify-center bg-yellow-50 rounded-lg mb-4 overflow-hidden">
                    {book.coverImageUrl ? (
                      <Image
                        src={book.coverImageUrl}
                        alt={`Cover of ${book.title}`}
                        className="object-cover rounded"
                        width={160}
                        height={160}
                        style={{ width: '100%', height: '100%' }}
                      />
                    ) : (
                      <span className="text-gray-400">No Cover</span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/chat/${generateUUID()}?bookId=${book.id}`}
                  className="mt-auto"
                >
                  <button
                    type="button"
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    开始学习对话
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full">
              暂无书籍，请联系管理员添加。
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
