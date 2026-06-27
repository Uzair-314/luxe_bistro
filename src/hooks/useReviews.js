// src/hooks/useReviews.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      setReviews(data || []);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  return { reviews, loading };
}