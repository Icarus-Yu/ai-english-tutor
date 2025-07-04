import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // 1. 导入 Image 组件
import { cookies } from 'next/headers';
import { type Book } from '@/lib/db/schema'; // 2. import type 语法修正
import { generateUUID } from '@/lib/utils'; // 3. 导入 generateUUID
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    redirect('/api/auth/guest');
  }

  const books = await getBooks();

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Choose a book to start practicing
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.length > 0 ? (
          books.map((book) => (
            <Link
              href={`/chat/${generateUUID()}?bookId=${book.id}`}
              key={book.id}
              className="block hover:scale-[1.03] transition-transform duration-200 ease-in-out"
            >
              {/* 4. Link 组件不再需要 legacyBehavior 和内部的 <a> 标签 */}
              <Card className="h-full flex flex-col cursor-pointer shadow-md hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="truncate">{book.title}</CardTitle>
                  <CardDescription>
                    {book.author || 'Unknown Author'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grow flex items-center justify-center bg-muted/50">
                  {/* 5. 使用 next/image 替换 <img> */}
                  {book.coverImageUrl ? (
                    <Image
                      src={book.coverImageUrl}
                      alt={`Cover of ${book.title}`}
                      className="rounded-md object-cover"
                      width={200}
                      height={192}
                      style={{ width: '100%', height: '12rem' }}
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-muted text-muted-foreground">
                      <span>No Cover</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full">
            No books found. Please add some books to the database.
          </p>
        )}
      </div>
    </div>
  );
}
