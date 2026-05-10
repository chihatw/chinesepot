import PinyinHanzi from '@/features/hanzi/components/PinyinHanzi';

import { Hanzi_latest_sentence_count } from '@/features/hanzi/schema';
import SentenceLine from '@/features/sentence/components/SentenceLine';

const RadioGroupHanziMonitor = ({
  hanzi,
  name,
  selectedHanzi,
  onChange,
}: {
  hanzi: Hanzi_latest_sentence_count;
  name: string;
  selectedHanzi: string;
  onChange: (value: string) => void;
}) => {
  const value = String(hanzi.id);

  return (
    <div className='flex items-center gap-2 '>
      <div className='grid grid-cols-[auto_36px] items-center gap-2 rounded bg-white px-4 py-2 h-[54px]'>
        <input
          type='radio'
          name={name}
          value={value}
          checked={selectedHanzi === value}
          onChange={(event) => onChange(event.target.value)}
          className='h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400'
        />
        <div className='grid place-items-center '>
          <PinyinHanzi
            form={hanzi.form!}
            pinyinStr={hanzi.consonant! + hanzi.vowel! + hanzi.tone}
            count={hanzi.count!}
          />
        </div>
      </div>

      {hanzi.sentence_id ? (
        <SentenceLine
          sentence={{
            text: hanzi.text || '',
            pinyin: hanzi.pinyin || '',
            sentence_id: hanzi.sentence_id,
          }}
        />
      ) : null}
    </div>
  );
};

export default RadioGroupHanziMonitor;
