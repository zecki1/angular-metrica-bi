import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    title: 'Login — Metrica',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginPage),
  },
  {
    path: 'overview',
    title: 'Overview — Metrica',
    loadComponent: () => import('./pages/overview/overview').then((m) => m.OverviewPage),
  },
  {
    path: 'clientes',
    title: 'Clientes — Metrica',
    loadComponent: () => import('./pages/clientes/clientes').then((m) => m.ClientesPage),
  },
  {
    path: 'relatorios',
    title: 'Relatorios — Metrica',
    loadComponent: () => import('./pages/relatorios/relatorios').then((m) => m.RelatoriosPage),
  },
  {
    path: 'admin',
    title: 'Admin — Metrica',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminPage),
  },
  { path: '**', redirectTo: 'login' },
];
