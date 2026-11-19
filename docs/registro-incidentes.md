# Registro de incidentes – PP-RB-2026-001

> Reporte de incidentes según ISO/IEC/IEEE 29119-3, adaptado (ver sección 2.3 del [plan](plan-de-pruebas.md)).
> Se abre un incidente por cada caso con estado ❌ Falla. Las evidencias van en [`/docs/evidencias`](evidencias/).

## Escalas

**Severidad** (qué tan grave es el efecto)

| Nivel | Significado en esta API |
|---|---|
| Crítica | Se pierden o corrompen reservas, o se modifica/elimina sin autorización. |
| Alta | Se guardan datos inválidos o una operación principal no funciona. |
| Media | La operación funciona, pero la respuesta es incorrecta (código HTTP, mensaje). |
| Baja | Detalle menor o de forma, sin efecto en los datos. |

**Fuente del oráculo** (por qué se considera un fallo, ver suposición S-01): `DOC` documentación oficial de la API · `HTTP` RFC 9110 · `REGLA` regla de negocio definida por el equipo.

**Estados:** Abierto → Reproducido (re-test) → Riesgo residual (no se puede corregir porque la API es de un tercero) · o Descartado (no era un fallo).

## Resumen

| ID | Caso | Riesgo | Título | Severidad | Oráculo | Estado |
|---|---|---|---|---|---|---|
| INC-01 | | | | | | |

## Detalle de cada incidente

Copiar este bloque por cada incidente.

### INC-01 · *(título corto: qué falla y dónde)*

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-__ · PROC-__ |
| Riesgo · Condición | R__ · CP-__ |
| Reportado por / fecha y hora | |
| Entorno | AMB-__ · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | |
| Solicitud enviada | Método, URL, encabezados y cuerpo exactos |
| Resultado esperado | (copiar del caso) |
| Resultado obtenido | Código HTTP y cuerpo de la respuesta |
| Pasos para reproducir | 1. … 2. … |
| Evidencia | `evidencias/TC-___AAAAMMDD-HHMM.png` |
| Re-test (fecha y resultado) | |
| Estado | |
| Riesgo residual declarado | Qué queda sin mitigar y su efecto |
