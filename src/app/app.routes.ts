import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { OverviewPage } from './pages/overview/overview';
import { ClientesPage } from './pages/clientes/clientes';
import { RelatoriosPage } from './pages/relatorios/relatorios';
import { AdminPage } from './pages/admin/admin';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPage, title: 'Login — Metrica' },
  { path: 'overview', component: OverviewPage, title: 'Overview — Metrica' },
  { path: 'clientes', component: ClientesPage, title: 'Clientes — Metrica' },
  { path: 'relatorios', component: RelatoriosPage, title: 'Relatorios — Metrica' },
  { path: 'admin', component: AdminPage, title: 'Admin — Metrica' },
  { path: '**', redirectTo: 'login' },
];
