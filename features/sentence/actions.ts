'use server';

import { fetchHanziLatestSentenceCounts } from '@/features/hanzi/services/services';
import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const getHanziLatestSentenceCounts = async (
  text: string
): Promise<Hanzi_latest_sentence_count[]> => {
  return fetchHanziLatestSentenceCounts(text);
};

export const deleteSentence = async (
  _id: number,
  articleId: number
): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase.from('sentences').delete().eq('id', _id);
  if (error) {
    console.error(error.message);
    return;
  }
  revalidatePath('/');
  revalidatePath(`/sentences?articleId=${articleId}`);
  revalidatePath(`/articles/${articleId}/form`);
  return;
};

export const addSentence = async (
  _article_id: number,
  _hanzi_ids: number[],
  _offsets: number[]
): Promise<{ data?: number; error?: string }> => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('insert_sentence', {
    _article_id,
    _hanzi_ids,
    _offsets,
  });
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/');
  revalidatePath(`/sentences?articleId=${_article_id}`);
  return { data };
};
