import { Injectable, computed, signal } from '@angular/core';
import type { SupabaseClient } from '@supabase/supabase-js';

import { config, temSupabase } from './config';

const CHAVE_CLIENTE = 'zecki1-supabase';

/**
 * Cliente Supabase carregado sob demanda.
 *
 * O SDK (`@supabase/supabase-js`) é pesado (~870 kB). Em modo demo — o
 * padrão quando não há `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` — o app
 * funciona só com o seed local e não precisa do backend, então o `import()`
 * dinâmico garante que o SDK nunca entre no bundle inicial.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly _pronto = signal(false);
  private readonly _erro = signal<string | null>(null);

  readonly pronto = this._pronto.asReadonly();
  readonly erro = this._erro.asReadonly();
  readonly modoDemo = computed(() => !temSupabase());

  private cached: Promise<SupabaseClient | null> | null = null;

  constructor() {
    if (!temSupabase()) {
      this._erro.set(
        'Supabase nao configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env. O app segue em modo demo.',
      );
      return;
    }
  }

  /** Cliente (lazy). Retorna `null` em modo demo. */
  getCliente(): Promise<SupabaseClient | null> {
    if (!temSupabase()) return Promise.resolve(null);
    if (!this.cached) {
      this.cached = import('@supabase/supabase-js').then(({ createClient }) => {
        const client = createClient(config.supabaseUrl, config.supabaseAnonKey, {
          auth: { storageKey: CHAVE_CLIENTE, persistSession: true, autoRefreshToken: true },
        });
        this._pronto.set(true);
        return client;
      });
    }
    return this.cached;
  }

  /** True quando o projeto respondeu o ping de auth — usado no health-check. */
  async verificarConexão(): Promise<boolean> {
    const cliente = await this.getCliente();
    if (!cliente) return false;
    const { error } = await cliente.auth.getSession();
    return !error;
  }
}
