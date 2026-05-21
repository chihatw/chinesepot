export interface Article {
  id: number | null;
  title: string | null;
  date: string | null;
  created_at: Date | null;
}

export interface Article_db {
  title: string;
  date: string;
}
