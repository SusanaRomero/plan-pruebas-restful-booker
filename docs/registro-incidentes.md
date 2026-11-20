# Registro de incidentes – PP-RB-2026-001

> Reporte de incidentes según ISO/IEC/IEEE 29119-3, adaptado (ver sección 2.3 del [plan](plan-de-pruebas.md)).
> Se abre un incidente por cada caso con estado ❌ Falla, y también cuando un caso pasa pero la API responde con un código HTTP incorrecto (riesgo R10). Las evidencias están en [`/docs/evidencias`](evidencias/).

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

## Resumen del ciclo 1 (19 y 20 de noviembre de 2026)

INC-01 a INC-04 se reprodujeron en una segunda sesión independiente (20/11/2026, 16:16). INC-05 a INC-08 tienen el re-test pendiente (tarea 6.2).

| ID | Caso | Riesgo | Título | Severidad | Oráculo | Estado |
|---|---|---|---|---|---|---|
| [INC-01](#inc-01) | TC-01 | R08 | Se acepta una reserva con salida anterior a la entrada | Alta | REGLA | Reproducido |
| [INC-02](#inc-02) | TC-07 | R08 | Se acepta una reserva de 0 noches | Alta | REGLA | Reproducido |
| [INC-03](#inc-03) | TC-08 | R08 | Se acepta un precio total negativo | Alta | REGLA | Reproducido |
| [INC-04](#inc-04) | TC-10 | R08 | Un precio no numérico se acepta y se guarda como `null` | Alta | DOC | Reproducido |
| [INC-05](#inc-05) | TC-11 | R10 | Falta de un campo obligatorio responde 500 en lugar de 400 | Media | HTTP | Abierto |
| [INC-06](#inc-06) | TC-12 | R10 | `Content-Type` no JSON responde 500 en lugar de 415/400 | Media | HTTP | Abierto |
| [INC-07](#inc-07) | TC-13 | R08 | Una fecha inexistente se acepta y se guarda cambiada | Alta | REGLA | Abierto |
| [INC-08](#inc-08) | TC-18 | R10 | Credenciales inválidas responden 200 en lugar de 401 | Baja | HTTP | Abierto |

**Lectura:** la API **no valida** las reglas de negocio de la creación (R08, Crítico): de los 9 casos de R08, 5 fallaron porque la reserva inválida quedó guardada. El control de acceso (R06) se comportó bien: no se modificó nada sin autorización y no se emitió token con credenciales inválidas. Los 3 incidentes de R10 son de forma: la API rechaza, pero con el código HTTP equivocado.

---

## Detalle de cada incidente

<a id="inc-01"></a>

### INC-01 · Se acepta una reserva con salida anterior a la entrada

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-01 · PROC-01 |
| Riesgo · Condición | R08 (Crítico) · CP-02 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Alta · REGLA (la salida debe ser posterior a la entrada) |
| Solicitud enviada | `POST /booking` con DAT-01, `checkin: "2026-12-10"`, `checkout: "2026-12-09"` |
| Resultado esperado | Rechazo 400, sin `bookingid`; el filtro por apellido devuelve `[]`. |
| Resultado obtenido | `200 OK` con `bookingid` 991; la reserva se guardó con las fechas invertidas. El filtro por apellido devuelve `[{"bookingid": 991}]`. |
| Pasos para reproducir | 1. Ejecutar `00 Preparación` de PROC-01. 2. Enviar `TC-01 · POST /booking`. 3. Enviar `TC-01 · Verificación por apellido`. |
| Evidencia | [POST](evidencias/TC-01_20261120.png) · [verificación](evidencias/TC-01_verif_20261120.png) |
| Re-test | ✅ Reproducido el 20/11/2026 a las 16:16 en una sesión independiente: `200 OK` con `bookingid` 3756. Evidencia: [POST](evidencias/TC-01_rerun_20261120-1616.png) · [verificación](evidencias/TC-01_rerun_verif_20261120-1616.png) |
| Estado | Reproducido → riesgo residual |
| Riesgo residual | Cualquier cliente puede registrar estadías imposibles; los cálculos que dependan de las fechas quedarían mal. |

<a id="inc-02"></a>

### INC-02 · Se acepta una reserva de 0 noches

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-07 · PROC-01 |
| Riesgo · Condición | R08 (Crítico) · CP-02 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Alta · REGLA (mínimo 1 noche) |
| Solicitud enviada | `POST /booking` con DAT-01, `checkin: "2026-12-10"`, `checkout: "2026-12-10"` |
| Resultado esperado | Rechazo 400, sin `bookingid`. |
| Resultado obtenido | `200 OK` con `bookingid` 1907; el filtro por apellido la encuentra. |
| Pasos para reproducir | 1. `00 Preparación` de PROC-01. 2. `TC-07 · POST /booking`. 3. `TC-07 · Verificación por apellido`. |
| Evidencia | [POST](evidencias/TC-07_20261120.png) · [verificación](evidencias/TC-07_verif_20261120.png) |
| Re-test | ✅ Reproducido el 20/11/2026 a las 16:16 en una sesión independiente: `200 OK` con `bookingid` 4101. Evidencia: [POST](evidencias/TC-07_rerun_20261120-1616.png) · [verificación](evidencias/TC-07_rerun_verif_20261120-1616.png) |
| Estado | Reproducido → riesgo residual |
| Riesgo residual | Junto con INC-01, confirma que la API no valida la frontera de la regla de fechas: falla en el valor límite (0) y por debajo (−1). |

<a id="inc-03"></a>

### INC-03 · Se acepta un precio total negativo

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-08 · PROC-01 |
| Riesgo · Condición | R08 (Crítico) · CP-03 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Alta · REGLA (precio ≥ 0) |
| Solicitud enviada | `POST /booking` con DAT-01 y `totalprice: -1` |
| Resultado esperado | Rechazo 400, sin `bookingid`. |
| Resultado obtenido | `200 OK` con `bookingid` 2766 y `totalprice: -1` guardado. |
| Pasos para reproducir | 1. `00 Preparación` de PROC-01. 2. `TC-08 · POST /booking`. 3. `TC-08 · Verificación por apellido`. |
| Evidencia | [POST](evidencias/TC-08_20261120.png) · [verificación](evidencias/TC-08_verif_20261120.png) |
| Re-test | ✅ Reproducido el 20/11/2026 a las 16:16 en una sesión independiente: `200 OK` con `bookingid` 4497. Evidencia: [POST](evidencias/TC-08_rerun_20261120-1616.png) · [verificación](evidencias/TC-08_rerun_verif_20261120-1616.png) |
| Estado | Reproducido → riesgo residual |
| Riesgo residual | Pueden existir reservas con montos negativos; el valor límite válido (0, TC-09) sí funciona. |

<a id="inc-04"></a>

### INC-04 · Un precio no numérico se acepta y se guarda como `null`

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-10 · PROC-01 |
| Riesgo · Condición | R08 (Crítico) · CP-03 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Alta · DOC (la documentación define `totalprice` como número) |
| Solicitud enviada | `POST /booking` con DAT-01 y `totalprice: "cien"` |
| Resultado esperado | Rechazo 400, sin `bookingid`. |
| Resultado obtenido | `200 OK` con `bookingid` 3364 y **`totalprice: null`**: la API descarta el valor sin avisar y guarda la reserva sin precio. |
| Pasos para reproducir | 1. `00 Preparación` de PROC-01. 2. `TC-10 · POST /booking`. 3. `TC-10 · Verificación por apellido`. |
| Evidencia | [POST](evidencias/TC-10_20261120.png) · [verificación](evidencias/TC-10_verif_20261120.png) |
| Re-test | ✅ Reproducido el 20/11/2026 a las 16:16 en una sesión independiente: `200 OK` con `bookingid` 4891. Evidencia: [POST](evidencias/TC-10_rerun_20261120-1616.png) · [verificación](evidencias/TC-10_rerun_verif_20261120-1616.png) |
| Estado | Reproducido → riesgo residual |
| Riesgo residual | Es el incidente más grave del ciclo: además de aceptar un dato inválido, **pierde información** (el precio queda vacío). En la verificación apareció el `bookingid` 856 en lugar de 3364, lo que indica que el POST se reenvió tras un reinicio de la instancia (R07); el comportamiento fue el mismo. |

<a id="inc-05"></a>

### INC-05 · Falta de un campo obligatorio responde 500 en lugar de 400

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-11 · PROC-02 |
| Riesgo · Condición | R10 (Medio) · CP-04 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Media · HTTP (un error del cliente es 4xx; 5xx indica una falla del servidor) |
| Solicitud enviada | `POST /booking` con DAT-01 **sin** `lastname` |
| Resultado esperado | 400 con un mensaje que indique el campo faltante. |
| Resultado obtenido | `500 Internal Server Error` con el texto "Internal Server Error". No se creó la reserva (verificación → `[]`), así que **R08 queda mitigado**. |
| Pasos para reproducir | 1. `00 Preparación` de PROC-02. 2. `TC-11 · POST /booking sin lastname`. 3. `TC-11 · Verificación por nombre`. |
| Evidencia | [POST](evidencias/TC-11_20261120.png) · [verificación](evidencias/TC-11_verif_20261120.png) |
| Re-test | Pendiente (semana 3). |
| Estado | Abierto |
| Riesgo residual | El cliente no sabe qué corrigió mal; un 500 sugiere que el servidor no maneja la validación y podría fallar con otras entradas incompletas. |

<a id="inc-06"></a>

### INC-06 · `Content-Type` no JSON responde 500 en lugar de 415/400

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-12 · PROC-02 |
| Riesgo · Condición | R10 (Medio) · CP-04 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Media · HTTP (415 *Unsupported Media Type*) |
| Solicitud enviada | `POST /booking` con `Content-Type: text/plain` y el contenido de DAT-01 como texto |
| Resultado esperado | 415 o 400, sin `bookingid`. |
| Resultado obtenido | `500 Internal Server Error`. No se creó la reserva (verificación → `[]`), así que **R08 queda mitigado**. |
| Pasos para reproducir | 1. `00 Preparación` de PROC-02. 2. `TC-12 · POST /booking con Content-Type text/plain`. 3. `TC-12 · Verificación por apellido`. |
| Evidencia | [POST](evidencias/TC-12_20261120.png) · [verificación](evidencias/TC-12_verif_20261120.png) |
| Re-test | Pendiente (semana 3). |
| Estado | Abierto |
| Riesgo residual | Mismo patrón que INC-05: la API no distingue entre un error del cliente y uno propio. |

<a id="inc-07"></a>

### INC-07 · Una fecha inexistente se acepta y se guarda cambiada

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-13 · PROC-02 |
| Riesgo · Condición | R08 (Crítico) · CP-05 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Alta · REGLA (las fechas deben existir en el calendario) |
| Solicitud enviada | `POST /booking` con DAT-01, `checkin: "2026-02-30"`, `checkout: "2026-03-05"` |
| Resultado esperado | Rechazo 400, sin `bookingid`. |
| Resultado obtenido | `200 OK` con `bookingid` 3693 y **`checkin: "2026-03-02"`**: la API convirtió el 30 de febrero en el 2 de marzo sin avisar. |
| Pasos para reproducir | 1. `00 Preparación` de PROC-02. 2. `TC-13 · POST /booking con fecha 2026-02-30`. 3. `TC-13 · Verificación por apellido`. |
| Evidencia | [POST](evidencias/TC-13_20261120.png) · [verificación](evidencias/TC-13_verif_20261120.png) |
| Re-test | Pendiente (semana 3). |
| Estado | Abierto |
| Riesgo residual | La reserva queda guardada con una fecha distinta a la que pidió el cliente, sin que este se entere. |

<a id="inc-08"></a>

### INC-08 · Credenciales inválidas responden 200 en lugar de 401

| Campo | Detalle |
|---|---|
| Caso · Procedimiento | TC-18 · PROC-03 |
| Riesgo · Condición | R10 (Medio) · CP-09 |
| Reportado por / fecha | Susana Romero · 20/11/2026 |
| Entorno | AMB-01 (Postman) · `https://restful-booker.herokuapp.com` |
| Severidad · Oráculo | Baja · HTTP (401 *Unauthorized*) |
| Solicitud enviada | `POST /auth` con `{"username": "admin", "password": "clave-incorrecta"}` |
| Resultado esperado | Sin `token`; código 401. |
| Resultado obtenido | `200 OK` con `{"reason": "Bad credentials"}` y **sin** `token`. El control de acceso (**R06**) funciona; solo el código es incorrecto. |
| Pasos para reproducir | 1. Enviar `TC-18 · POST /auth con contraseña incorrecta` de PROC-03. |
| Evidencia | [POST](evidencias/TC-18_20261120.png) |
| Re-test | Pendiente (semana 3). |
| Estado | Abierto |
| Riesgo residual | Un cliente que solo revise el código HTTP creería que inició sesión. |
