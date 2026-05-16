import ArticleList from '@/features/article/components/ArticleList';
import { Article } from '@/features/article/schema';
import { buttonPrimary } from '@/lib/styles';
import { createClient } from '@/utils/supabase/server';

import Link from 'next/link';

const Page = async () => {
  const supabase = await createClient();

  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false })
    .limit(3);

  const articles = data as unknown as Article[];

  return (
    <div className='mx-auto max-w-lg grid gap-8 '>
      <div className='text-4xl font-extrabold'>文章一覧</div>
      <Link
        href={'/articles/new'}
        className={buttonPrimary}
      >
        <span>新規文章作成</span>
      </Link>
      <ArticleList articles={articles} />
    </div>
  );
};

export default Page;
