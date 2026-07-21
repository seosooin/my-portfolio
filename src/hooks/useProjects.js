import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useProjects 훅
 * 게시된 프로젝트 목록을 sort_order 순으로 조회한다.
 *
 * Example usage:
 * const { projects, loading, error } = useProjects();
 */
function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, description, tech_stack, project_type, detail_url, github_url, thumbnail_url')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setProjects(data ?? []);
        setError(null);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export default useProjects;
