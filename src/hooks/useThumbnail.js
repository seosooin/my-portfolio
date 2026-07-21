import { useEffect, useState } from 'react';

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 3000;

/**
 * useThumbnail 훅
 * thum.io는 스크린샷을 비동기로 생성하며, 준비되기 전에는 로딩 스피너 GIF를 반환한다.
 * 응답의 Content-Type으로 준비 여부를 확인하고, 준비 전이면 일정 간격으로 재시도한다.
 *
 * Example usage:
 * const { src, isLoading } = useThumbnail(thumbnailUrl);
 */
function useThumbnail(url) {
  const [src, setSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setIsLoading(true);

    async function check(attempt) {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        const contentType = response.headers.get('content-type') || '';

        if (cancelled) return;

        if (contentType.startsWith('image/gif') && attempt < MAX_ATTEMPTS) {
          setTimeout(() => check(attempt + 1), RETRY_DELAY_MS);
          return;
        }
      } catch {
        // 네트워크 오류가 나도 원본 URL로 표시를 시도한다
      }

      if (!cancelled) {
        setSrc(url);
        setIsLoading(false);
      }
    }

    check(1);

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { src, isLoading };
}

export default useThumbnail;
