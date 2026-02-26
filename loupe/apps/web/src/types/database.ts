// ─────────────────────────────────────────────────────────────────────────────
// Supabase Database Types
//
// This file is a hand-authored stub that matches the schema in:
// supabase/migrations/20260225_initial_schema.sql
//
// Once you have the Supabase CLI set up, replace this file with the
// auto-generated version by running:
//   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
//
// Keep this file in sync with any schema migrations.
// ─────────────────────────────────────────────────────────────────────────────

import type { LensSlug, SubscriptionStatus, ConfidenceLevel, Scenario } from "@loupe/types";

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          subscription_status: SubscriptionStatus;
          trial_started_at: string | null;
          trial_ends_at: string | null;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          subscription_status?: SubscriptionStatus;
          trial_started_at?: string | null;
          trial_ends_at?: string | null;
          stripe_customer_id?: string | null;
        };
        Update: {
          subscription_status?: SubscriptionStatus;
          trial_started_at?: string | null;
          trial_ends_at?: string | null;
          stripe_customer_id?: string | null;
        };
      };
      assessment_results: {
        Row: {
          id: string;
          user_id: string;
          completed_at: string;
          responses: Json;
          primary_lens: LensSlug;
          secondary_lens: LensSlug;
          shadow_flags: Json;
          growth_orientation: string | null;
          confidence_level: ConfidenceLevel;
          inflation_flag: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          completed_at?: string;
          responses: Json;
          primary_lens: LensSlug;
          secondary_lens: LensSlug;
          shadow_flags: Json;
          growth_orientation?: string | null;
          confidence_level?: ConfidenceLevel;
          inflation_flag?: boolean;
        };
        Update: never; // Results are immutable after creation
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_subscription_id: string;
          stripe_price_id: string;
          status: string;
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id: string;
          stripe_price_id: string;
          status: string;
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          current_period_start?: string;
          current_period_end?: string;
          cancel_at_period_end?: boolean;
          updated_at?: string;
        };
      };
      lens_saves: {
        Row: {
          id: string;
          user_id: string;
          lens_slug: LensSlug;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lens_slug: LensSlug;
          saved_at?: string;
        };
        Update: never;
      };
      relationship_saves: {
        Row: {
          id: string;
          user_id: string;
          lens_a: LensSlug;
          lens_b: LensSlug;
          scenario: Scenario;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lens_a: LensSlug;
          lens_b: LensSlug;
          scenario?: Scenario;
          saved_at?: string;
        };
        Update: never;
      };
    };
    Functions: {
      expire_trials: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
  };
}
