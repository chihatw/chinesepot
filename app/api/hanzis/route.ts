import { VOWEL_PAIRS } from '@/features/pinyin/constants/vowels';
import { query } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { pinyin, isZeroConsonant } = body as {
    pinyin: {
      consonant: string;
      vowel: string;
      tone: string;
    };
    isZeroConsonant: boolean;
  };

  const hasVowel = !!pinyin.vowel;
  const hasConsonant = !!pinyin.consonant || isZeroConsonant;
  const hasTone = !!pinyin.tone;

  try {
    let res;

    if (hasConsonant && hasVowel && hasTone) {
      res = await query(
        'SELECT * FROM hanzis WHERE consonant = $1 AND vowel = $2 AND tone = $3',
        [pinyin.consonant, pinyin.vowel, pinyin.tone],
      );
    } else if (hasConsonant && hasVowel && !hasTone) {
      res = await query(
        'SELECT * FROM hanzis WHERE consonant = $1 AND vowel = $2',
        [pinyin.consonant, pinyin.vowel],
      );
    } else if (!hasConsonant && hasVowel && hasTone) {
      const vowels = [
        pinyin.vowel,
        `w${pinyin.vowel}`,
        `y${pinyin.vowel}`,
        VOWEL_PAIRS[pinyin.vowel],
      ].filter((vowel): vowel is string => !!vowel);
      const uniqueVowels = Array.from(new Set(vowels));
      const placeholders = uniqueVowels.map((_, i) => `$${i + 1}`).join(',');
      const sql = `SELECT * FROM hanzis WHERE vowel IN (${placeholders}) AND tone = $${
        uniqueVowels.length + 1
      }`;
      res = await query(sql, [...uniqueVowels, pinyin.tone]);
    } else {
      return NextResponse.json({ data: { hanzis: [] } }, { status: 200 });
    }

    return NextResponse.json({ data: { hanzis: res.rows } });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'failed to fetch' },
      { status: 500 },
    );
  }
}
