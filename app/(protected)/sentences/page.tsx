import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import { fetchSentences } from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

import { redirect } from 'next/navigation';

const Page = async (props: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ articleId?: number }>;
}) => {
  const searchParams = await props.searchParams;

  const { articleId } = searchParams;

  if (!articleId) redirect('/articles');

  const supabase = await createClient();

  const { data } = await supabase
    .from('article_sentence_text_pinyins')
    .select('*')
    .eq('id', articleId)
    .order('index');

  const sentences = await fetchSentences(articleId);

  if (!data || !data.length) {
    redirect('/articles');
  }

  const article = data[0] as Article;

  if (!article || !article.id) {
    redirect('/articles');
  }

  return (
    <div className='mx-auto max-w-md grid gap-4'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <div>
        {new Date(article.date!).toLocaleDateString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        })}
      </div>
      <Link href={`/articles/${article.id}/edit`} className={buttonVariants()}>
        Create new sentence
      </Link>
      <SentenceList sentences={sentences} articleId={article.id} />
    </div>
  );
};

export default Page;
