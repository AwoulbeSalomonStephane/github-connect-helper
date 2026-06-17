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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          address: string | null
          category: string | null
          city: string
          cover_image: string | null
          created_at: string
          description: string | null
          ends_at: string | null
          featured: boolean
          gallery: Json
          id: string
          latitude: number | null
          longitude: number | null
          organizer_id: string
          slug: string | null
          starts_at: string
          status: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at: string
          venue: string | null
          video_url: string | null
        }
        Insert: {
          address?: string | null
          category?: string | null
          city: string
          cover_image?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          featured?: boolean
          gallery?: Json
          id?: string
          latitude?: number | null
          longitude?: number | null
          organizer_id: string
          slug?: string | null
          starts_at: string
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          updated_at?: string
          venue?: string | null
          video_url?: string | null
        }
        Update: {
          address?: string | null
          category?: string | null
          city?: string
          cover_image?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          featured?: boolean
          gallery?: Json
          id?: string
          latitude?: number | null
          longitude?: number | null
          organizer_id?: string
          slug?: string | null
          starts_at?: string
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          updated_at?: string
          venue?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["favorite_kind"]
          target_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: Database["public"]["Enums"]["favorite_kind"]
          target_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["favorite_kind"]
          target_id?: string
          user_id?: string
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          followed_id: string
          follower_id: string
        }
        Insert: {
          created_at?: string
          followed_id: string
          follower_id: string
        }
        Update: {
          created_at?: string
          followed_id?: string
          follower_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      organizer_applications: {
        Row: {
          admin_notes: string | null
          bio: string | null
          brand_name: string
          city: string | null
          created_at: string
          id: string
          phone: string | null
          social_links: Json | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          bio?: string | null
          brand_name: string
          city?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          social_links?: Json | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          bio?: string | null
          brand_name?: string
          city?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          social_links?: Json | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string
          display_name: string | null
          id: string
          locale: string
          phone: string | null
          updated_at: string
          username: string | null
          verified: boolean
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          locale?: string
          phone?: string | null
          updated_at?: string
          username?: string | null
          verified?: boolean
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          locale?: string
          phone?: string | null
          updated_at?: string
          username?: string | null
          verified?: boolean
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["favorite_kind"]
          rating: number
          target_id: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          kind: Database["public"]["Enums"]["favorite_kind"]
          rating: number
          target_id: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["favorite_kind"]
          rating?: number
          target_id?: string
          user_id?: string
        }
        Relationships: []
      }
      ticket_purchases: {
        Row: {
          created_at: string
          event_id: string
          id: string
          organizer_payout_xaf: number
          payment_provider: string | null
          payment_ref: string | null
          platform_fee_xaf: number
          qr_code: string | null
          quantity: number
          status: Database["public"]["Enums"]["purchase_status"]
          ticket_type_id: string
          total_xaf: number
          unit_price_xaf: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          organizer_payout_xaf: number
          payment_provider?: string | null
          payment_ref?: string | null
          platform_fee_xaf: number
          qr_code?: string | null
          quantity: number
          status?: Database["public"]["Enums"]["purchase_status"]
          ticket_type_id: string
          total_xaf: number
          unit_price_xaf: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          organizer_payout_xaf?: number
          payment_provider?: string | null
          payment_ref?: string | null
          platform_fee_xaf?: number
          qr_code?: string | null
          quantity?: number
          status?: Database["public"]["Enums"]["purchase_status"]
          ticket_type_id?: string
          total_xaf?: number
          unit_price_xaf?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_purchases_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_purchases_ticket_type_id_fkey"
            columns: ["ticket_type_id"]
            isOneToOne: false
            referencedRelation: "ticket_types"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_types: {
        Row: {
          created_at: string
          description: string | null
          event_id: string
          id: string
          name: string
          price_xaf: number
          quantity: number
          sold: number
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_id: string
          id?: string
          name: string
          price_xaf: number
          quantity: number
          sold?: number
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          event_id?: string
          id?: string
          name?: string
          price_xaf?: number
          quantity?: number
          sold?: number
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      villa_bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          guest_id: string
          guests: number
          id: string
          message: string | null
          nights: number
          owner_payout_xaf: number
          payment_provider: string | null
          payment_ref: string | null
          platform_fee_xaf: number
          status: Database["public"]["Enums"]["booking_status"]
          total_xaf: number
          updated_at: string
          villa_id: string
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          guest_id: string
          guests?: number
          id?: string
          message?: string | null
          nights: number
          owner_payout_xaf: number
          payment_provider?: string | null
          payment_ref?: string | null
          platform_fee_xaf: number
          status?: Database["public"]["Enums"]["booking_status"]
          total_xaf: number
          updated_at?: string
          villa_id: string
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          guest_id?: string
          guests?: number
          id?: string
          message?: string | null
          nights?: number
          owner_payout_xaf?: number
          payment_provider?: string | null
          payment_ref?: string | null
          platform_fee_xaf?: number
          status?: Database["public"]["Enums"]["booking_status"]
          total_xaf?: number
          updated_at?: string
          villa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "villa_bookings_villa_id_fkey"
            columns: ["villa_id"]
            isOneToOne: false
            referencedRelation: "villas"
            referencedColumns: ["id"]
          },
        ]
      }
      villa_owner_applications: {
        Row: {
          admin_notes: string | null
          city: string | null
          created_at: string
          id: string
          legal_name: string
          notes: string | null
          phone: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string
          villa_count: number | null
        }
        Insert: {
          admin_notes?: string | null
          city?: string | null
          created_at?: string
          id?: string
          legal_name: string
          notes?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id: string
          villa_count?: number | null
        }
        Update: {
          admin_notes?: string | null
          city?: string | null
          created_at?: string
          id?: string
          legal_name?: string
          notes?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string
          villa_count?: number | null
        }
        Relationships: []
      }
      villas: {
        Row: {
          address: string | null
          amenities: Json
          bedrooms: number
          capacity: number
          city: string
          cover_image: string | null
          created_at: string
          description: string | null
          featured: boolean
          id: string
          latitude: number | null
          longitude: number | null
          owner_id: string
          photos: Json
          price_per_night_xaf: number
          slug: string | null
          status: Database["public"]["Enums"]["villa_status"]
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          amenities?: Json
          bedrooms?: number
          capacity?: number
          city: string
          cover_image?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          latitude?: number | null
          longitude?: number | null
          owner_id: string
          photos?: Json
          price_per_night_xaf: number
          slug?: string | null
          status?: Database["public"]["Enums"]["villa_status"]
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          amenities?: Json
          bedrooms?: number
          capacity?: number
          city?: string
          cover_image?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          latitude?: number | null
          longitude?: number | null
          owner_id?: string
          photos?: Json
          price_per_night_xaf?: number
          slug?: string | null
          status?: Database["public"]["Enums"]["villa_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "organizer" | "villa_owner" | "admin"
      application_status: "pending" | "approved" | "rejected"
      booking_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "cancelled"
        | "completed"
      event_status: "draft" | "pending" | "approved" | "rejected" | "cancelled"
      favorite_kind: "event" | "villa"
      purchase_status: "pending" | "paid" | "cancelled" | "refunded"
      villa_status: "draft" | "pending" | "approved" | "rejected" | "inactive"
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
    Enums: {
      app_role: ["user", "organizer", "villa_owner", "admin"],
      application_status: ["pending", "approved", "rejected"],
      booking_status: [
        "pending",
        "accepted",
        "rejected",
        "cancelled",
        "completed",
      ],
      event_status: ["draft", "pending", "approved", "rejected", "cancelled"],
      favorite_kind: ["event", "villa"],
      purchase_status: ["pending", "paid", "cancelled", "refunded"],
      villa_status: ["draft", "pending", "approved", "rejected", "inactive"],
    },
  },
} as const
