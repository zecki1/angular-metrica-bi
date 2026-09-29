import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SupabaseService } from './core/supabase';

interface ItemNav {
  path: string;
  rotulo: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly supabase = inject(SupabaseService);

  readonly titulo = 'Metrica';
  protected readonly tagline = 'Painel administrativo corporativo — KPIs, roles e lazy loading';
  protected readonly semana = 4;
  readonly nav: ItemNav[] = [
    { path: '/login', rotulo: 'Login' },
    { path: '/overview', rotulo: 'Overview' },
    { path: '/clientes', rotulo: 'Clientes' },
    { path: '/relatorios', rotulo: 'Relatorios' },
    { path: '/admin', rotulo: 'Admin' },
  ];

  protected readonly menuAberto = signal(false);
  protected readonly modoDemo = this.supabase.modoDemo;
  protected readonly erro = this.supabase.erro;

  protected alternarMenu(): void {
    this.menuAberto.update((v) => !v);
  }
}
