import Header from '@/components/header';
import { Article } from '@/features/article/schema';
import { formatArticleDate } from '@/features/article/services/date';
import { fetchLatestSentences } from '@/features/article/services/server';
import SentenceList from '@/features/sentence/components/SentenceList';
import { buttonPrimary } from '@/lib/styles';

import Link from 'next/link';

export default async function Home() {
  const sentences = await fetchLatestSentences();

  if (!sentences.length) {
    return null;
  }
  const article = sentences[0] as Article;

  return (
    <div>
      <nav>
        <Header />
      </nav>
      <main className='mx-auto max-w-md grid gap-4 w-full pt-10'>
        <div className='text-2xl font-bold'>{article?.title}</div>
        <div>{formatArticleDate(article.date)}</div>
        <Link
          href={`/articles/${article.id}/sentences/new`}
          className={buttonPrimary}
        >
          新規作成
        </Link>
        <SentenceList sentences={sentences} articleId={article.id!} />
      </main>
    </div>
  );
}
