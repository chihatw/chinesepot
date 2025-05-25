'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Hanzi_insert } from './schema';

export const addHanzi = async (
  hanzi: Hanzi_insert,
  articleId: number
): Promise<{ data?: number; error?: string }> => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('insert_hanzi', {
    _form: hanzi.form,
    _consonant: hanzi.consonant,
    _vowel: hanzi.vowel,
    _tone: hanzi.tone,
  });
  if (error) {
    return { error: error.message };
  }
  if (!data) {
    return { error: `already has hanzi` };
  }
  revalidatePath(`/article/${articleId}/form`);
  return { data };
};
