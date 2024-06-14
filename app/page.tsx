import { buttonVariants } from '@/components/ui/button';
import { Article } from '@/features/article/schema';
import { fetchLatestSentences } from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';

import Link from 'next/link';

export default async function Home() {
  const sentences = await fetchLatestSentences();

  if (!sentences.length) {
    return null;
  }
  const article = sentences[0] as Article;

  return (
    <main className='mx-auto max-w-md grid gap-4'>
      <div className='text-2xl font-bold'>{article?.title}</div>
      <div>
        {new Date(article.date!).toLocaleDateString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        })}
      </div>
      <Link href={`/article/${article.id}/form`} className={buttonVariants()}>
        Create new sentence
      </Link>
      <SentenceList sentences={sentences} articleId={article.id!} />
    </main>
  );
}
