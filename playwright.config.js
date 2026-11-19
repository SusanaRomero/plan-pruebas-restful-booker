// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * Configuración de los casos automatizados TC-19 a TC-23 (AMB-02, sección 5.4 del plan).
 * Son pruebas de API: no se necesita instalar navegadores.
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  // R07: la instancia pública puede reiniciarse a mitad de un test.
  // Un reintento distingue una falla del entorno de un defecto real;
  // si el test pasa solo en el reintento, el reporte lo marca como "flaky".
  retries: 1,
  // Ejecución en serie para no saturar la instancia pública compartida.
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: { Accept: 'application/json' },
  },
});
