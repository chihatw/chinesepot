import { fetchSentences } from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { buttonPrimary } from '@/lib/styles';
import Link from 'next/link';

import { fetchArticle } from '@/features/article/services/server';
import { redirect } from 'next/navigation';

const Page = async (props: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ articleId?: number }>;
}) => {
  const searchParams = await props.searchParams;

  const { articleId } = searchParams;

  if (!articleId) redirect('/articles');

  const sentences = await fetchSentences(articleId);
  const article = await fetchArticle(articleId);

  if (!article || !article.id) {
    redirect('/articles');
  }

  return (
    <div className='mx-auto max-w-md grid gap-4 mb-20'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <div>
        {new Date(article.date!).toLocaleDateString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        })}
      </div>
      <Link
        href={`/sentences/new?articleId=${article.id}`}
        className={buttonPrimary}
      >
        新規作成
      </Link>
      <SentenceList sentences={sentences} articleId={article.id} />
    </div>
  );
};

export default Page;
