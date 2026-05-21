'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState, useTransition } from 'react';
import { buttonPrimary, inputStyle } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Article, Article_db } from '../schema';
import { addArticle, updateArticle } from '../services/actions';

interface FormValue {
  title: string;
  date: string;
  isValid: boolean;
  error: string;
}

const getTodayString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ArticleForm = ({ article }: { article?: Article }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<FormValue>({
    title: article?.title || '',
    date: article?.date || getTodayString(),
    isValid: !!article?.title,
    error: '',
  });

  const add = () => {
    const article: Article_db = {
      title: value.title,
      date: value.date,
    };

    startTransition(async () => {
      const { error } = await addArticle(article);
      if (error) {
        setValue((prev) => ({ ...prev, error }));
        return;
      }
      // エラーがなければ、リストに戻る
      router.push('/articles');
    });
  };

  const update = (article: Article) => {
    startTransition(async () => {
      const { error } = await updateArticle({
        ...article,
        title: value.title,
        date: value.date,
      });
      if (error) {
        setValue((prev) => ({ ...prev, error }));
        return;
      }
      // エラーがなければ、リストに戻る
      router.push('/articles');
    });
  };

  const handleClick = async () => {
    !article ? add() : update(article);
  };

  return (
    <div className='grid gap-10'>
      <input
        autoFocus
        className={inputStyle}
        placeholder='title'
        value={value.title}
        onChange={(e) => {
          const title = e.target.value;
          setValue((prev) => ({
            ...prev,
            title,
            isValid: !!title,
            error: '',
          }));
        }}
      />
      <DatePicker value={value} setValue={setValue} />
      <button
        className={cn(buttonPrimary, 'w-full')}
        disabled={!value.isValid || isPending}
        onClick={handleClick}
      >
        Submit
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </button>
      {value.error ? <span className='text-red-500'>{value.error}</span> : null}
    </div>
  );
};

export default ArticleForm;

const DatePicker = ({
  value,
  setValue,
}: {
  value: FormValue;
  setValue: (value: SetStateAction<FormValue>) => void;
}) => {
  return (
    <input
      type='date'
      className={inputStyle}
      value={value.date}
      onChange={(e) => {
        const v = e.target.value; // "YYYY-MM-DD"
        if (!v) return;

        setValue((prev) => ({ ...prev, date: v, error: '' }));
      }}
    />
  );
};
