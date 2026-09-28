import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../core/supabase';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class OverviewPage {
  private readonly supabase = inject(SupabaseService);

  protected readonly titulo = 'Overview';
  protected readonly descricao = 'KPIs com delta vs. periodo e charts.';
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
