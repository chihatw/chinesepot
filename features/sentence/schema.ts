export interface Sentence {
  sentence_id: number;
  text?: string;
  pinyin?: string;
}

export interface SentenceView {
  created_at: Date | null;
  date: Date | null;
  id: number | null;
  index: number | null;
  pinyin: string | null;
  sentence_id: number | null;
  text: string | null;
  title: string | null;
}
