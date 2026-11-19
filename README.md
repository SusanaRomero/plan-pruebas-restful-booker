# Plan de pruebas – API RESTful Booker (módulo de reservas)

Plan de pruebas **PP-RB-2026-001**, basado en ISO/IEC/IEEE 29119-3 (conformidad adaptada) y en pruebas basadas en riesgos (RBT).

| | |
|---|---|
| Objeto de prueba | API RESTful Booker – <https://restful-booker.herokuapp.com> |
| Equipo | Miguel Angel Vallejo Giroldo (Test Manager) · Susana Romero García (Analista) · Luisa Fernanda Tamayo Arias (Analista) · Santiago Montoya Restrepo (Automatizador) |
| Ciclo | 3 semanas: 16/11/2026 – 06/12/2026 |
| Casos | 22: 17 manuales + 5 automatizados |

## Estructura del repositorio

```text
plan-pruebas-restful-booker/
├── .github/workflows/
│   └── pruebas-automatizadas.yml     ← GitHub ejecuta TC-19 a TC-23 en cada push
├── docs/
│   ├── plan-de-pruebas.md            ← plan completo (8 secciones) y casos manuales
│   ├── registro-incidentes.md        ← reportes de incidentes (INC-xx)
│   └── evidencias/                   ← capturas y reportes de cada ejecución
├── tests/
│   └── flujos_criticos.spec.js       ← casos automatizados TC-19 a TC-23 (Playwright)
├── postman/
│   └── restful-booker-casos-manuales.postman_collection.json
├── playwright.config.js
├── package.json
└── README.md
```

## Cómo ejecutar

**Casos manuales (PROC-01 a PROC-04)**

1. Importar `postman/restful-booker-casos-manuales.postman_collection.json` en Postman.
2. Abrir la carpeta del procedimiento y ejecutar primero las solicitudes `00 …` (preparación).
3. Ejecutar los casos en el orden de la carpeta y comparar con el resultado esperado de [`docs/plan-de-pruebas.md`](docs/plan-de-pruebas.md#531-casos-manuales).
4. Ejecutar las solicitudes `99 …` (cierre).

**Casos automatizados (PROC-05)**

Requisitos: Node.js 18 o superior.

```bash
npm install
npm test                 # ejecuta TC-19 a TC-23 contra la API pública
npm run test:reporte     # abre el reporte HTML
```

Para apuntar a otra instancia: `BASE_URL=http://localhost:3001 npm test`.

## Reglas de trabajo en el repositorio

- **Ramas:** `main` está protegida. Cada tarea se hace en una rama propia: `docs/<tema>` para documentación y `test/<TC-xx>` para scripts.
- **Commits:** en español, con prefijo y el ID afectado. Ejemplos: `docs(riesgos): recalifica R06 a Alto`, `test(TC-20): agrega transición T4`, `exec(PROC-01): resultados de TC-01 a TC-10`.
- **Pull requests:** requieren aprobación del Test Manager. Los scripts los revisa alguien distinto de quien los escribió.
- **IDs:** nunca se reutiliza un ID retirado (por ejemplo, TC-06).
- **Evidencias:** `docs/evidencias/TC-xx_AAAAMMDD-HHMM.png`.
- **Enlace Markdown ↔ código:** los casos automatizados del plan no describen pasos; enlazan al bloque exacto del script. Si se mueven líneas del script, se actualiza el enlace en el mismo *pull request*.
- **Releases:** cada entrega al docente es un *release* con *tag* (`v0.9.0-diseno`, `v1.0.0`).
