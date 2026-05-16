'use client';

import { Hanzi } from '@/features/hanzi/schema';
import { getHanzisByPinyin } from '@/features/hanzi/services/client';
import { buildHanziGroups } from '@/features/hanzi/services/utils';

import PinyinBadge from '@/features/pinyin/components/PinyinBadge';
import { Pinyin } from '@/features/pinyin/schema';
import { parsePinyinInput } from '@/features/pinyin/services/utils';
import { useEffect, useState } from 'react';
import PinyinHanzi from '../PinyinHanzi';

const HanziList = ({
  pinyin,
  isZeroConsonant,
}: {
  pinyin: Pinyin;
  isZeroConsonant: boolean;
}) => {
  const [hanzis, setHanzis] = useState<Hanzi[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getHanzisByPinyin(
        pinyin,
        isZeroConsonant,
      );

      setHanzis(data?.hanzis || []);
      setError(error);
    };

    fetchData();
  }, [pinyin, isZeroConsonant]);

  const items = buildHanziGroups(hanzis);

  // グループに含まれる hanzi が多い順に並べる
  const orderedItems = items.sort((a, b) => b.hanzis.length - a.hanzis.length);

  return (
    <div className='space-y-4 overflow-y-scroll'>
      {error ? <div className='text-xs text-red-500'>{error}</div> : null}

      {orderedItems.map((item, index) => {
        // 四声順に並べる
        const orderedHanzis = item.hanzis.sort(
          (a, b) => parseInt(a.tone) - parseInt(b.tone),
        );

        return (
          <div
            key={index}
            className='grid grid-cols-[60px_1fr] items-center gap-2'
          >
            <div className='flex'>
              <PinyinBadge
                pinyin={parsePinyinInput(item.consonant + item.vowel)}
              />
            </div>

            <div className='flex flex-wrap gap-2'>
              {orderedHanzis.map((hanzi) => (
                <PinyinHanzi
                  key={hanzi.id}
                  form={hanzi.form}
                  pinyinStr={hanzi.consonant + hanzi.vowel + hanzi.tone}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HanziList;
