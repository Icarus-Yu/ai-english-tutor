'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';
import type { VisibilityType } from './visibility-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { ModelSelector } from '@/components/model-selector';
import { VisibilitySelector } from '@/components/visibility-selector';
import { PlusIcon } from './icons';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useCurrentBookId } from '@/hooks/use-current-book-id';
import { toast } from './toast';
import { generateUUID } from '@/lib/utils';

interface ChatHeaderProps {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
  bookTitle: string;
  onNewChat: () => void;
}

export function ChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  session,
  bookTitle,
  onNewChat, // 这里不再直接用 props
}: ChatHeaderProps) {
  const router = useRouter();
  const bookId = useCurrentBookId();

  // 统一新建对话逻辑
  function handleNewChat() {
    const uuid = generateUUID();
    router.push(`/chat/${uuid}?bookId=${bookId}`);
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-yellow-100 sticky top-0 z-50 flex items-center px-6 py-4 rounded-t-2xl mb-2 gap-2">
      {/* 左侧：侧边栏开关+返回书库 */}
      <SidebarToggle className="bg-transparent text-amber-600 hover:bg-amber-50 rounded-full" />
      <Link href="/books" className="ml-2 mr-4">
        <Button
          type="button"
          variant="ghost"
          className="flex items-center bg-transparent text-amber-600 font-semibold hover:bg-amber-50 rounded-full"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          返回书库
        </Button>
      </Link>
      {/* 中间：书名+副标题 */}
      <div className="flex-1 text-center">
        <div className="text-lg font-bold text-gray-800">{bookTitle}</div>
        <div className="text-xs text-amber-600">AI英语对话学习</div>
      </div>
      {/* 右侧：新对话、模型选择、可见性选择 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            className="md:px-2 px-2 md:h-fit ml-auto md:ml-0 bg-transparent text-amber-600 hover:bg-amber-50 rounded-full"
            onClick={handleNewChat}
          >
            <PlusIcon />
            <span className="md:sr-only">New Chat</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>New Chat</TooltipContent>
      </Tooltip>
      {!isReadonly && (
        <ModelSelector
          session={session}
          selectedModelId={selectedModelId}
          className="mx-2 text-amber-600 bg-transparent hover:bg-amber-50 rounded-full"
        />
      )}
      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          className="mx-2 text-amber-600 bg-transparent hover:bg-amber-50 rounded-full"
        />
      )}
    </div>
  );
}
