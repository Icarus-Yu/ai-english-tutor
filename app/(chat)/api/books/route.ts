import { auth } from '@/app/(auth)/auth';
import { getBooks } from '@/lib/db/queries';
import { ChatSDKError } from '@/lib/errors';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    // 如果用户未登录，返回未授权错误
    return new ChatSDKError('unauthorized:api').toResponse();
  }

  try {
    const books = await getBooks();
    // 成功获取书籍列表后，以 JSON 格式返回
    return NextResponse.json(books);
  } catch (error) {
    // 处理潜在的数据库查询错误
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
    // 对于其他未知错误，返回通用服务器错误
    return new Response('Internal Server Error', { status: 500 });
  }
}
