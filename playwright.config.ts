import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright — E2E do Metrica (smoke, acessibilidade e screenshots).
 *
 * A porta do servidor pode ser trocada por `E2E_BASE_URL` (ex.: outro agente já
 * ocupa a 4200). Sem essa variável o próprio Playwright sobe o `ng serve`.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: process.env['CI']
    ? [['html', { open: 'never', outputFolder: 'playwright-report' }], ['list']]
    : 'list',
  use: {
    baseURL: process.env['E2E_BASE_URL'] || 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    locale: 'pt-BR',
    reducedMotion: 'no-preference',
  },
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env['E2E_BASE_URL']
    ? undefined
    : {
        command: 'npm start',
        url: 'http://localhost:4200',
        reuseExistingServer: !process.env['CI'],
        timeout: 120_000,
      },
});
