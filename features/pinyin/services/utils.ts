import {
  CONSONANTS,
  ONE_CHAR_CONSONANTS,
  TWO_CHAR_CONSONANTS,
} from '../constants/consonants';
import {
  EXTROVERTED_VOWELS,
  INTROVERTED_VOWELS,
  MAJOR_VOWELS,
  VOWELS,
  VOWEL_PAIRS,
} from '../constants/vowels';
import { INITIAL_PINYIN, Pinyin } from '../schema';

export const isValidPinyin = ({ consonant, vowel, tone }: Pinyin) => {
  // tone, 母音がないのはダメ
  if (!tone || !vowel) return false;

  // 子音がつかなくてはいけない母音
  if (
    [...Object.keys(VOWEL_PAIRS), ...EXTROVERTED_VOWELS].includes(vowel) &&
    !consonant
  )
    return false;

  // 子音がついてはいけない母音
  if (
    [...Object.values(VOWEL_PAIRS), ...INTROVERTED_VOWELS].includes(vowel) &&
    !!consonant
  )
    return false;

  return true;
};

export const pinyinColor = (pinyin: string) => {
  if (ONE_CHAR_CONSONANTS.includes(pinyin)) {
    return 'bg-amber-100';
  }
  if (TWO_CHAR_CONSONANTS.includes(pinyin)) {
    return 'bg-rose-100';
  }
  if (INTROVERTED_VOWELS.includes(pinyin)) {
    return 'bg-purple-200';
  }
  if (EXTROVERTED_VOWELS.includes(pinyin)) {
    return 'bg-pink-200';
  }
  if (MAJOR_VOWELS.includes(pinyin)) {
    return 'bg-lime-100';
  }
  if (Object.keys(VOWEL_PAIRS).includes(pinyin)) {
    return 'bg-emerald-100';
  }

  if (Object.values(VOWEL_PAIRS).includes(pinyin)) {
    return 'bg-sky-100';
  }
  return '';
};

export const parsePinyinInput = (rawInput: string): Pinyin => {
  const input = rawInput.trim().toLowerCase();

  if (!input) {
    return INITIAL_PINYIN;
  }

  // 末尾の声調だけ許可
  const toneMatch = input.match(/[0-4]$/);

  const tone = toneMatch ? toneMatch[0] : '';

  const body = tone ? input.slice(0, -1) : input;

  // 声調が途中に存在したら invalid
  // sh2en / shen21 など
  if (/[0-4]/.test(body)) {
    return INITIAL_PINYIN;
  }

  if (!body) {
    return INITIAL_PINYIN;
  }

  // 子音あり
  for (const consonant of CONSONANTS) {
    if (!body.startsWith(consonant)) {
      continue;
    }

    const vowel = body.slice(consonant.length);

    // 入力途中
    // s / sh / zh
    if (!vowel && !tone) {
      return {
        consonant,
        vowel: '',
        tone: '',
      };
    }

    // sh2 のように母音なしで声調だけある
    if (!vowel && tone) {
      return INITIAL_PINYIN;
    }

    if (VOWELS.includes(vowel as any)) {
      return {
        consonant,
        vowel,
        tone,
      };
    }
  }

  // 子音なし
  // wang1 / ai4 / er2 など
  if (VOWELS.includes(body as any)) {
    return {
      consonant: '',
      vowel: body,
      tone,
    };
  }

  return INITIAL_PINYIN;
};
