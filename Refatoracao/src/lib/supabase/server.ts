import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Fix: Made the function async to allow awaiting cookies() in Next.js 15
export async function createClient() {
  // Fix: Await cookies() call as it returns a Promise in Next.js 15
  const cookieStore = await cookies();

  // Cria um cliente Supabase configurado para SSR
  // Ele lê e escreve cookies automaticamente para manter a sessão
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Fix: Now correctly accesses sync methods on awaited ReadonlyRequestCookies
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Fix: Now correctly accesses sync methods on awaited ReadonlyRequestCookies
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Server Components não podem setar cookies, isso é tratado no Middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // Fix: Now correctly accesses sync methods on awaited ReadonlyRequestCookies
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Server Components não podem remover cookies
          }
        },
      },
    }
  );
}