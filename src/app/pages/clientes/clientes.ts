import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../core/supabase';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class ClientesPage {
  private readonly supabase = inject(SupabaseService);

  readonly titulo = 'Clientes';
  protected readonly descricao = 'Tabela com filtros, ordenação, páginação e lazy loading.';
  protected readonly slugProjeto = 'metrica';

  protected readonly conectando = signal(false);
  protected readonly conexaoOk = signal<boolean | null>(null);

  /** Health-check contra o projeto Supabase compartilhado. */
  protected async verificar(): Promise<void> {
    this.conectando.set(true);
    this.conexaoOk.set(await this.supabase.verificarConexão());
    this.conectando.set(false);
  }
}
