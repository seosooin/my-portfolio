import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const PAGE_SIZE = 5;

/**
 * useGuestbook 훅
 * 방명록 목록 조회(5개씩 더보기 페이지네이션)와 신규 등록 기능을 제공한다.
 *
 * Example usage:
 * const { entries, hasMore, loading, submitting, error, loadMore, addEntry } = useGuestbook();
 */
function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async (limit) => {
    setLoading(true);
    const { data, error: fetchError, count } = await supabase
      .from('guestbook_public')
      .select('id, name, message, emoji, rating, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(0, limit - 1);

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setEntries(data ?? []);
      setTotalCount(count ?? 0);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries(visibleCount);
  }, [fetchEntries, visibleCount]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  const addEntry = useCallback(async ({ name, message, email, phone, emoji, rating }) => {
    setSubmitting(true);
    const { error: insertError } = await supabase.from('guestbook').insert({
      name,
      message,
      email: email || null,
      phone: phone || null,
      emoji: emoji || null,
      rating: rating || null,
    });
    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return false;
    }

    setError(null);
    setVisibleCount(PAGE_SIZE);
    await fetchEntries(PAGE_SIZE);
    return true;
  }, [fetchEntries]);

  const hasMore = entries.length < totalCount;

  return { entries, hasMore, loading, submitting, error, loadMore, addEntry };
}

export default useGuestbook;
