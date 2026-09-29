import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../core/supabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {
  private readonly supabase = inject(SupabaseService);

  readonly titulo = 'Login';
  protected readonly descricao = 'Login por role (`admin@demo.dev`, `analyst@demo.dev`).';
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
