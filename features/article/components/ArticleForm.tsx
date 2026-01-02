'use client';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState, useTransition } from 'react';
import { Article, Article_db } from '../schema';
import { addArticle, updateArticle } from '../services/actions';

interface FormValue {
  title: string;
  date: Date;
  isValid: boolean;
  error: string;
}

const ArticleForm = ({ article }: { article?: Article }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<FormValue>({
    title: article?.title || '',
    date: article ? new Date(article.date!) : new Date(),
    isValid: !!article?.title,
    error: '',
  });

  const add = () => {
    const article: Article_db = {
      title: value.title,
      date: format(value.date, 'yyyy-MM-dd'),
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
      <Input
        autoFocus
        className='bg-white'
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
      <Button
        className='w-full'
        disabled={!value.isValid || isPending}
        onClick={handleClick}
      >
        Submit
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
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
  // input[type=date] は "YYYY-MM-DD"
  const yyyyMmDd = format(value.date, 'yyyy-MM-dd');

  return (
    <Input
      type='date'
      className='bg-white'
      value={yyyyMmDd}
      onChange={(e) => {
        const v = e.target.value; // "YYYY-MM-DD"
        if (!v) return;

        // ローカル日付として Date を作る（UTCズレ回避）
        const [y, m, d] = v.split('-').map(Number);
        const date = new Date(y, (m ?? 1) - 1, d ?? 1);

        setValue((prev) => ({ ...prev, date, error: '' }));
      }}
    />
  );
};
