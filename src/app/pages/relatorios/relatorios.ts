import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../core/supabase';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class RelatoriosPage {
  private readonly supabase = inject(SupabaseService);

  readonly titulo = 'Relatorios';
  protected readonly descricao = 'Geração de relatório por periodo.';
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
