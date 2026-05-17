'use server';

import { query } from '@/utils/db';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { Article, Article_db } from '../schema';

export const addArticle = async (
  article: Article_db,
): Promise<{ error?: string }> => {
  try {
    await query('INSERT INTO articles (date, title) VALUES ($1, $2)', [
      article.date,
      article.title,
    ]);
  } catch (e: any) {
    return { error: e.message };
  }
  revalidatePath('/');
  revalidatePath('/articles');
  return {};
};

export const updateArticle = async (
  article: Article,
): Promise<{ error?: string }> => {
  try {
    await query('UPDATE articles SET title = $1, date = $2 WHERE id = $3', [
      article.title!,
      format(
        article.date!.toLocaleDateString('en-US', { timeZone: 'Asia/Tokyo' }),
        'yyyy-MM-dd',
      ),
      article.id!,
    ]);
  } catch (e: any) {
    return { error: e.message };
  }
  revalidatePath('/');
  revalidatePath('/articles');
  revalidatePath(`/sentences?articleId=${article.id}`);
  revalidatePath(`/sentences/new?articleId=${article.id}`);
  return {};
};

export const deleteArticle = async (
  _id: number,
): Promise<{ error?: string }> => {
  try {
    await query('DELETE FROM articles WHERE id = $1', [_id]);
  } catch (e: any) {
    return { error: e.message };
  }
  revalidatePath('/');
  revalidatePath('/articles');
  return {};
};
