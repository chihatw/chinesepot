import { Hanzi, Hanzi_db_raw } from '@/features/hanzi/schema';
import { Pinyin } from '@/features/pinyin/schema';

export const getHanzisByPinyin = async (
  pinyin: Pinyin,
  isZeroConsonant: boolean,
): Promise<{
  data?: { hanzis: Hanzi[] };
  error?: string;
}> => {
  try {
    const res = await fetch('/api/hanzis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinyin, isZeroConsonant }),
    });
    const json = await res.json();

    if (!res.ok) {
      return { error: json.error || 'failed to fetch hanzis' };
    }

    const hanzis_raw: Hanzi_db_raw[] = json.data?.hanzis || [];
    return {
      data: {
        hanzis: hanzis_raw.map((h) => ({
          ...h,
          createdAt: new Date(h.created_at),
        })),
      },
    };
  } catch (error: any) {
    return { error: error.message || 'failed to fetch hanzis' };
  }
};
