import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { Chat } from '@/components/chat';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import type { DBMessage } from '@/lib/db/schema';
import type { Attachment, UIMessage } from 'ai';

// 关键修改：直接在函数签名中解构 props
export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params;
  const bookId =
    typeof searchParams.bookId === 'string' ? searchParams.bookId : undefined;

  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  const chat = await getChatById({ id });

  // 如果聊天记录不存在，并且 URL 中也没有 bookId，则认为是无效页面
  if (!chat && !bookId) {
    notFound();
  }

  // 如果聊天记录存在，但用户无权访问
  if (
    chat &&
    chat.visibility === 'private' &&
    session.user?.id !== chat.userId
  ) {
    notFound();
  }

  const messagesFromDb = chat ? await getMessagesByChatId({ id }) : [];

  function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage['parts'],
      role: message.role as UIMessage['role'],
      content: '',
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');

  // 使用 chat?.id 是因为新聊天时 chat 对象可能为 null
  const chatId = chat?.id ?? id;

  return (
    <>
      <Chat
        id={chatId}
        initialMessages={convertToUIMessages(messagesFromDb)}
        initialChatModel={chatModelFromCookie?.value ?? DEFAULT_CHAT_MODEL}
        // 对于新聊天，可见性默认为 private，对于已存在的聊天，使用其自身的设置
        initialVisibilityType={chat?.visibility ?? 'private'}
        // 对于新聊天，用户总是拥有者，所以 isReadonly 为 false
        isReadonly={chat ? session?.user?.id !== chat.userId : false}
        session={session}
        autoResume={!!chat} // 只有已存在的聊天才需要自动恢复
      />
      <DataStreamHandler id={chatId} />
    </>
  );
}
