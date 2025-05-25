import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import { fetchSentences } from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const ArticlePage = async (props: { params: Promise<{ id: number }> }) => {
  const params = await props.params;

  const { id } = params;

  if (!id) redirect('/article/list');

  const supabase = await createSupabaseServerComponentClient();
  const { data } = await supabase
    .from('article_sentence_text_pinyins')
    .select('*')
    .eq('id', id)
    .order('index');

  const sentences = await fetchSentences(id);

  if (!data || !data.length) {
    redirect('/article/list');
  }

  const article = data[0] as Article;

  if (!article || !article.id) {
    redirect('/article/list');
  }

  return (
    <div className='mx-auto max-w-md grid gap-4'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <div>
        {new Date(article.date!).toLocaleDateString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        })}
      </div>
      <Link href={`/article/${article.id}/form`} className={buttonVariants()}>
        Create new sentence
      </Link>
      <SentenceList sentences={sentences} articleId={article.id} />
    </div>
  );
};

export default ArticlePage;
