'use server';

import { query } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { Hanzi_insert } from './schema';

export const addHanzi = async (
  hanzi: Hanzi_insert,
  articleId: number,
): Promise<{ data?: number; error?: string }> => {
  try {
    const res = await query(
      'INSERT INTO hanzis (form, consonant, vowel, tone) VALUES ($1, $2, $3, $4) RETURNING id',
      [hanzi.form, hanzi.consonant, hanzi.vowel, hanzi.tone],
    );
    const id = res.rows[0]?.id;
    revalidatePath(`/articles/${articleId}/form`);
    return { data: id };
  } catch (e: any) {
    if (e.code === '23505') {
      return { error: 'already has hanzi' };
    }
    return { error: e.message };
  }
};
