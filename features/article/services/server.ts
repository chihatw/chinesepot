import { SentenceView } from '@/features/sentence/schema';

import { query } from '@/utils/db';
import { Article } from '../schema';

export async function fetchArticle(id: number): Promise<Article | undefined> {
  const res = await query('SELECT * FROM articles WHERE id = $1 LIMIT 1', [id]);
  const data = res.rows[0];
  if (!data) return;
  return {
    ...data,
    date: new Date(data.date),
    created_at: new Date(data.created_at),
  };
}

export async function fetchSentences(
  articleId: number,
): Promise<SentenceView[]> {
  const res = await query(
    'SELECT * FROM article_sentence_text_pinyins WHERE id = $1 ORDER BY "index"',
    [articleId],
  );
  return res.rows.map((item: any) => ({
    ...item,
    created_at: new Date(item.created_at),
    date: new Date(item.date),
  }));
}

export async function fetchLatestSentences(): Promise<SentenceView[]> {
  const res = await query('SELECT * FROM article_sentence_text_pinyins_latest');
  return res.rows.map((item: any) => ({
    ...item,
    created_at: new Date(item.created_at),
    date: new Date(item.date),
  }));
}
