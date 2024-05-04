'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { supabaseClient } from '@/utils/supabase/client';
import type { Tables } from '@/types/supabase';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function fetchTasks(): Promise<Tables<'tasks'>[]> {
  noStore();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const { data: tasks, error } = await supabaseClient
      .from('tasks')
      .select('*')
      .match({ user_id: user?.id });

    if (error) {
      console.error('Database Error:', error); 
      throw new Error('Failed to fetch todo data.'); 
    }

    return tasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
};

export async function insertTask(formData: FormData) {
  noStore();
  const taskText = formData.get("task") as string;
  
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabaseClient
    .from('tasks')
    .insert({ text: taskText, user_id: user?.id });

  if (error) {
    console.error('Database Error:', error);
    return error.code;
  }

  revalidatePath('/');
  redirect('/');
}

export async function updateTask(id: number, text: string): Promise<void> {
  noStore();

  const { error } = await supabaseClient
    .from('tasks')
    .update({ text })
    .match({ id });

  if (error) throw new Error(error.message);

  revalidatePath('/');
  redirect('/');
}

export async function deleteTask(taskId: number): Promise<void> {
  noStore();

  const { error } = await supabaseClient
    .from('tasks')
    .delete()
    .eq("id", taskId);

  if (error) throw new Error(error.message);

  revalidatePath('/');
  redirect('/');
}
