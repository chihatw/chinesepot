import { buildPinyin } from '@/features/pinyin/services/utils';
import { fontPinyin } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { buildToneMark } from '../services/utils';

const PinyinHanzi = ({
  form,
  count,
  pinyinStr,
}: {
  form: string;
  pinyinStr: string;

  count?: number;
}) => {
  const pinyin = buildPinyin(pinyinStr);
  const mark = buildToneMark(pinyin.tone);

  return (
    <div className='flex items-center gap-2'>
      <div className='relative flex flex-col items-center gap-y-0 '>
        <div
          className={cn(
            fontPinyin.className,
            'absolute text-destructive',
            mark === '•' ? '-top-3' : '-top-2'
          )}
        >
          {mark}
        </div>
        <div className='-mb-1.5 origin-center scale-75 text-xs text-gray-500  h-3'>
          {(pinyin?.consonant || '') + (pinyin?.vowel || '')}
        </div>
        <div className={'text-lg'}>{form}</div>
      </div>
      {typeof count === 'number' ? (
        <div className='pt-3 text-right text-xs font-extralight'>{count}</div>
      ) : null}
    </div>
  );
};

export default PinyinHanzi;
