import { useSearchParams } from 'next/navigation';

export function useCurrentBookId(): string | null {
  const searchParams = useSearchParams();
  const bookId = searchParams.get('bookId');
  return bookId;
}
