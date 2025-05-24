import { buttonVariants } from '@/components/ui/button';
import { fetchArticle } from '@/features/article/services/server';
import { fetchHanziLatestSentenceCounts } from '@/features/hanzi/services/services';
import SentenceForm from '@/features/sentence/components/SentenceForm';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const ArticleSentenceFormPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: number }; // url 内部の "/[id]/" の部分
  searchParams: { text?: string }; // url 後ろの "?text=..."の部分
}) => {
  if (!id) redirect('/article/list');

  const article = await fetchArticle(id);
  if (!article || !article.id) {
    redirect('/article/list');
  }

  // input の値は searchParams で保持 '？text='
  const text = searchParams.text?.trim() || '';

  return (
    <div className='mx-auto max-w-md grid gap-8'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <Link href={`/article/${article.id}`} className={buttonVariants()}>
        Back to Article
      </Link>
      <SentenceFormWrapper text={text} articleId={article.id} />
    </div>
  );
};

export default ArticleSentenceFormPage;

const SentenceFormWrapper = async ({
  text,
  articleId,
}: {
  text: string;
  articleId: number;
}) => {
  const hanzis = await fetchHanziLatestSentenceCounts(text);
  return <SentenceForm text={text} hanzis={hanzis} articleId={articleId} />;
};
