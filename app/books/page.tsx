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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f7fa] to-[#e8ecf5]">
      {/* 顶部导航 */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-8 w-8"
            //onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span className="text-2xl font-bold text-[#7c3aed]">
            智慧英语学堂
          </span>
        </div>
        <div>{/* 右上角可留空或加占位 */}</div>
      </header>

      {/* 主体内容 */}
      <main className="flex flex-col items-center w-full px-4 py-10">
        <h1 className="text-3xl font-bold text-[#22223b] mb-2">
          欢迎来到<span className="text-[#7c3aed]">英语书库</span>
        </h1>
        <p className="text-[#4b5563] mb-8 text-center">
          选择你喜欢的英语教材，开始与AI老师的精彩对话学习吧！
        </p>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center place-items-center">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-lg flex flex-col p-6 transition hover:shadow-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-[#e0e7ff] text-[#6366f1] px-2 py-0.5 rounded font-semibold">
                      英语教材
                    </span>
                  </div>
                  <div className="font-bold text-lg text-[#22223b] truncate mb-1">
                    {book.title}
                  </div>
                  <div className="text-sm text-[#7c3aed] mb-4">
                    {book.author || '未知作者'}
                  </div>
                  <div className="w-full h-40 flex items-center justify-center bg-[#f5f7fa] rounded-lg mb-4 overflow-hidden">
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
                      <span className="text-[#9ca3af]">No Cover</span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/chat/${generateUUID()}?bookId=${book.id}`}
                  className="mt-auto"
                >
                  <button className="w-full py-2 rounded-lg bg-[#7c3aed] text-white font-semibold text-base shadow hover:bg-[#6366f1] transition">
                    开始学习对话
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-[#9ca3af] col-span-full">
              暂无书籍，请联系管理员添加。
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
