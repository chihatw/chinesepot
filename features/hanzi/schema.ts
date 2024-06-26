export interface Hanzi {
  id: number;
  consonant: string;
  form: string;
  tone: string;
  vowel: string;
  createdAt: Date;
}

export interface Hanzi_insert {
  consonant: string;
  form: string;
  tone: string;
  vowel: string;
}

export interface Hanzi_db_raw {
  id: number;
  consonant: string;
  form: string;
  tone: string;
  vowel: string;
  created_at: string;
}

export interface Hanzi_latest_sentence_count {
  id: number | null;
  form: string | null;
  consonant: string | null;
  vowel: string | null;
  tone: string | null;
  sentence_id: number | null;
  text: string | null;
  pinyin: string | null;
  count: number | null;
  created_at: Date | null;
}
