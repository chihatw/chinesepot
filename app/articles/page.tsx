import ArticleList from '@/features/article/components/ArticleList';
import { Article } from '@/features/article/schema';
import { buttonPrimary } from '@/lib/styles';
import { query } from '@/utils/db';
import Link from 'next/link';

const Page = async () => {
  const res = await query('SELECT * FROM articles ORDER BY date DESC LIMIT 3');
  const articles = res.rows as Article[];

  return (
    <div className='mx-auto max-w-lg grid gap-8 '>
      <div className='text-4xl font-extrabold'>文章一覧</div>
      <Link href={'/articles/new'} className={buttonPrimary}>
        <span>新規文章作成</span>
      </Link>
      <ArticleList articles={articles} />
    </div>
  );
};

export default Page;
