export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          created_at: string
          date: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      hanzis: {
        Row: {
          consonant: string
          created_at: string
          form: string
          id: number
          tone: string
          vowel: string
        }
        Insert: {
          consonant?: string
          created_at?: string
          form: string
          id?: number
          tone?: string
          vowel?: string
        }
        Update: {
          consonant?: string
          created_at?: string
          form?: string
          id?: number
          tone?: string
          vowel?: string
        }
        Relationships: []
      }
      sentence_hanzis: {
        Row: {
          created_at: string
          hanzi_id: number
          id: number
          offset: number
          sentence_id: number
        }
        Insert: {
          created_at?: string
          hanzi_id: number
          id?: number
          offset: number
          sentence_id: number
        }
        Update: {
          created_at?: string
          hanzi_id?: number
          id?: number
          offset?: number
          sentence_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins_latest"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "hanzi_latest_sentence_counts"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "hanzi_latest_sentences"
            referencedColumns: ["sentence_id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentence_text_pinyins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentence_hanzis_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentences"
            referencedColumns: ["id"]
          },
        ]
      }
      sentences: {
        Row: {
          article_id: number
          created_at: string
          id: number
          index: number
        }
        Insert: {
          article_id: number
          created_at?: string
          id?: number
          index: number
        }
        Update: {
          article_id?: number
          created_at?: string
          id?: number
          index?: number
        }
        Relationships: [
          {
            foreignKeyName: "sentences_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentences_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "article_sentence_text_pinyins_latest"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sentences_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      article_sentence_text_pinyins: {
        Row: {
          created_at: string | null
          date: string | null
          id: number | null
          index: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          title: string | null
        }
        Relationships: []
      }
      article_sentence_text_pinyins_latest: {
        Row: {
          created_at: string | null
          date: string | null
          id: number | null
          index: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          title: string | null
        }
        Relationships: []
      }
      hanzi_counts: {
        Row: {
          consonant: string | null
          count: number | null
          created_at: string | null
          form: string | null
          id: number | null
          tone: string | null
          vowel: string | null
        }
        Relationships: []
      }
      hanzi_latest_sentence_counts: {
        Row: {
          consonant: string | null
          count: number | null
          created_at: string | null
          form: string | null
          id: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          tone: string | null
          vowel: string | null
        }
        Relationships: []
      }
      hanzi_latest_sentences: {
        Row: {
          article_id: number | null
          consonant: string | null
          created_at: string | null
          form: string | null
          id: number | null
          pinyin: string | null
          sentence_id: number | null
          text: string | null
          tone: string | null
          vowel: string | null
        }
        Relationships: []
      }
      sentence_text_pinyins: {
        Row: {
          article_id: number | null
          created_at: string | null
          id: number | null
          index: number | null
          pinyin: string | null
          text: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      insert_sentence: {
        Args: { _article_id: number; _hanzi_ids: number[]; _offsets: number[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
