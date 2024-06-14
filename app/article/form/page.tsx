import ArticleForm from '@/features/article/components/ArticleForm';
import { Article } from '@/features/article/schema';
import { fetchArticle } from '@/features/article/services/server';

const ArticleFormPage = async ({
  searchParams: { id },
}: {
  searchParams: { id?: number };
}) => {
  // article は null の時もある
  // create の時は null, update の時 Article
  let article: null | Article = null;

  if (id) {
    const result = await fetchArticle(id);
    if (result) {
      article = result;
    }
  }
  return (
    <div className='mx-auto max-w-lg grid gap-8'>
      <div className='text-4xl font-extrabold'>Article Form</div>
      <ArticleForm article={article} />
    </div>
  );
};

export default ArticleFormPage;
