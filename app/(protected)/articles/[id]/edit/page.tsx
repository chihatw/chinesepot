import { buttonVariants } from '@/components/ui/button';
import { fetchArticle } from '@/features/article/services/server';
import { fetchHanziLatestSentenceCounts } from '@/features/hanzi/services/services';
import SentenceForm from '@/features/sentence/components/SentenceForm';

import Link from 'next/link';
import { redirect } from 'next/navigation';

const Page = async (props: {
  params: Promise<{ id: number }>; // url 内部の "/[id]/" の部分
  searchParams: Promise<{ text?: string }>; // url 後ろの "?text=..."の部分
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { id } = params;

  if (!id) redirect('/articles');

  const article = await fetchArticle(id);
  if (!article || !article.id) {
    redirect('/articles');
  }

  // input の値は searchParams で保持 '？text='
  const text = searchParams.text?.trim() || '';

  return (
    <div className='mx-auto max-w-md grid gap-8'>
      <div className='text-2xl font-bold'>{article.title}</div>
      <Link
        href={`/sentences?articleId=${article.id}`}
        className={buttonVariants()}
      >
        Back to Article
      </Link>
      <SentenceFormWrapper text={text} articleId={article.id} />
    </div>
  );
};

export default Page;

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
