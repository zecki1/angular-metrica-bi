# Case study — Metrica (angular-metrica-bi)

## Contexto

O roadmap do portfólio tem 8 projetos `angular-*`, cada um com um pilar diferente. O **Metrica**
cobre o pilar **Dashboard**: um painel administrativo corporativo com KPIs, roles/permissões,
tabelas complexas e lazy loading. É o projeto onde o Angular é exercitado como plataforma de
**produto de dados**, não como vitrine visual — o oposto consciente do
[`angular-atelier-north`](../angular-atelier-north) (Showcase).

- **Semana:** 4 do roadmap · **Milestone:** `m1-metrica`
- **Repo:** https://github.com/zecki1/angular-metrica-bi (público)
- **Demo:** https://zecki1.github.io/angular-metrica-bi/
- **Estrutura:** Angular 22 standalone + signals + zoneless, Tailwind 4, Supabase opcional
  (modo demo sem credenciais) e testes com Vitest (unit) e Playwright + axe (E2E/a11y).

## Desafio

1. **Ambiente sem backend garantido.** O painel depende de Supabase, mas quem clona o repo não tem
   as chaves. O app precisa subir e ser navegável **sem nenhuma configuração** — caso contrário a
   demo pública e o CI quebram juntos.
2. **Segredos fora do bundle.** O builder `@angular/build:application` (esbuild) não implementa o
   contrato `import.meta.env` do Vite; a substituição só acontece via `define`, que exigiria literais
   no `angular.json` (ou seja, a chave voltaria ao repo). Era preciso um **codegen** de ambiente.
3. **Qualidade sem infraestrutura.** O projeto precisava de lint, build, unit, a11y e E2E rodando
   no CI — inclusive no bot agendado diário — antes das features de tela existirem.
4. **Padronização com os outros repos.** README, prints, relatório de acessibilidade e deploy no
   GitHub Pages no mesmo formato dos demais projetos do roadmap.

## Solução

### Ambiente por codegen (modo demo por padrão)

`scripts/gerar-ambiente.mjs` lê o `.env` (e as variáveis de ambiente do CI/Vercel, que têm
prioridade) e gera `src/environments/ambiente.local.ts` — um arquivo **gitignored**.
`postinstall`, `prestart`, `prebuild` e `pretest` chamam esse script, então o ambiente nunca
"esquece" de ser gerado. Sem `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`, o `SupabaseService`
entra em **modo demo**: nenhum cliente é criado, um aviso aparece no topo (com `role="status"`) e
todas as rotas continuam navegáveis.

### Shell de dashboard acessível desde o primeiro commit

Link "Pular para o conteúdo", `lang="pt-BR"`, um `<h1>` por tela, navegação com
`aria-expanded`/`aria-controls` no mobile e `:focus-visible` global. O axe roda contra as 5 rotas
em cada `npm run e2e:a11y` — a acessibilidade é verificada por CI, não por inspeção manual.

Uma violação real apareceu na primeira varredura: o `<code>` dos cartões usava `--tenue`
(#64748b) sobre o fundo azulado do próprio chip (`color-mix` do acento sobre branco → #d6e5f1),
dando **3,7:1** (abaixo do 4,5:1 exigido). Corrigido no app (`color: var(--texto)` → ≥ 13:1), não
no teste.

### CI e bot de testes

- `ci.yaml`: lint → build → Vitest (cobertura) → Playwright + axe → Lighthouse.
- `bot-testes.yaml`: passou a **instalar o browser do Playwright**
  (`npx playwright install --with-deps chromium`) antes do E2E. Sem isso o bot falhava todo dia com
  `Executable doesn't exist at .../ms-playwright/...`.
- `deploy-pages.yaml`: publica o build em `/angular-metrica-bi/` com `--base-href` e fallback SPA
  (`index.html` → `404.html`), para que as rotas internas funcionem no GitHub Pages.

## Métricas

| Métrica | Resultado |
|---------|-----------|
| Unit (Vitest) | **7/7** (6 arquivos) · 77,1% statements · 68,3% branches · 33,3% funcs · 79,2% lines |
| E2E (Playwright) | **11/11** (1 varredura axe + 10 screenshots) |
| Acessibilidade (axe) | **0** violações graves/críticas nas 5 rotas (15 passes/rota) |
| Lighthouse | Performance **100** · A11y **100** · Best Practices **100** · SEO **100** |
| ESLint | 0 erros · 0 warnings |
| Bundle inicial | 476,3 kB raw (≈115,1 kB transfer) — estoura o `maximumWarning` (350 kB) por causa do `@supabase/supabase-js`; abaixo do `maximumError` (500 kB) |
| Web Vitals (LH) | FCP 1,4 s · LCP 1,5 s · TBT 80 ms · CLS 0 |

## O que aprendi

- **Codegen de ambiente é mais honesto que "esconder" a chave no bundle.** O contrato `VITE_*` fica
  preservado, o arquivo gerado é gitignored e o CI varre as mesmas chaves do runtime.
- **Modo demo não é fallback improvisado — é requisito de produto.** É ele que faz a demo pública,
  o clone do repo e o CI funcionarem sem nenhuma credencial.
- **Acessibilidade pegou um bug real de contraste** que passaria fácil numa revisão visual: cor de
  texto herdada (`--tenue`) sobre o fundo *composto* do `color-mix`. O axe calcula o contraste final
  — vale rodar sempre, não só no fim.
- **Um bot diário que falha todo dia é pior que nenhum bot:** ensina a ignorar o alerta. Instalar o
  browser do Playwright no workflow foi a correção que devolveu valor ao `bot-testes.yaml`.

## Links

- Demo: https://zecki1.github.io/angular-metrica-bi/
- Repo: https://github.com/zecki1/angular-metrica-bi
- Relatório de acessibilidade: [`docs/a11y/relatorio-axe.json`](./a11y/relatorio-axe.json)
- Prints: [`docs/screenshots/`](./screenshots/)
