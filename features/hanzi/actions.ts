'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Hanzi_insert } from './schema';

export const addHanzi = async (
  hanzi: Hanzi_insert,
  articleId: number,
): Promise<{ data?: number; error?: string }> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('hanzis')
    .insert({
      form: hanzi.form,
      consonant: hanzi.consonant,
      vowel: hanzi.vowel,
      tone: hanzi.tone,
    })
    .select('id')
    .single();

  if (error) {
    if (error.code === '23505') {
      return { error: 'already has hanzi' };
    }

    return { error: error.message };
  }

  revalidatePath(`/articles/${articleId}/form`);

  return { data: data.id };
};
