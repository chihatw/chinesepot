import { query } from '@/utils/db';
import { Hanzi_latest_sentence_count } from '../schema';

export async function fetchHanziLatestSentenceCounts(
  text: string,
): Promise<Hanzi_latest_sentence_count[]> {
  const array = text.split('').filter(Boolean);
  if (array.length === 0) return [];
  const params = array;
  const placeholders = params.map((_, i) => `$${i + 1}`).join(',');
  const sql = `SELECT * FROM hanzi_latest_sentence_counts WHERE form IN (${placeholders})`;
  try {
    const res = await query(sql, params as any[]);
    return res.rows.map((item: any) => ({
      ...item,
      created_at: new Date(item.created_at),
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}
