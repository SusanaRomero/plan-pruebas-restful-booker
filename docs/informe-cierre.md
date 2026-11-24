# Informe de cierre de pruebas – API RESTful Booker (módulo de reservas)

> Informe de cierre de pruebas (*Test Completion Report*) según ISO/IEC/IEEE 29119-3, adaptado (ver sección 2.3 del [plan](plan-de-pruebas.md)).
> Resume lo que se probó, qué se encontró, qué criterios se cumplieron y qué riesgos quedan abiertos.

## 1. Información del documento

| Campo | Valor |
|---|---|
| Identificador | **IC-RB-2026-001** |
| Plan de pruebas asociado | [PP-RB-2026-001](plan-de-pruebas.md), versión 1.5 |
| Versión del informe | 1.1 |
| Fecha | 23/11/2026 (actualizado el 24/11/2026 con el re-test de PROC-02) |
| Autora | Susana Romero García (Analista de pruebas) |
| Organización | Institución Universitaria Pascual Bravo – Curso de Pruebas de Software – Equipo RESTful Booker |
| Aprobación | Roberto José Calderón (auditor) – pendiente |
| Release de GitHub | `v1.0.0` (commit `<SHA>`, se completa al publicar) |

## 2. Resumen ejecutivo

Entre el 19 y el 20 de noviembre de 2026 se ejecutaron los **22 casos** del plan (17 manuales y 5 automatizados) contra la instancia pública de RESTful Booker. **17 pasaron y 5 fallaron.** Los 5 fallos pertenecen al riesgo **R08 (Crítico)**: la API acepta y guarda reservas con datos inválidos.

- **Lo que funciona bien:** crear, consultar, modificar y eliminar reservas con datos válidos se comporta como se espera (R01, R02, R03, R04), y el control de acceso es correcto: ninguna operación protegida se ejecutó sin autorización válida (R06).
- **Lo que no funciona:** la API **no valida** las reglas de negocio al crear una reserva. Acepta salidas anteriores a la entrada, estadías de 0 noches y precios negativos; guarda como `null` un precio no numérico y convierte el 30 de febrero en el 2 de marzo sin avisar.
- **Forma de las respuestas:** en 3 casos la API rechaza correctamente, pero con un código HTTP equivocado (500 en lugar de 400/415, o 200 en lugar de 401).

Se registraron **8 incidentes**; 7 se reprodujeron en una segunda sesión independiente (los 5 de severidad Alta, entre ellos). **Conclusión:** el módulo de reservas es confiable para flujos válidos y para el control de acceso, pero **no es confiable para proteger la integridad de los datos de entrada**. El riesgo R08 se materializó y queda como el principal riesgo residual.

## 3. Pruebas realizadas

### 3.1 Alcance ejecutado

| Elemento | Operación | Ejecutado | Casos |
|---|---|---|---|
| F01 | Consultar (`GET /booking/{id}`) | ✅ | TC-04, TC-17, TC-19, TC-20 |
| F02 | Crear (`POST /booking`) | ✅ | TC-01, TC-02, TC-07 a TC-13, TC-19 |
| F03 | Modificar (`PUT`) | ✅ | TC-03, TC-14, TC-15, TC-16, TC-20, TC-22, TC-23 |
| F04 | Modificar parcialmente (`PATCH`) | ✅ | TC-05, TC-20 |
| F05 | Eliminar (`DELETE`) | ✅ (incidental, R05 aceptado) | TC-20, TC-21, TC-22 y cierre de cada procedimiento |
| F08 | Autenticación (`POST /auth`, Cookie, Basic) | ✅ | TC-15, TC-16, TC-18, TC-21, TC-23 |

### 3.2 Ejecuciones

