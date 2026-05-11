import { fetchArticle } from '@/features/article/services/server';
import SentenceForm from '@/features/sentence/components/SentenceForm';
import { buttonPrimary } from '@/lib/styles';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const Page = async (props: {
  searchParams: Promise<{ articleId?: string }>;
}) => {
  const searchParams = await props.searchParams;

  const articleId = Number(searchParams.articleId);

  if (!Number.isInteger(articleId)) redirect('/articles');

  const article = await fetchArticle(articleId);
  if (!article || !article.id) {
    redirect('/articles');
  }

  return (
    <div className='mx-auto max-w-md grid gap-8 mb-20'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <Link
        href={`/sentences?articleId=${article.id}`}
        className={buttonPrimary}
      >
        Back to Article
      </Link>
      <SentenceForm articleId={article.id} />
    </div>
  );
};

export default Page;
