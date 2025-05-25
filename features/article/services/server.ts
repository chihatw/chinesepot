import { SentenceView } from '@/features/sentence/schema';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Article } from '../schema';

export async function fetchArticle(id: number): Promise<Article | undefined> {
  const supabase = await createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('articles')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }
  return {
    ...data,
    date: new Date(data.date),
    created_at: new Date(data.created_at),
  };
}

export async function fetchSentences(
  articleId: number
): Promise<SentenceView[]> {
  const supabase = await createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('article_sentence_text_pinyins')
    .select()
    .eq('id', articleId)
    .order('index');

  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
    date: new Date(item.date!),
  }));
}

export async function fetchLatestSentences(): Promise<SentenceView[]> {
  const supabase = await createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('article_sentence_text_pinyins_latest')
    .select();

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
    date: new Date(item.date!),
  }));
}
