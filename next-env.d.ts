// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
/// <reference types="next" />
/// <reference types="next/types/global" />

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_KEY: string;
    SUPABASE_AUTH_URL: string;
    SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_AUTH_EMAIL: string;
  }
}
