'use server';

import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import { fetchHanziLatestSentenceCounts } from '@/features/hanzi/services/services';
import { query } from '@/utils/db';
import { revalidatePath } from 'next/cache';

export const getHanziLatestSentenceCounts = async (
  text: string,
): Promise<Hanzi_latest_sentence_count[]> => {
  return fetchHanziLatestSentenceCounts(text);
};

export const deleteSentence = async (
  _id: number,
  articleId: number,
): Promise<void> => {
  try {
    await query('DELETE FROM sentences WHERE id = $1', [_id]);
  } catch (e) {
    console.error(e);
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
  _offsets: number[],
): Promise<{ data?: number; error?: string }> => {
  try {
    // call stored procedure insert_sentence
    const res = await query('SELECT insert_sentence($1, $2, $3) as id', [
      _article_id,
      _hanzi_ids,
      _offsets,
    ]);
    const data = res.rows[0]?.id;
    revalidatePath('/');
    revalidatePath(`/sentences?articleId=${_article_id}`);
    return { data };
  } catch (e: any) {
    return { error: e.message };
  }
};
