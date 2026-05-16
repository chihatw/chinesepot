'use client';

import useDebouce from '@/hooks/useDebounce';

import PinyinBadge from '@/features/pinyin/components/PinyinBadge';
import { Pinyin, PinyinFilter } from '@/features/pinyin/schema';
import {
  buildPinyin,
  buildPinyinFilter,
} from '@/features/pinyin/services/utils';
import { buttonPrimary, inputStyle } from '@/lib/styles';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { addHanzi } from '../../actions';
import PinyinHanzi from '../PinyinHanzi';
import HanziList from './HanziList';

type Props = {
  form: string;
  articleId: number;
  closeDialog: () => void;
};

const INITIAL_PINYIN: Pinyin = {
  vowel: '',
  consonant: '',
  tone: '',
};

const INITIAL_FILTER: PinyinFilter = {
  vowels: [],
  consonants: [],
  tone: '',
};

const hasPinyin = (pinyin: Pinyin) => {
  return Boolean(pinyin.consonant + pinyin.vowel + pinyin.tone);
};

const isIncompletePinyin = (pinyin: Pinyin) => {
  if (!hasPinyin(pinyin)) return false;

  return !pinyin.vowel || !pinyin.tone;
};

const buildPinyinText = (pinyin: Pinyin) => {
  return pinyin.consonant + pinyin.vowel + pinyin.tone;
};

const HanziForm = ({ form, articleId, closeDialog }: Props) => {
  const [input, setInput] = useState('');
  const [pinyin, setPinyin] = useState<Pinyin>(INITIAL_PINYIN);
  const [filter, setFilter] = useState<PinyinFilter>(INITIAL_FILTER);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [error, setError] = useState('');

  const debouncedInput = useDebouce(input, 300);
  const [isPending, startTransition] = useTransition();

  const pinyinText = useMemo(() => buildPinyinText(pinyin), [pinyin]);
  const submitLabel = pinyinText ? '登錄' : '記号';

  useEffect(() => {
    if (!debouncedInput) {
      setPinyin(INITIAL_PINYIN);
      setFilter(INITIAL_FILTER);
      setIsSubmitDisabled(false);
      setError('');
      return;
    }

    const nextPinyin = buildPinyin(debouncedInput);
    const nextFilter = buildPinyinFilter(debouncedInput);

    setPinyin(nextPinyin);
    setFilter(nextFilter);
    setIsSubmitDisabled(isIncompletePinyin(nextPinyin));
    setError('');
  }, [debouncedInput]);

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await addHanzi({ ...pinyin, form }, articleId);

      if (result.error) {
        setError(result.error);
        return;
      }

      closeDialog();
    });
  };

  return (
    <div className='grid h-[calc(100vh-200px)] grid-rows-[auto_auto_auto_auto_1fr] space-y-4'>
      <div className='grid grid-cols-[120px_150px_1fr_auto] items-center gap-2'>
        <input
          className={inputStyle}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='拼音'
        />

        <div className='flex flex-col items-center gap-2'>
          <PinyinBadge pinyin={pinyin} />

          <PinyinHanzi pinyinStr={pinyinText} form={form} />
        </div>

        <button
          className={buttonPrimary}
          disabled={isSubmitDisabled || isPending}
          onClick={handleSubmit}
        >
          {submitLabel}
          {isPending ? <Loader2 className='animate-spin' /> : null}
        </button>
      </div>

      {error ? <span className='text-red-500'>{error}</span> : null}

      <HanziList pinyinFilter={filter} />
    </div>
  );
};

export default HanziForm;
