import { cn } from '@/lib/utils';

import { Pinyin } from '../schema';

import { isValidPinyin, pinyinColor } from '../services/utils';

const PinyinBadge = ({ pinyin }: { pinyin: Pinyin }) => {
  if (!(pinyin.consonant + pinyin.vowel + pinyin.vowel)) return null;

  return (
    <div
      className={cn(
        isValidPinyin(pinyin) ? 'border-solid' : 'border-dashed',
        'flex items-center overflow-hidden rounded border-2 border-stone-400 '
      )}
    >
      {pinyin.consonant ? (
        <span
          className={cn(pinyinColor(pinyin.consonant), 'm-0 rounded-none px-1')}
        >
          {pinyin.consonant}
        </span>
      ) : null}
      {pinyin.vowel ? (
        <span
          className={cn(pinyinColor(pinyin.vowel), 'm-0 rounded-none px-1')}
        >
          {pinyin.vowel}
        </span>
      ) : null}
      {pinyin.tone ? (
        <span className='m-0 rounded-none bg-white px-1'>
          {pinyin.tone}
        </span>
      ) : null}
    </div>
  );
};

export default PinyinBadge;
