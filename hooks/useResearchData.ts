import { useState, useEffect } from 'react';
import { getAllResearchData, getFilteredResearchData } from '@/lib/firebaseService';

export interface ResearchDataItem {
  id: string;
  name: string;
  faculty: string;
  department: string;
  type: 'topic' | 'article' | 'book' | 'guidance' | 'award';
  data: Record<string, unknown>;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export function useResearchData(filters?: {
  name?: string;
  faculty?: string;
  department?: string;
  type?: string;
}) {
  const [data, setData] = useState<ResearchDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        let result;
        if (filters && Object.values(filters).some(v => v)) {
          result = await getFilteredResearchData(filters);
        } else {
          result = await getAllResearchData();
        }
        
        setData(result as unknown as ResearchDataItem[]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await getAllResearchData();
      setData(result as unknown as ResearchDataItem[]);
    } catch (err) {
      console.error('Error refetching data:', err);
      setError('Không thể tải dữ liệu. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
