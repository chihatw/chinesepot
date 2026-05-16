import { Hanzi, Hanzi_db_raw } from '@/features/hanzi/schema';
import { VOWEL_PAIRS } from '@/features/pinyin/constants/vowels';
import { Pinyin } from '@/features/pinyin/schema';
import { createClient } from '@/utils/supabase/client';

export const getHanzisByPinyin = async (
  pinyin: Pinyin,
  isZeroConsonant: boolean,
): Promise<{
  data?: { hanzis: Hanzi[] };
  error?: string;
}> => {
  let hanzis_raw: Hanzi_db_raw[] = [];
  const supabase = createClient();

  const hasVowel = !!pinyin.vowel;
  const hasConsonant = !!pinyin.consonant || isZeroConsonant;
  const hasTone = !!pinyin.tone;

  if (hasConsonant && hasVowel && hasTone) {
    const { data, error } = await supabase
      .from('hanzis')
      .select('*')
      .eq('consonant', pinyin.consonant)
      .eq('vowel', pinyin.vowel)
      .eq('tone', pinyin.tone);

    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data || [];
  } else if (hasConsonant && hasVowel && !hasTone) {
    const { data, error } = await supabase
      .from('hanzis')
      .select('*')
      .eq('consonant', pinyin.consonant)
      .eq('vowel', pinyin.vowel);

    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data || [];
  } else if (!hasConsonant && hasVowel && hasTone) {
    const vowels = [
      ...new Set([
        pinyin.vowel,
        `w${pinyin.vowel}`,
        `y${pinyin.vowel}`,
        VOWEL_PAIRS[pinyin.vowel],
      ].filter((vowel): vowel is string => !!vowel)),
    ];

    const { data, error } = await supabase
      .from('hanzis')
      .select('*')
      .in('vowel', vowels)
      .eq('tone', pinyin.tone);

    if (error) {
      return { error: error.message };
    }
    hanzis_raw = data || [];
  }

  return {
    data: {
      hanzis: hanzis_raw.map((h) => ({
        ...h,
        createdAt: new Date(h.created_at),
      })),
    },
  };
};
