import ArticleForm from '@/features/article/components/ArticleForm';
import { Article } from '@/features/article/schema';
import { fetchArticle } from '@/features/article/services/server';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  if (!id) redirect('/articles');

  let article: Article | undefined;
  article = await fetchArticle(id);

  if (!article) redirect('/articles');

  return (
    <div className='mx-auto max-w-lg grid gap-8'>
      <div className='text-4xl font-extrabold'>Article 変更</div>
      <ArticleForm article={article} />
    </div>
  );
};

export default Page;
