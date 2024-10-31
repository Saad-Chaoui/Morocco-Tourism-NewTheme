import { useState, useEffect, useCallback } from 'react';
import { useApiCache } from './useApiCache';
import { measurePerformance } from '../utils/performance';

export function useFetchData(fetchFn, dependencies = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cacheKey } = options;

  const { data: cachedData } = useApiCache(cacheKey, fetchFn);

  const fetchData = useCallback(async () => {
    const perfMeasure = measurePerformance('Data Fetch');
    try {
      setLoading(true);
      const result = cachedData || await fetchFn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      perfMeasure();
    }
  }, [fetchFn, cachedData]);

  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchFn]);

  return { data, loading, error, refetch: fetchData };
}