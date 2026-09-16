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
      amenities: {
        Row: {
          created_at: string
          id: string
          sort_order: number
          sub: string
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          sort_order?: number
          sub?: string
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          sort_order?: number
          sub?: string
          title?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      attractions: {
        Row: {
          created_at: string
          distance: string
          id: string
          name: string
          note: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          distance?: string
          id?: string
          name: string
          note?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          distance?: string
          id?: string
          name?: string
          note?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_code: string
          check_in: string
          check_out: string
          coupon_code: string | null
          created_at: string
          discount_amount: number
          guest_email: string
          guest_name: string
          guest_phone: string
          guests: number
          id: string
          id_number: string | null
          id_proof_type: string | null
          nights: number
          room_id: string
          special_requests: string | null
          status: string
          thali_qty: number
          total_amount: number
          whatsapp_number: string | null
        }
        Insert: {
          booking_code: string
          check_in: string
          check_out: string
          coupon_code?: string | null
          created_at?: string
          discount_amount?: number
          guest_email: string
          guest_name: string
          guest_phone: string
          guests?: number
          id?: string
          id_number?: string | null
          id_proof_type?: string | null
          nights?: number
          room_id: string
          special_requests?: string | null
          status?: string
          thali_qty?: number
          total_amount: number
          whatsapp_number?: string | null
        }
        Update: {
          booking_code?: string
          check_in?: string
          check_out?: string
          coupon_code?: string | null
          created_at?: string
          discount_amount?: number
          guest_email?: string
          guest_name?: string
          guest_phone?: string
          guests?: number
          id?: string
          id_number?: string | null
          id_proof_type?: string | null
          nights?: number
          room_id?: string
          special_requests?: string | null
          status?: string
          thali_qty?: number
          total_amount?: number
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          active: boolean
          code: string
          created_at: string
          discount_percent: number
          id: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          discount_percent: number
          id?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          discount_percent?: number
          id?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          answer?: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      partner_leads: {
        Row: {
          address: string | null
          amenities: string[]
          city: string
          created_at: string
          email: string | null
          id: string
          message: string | null
          owner_name: string
          phone: string
          photos: string[]
          property_name: string
          property_type: string
          rooms_count: number
          status: string
        }
        Insert: {
          address?: string | null
          amenities?: string[]
          city: string
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          owner_name: string
          phone: string
          photos?: string[]
          property_name: string
          property_type?: string
          rooms_count?: number
          status?: string
        }
        Update: {
          address?: string | null
          amenities?: string[]
          city?: string
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          owner_name?: string
          phone?: string
          photos?: string[]
          property_name?: string
          property_type?: string
          rooms_count?: number
          status?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          coming_soon: boolean
          created_at: string
          from_price: number
          id: string
          image_url: string | null
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          rating: number
          reviews: number
          slug: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          address?: string | null
          coming_soon?: boolean
          created_at?: string
          from_price?: number
          id?: string
          image_url?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          rating?: number
          reviews?: number
          slug: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          address?: string | null
          coming_soon?: boolean
          created_at?: string
          from_price?: number
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          rating?: number
          reviews?: number
          slug?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      reviews: {
        Row: {
          city: string
          created_at: string
          id: string
          name: string
          rating: number
          sort_order: number
          stay: string
          text: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          city?: string
          created_at?: string
          id?: string
          name: string
          rating?: number
          sort_order?: number
          stay?: string
          text?: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          name?: string
          rating?: number
          sort_order?: number
          stay?: string
          text?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      rooms: {
        Row: {
          badge: string | null
          created_at: string
          description: string
          highlights: string[]
          id: string
          image_url: string | null
          name: string
          occupancy: string
          price: number
          size: string
          slug: string
          sort_order: number
          subtitle: string
          tags: string[]
          updated_at: string
          visible: boolean
        }
        Insert: {
          badge?: string | null
          created_at?: string
          description?: string
          highlights?: string[]
          id?: string
          image_url?: string | null
          name: string
          occupancy?: string
          price?: number
          size?: string
          slug: string
          sort_order?: number
          subtitle?: string
          tags?: string[]
          updated_at?: string
          visible?: boolean
        }
        Update: {
          badge?: string | null
          created_at?: string
          description?: string
          highlights?: string[]
          id?: string
          image_url?: string | null
          name?: string
          occupancy?: string
          price?: number
          size?: string
          slug?: string
          sort_order?: number
          subtitle?: string
          tags?: string[]
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string
          alt_phone: string
          email: string
          id: number
          phone: string
          updated_at: string
          whatsapp_message: string
        }
        Insert: {
          address?: string
          alt_phone?: string
          email?: string
          id?: number
          phone?: string
          updated_at?: string
          whatsapp_message?: string
        }
        Update: {
          address?: string
          alt_phone?: string
          email?: string
          id?: number
          phone?: string
          updated_at?: string
          whatsapp_message?: string
        }
        Relationships: []
      }
      thali_orders: {
        Row: {
          created_at: string
          guest_name: string
          id: string
          items: string
          mobile_number: string
          property_name: string
          room_number: string
          status: string
          total_amount: number
        }
        Insert: {
          created_at?: string
          guest_name: string
          id?: string
          items: string
          mobile_number: string
          property_name: string
          room_number: string
          status?: string
          total_amount?: number
        }
        Update: {
          created_at?: string
          guest_name?: string
          id?: string
          items?: string
          mobile_number?: string
          property_name?: string
          room_number?: string
          status?: string
          total_amount?: number
        }
        Relationships: []
      }
      thalis: {
        Row: {
          badge: string | null
          created_at: string
          id: string
          items: string[]
          name: string
          price: number
          slug: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          badge?: string | null
          created_at?: string
          id?: string
          items?: string[]
          name: string
          price?: number
          slug: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          badge?: string | null
          created_at?: string
          id?: string
          items?: string[]
          name?: string
          price?: number
          slug?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