| Procedimiento | Fecha y hora | Ejecutó | Casos | Pasan | Fallan |
|---|---|---|---|---|---|
| PROC-05 · Regresión automatizada | 19/11/2026 (GitHub Actions, ejecución #1) | Automático | 5 | 5 | 0 |
| PROC-01 · Fechas y precio (sesión 1) | 19–20/11/2026, 15:11 | Susana Romero | 6 | 2 | 4 |
| PROC-02 · Estructura y formato | 20/11/2026 | Susana Romero | 3 | 2 | 1 |
| PROC-03 · Modificación y autorización | 20/11/2026 | Susana Romero | 5 | 5 | 0 |
| PROC-04 · Consulta y modificación parcial | 20/11/2026 | Susana Romero | 3 | 3 | 0 |
| PROC-01 · Fechas y precio (sesión 2, re-test) | 20/11/2026, 16:16 | Susana Romero | 6 | 2 | 4 (mismos casos) |
| PROC-02 · Estructura y formato (sesión 2, re-test) | 24/11/2026, 09:37 | Susana Romero | 3 | 2 | 1 (mismo caso) |

La regresión automatizada se volvió a ejecutar en cada *push* a `main` (20/11/2026) y pasó todas las veces.

### 3.3 Resultado por caso

| Caso | Técnica | Riesgo | Resultado | Incidente |
|---|---|---|---|---|
| TC-01 | BVA (−1 noche) | R08 | ❌ Falla (reproducida) | [INC-01](registro-incidentes.md#inc-01) |
| TC-02 | BVA (+1 noche) | R08, R01 | ✅ Pasa (confirmado) | — |
| TC-03 | EP (PUT válido) | R02 | ✅ Pasa | — |
| TC-04 | EP (ID existente) | R03 | ✅ Pasa | — |
| TC-05 | EP (PATCH parcial) | R04 | ✅ Pasa | — |
| TC-07 | BVA (0 noches) | R08 | ❌ Falla (reproducida) | [INC-02](registro-incidentes.md#inc-02) |
| TC-08 | BVA (precio −1) | R08 | ❌ Falla (reproducida) | [INC-03](registro-incidentes.md#inc-03) |
| TC-09 | BVA (precio 0) | R08, R01 | ✅ Pasa (confirmado) | — |
| TC-10 | EP (precio no numérico) | R08 | ❌ Falla (reproducida) | [INC-04](registro-incidentes.md#inc-04) |
| TC-11 | EP (falta campo) | R08 | ✅ Pasa (R08, confirmado) | [INC-05](registro-incidentes.md#inc-05) (R10) |
| TC-12 | EP (Content-Type) | R08 | ✅ Pasa (R08, confirmado) | [INC-06](registro-incidentes.md#inc-06) (R10) |
| TC-13 | EP (fecha inexistente) | R08 | ❌ Falla (reproducida) | [INC-07](registro-incidentes.md#inc-07) |
| TC-14 | EP (PUT incompleto) | R02 | ✅ Pasa | — |
| TC-15 | EP (sin autorización) | R06 | ✅ Pasa | — |
| TC-16 | EP (token inventado) | R06 | ✅ Pasa | — |
| TC-17 | EP (ID inexistente) | R03 | ✅ Pasa | — |
| TC-18 | EP (contraseña incorrecta) | R06 | ✅ Pasa (R06) | [INC-08](registro-incidentes.md#inc-08) (R10) |
| TC-19 | EP (creación válida) | R01 | ✅ Pasa | — |
| TC-20 | ST (ciclo de vida) | R01, R02, R04, R06 | ✅ Pasa | — |
| TC-21 | ST + EP (DELETE sin auth) | R06 | ✅ Pasa | — |
| TC-22 | ST (PUT sobre eliminada) | R02 | ✅ Pasa | — |
| TC-23 | EP (Basic válida/inválida) | R06 | ✅ Pasa | — |

El detalle (solicitud, respuesta y enlaces a las capturas) está en la sección 5.3.1 del [plan](plan-de-pruebas.md#531-casos-manuales) y en [`/docs/evidencias`](evidencias/).

## 4. Métricas

| Métrica | Valor |
|---|---|
| Casos planificados / ejecutados | 22 / 22 (**100 %**) |
| Casos que pasan | 17 (**77,3 %**) |
| Casos que fallan | 5 (22,7 %), todos de R08 |
| Casos manuales: pasan / fallan | 12 / 5 |
| Casos automatizados: pasan / fallan | 5 / 0 |
| Casos P1 ejecutados | 19 / 19 (100 %) |
| Casos P2 ejecutados | 3 / 3 (100 %) |
| Tasa de fallo de R08 | 5 de 9 casos (55,6 %) |
| Incidentes registrados | 8 (estimados en el plan: 8) |
| Incidentes por severidad | Alta 5 · Media 2 · Baja 1 |
| Incidentes por riesgo | R08: 5 · R10: 3 |
| Incidentes reproducidos en una segunda sesión | 7 de 8 (INC-01 a INC-07) |
| Consistencia de los re-tests (PROC-01 y PROC-02) | 9 de 9 casos con el mismo resultado (100 %) |
| Riesgos Crítico y Alto con casos ejecutados | 4 de 4 (100 %) |
| Fecha de fin de la ejecución: planificada / real | 28/11/2026 / 20/11/2026 (8 días antes) |

**Hallazgo por técnica:** las fallas aparecieron exactamente donde la técnica las buscaba. El BVA sobre las fechas falló tanto en el valor límite (0 noches) como por debajo de él (−1), y pasó en el primer valor válido (+1). Eso indica que la API no tiene ninguna regla sobre la duración, y no que tenga un error de frontera (`>` en lugar de `≥`).

## 5. Evaluación de los criterios de finalización

Criterios definidos en la sección 5.5 del plan.

| # | Criterio | Meta | Resultado | ¿Cumple? |
|---|---|---|---|---|
| 1 | Casos P1 ejecutados | 100 % | 19 de 19 | ✅ |
| 2 | Casos P2 ejecutados | ≥ 80 % | 3 de 3 | ✅ |
| 3 | Valores límite y particiones de R08 ejecutados | 100 % | 9 de 9 | ✅ |
| 4 | Riesgos Crítico y Alto con al menos un caso ejecutado | 100 % | 4 de 4 | ✅ |
| 5 | Fallos con incidente registrado | 100 % | 5 de 5, más 3 incidentes de R10 | ✅ |
| 6 | Incidentes Críticos y Altos reproducidos | 100 % | 5 de 5 (INC-01 a INC-04 el 20/11; INC-07 el 24/11) | ✅ |
| 7 | Independencia adaptada | 100 % | Resultados esperados versionados antes de ejecutar; re-ejecución de PROC-01 en sesión independiente | ✅ |
| 8 | Trazabilidad bidireccional sin huérfanos | Verificada | 22 casos, 0 huérfanos, 4/4 riesgos Crítico y Alto cubiertos | ✅ |
| 9 | Scripts automatizados | 5 de 5 | 5 de 5 en verde en todas las ejecuciones | ✅ |

**Decisión de cierre:** se cumplen los **9 de 9 criterios**. El único re-test que falta es el de INC-08 (TC-18), de severidad Baja, que no forma parte del criterio 6 y queda como desviación documentada (sección 6). El ciclo se da por cerrado.

## 6. Desviaciones respecto al plan

| Desviación | Causa | Efecto | Tratamiento |
|---|---|---|---|
| Todas las tareas las realizó una sola integrante (plan v1.0: 4 personas) | Decisión del equipo (plan v1.2) | La regla "quien diseña no ejecuta" no se pudo cumplir tal cual | Controles compensatorios (plan 2.3); re-ejecución en sesión independiente |
| La ejecución se adelantó de la semana 2 a la semana 1 | Diseño y entorno listos antes de lo previsto | Favorable: 8 días de adelanto | Ninguno |
| Re-test de INC-08 (TC-18) pospuesto | Decisión de la ejecutora: severidad Baja y el control de acceso (R06) ya funcionó | Ninguno sobre los criterios de cierre | INC-08 queda "Abierto" con la evidencia de la primera sesión |
| Autorrevisión de casos (3.7) y revisión de código (4.2) no realizadas | Mismo motivo | Sin efecto en los resultados: los 5 scripts pasaron en todas las corridas | Se registran como pendientes en la WBS |
| En PROC-03 la preparación se repitió entre casos | Error de ejecución | TC-15 y TC-16 se verificaron sobre una reserva recién creada | Resultado válido (no aparece el 999); lección aprendida 9.2 |
| La captura del POST de TC-09 (sesión 1) era del 19/11 | Captura tomada de una respuesta anterior | Evidencia inconsistente en la sesión 1 | Corregido con la re-ejecución del 20/11 a las 16:16 |

## 7. Factores que afectaron el progreso

- **Reinicio de la instancia cada 10 minutos (R07):** en TC-10 la verificación encontró un `bookingid` distinto al del POST, señal de que el POST se reenvió tras un reinicio. Se mitigó ejecutando cada procedimiento en una sola sesión corta y con apellidos únicos.
- **Subida de archivos a GitHub desde la web:** al arrastrar carpetas, GitHub soltó los archivos en la raíz. Se corrigió moviéndolos y, después, subiendo los archivos desde dentro de cada carpeta.
- **No hubo bloqueos por caída del entorno:** `GET /ping` respondió 201 en todas las sesiones y nunca se activó un criterio de suspensión.

## 8. Riesgos residuales

| Riesgo | Nivel | Estado tras las pruebas | Riesgo residual |
|---|---|---|---|
| R08 | 🟥 Crítico | **Materializado** (INC-01, 02, 03, 04, 07) | Pueden existir reservas con fechas imposibles, precios negativos o sin precio, y fechas cambiadas sin aviso. Es el riesgo principal que queda abierto. |
| R10 | 🟨 Medio | Materializado (INC-05, 06, 08) | Los clientes de la API no pueden distinguir sus errores de los del servidor. |
| R01, R02, R03, R04, R06 | Alto / Medio | Mitigados: todos sus casos pasan | Bajo. |
| R05 | 🟩 Bajo | Aceptado; la eliminación funcionó en TC-20, TC-21, TC-22 y en todos los cierres | Bajo. |
| R09, R11, R12 | 🟨 Medio | No probados (aceptados o excluidos por tailoring) | Desconocido: filtros de búsqueda, expiración del token y entradas maliciosas sin evaluar. |
| R13, R14, R15 | 🟩 Bajo | No probados (excluidos por tailoring) | Desconocido. Todas las respuestas observadas tardaron menos de 400 ms. |

## 9. Lecciones aprendidas

1. **Las técnicas formales encontraron los defectos donde se esperaban.** Los 5 fallos salieron de los casos de BVA y EP sobre la creación, que es justo el riesgo calificado como Crítico. Priorizar por riesgo concentró el esfuerzo donde estaban los problemas.
2. **Correr la preparación una sola vez por procedimiento.** Repetirla a mitad de PROC-03 cambió el estado de la reserva base y complicó la lectura de las verificaciones.
3. **Tomar la captura inmediatamente después de cada envío**, antes de pasar a otra pestaña, para evitar evidencias de respuestas anteriores (caso TC-09).
4. **Automatizar los flujos estables y dejar manuales los de validación** funcionó: los 5 automatizados nunca fallaron, y los casos manuales de validación encontraron los 5 defectos.
5. **La estimación de incidentes fue precisa** (8 estimados, 8 encontrados), porque se basó en que la API no documenta sus validaciones.
6. **Ejecutar con una sola persona exige controles de independencia** desde el inicio: versionar los resultados esperados antes de ejecutar resultó ser la evidencia más fuerte.

## 10. Entregables de prueba

| Entregable | Ubicación |
|---|---|
| Plan de pruebas (v1.5) | [`docs/plan-de-pruebas.md`](plan-de-pruebas.md) |
| Registro de incidentes (8 INC) | [`docs/registro-incidentes.md`](registro-incidentes.md) |
| Evidencias (51 capturas + reporte de PROC-05) | [`docs/evidencias/`](evidencias/) |
| Casos automatizados (TC-19 a TC-23) | [`tests/flujos_criticos.spec.js`](../tests/flujos_criticos.spec.js) |
| Ejecución automática | [`.github/workflows/pruebas-automatizadas.yml`](../.github/workflows/pruebas-automatizadas.yml) |
| Colección de casos manuales | [`postman/restful-booker-casos-manuales.postman_collection.json`](../postman/restful-booker-casos-manuales.postman_collection.json) |
| Informe de cierre | Este documento |

**Reutilizables para un siguiente ciclo:** la colección de Postman, los 5 scripts y el flujo de GitHub Actions sirven tal cual como regresión si la API cambia.

## 11. Recomendaciones

1. **Para el propietario de la API:** agregar validación de entrada en `POST /booking` (fechas existentes, salida posterior a la entrada, precio numérico ≥ 0, campos obligatorios) y responder 400/415/401 en lugar de 500 o 200.
2. **Para un siguiente ciclo de pruebas:** completar el re-test de INC-08, cubrir los filtros de búsqueda (R09) y evaluar la expiración del token (R11), que quedaron fuera de este alcance.
