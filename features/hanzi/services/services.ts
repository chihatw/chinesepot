import { createClient } from '@/utils/supabase/server';
import { Hanzi_latest_sentence_count } from '../schema';

export async function fetchHanziLatestSentenceCounts(
  text: string
): Promise<Hanzi_latest_sentence_count[]> {
  const array = text.split('').filter(Boolean);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('hanzi_latest_sentence_counts')
    .select()
    .in('form', array);
  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}
