import { Routes } from '@angular/router';
import login from './pages/login';
import overview from './pages/overview';
import clientes from './pages/clientes';
import relatorios from './pages/relatorios';
import admin from './pages/admin';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: login, title: 'Login — Metrica' },
  { path: 'overview', component: overview, title: 'Overview — Metrica' },
  { path: 'clientes', component: clientes, title: 'Clientes — Metrica' },
  { path: 'relatorios', component: relatorios, title: 'Relatorios — Metrica' },
  { path: 'admin', component: admin, title: 'Admin — Metrica' },
  { path: '**', redirectTo: 'login' },
];
