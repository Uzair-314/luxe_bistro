import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// Hook to fetch menu items
export function useMenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true)
          .order('category');

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return { items, loading, error };
}

// Hook to submit a reservation
export async function submitReservation(reservationData) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservationData])
    .select();

  if (error) throw error;
  return data;
}

// Hook to submit an order
export async function submitOrder(orderData) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();

  if (error) throw error;
  return data;
}

// Hook to submit contact form
export async function submitContact(contactData) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([contactData])
    .select();

  if (error) throw error;
  return data;
}


// Auth functions
export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }
    }
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}