import ArticleForm from '@/features/article/components/ArticleForm';

const Page = async () => {
  return (
    <div className='mx-auto max-w-lg grid gap-8'>
      <div className='text-4xl font-extrabold'>Article 作成</div>
      <ArticleForm />
    </div>
  );
};

export default Page;
