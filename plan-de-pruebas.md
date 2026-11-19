# Plan de pruebas de la API RESTful Booker – Módulo de reservas (v1.0)

> Plan de pruebas según ISO/IEC/IEEE 29119-3, con enfoque de pruebas basadas en riesgos (RBT).
> Los casos manuales están en este documento; los casos automatizados están en [`/tests`](../tests/flujos_criticos.spec.js).

## Tabla de contenido

1. [Información específica del documento](#1-información-específica-del-documento)
2. [Introducción y declaración de adaptación (tailoring)](#2-introducción-y-declaración-de-adaptación-tailoring)
3. [Contexto de las pruebas](#3-contexto-de-las-pruebas)
4. [Gestión de riesgos y matriz de exposición (RBT)](#4-gestión-de-riesgos-y-matriz-de-exposición-rbt)
5. [Estrategia de pruebas y derivación de casos](#5-estrategia-de-pruebas-y-derivación-de-casos)
6. [Actividades de prueba y estimaciones](#6-actividades-de-prueba-y-estimaciones)
7. [Personal](#7-personal)
8. [Cronograma](#8-cronograma)

---

## 1. Información específica del documento

### 1.1 Identificador único del documento

| Campo | Valor |
|---|---|
| Identificador | **PP-RB-2026-001** |
| Título | Plan de pruebas de la API RESTful Booker – Módulo de reservas |
| Versión | 1.0 |
| Estado | Aprobado para ejecución (pendiente de firma del auditor) |
| Release de GitHub | `v1.0.0` |
| Commit de referencia | `<SHA del commit del release>` *(se completa al publicar el release)* |
| Ubicación | `/docs/plan-de-pruebas.md` del repositorio `plan-pruebas-restful-booker` |

El identificador sigue la convención `PP` (plan de pruebas) – `RB` (RESTful Booker) – año – consecutivo. Cada release de GitHub congela una versión del plan; el SHA del commit permite al auditor saber exactamente qué versión revisó.

### 1.2 Organización emisora y autores

| Campo | Detalle |
|---|---|
| Organización emisora | Institución Universitaria Pascual Bravo – Curso de Pruebas de Software – Equipo RESTful Booker |
| Autores | Miguel Angel Vallejo Giroldo (Test Manager) · Susana Romero García (Analista de pruebas) · Luisa Fernanda Tamayo Arias (Analista de pruebas) · Santiago Montoya Restrepo (Automatizador) |
| Equipos revisores (coevaluación) | Mateo Villada, Keyner Gil, Jeyson González (actividad 1) · Nicolás Castaño, Julián Ramírez, Sebastián Díaz, Marcos Duque (actividad 2) |

### 1.3 Autoridad de aprobación

| Rol | Nombre | Responsabilidad | Firma / fecha |
|---|---|---|---|
| Auditor y autoridad de aprobación | Roberto José Calderón | Aprueba el plan, la declaración de tailoring y el release final | |
| Test Manager | Miguel Angel Vallejo Giroldo | Aprueba internamente cada versión antes de solicitar la revisión del auditor | Miguel Angel Vallejo – 19/11/2026 |

La aprobación se registra como *review* aprobado en el *pull request* que publica el release.

### 1.4 Historial de cambios y control de versiones

| Versión | Fecha | Autor | Descripción del cambio |
|---|---|---|---|
| 0.1 | 22/09/2026 | Equipo | Inicio del plan: metodología ágil, objetivo general y alcance preliminar, con ajustes de la revisión cruzada. |
| 0.2 | 24/09/2026 | Equipo | Identificación de los *test items* F01–F07, precondiciones y priorización. |
| 0.3 | 13/10/2026 | Equipo | Matriz de riesgos v1.1 (R01–R07), técnicas, criterios de finalización y estimación inicial (30 h). |
| 0.4 | Oct/2026 | Equipo | Especificación de casos TC-01 a TC-06 y procedimientos PROC-01 a PROC-03. |
| 1.0 | 17/11/2026 | M. Vallejo (TM) | Consolidación ISO 29119-3 + RBT: declaración de tailoring; matriz de riesgos v2.0 con 4 niveles y 19 riesgos; R01 se divide en R01 y R08; R06 se recalifica a Alto; TC-06 se retira (R05 aceptado); 22 casos con trazabilidad bidireccional; WBS de 94,5 h; cronograma de 3 semanas. |

**Reglas de control de versiones**

- La rama `main` solo contiene versiones revisadas. Todo cambio entra por *pull request* con al menos una aprobación del Test Manager.
- Cambio menor (redacción, datos de un caso): sube el segundo dígito (1.0 → 1.1). Cambio de alcance, de riesgos o de casos: sube el primer dígito (1.x → 2.0).
- Cada versión que se entrega al auditor se publica como *release* con *tag* (`v1.0.0`, `v1.1.0`, …).

---

## 2. Introducción y declaración de adaptación (tailoring)

### 2.1 Alcance del documento

Este documento es el **plan de pruebas de proyecto** para el módulo de reservas de la API RESTful Booker. Define qué se prueba, por qué, con qué técnicas, quién lo hace y cuándo, en un ciclo de **3 semanas** con **4 integrantes**.

**Objetivo general.** Verificar que las operaciones de gestión de reservas (consultar, crear, modificar total y parcialmente, y eliminar) de la API RESTful Booker funcionen según lo esperado y preserven la integridad de los datos, mediante pruebas funcionales de caja negra, abarcando de manera específica el módulo de reservas.

El documento cubre los niveles de **prueba de sistema** y **prueba de API** (caja negra), los tipos de prueba **funcional** y **de control de acceso básico**, y las fases de planificación, diseño, ejecución y cierre.

### 2.2 Referencias documentales

| ID | Documento |
|---|---|
| REF-01 | ISO/IEC/IEEE 29119-1. *Software testing – Part 1: Concepts and definitions.* |
| REF-02 | ISO/IEC/IEEE 29119-2. *Software testing – Part 2: Test processes.* |
| REF-03 | ISO/IEC/IEEE 29119-3:2013. *Software testing – Part 3: Test documentation* (edición usada en el curso; existe revisión 2021). |
| REF-04 | ISO/IEC/IEEE 29119-4. *Software testing – Part 4: Test techniques.* |
| REF-05 | Documentación oficial de la API RESTful Booker: <https://restful-booker.herokuapp.com/apidoc/index.html> |
| REF-06 | RFC 9110, *HTTP Semantics* (significado de los códigos de estado HTTP). |
| REF-07 | Entregables previos del equipo: Inicio del plan (22/09/2026), Actividad de test items (24/09/2026), Matriz de riesgos v1.1, Taller de estrategia (13/10/2026), Taller de especificación y procedimientos. |
| REF-08 | Documentación de Playwright Test (pruebas de API con el *fixture* `request`). |

### 2.3 Conformidad y adaptación (tailoring)

**Declaración.** Este plan declara **conformidad adaptada** (*tailored conformance*) con ISO/IEC/IEEE 29119-3. **No** se declara conformidad completa.

**Justificación del nivel de criticidad.** RESTful Booker es una API pública de práctica: no maneja datos reales de personas, dinero ni operaciones que afecten la vida o la seguridad de alguien. Un fallo no tiene consecuencias fuera del ejercicio académico. Por eso se clasifica como **software de criticidad baja**, y esa clasificación permite reducir la documentación y los procesos sin poner en riesgo a terceros.

**Restricciones que obligan a adaptar.**

1. **Tiempo:** ciclo cerrado de 3 semanas (planificación, ejecución y cierre).
2. **Personas:** 4 integrantes con una dedicación estimada de 10 h por semana cada uno (120 h en total).
3. **Acceso técnico:** no hay acceso al código fuente, a la base de datos ni a los registros (*logs*) del servidor; solo a la API pública.
4. **Entorno:** la instancia pública es compartida con otros usuarios y se reinicia cada 10 minutos.

**Procesos y documentos de la norma: decisión de adaptación**

| Elemento de ISO/IEC/IEEE 29119 | Decisión | Justificación | Riesgo que se asume al omitir o reducir | Compensación |
|---|---|---|---|---|
| Política de pruebas de la organización | **Excluido** | El equipo no es una organización con varios proyectos; no hay a quién aplicar una política. | No hay criterios corporativos que alineen este plan con otros proyectos. | Las reglas del equipo quedan en este plan (secc. 1.4 y README). |
| Estrategia organizacional de pruebas | **Excluido** | Misma razón: un solo proyecto. | Las decisiones de técnica no se heredan de un estándar interno. | La sección 5.2 justifica cada técnica. |
| Plan de pruebas | **Incluido** | Es este documento. | — | — |
| Especificación del diseño de pruebas | **Adaptado** | Se integra en las secciones 5.1 y 5.2 (condiciones y técnicas) en lugar de un documento aparte. | Menor detalle de los conjuntos de características. | Cada condición indica el *test item* y el riesgo. |
| Especificación de casos de prueba | **Incluido** | Sección 5.3 (manuales) y scripts en `/tests` (automatizados). | — | — |
| Especificación de procedimientos de prueba | **Adaptado** | 5 procedimientos breves dentro de la sección 5.3.3. | Menor detalle de pasos de preparación. | Colección de Postman con la preparación ya configurada. |
| Requisitos de datos y de entorno | **Adaptado** | Unificados en la sección 5.4. | — | — |
| Informes de preparación de datos y de entorno | **Excluido** | El entorno lo provee un tercero y no se puede preparar; se reemplaza por una prueba de humo. | Iniciar la ejecución con el entorno caído. | Criterio de entrada: `GET /ping` → 201 y token emitido (5.5). |
| Registro de ejecución | **Adaptado** | Columnas "Resultado real" y "Estado" en cada caso + reporte HTML de Playwright. | Menor detalle cronológico. | Evidencias con fecha y hora en `/docs/evidencias`. |
| Reporte de incidentes | **Incluido** | `docs/registro-incidentes.md`. | — | — |
| Informe de estado de pruebas | **Adaptado** | Se reemplaza por la revisión semanal de 30 min registrada en el *issue* de seguimiento. | Menor visibilidad formal del avance para terceros. | El auditor ve el avance en los *commits* y *pull requests*. |
| Informe de cierre de pruebas | **Incluido (simplificado)** | Se entrega en la semana 3 como parte del release. | — | — |
| Proceso de monitoreo y control (29119-2) | **Adaptado** | Un punto de control semanal en lugar de monitoreo continuo. | Detectar tarde una desviación del cronograma. | Reserva de 25,5 h (21 %) en la semana 3 (secc. 6.2). |

**Tipos de prueba excluidos y riesgo que se asume**

| Tipo de prueba excluido | Por qué se excluye | Riesgo residual asumido |
|---|---|---|
| Rendimiento y carga | Se necesitaría un entorno propio y herramientas de carga; además, sobrecargar una instancia pública compartida afecta a otros usuarios. | R13 y R14 (Bajo): no se sabrá cómo responde la API con muchos usuarios a la vez. |
| Seguridad profunda (inyección, fuerza bruta, expiración de tokens) | Fuera del alcance acordado en el inicio del plan; requiere conocimientos y permisos que el equipo no tiene en 3 semanas. | R11 y R12 (Medio): pueden existir vulnerabilidades no detectadas. **Solo se prueba el control de acceso básico (R06).** |
| Formatos alternativos (XML, `x-www-form-urlencoded`) | El objetivo se limita a JSON, que es el formato principal documentado. | R15 (Bajo): fallos en otros formatos no se detectarán. |
| Interfaz gráfica y código fuente | Exclusiones F06 y F07 aprobadas en la actividad 2. | No aplica: no son parte del objeto de prueba. |

### 2.4 Glosario

| Término | Definición usada en este plan |
|---|---|
| API REST | Interfaz que expone operaciones sobre recursos (aquí, reservas) mediante métodos HTTP. |
| Caja negra | Prueba basada solo en entradas y salidas observables, sin mirar el código. |
| Caso de prueba (TC) | Precondiciones, entradas y resultado esperado que verifican una condición de prueba. |
| Condición de prueba (CP) | Regla o comportamiento verificable que se deriva de un riesgo. |
| Exposición al riesgo (E) | Probabilidad × Impacto, cada uno calificado de 1 a 5. |
| Incidente (INC) | Diferencia entre el resultado esperado y el real, registrada para análisis. |
| Oráculo de prueba | Fuente que dice cuál es el resultado correcto (documentación, convenciones HTTP, reglas del equipo). |
| Partición de equivalencia (EP) | Técnica que divide los datos en clases que el sistema debería tratar igual y prueba un representante de cada una. |
| Análisis de valores límite (BVA) | Técnica que prueba los valores justo en el borde y al lado de cada frontera entre clases. |
| Transición de estados (ST) | Técnica que modela los estados del objeto (p. ej., reserva Activa o Eliminada) y prueba las transiciones válidas e inválidas. |
| Procedimiento (PROC) | Secuencia ordenada de casos con preparación y cierre. |
| RBT | *Risk-Based Testing*: se decide qué probar y con qué rigor según la exposición al riesgo. |
| Tailoring | Adaptación justificada de la norma a las condiciones del proyecto. |
| Token | Credencial temporal que emite `POST /auth` y que se envía como `Cookie: token=…`. |
| Trazabilidad bidireccional | Poder ir de un riesgo a sus casos y de cada caso a su riesgo sin huecos. |

---

## 3. Contexto de las pruebas

### 3.1 Elementos de prueba (test items)

**Objeto de prueba:** API RESTful Booker, instancia pública `https://restful-booker.herokuapp.com`, formato JSON. La API no expone un número de versión; por eso cada ejecución registra la **fecha y hora**, que identifican el estado del sistema probado.

| ID | Elemento | Endpoint | Requiere autorización | En alcance |
|---|---|---|---|---|
| F01 | Consultar reservas | `GET /booking/{id}` (y `GET /booking`) | No | Sí |
| F02 | Crear una reserva | `POST /booking` | No | Sí |
| F03 | Modificar una reserva | `PUT /booking/{id}` | Sí | Sí |
| F04 | Modificar parcialmente una reserva | `PATCH /booking/{id}` | Sí | Sí |
| F05 | Eliminar una reserva | `DELETE /booking/{id}` | Sí | Sí (solo de forma incidental, ver R05) |
| F08 | Autenticación | `POST /auth`, `Cookie: token=…` y `Authorization: Basic …` | — | Sí, como soporte de F03, F04 y F05 |
| F06 | Interfaz gráfica | — | — | No |
| F07 | Código fuente de la API | — | — | No |

> Se usa F08 para la autenticación y no se renumera, para mantener los identificadores F01–F07 de la actividad 2.

**Modelo de datos de una reserva** (campos de entrada de F02 y F03):

| Campo | Tipo | Obligatorio | Regla usada como oráculo |
|---|---|---|---|
| `firstname` | texto | Sí | No vacío |
| `lastname` | texto | Sí | No vacío |
| `totalprice` | número entero | Sí | ≥ 0 |
| `depositpaid` | booleano | Sí | `true` o `false` |
| `bookingdates.checkin` | fecha `AAAA-MM-DD` | Sí | Fecha de calendario existente |
| `bookingdates.checkout` | fecha `AAAA-MM-DD` | Sí | Posterior a `checkin` (mínimo 1 noche) |
| `additionalneeds` | texto | No | — |

### 3.2 Alcance y exclusiones de las pruebas

**Dentro del alcance**

- Creación de reservas con datos válidos e inválidos (F02).
- Modificación total y parcial con autorización válida, inválida y ausente (F03, F04, F08).
- Consulta de una reserva por ID existente e inexistente (F01).
- Ciclo de vida completo de la reserva: creación → consulta → modificación → eliminación (F01–F05).
- Control de acceso básico: que las operaciones protegidas no se ejecuten sin credenciales válidas (F08).

**Exclusiones explícitas**

| Exclusión | Motivo |
|---|---|
| Interfaz gráfica (F06) y código fuente (F07) | El objeto de prueba es la API y el enfoque es de caja negra. |
| Filtros de búsqueda de `GET /booking?firstname=…` como objetivo de prueba | Riesgo R09 Medio aceptado (secc. 4.3). Se usan solo como apoyo para verificar resultados. |
| Pruebas de casos dedicados a `DELETE` | Riesgo R05 Bajo aceptado; la eliminación se ejerce en TC-20 y en el cierre de cada procedimiento. |
| Rendimiento, carga, seguridad profunda y formatos XML/urlencoded | Ver la declaración de tailoring (2.3). |
| `GET /ping` como objetivo de prueba | Solo se usa como verificación de disponibilidad del entorno. |

### 3.3 Suposiciones y restricciones

**Suposiciones**

| ID | Suposición | Consecuencia si es falsa |
|---|---|---|
| S-01 | No existe una especificación formal de requisitos. El **oráculo** es, en este orden: (1) la documentación oficial de la API; (2) la semántica HTTP del RFC 9110; (3) reglas de negocio razonables definidas por el equipo (salida posterior a la entrada, precio ≥ 0, fechas válidas, campos obligatorios). | Algunos "fallos" podrían ser decisiones de diseño. Cada incidente indica qué fuente del oráculo usó. |
| S-02 | Las credenciales de prueba publicadas (`admin` / `password123`) siguen vigentes. | Se bloquean R02, R04 y R06 → criterio de suspensión (5.5). |
| S-03 | Cada integrante dedica 10 h por semana al proyecto. | Se usa la reserva de 25,5 h y, si no alcanza, se reduce el alcance de riesgos Medios. |
| S-04 | La API es de un tercero: **el equipo no puede corregir los defectos**. El re-test confirma que el defecto es reproducible y lo documenta como riesgo residual. | — |
| S-05 | El equipo tiene experiencia limitada en automatización (riesgo R17). | Se planifica un *spike* de aprendizaje de 2 h (tarea 2.4). |

**Restricciones**

| ID | Restricción |
|---|---|
| RS-01 | Ciclo de 3 semanas, del 16/11/2026 al 06/12/2026. |
| RS-02 | Sin acceso a código fuente, base de datos ni *logs* del servidor (caja negra). |
| RS-03 | La instancia pública se reinicia cada 10 minutos y es compartida: cada procedimiento debe ejecutarse completo en una sola sesión corta y con datos propios. |
| RS-04 | Sin control sobre la disponibilidad del servicio. |
| RS-05 | Toda la documentación se escribe en Markdown y se versiona en GitHub. |

### 3.4 Partes interesadas

| Parte interesada | Interés | Qué consume de este plan |
|---|---|---|
| Docente (auditor) | Verificar el cumplimiento de la norma adaptada, la trazabilidad y el rigor técnico. | Todo el plan, la matriz de trazabilidad y el release. |
| Test Manager | Que el plan sea viable y coherente. | Matriz de riesgos, WBS, cronograma. |
| Analistas y automatizador | Saber qué diseñar, ejecutar y programar. | Secciones 5, 6 y 7. |
| Equipos revisores (pares) | Evaluar la claridad y la coherencia. | Secciones 1 a 4. |
| Propietario de la API (externo, no participa) | Conocer los defectos encontrados. | Registro de incidentes (opcional). |

---

## 4. Gestión de riesgos y matriz de exposición (RBT)

### 4.1 Identificación de riesgos

La matriz v1.1 tenía 7 riesgos. En esta versión 2.0 se completó el listado para cubrir funcionalidad, seguridad, rendimiento y proyecto. Cambios respecto a la v1.1:

- **R01 se divide.** La v1.1 mezclaba dos fallos distintos: "una reserva válida se guarda mal" (sigue como **R01**) y "la API acepta datos inválidos" (nuevo **R08**). Separarlos permite calificarlos y probarlos con técnicas diferentes.
- **R06 se recalifica** de probabilidad 2 a 3. La API acepta **dos** mecanismos de autorización (`Cookie: token=…` y `Authorization: Basic …`), lo que duplica los puntos donde puede fallar el control de acceso.
- **Se agregan** R08 a R19.

**Escalas**

| Valor | Probabilidad (P) | Impacto (I) |
|---|---|---|
| 1 | Muy improbable | Insignificante: no afecta los datos ni el uso |
| 2 | Improbable | Menor: molestia, hay alternativa |
| 3 | Posible | Moderado: afecta una operación, sin pérdida de datos |
| 4 | Probable | Alto: datos incorrectos o una operación clave inutilizable |
| 5 | Casi seguro | Muy alto: pérdida o corrupción de reservas, o acceso no autorizado |

**Riesgos de producto**

| ID | Categoría | Elemento | Riesgo identificado | P | I | E | Nivel |
|---|---|---|---|---|---|---|---|
| R08 | Funcional – validación | F02 | La API acepta y guarda reservas con datos inválidos (salida antes o igual que la entrada, precio negativo, tipos o fechas inválidas, campos obligatorios ausentes). La documentación no define validaciones y la API es de práctica, por eso P = 4. | 4 | 5 | 20 | 🟥 Crítico |
| R01 | Funcional | F02 | Una reserva con datos válidos no se crea o se guarda con valores distintos a los enviados. | 3 | 5 | 15 | 🟧 Alto |
| R02 | Funcional | F03 | La modificación total no actualiza correctamente todos los datos, o altera la reserva aunque el cuerpo sea inválido o la reserva ya no exista. | 3 | 5 | 15 | 🟧 Alto |
| R06 | Seguridad – control de acceso | F08 | Las operaciones protegidas (modificar, eliminar) se ejecutan sin una autorización válida, o se rechaza una autorización válida. | 3 | 5 | 15 | 🟧 Alto |
| R03 | Funcional | F01 | La consulta no devuelve la reserva solicitada o devuelve información incorrecta. | 3 | 4 | 12 | 🟨 Medio |
| R04 | Funcional | F04 | La modificación parcial cambia campos que no fueron enviados en la solicitud. | 3 | 4 | 12 | 🟨 Medio |
| R10 | Robustez | F02–F05 | Ante datos erróneos la API responde con códigos HTTP incorrectos (p. ej., 500 en lugar de 400) o sin mensaje útil. | 4 | 3 | 12 | 🟨 Medio |
| R12 | Seguridad | F02–F04 | Entradas maliciosas (scripts o inyección en campos de texto) se aceptan y se guardan. | 3 | 4 | 12 | 🟨 Medio |
| R09 | Funcional | F01 | Los filtros de búsqueda de `GET /booking` devuelven resultados incorrectos. | 3 | 3 | 9 | 🟨 Medio |
| R11 | Seguridad | F08 | El token no expira y puede reutilizarse indefinidamente. | 3 | 3 | 9 | 🟨 Medio |
| R05 | Funcional | F05 | La reserva no se elimina o sigue disponible después de eliminarla. | 2 | 4 | 8 | 🟩 Bajo |
| R13 | Rendimiento | F01–F05 | El tiempo de respuesta de una operación individual supera 2 s. | 3 | 2 | 6 | 🟩 Bajo |
| R14 | Rendimiento | F01–F05 | La API se degrada con muchas solicitudes simultáneas. | 2 | 3 | 6 | 🟩 Bajo |
| R15 | Compatibilidad | F02–F04 | Fallos al usar formatos XML o `x-www-form-urlencoded`. | 2 | 2 | 4 | 🟩 Bajo |

**Riesgos de proyecto**

| ID | Categoría | Riesgo identificado | P | I | E | Nivel |
|---|---|---|---|---|---|---|
| R07 | Entorno | La instancia pública se reinicia cada 10 minutos o no está disponible, lo que borra datos y altera la ejecución. | 4 | 3 | 12 | 🟨 Medio |
| R18 | Tiempo | El ciclo de 3 semanas no alcanza y se retrasa la entrega. | 3 | 4 | 12 | 🟨 Medio |
| R17 | Conocimiento | Curva de aprendizaje de Playwright retrasa la automatización. | 3 | 3 | 9 | 🟨 Medio |
| R16 | Datos | Otros usuarios de la instancia pública crean reservas con los mismos nombres y contaminan las verificaciones. | 4 | 2 | 8 | 🟩 Bajo |
| R19 | Personas | Ausencia o sobrecarga académica de un integrante. | 2 | 4 | 8 | 🟩 Bajo |

### 4.2 Matriz de análisis de riesgos

**Regla de clasificación** (E = P × I, de 1 a 25):

| Nivel | Rango de E | Prioridad de ejecución |
|---|---|---|
| 🟥 Crítico | 20 – 25 | P1 |
| 🟧 Alto | 15 – 19 | P1 |
| 🟨 Medio | 9 – 14 | P2 |
| 🟩 Bajo | 1 – 8 | No se ejecuta (aceptado) |

> Los umbrales Alto ≥ 15 y Bajo ≤ 8 se conservan de la matriz v1.1; se agrega el nivel Crítico (E ≥ 20) que exige la estructura del plan, por lo que ningún riesgo anterior cambia de nivel por la escala.

**Mapa de calor (probabilidad × impacto)**

| P \ I | 1 Insignificante | 2 Menor | 3 Moderado | 4 Alto | 5 Muy alto |
|---|---|---|---|---|---|
| **5 Casi seguro** | 🟩 5 | 🟨 10 | 🟧 15 | 🟥 20 | 🟥 25 |
| **4 Probable** | 🟩 4 | 🟩 8 · R16 | 🟨 12 · R07, R10 | 🟧 16 | 🟥 20 · **R08** |
| **3 Posible** | 🟩 3 | 🟩 6 · R13 | 🟨 9 · R09, R11, R17 | 🟨 12 · R03, R04, R12, R18 | 🟧 15 · **R01, R02, R06** |
| **2 Improbable** | 🟩 2 | 🟩 4 · R15 | 🟩 6 · R14 | 🟩 8 · R05, R19 | 🟨 10 |
| **1 Muy improbable** | 🟩 1 | 🟩 2 | 🟩 3 | 🟩 4 | 🟩 5 |

**Resumen:** 1 Crítico, 3 Altos, 9 Medios y 6 Bajos (19 riesgos: 14 de producto y 5 de proyecto).

### 4.3 Tratamiento y mitigación

| Riesgo | Nivel | Tratamiento | Cómo se trata | Casos |
|---|---|---|---|---|
| R08 | Crítico | **Mitigar con pruebas (obligatorio)** | BVA y EP sobre cada regla de validación de la creación. | TC-01, TC-02, TC-07 a TC-13 |
| R01 | Alto | **Mitigar con pruebas (obligatorio)** | EP de la clase válida y comparación campo a campo entre lo enviado y lo guardado. | TC-02, TC-09, TC-19, TC-20 |
| R02 | Alto | **Mitigar con pruebas (obligatorio)** | EP del cuerpo de `PUT` y transición de estados (modificar una reserva eliminada). | TC-03, TC-14, TC-20, TC-22 |
| R06 | Alto | **Mitigar con pruebas (obligatorio)** | EP de las clases de autorización (ninguna, Cookie válida/inválida, Basic válida/inválida, credenciales de `/auth`). | TC-15, TC-16, TC-18, TC-20, TC-21, TC-23 |
| R03 | Medio | **Mitigar con pruebas (opción justificada)** | `GET /booking/{id}` es el **oráculo** de casi todos los demás casos: si la consulta falla, ningún otro resultado es confiable. Probarla cuesta 2 casos. | TC-04, TC-17 |
| R04 | Medio | **Mitigar con pruebas (opción justificada)** | El objetivo general exige preservar la integridad de los datos, y `PATCH` es la operación con más riesgo de cambiar datos no enviados. Reutiliza la reserva base de PROC-04, así que su costo es marginal. | TC-05, TC-20 |
| R10 | Medio | **Mitigación indirecta, sin casos dedicados** | Los casos de R08 esperan un código 4xx; si la API responde 500, se registra un incidente de R10. | (TC-01, TC-07, TC-08, TC-10 a TC-14) |
| R09 | Medio | **Aceptar** | Los filtros no son una operación de gestión de reservas ni están en el objetivo general. | — |
| R11, R12 | Medio | **Aceptar (excluido por tailoring)** | Seguridad profunda fuera de alcance (2.3). Riesgo residual declarado en el informe de cierre. | — |
| R05 | Bajo | **Aceptar** | Sin casos dedicados. Se ejerce de forma incidental en TC-20 (transición T5 → T6) y en el cierre de todos los procedimientos. Por eso se retira TC-06 de la versión 0.4. | — |
| R13, R14, R15 | Bajo | **Aceptar (excluido por tailoring)** | Fuera de alcance. Si en la ejecución se observa una respuesta > 2 s, se anota sin abrir incidente. | — |
| R07 | Medio (proyecto) | **Mitigar con acciones** | Cada procedimiento se ejecuta completo en menos de 10 min y crea sus propios datos; los scripts reintentan una vez; si una reserva desaparece, se marca "Bloqueado", no "Falla". | — |
| R18 | Medio (proyecto) | **Mitigar con acciones** | Reserva de 25,5 h concentrada en la semana 3 y revisión semanal del avance. | — |
| R17 | Medio (proyecto) | **Mitigar con acciones** | *Spike* de 2 h de Playwright en la semana 1 y revisión de código por el Test Manager. | — |
| R16 | Bajo (proyecto) | **Aceptar con acción preventiva de costo cero** | Apellidos únicos con marca de tiempo (`Prueba-{{sufijo}}`). | — |
| R19 | Bajo (proyecto) | **Aceptar** | Si alguien se ausenta, sus casos los ejecuta otro analista con la reserva de horas. | — |

**Resultado:** el 100 % de los riesgos Críticos y Altos (R08, R01, R02, R06) queda mitigado con casos de prueba.

---

## 5. Estrategia de pruebas y derivación de casos

La cadena de diseño es siempre la misma, y cada eslabón tiene un identificador:

```text
Riesgo (R) ──► Condición de prueba (CP) ──► Técnica (EP / BVA / ST) ──► Caso de prueba (TC)
  sección 4.3        sección 5.1                 sección 5.2                sección 5.3
```

### 5.1 Derivación de condiciones de prueba

Cada riesgo que la sección 4.3 manda mitigar con pruebas se traduce en una o más condiciones verificables.

| CP | Riesgo(s) | Elemento | Condición de prueba (qué debe cumplirse) |
|---|---|---|---|
| CP-01 | R01 | F02 | Una reserva con todos los campos válidos se crea (200, con `bookingid`) y se guarda con valores idénticos a los enviados. |
| CP-02 | R08, R01 | F02 | La salida (`checkout`) debe ser posterior a la entrada (`checkin`): con 0 noches o menos la creación se rechaza; con 1 noche se acepta. |
| CP-03 | R08, R01 | F02 | `totalprice` debe ser un número entero ≥ 0: un precio negativo o no numérico se rechaza; 0 se acepta. |
| CP-04 | R08 | F02 | La creación exige todos los campos obligatorios y el encabezado `Content-Type: application/json`; si falta alguno, se rechaza con 4xx (no con 500, ver R10) y no se crea nada. |
| CP-05 | R08 | F02 | Las fechas deben ser fechas de calendario existentes en formato `AAAA-MM-DD`; una fecha inexistente se rechaza. |
| CP-06 | R02 | F03 | Un `PUT` autorizado con cuerpo completo y válido reemplaza todos los campos de la reserva. |
| CP-07 | R02 | F03 | Un `PUT` autorizado con cuerpo incompleto se rechaza con 4xx y la reserva queda sin cambios. |
| CP-08 | R06 | F03, F05, F08 | Las operaciones protegidas solo se ejecutan con una autorización válida (Cookie con token vigente o Basic correcta); en cualquier otro caso responden 403 y no cambian nada. |
| CP-09 | R06 | F08 | `POST /auth` solo emite un token si las credenciales son válidas. |
| CP-10 | R01, R02, R04, R06 | F01–F05 | El ciclo de vida de la reserva respeta el modelo de estados (Inexistente → Activa → Eliminada) y rechaza las transiciones inválidas. |
| CP-11 | R03 | F01 | `GET /booking/{id}` devuelve 200 con los datos correctos si el ID existe, y 404 si no existe. |
| CP-12 | R04 | F04 | Un `PATCH` autorizado modifica solo los campos enviados y conserva los demás. |

### 5.2 Técnicas de diseño de pruebas

Se usan tres técnicas de caja negra de ISO/IEC/IEEE 29119-4. Cada caso declara cuál técnica generó sus datos.

| Técnica | Se aplica a | Por qué esta técnica | Cobertura que se busca |
|---|---|---|---|
| **Partición de equivalencia (EP)** | CP-01, CP-03 (tipo), CP-04, CP-05, CP-06, CP-07, CP-08, CP-09, CP-11, CP-12 | Las entradas se agrupan en clases que la API debería tratar igual (p. ej., "autorización ausente"); con un representante por clase se cubre cada comportamiento sin repetir pruebas. | 100 % de las clases definidas abajo. |
| **Análisis de valores límite (BVA)** | CP-02, CP-03 | Las reglas de fechas y precio tienen una frontera numérica; los errores de programación (usar `>` en lugar de `≥`) aparecen justo en la frontera. | 100 % de los valores límite definidos abajo. |
| **Transición de estados (ST)** | CP-10 | La reserva tiene estados (existe, eliminada) y el resultado de una operación depende del estado en que se encuentre. | Cobertura 0-switch: todas las transiciones válidas una vez + 2 transiciones inválidas de mayor riesgo. |

> **Nota sobre tablas de decisión.** El taller del 13/10/2026 proponía una tabla de decisión para R01 (campos obligatorios × `Content-Type`). Al analizarla, las dos condiciones son **independientes** y cualquier combinación con una condición falsa produce la misma acción (rechazo). Una tabla con acciones idénticas se reduce a particiones, por eso se modela con EP (CP-04) y se ahorran casos redundantes.

#### 5.2.1 BVA: duración de la estadía (CP-02)

Variable: `noches = checkout − checkin` (en días). Clase inválida: `noches ≤ 0`. Clase válida: `noches ≥ 1`. Frontera: entre 0 y 1. Se usa **BVA de 3 valores** sobre el máximo de la clase inválida (0): sus vecinos −1 y 1.

| Valor | Clase | `checkin` | `checkout` | Resultado esperado | Caso |
|---|---|---|---|---|---|
| −1 | Inválida | 2026-12-10 | 2026-12-09 | Rechazo (4xx) | TC-01 |
| 0 | Inválida (límite) | 2026-12-10 | 2026-12-10 | Rechazo (4xx) | TC-07 |
| 1 | Válida (límite) | 2026-12-10 | 2026-12-11 | 200 + `bookingid` | TC-02 |

#### 5.2.2 BVA y EP: precio total (CP-03)

Variable: `totalprice`. Clase inválida numérica: `≤ −1`. Clase válida: `≥ 0`. Clase inválida de tipo: valor no numérico. **BVA de 2 valores** en la frontera (−1 | 0) + un representante de la clase de tipo inválido. No hay límite superior documentado, así que no se prueba un máximo (se deja como observación).

| Valor | Clase | Resultado esperado | Caso |
|---|---|---|---|
| −1 | Inválida (límite) | Rechazo (4xx) | TC-08 |
| 0 | Válida (límite) | 200 + `bookingid` | TC-09 |
| `"cien"` | Inválida (tipo) | Rechazo (4xx) | TC-10 |

#### 5.2.3 EP: estructura y formato de la creación (CP-01, CP-04, CP-05)

| Clase | Tipo | Representante | Caso |
|---|---|---|---|
| Todos los campos válidos y `Content-Type: application/json` | Válida | Reserva completa de DAT-01 | TC-19 (también TC-02 y TC-09) |
| Falta un campo obligatorio | Inválida | Sin `lastname` | TC-11 |
| `Content-Type` distinto de JSON | Inválida | `text/plain` | TC-12 |
| Fecha con formato correcto pero inexistente | Inválida | `checkin = 2026-02-30` | TC-13 |

#### 5.2.4 EP: modificación, consulta y autorización (CP-06 a CP-09, CP-11, CP-12)

| Variable | Clases válidas → representante | Clases inválidas → representante |
|---|---|---|
| Cuerpo de `PUT` | Completo y válido → TC-03 | Incompleto (sin `bookingdates`) → TC-14 |
| Autorización de `PUT`/`DELETE` | Cookie con token vigente → TC-03; Basic `admin:password123` → TC-23 | Ninguna → TC-15 (`PUT`), TC-21 (`DELETE`); Cookie con token inventado → TC-16; Basic con contraseña incorrecta → TC-23 |
| Credenciales de `POST /auth` | `admin` / `password123` → preparación de cada procedimiento | Contraseña incorrecta → TC-18 |
| ID de `GET /booking/{id}` | ID existente → TC-04 | ID numérico inexistente (`999999999`) → TC-17 |
| Cuerpo de `PATCH` | Un solo campo (`firstname`) → TC-05 | — (no se define clase inválida: riesgo Medio, alcance mínimo) |

#### 5.2.5 Transición de estados: ciclo de vida de una reserva (CP-10)

```mermaid
stateDiagram-v2
    [*] --> Inexistente
    Inexistente --> Activa: T1 POST /booking (200)
    Activa --> Activa: T2 GET (200)
    Activa --> Activa: T3 PUT con autorización (200)
    Activa --> Activa: T4 PATCH con autorización (200)
    Activa --> Eliminada: T5 DELETE con autorización (201)
    Eliminada --> Eliminada: T6 GET (404)
    Activa --> Activa: I1 DELETE sin autorización (403)
    Eliminada --> Eliminada: I2 PUT con autorización (rechazo, ≠ 200)
```

| Transición | Estado inicial | Evento | Estado final | Respuesta esperada | Tipo | Caso |
|---|---|---|---|---|---|---|
| T1 | Inexistente | `POST /booking` válido | Activa | 200 | Válida | TC-20 |
| T2 | Activa | `GET /booking/{id}` | Activa | 200 + datos | Válida | TC-20 |
| T3 | Activa | `PUT` con token | Activa | 200 | Válida | TC-20 |
| T4 | Activa | `PATCH` con token | Activa | 200 | Válida | TC-20 |
| T5 | Activa | `DELETE` con token | Eliminada | 201 (definido por la documentación) | Válida | TC-20 |
| T6 | Eliminada | `GET /booking/{id}` | Eliminada | 404 | Válida | TC-20 |
| I1 | Activa | `DELETE` sin autorización | Activa | 403 | Inválida | TC-21 |
| I2 | Eliminada | `PUT` con token | Eliminada | ≠ 200 y luego `GET` → 404 | Inválida | TC-22 |

Cobertura 0-switch: 6 de 6 transiciones válidas (100 %) y 2 transiciones inválidas elegidas por riesgo (R06 e integridad de R02).

### 5.3 Generación de casos de prueba y trazabilidad

**Volumen:** 22 casos = **17 manuales** + **5 automatizados**. Distribución por integrante: Susana 6, Luisa 6, Miguel 5, Santiago 5.

**Prioridad:** P1 para casos de riesgos Crítico y Alto; P2 para riesgos Medio.

**Convenciones para los datos manuales**

- `{{baseUrl}}` = `https://restful-booker.herokuapp.com`.
- `{{sufijo}}` = marca de tiempo única que genera la colección de Postman al iniciar cada procedimiento (mitiga R16).
- Encabezados en todas las solicitudes: `Content-Type: application/json` y `Accept: application/json` (salvo que el caso diga otra cosa).
- **Reserva base (DAT-01):**

```json
{
  "firstname": "Ana",
  "lastname": "Prueba-{{sufijo}}",
  "totalprice": 150,
  "depositpaid": true,
  "bookingdates": { "checkin": "2026-12-10", "checkout": "2026-12-11" },
  "additionalneeds": "Breakfast"
}
```

- **Rechazo esperado:** se espera **400**. Cualquier 4xx cuenta como rechazo correcto de R08. Un **500** cuenta como rechazo para R08, pero se registra un incidente de **R10**. Un **200** es un fallo de R08.
- **Estado del caso:** ✅ Pasa · ❌ Falla (se abre INC) · ⛔ Bloqueado (el entorno no permitió ejecutarlo, ver R07).

#### 5.3.1 Casos manuales

##### TC-01 · Rechazar una reserva cuya salida es un día antes de la entrada

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico) · CP-02 · P1 |
| Técnica y origen de los datos | BVA de 3 valores, valor −1 noches (vecino inferior del límite inválido 0). Caso piloto de la versión 0.4. |
| Diseña / Ejecuta | Susana Romero / Luisa Tamayo |
| Procedimiento | PROC-01 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01, `lastname: "Prueba-{{sufijo}}-TC01"`, `checkin: "2026-12-10"`, `checkout: "2026-12-09"`. |
| Resultado esperado | Rechazo (400). La respuesta no contiene `bookingid`. `GET /booking?firstname=Ana&lastname=Prueba-{{sufijo}}-TC01` devuelve `[]`. |
| Resultado real | |
| Estado / Incidente | |

##### TC-02 · Crear una reserva de una noche (estadía mínima válida)

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico), R01 (Alto) · CP-02 · P1 |
| Técnica y origen de los datos | BVA de 3 valores, valor +1 noche (primer valor de la clase válida). |
| Diseña / Ejecuta | Susana Romero / Luisa Tamayo |
| Procedimiento | PROC-01 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01, `lastname: "Prueba-{{sufijo}}-TC02"`, `checkin: "2026-12-10"`, `checkout: "2026-12-11"`. |
| Resultado esperado | 200 con `bookingid` y `booking` igual a lo enviado. `GET /booking/{bookingid}` → 200 con los mismos datos. |
| Resultado real | |
| Estado / Incidente | |

##### TC-07 · Rechazar una reserva con 0 noches (entrada y salida el mismo día)

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico) · CP-02 · P1 |
| Técnica y origen de los datos | BVA de 3 valores, valor 0 noches (límite de la clase inválida). |
| Diseña / Ejecuta | Susana Romero / Luisa Tamayo |
| Procedimiento | PROC-01 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01, `lastname: "Prueba-{{sufijo}}-TC07"`, `checkin: "2026-12-10"`, `checkout: "2026-12-10"`. |
| Resultado esperado | Rechazo (400). Sin `bookingid`. El filtro por `lastname` devuelve `[]`. |
| Resultado real | |
| Estado / Incidente | |

##### TC-08 · Rechazar una reserva con precio negativo

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico) · CP-03 · P1 |
| Técnica y origen de los datos | BVA de 2 valores, valor −1 (límite de la clase inválida `≤ −1`). |
| Diseña / Ejecuta | Susana Romero / Luisa Tamayo |
| Procedimiento | PROC-01 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01, `lastname: "Prueba-{{sufijo}}-TC08"`, `totalprice: -1`. |
| Resultado esperado | Rechazo (400). Sin `bookingid`. El filtro por `lastname` devuelve `[]`. |
| Resultado real | |
| Estado / Incidente | |

##### TC-09 · Crear una reserva con precio 0

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico), R01 (Alto) · CP-03 · P1 |
| Técnica y origen de los datos | BVA de 2 valores, valor 0 (límite de la clase válida `≥ 0`). |
| Diseña / Ejecuta | Susana Romero / Luisa Tamayo |
| Procedimiento | PROC-01 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01, `lastname: "Prueba-{{sufijo}}-TC09"`, `totalprice: 0`. |
| Resultado esperado | 200 con `bookingid`; `GET /booking/{bookingid}` muestra `totalprice: 0` y el resto igual a lo enviado. |
| Resultado real | |
| Estado / Incidente | |

##### TC-10 · Rechazar una reserva con precio no numérico

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico) · CP-03 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "tipo no numérico". |
| Diseña / Ejecuta | Susana Romero / Luisa Tamayo |
| Procedimiento | PROC-01 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01, `lastname: "Prueba-{{sufijo}}-TC10"`, `totalprice: "cien"`. |
| Resultado esperado | Rechazo (400). Sin `bookingid`. El filtro por `lastname` devuelve `[]`. |
| Resultado real | |
| Estado / Incidente | |

##### TC-11 · Rechazar una reserva sin un campo obligatorio

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico) · CP-04 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "falta un campo obligatorio" (se elige `lastname`). |
| Diseña / Ejecuta | Luisa Tamayo / Susana Romero |
| Procedimiento | PROC-02 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01 **sin** la propiedad `lastname` y con `firstname: "Ana-{{sufijo}}-TC11"`. |
| Resultado esperado | Rechazo **400** con un mensaje que indique el campo faltante (un 500 se registra como incidente de R10). Sin `bookingid`. `GET /booking?firstname=Ana-{{sufijo}}-TC11` → `[]`. |
| Resultado real | |
| Estado / Incidente | |

##### TC-12 · Rechazar una creación con Content-Type distinto de JSON

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico) · CP-04 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "Content-Type no JSON" (`text/plain`). |
| Diseña / Ejecuta | Luisa Tamayo / Susana Romero |
| Procedimiento | PROC-02 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con encabezado `Content-Type: text/plain` y como texto el contenido de DAT-01 con `lastname: "Prueba-{{sufijo}}-TC12"`. |
| Resultado esperado | Rechazo 4xx (415 o 400). Sin `bookingid`. El filtro por `lastname` devuelve `[]`. |
| Resultado real | |
| Estado / Incidente | |

##### TC-13 · Rechazar una reserva con una fecha de entrada inexistente

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R08 (Crítico) · CP-05 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "formato correcto, fecha inexistente" (30 de febrero). |
| Diseña / Ejecuta | Luisa Tamayo / Susana Romero |
| Procedimiento | PROC-02 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `POST {{baseUrl}}/booking` con DAT-01, `lastname: "Prueba-{{sufijo}}-TC13"`, `checkin: "2026-02-30"`, `checkout: "2026-03-05"`. |
| Resultado esperado | Rechazo (400). Sin `bookingid`. Si la API la acepta, registrar qué fecha guardó (p. ej., si la convirtió en 2026-03-02). |
| Resultado real | |
| Estado / Incidente | |

##### TC-03 · Modificar todos los datos de una reserva con token válido

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R02 (Alto) · CP-06 · P1 |
| Técnica y origen de los datos | EP: clase válida de cuerpo (completo) combinada con clase válida de autorización (Cookie con token vigente). |
| Diseña / Ejecuta | Miguel Vallejo / Susana Romero |
| Procedimiento | PROC-03 |
| Precondiciones | Token obtenido con `POST /auth`; reserva base creada en la preparación de PROC-03 (`{{bookingid}}`). |
| Entrada | `PUT {{baseUrl}}/booking/{{bookingid}}` con `Cookie: token={{token}}` y DAT-01 cambiando `totalprice: 180` y `depositpaid: false`. |
| Resultado esperado | 200 con los datos nuevos. `GET /booking/{{bookingid}}` muestra `totalprice: 180`, `depositpaid: false` y los demás campos sin cambio. |
| Resultado real | |
| Estado / Incidente | |

##### TC-14 · Rechazar una modificación total con cuerpo incompleto

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R02 (Alto) · CP-07 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "cuerpo de PUT incompleto" (sin `bookingdates`). |
| Diseña / Ejecuta | Miguel Vallejo / Susana Romero |
| Procedimiento | PROC-03 |
| Precondiciones | Token vigente; reserva `{{bookingid}}` en el estado que dejó TC-03. |
| Entrada | `PUT {{baseUrl}}/booking/{{bookingid}}` con `Cookie: token={{token}}` y el cuerpo de TC-03 **sin** `bookingdates`. |
| Resultado esperado | Rechazo 400. `GET /booking/{{bookingid}}` devuelve exactamente lo mismo que después de TC-03. |
| Resultado real | |
| Estado / Incidente | |

##### TC-15 · Rechazar una modificación sin autorización

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R06 (Alto) · CP-08 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "sin autorización" (ni Cookie ni Authorization). |
| Diseña / Ejecuta | Miguel Vallejo / Susana Romero |
| Procedimiento | PROC-03 |
| Precondiciones | Reserva `{{bookingid}}` activa. |
| Entrada | `PUT {{baseUrl}}/booking/{{bookingid}}` **sin** Cookie ni Authorization, con DAT-01 cambiando `totalprice: 999`. |
| Resultado esperado | 403. `GET /booking/{{bookingid}}` no muestra `totalprice: 999`. |
| Resultado real | |
| Estado / Incidente | |

##### TC-16 · Rechazar una modificación con un token inventado

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R06 (Alto) · CP-08 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "Cookie con token no emitido por la API". |
| Diseña / Ejecuta | Miguel Vallejo / Susana Romero |
| Procedimiento | PROC-03 |
| Precondiciones | Reserva `{{bookingid}}` activa. |
| Entrada | `PUT {{baseUrl}}/booking/{{bookingid}}` con `Cookie: token=abc123invalido` y DAT-01 cambiando `totalprice: 999`. |
| Resultado esperado | 403. La reserva no cambia. |
| Resultado real | |
| Estado / Incidente | |

##### TC-18 · No emitir token con una contraseña incorrecta

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R06 (Alto) · CP-09 · P1 |
| Técnica y origen de los datos | EP, representante de la clase inválida "contraseña incorrecta para un usuario existente". |
| Diseña / Ejecuta | Miguel Vallejo / Susana Romero |
| Procedimiento | PROC-03 |
| Precondiciones | Ninguna. |
| Entrada | `POST {{baseUrl}}/auth` con `{"username": "admin", "password": "clave-incorrecta"}`. |
| Resultado esperado | La respuesta **no** contiene la propiedad `token` (esto es lo que mitiga R06). Según RFC 9110 se espera 401; si responde 200 con un mensaje de error, se registra un incidente menor de R10. |
| Resultado real | |
| Estado / Incidente | |

##### TC-04 · Consultar una reserva existente

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R03 (Medio) · CP-11 · P2 |
| Técnica y origen de los datos | EP, representante de la clase válida "ID existente". |
| Diseña / Ejecuta | Luisa Tamayo / Susana Romero |
| Procedimiento | PROC-04 |
| Precondiciones | Reserva base creada en la preparación de PROC-04 con DAT-01 (`{{bookingid}}`). |
| Entrada | `GET {{baseUrl}}/booking/{{bookingid}}`. |
| Resultado esperado | 200. El JSON contiene `firstname`, `lastname`, `totalprice`, `depositpaid`, `bookingdates` y `additionalneeds` con los mismos valores registrados. |
| Resultado real | |
| Estado / Incidente | |

##### TC-17 · Consultar una reserva que no existe

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R03 (Medio) · CP-11 · P2 |
| Técnica y origen de los datos | EP, representante de la clase inválida "ID numérico no asignado" (`999999999`, muy por encima de los IDs que genera la instancia, que se reinicia cada 10 min). |
| Diseña / Ejecuta | Luisa Tamayo / Susana Romero |
| Procedimiento | PROC-04 |
| Precondiciones | `GET /ping` → 201. |
| Entrada | `GET {{baseUrl}}/booking/999999999`. |
| Resultado esperado | 404 sin datos de ninguna reserva. |
| Resultado real | |
| Estado / Incidente | |

##### TC-05 · Modificar solo el nombre de una reserva

| Campo | Detalle |
|---|---|
| Riesgo · Condición · Prioridad | R04 (Medio) · CP-12 · P2 |
| Técnica y origen de los datos | EP, representante de la clase válida "cuerpo parcial con un solo campo". |
| Diseña / Ejecuta | Luisa Tamayo / Susana Romero |
| Procedimiento | PROC-04 |
| Precondiciones | Token vigente; reserva `{{bookingid}}` consultada en TC-04 (estado inicial conocido). |
| Entrada | `PATCH {{baseUrl}}/booking/{{bookingid}}` con `Cookie: token={{token}}` y `{"firstname": "Ana Lucía"}`. |
| Resultado esperado | 200. `GET /booking/{{bookingid}}`: solo `firstname` cambia a "Ana Lucía"; los demás campos son idénticos a los de TC-04. |
| Resultado real | |
| Estado / Incidente | |

#### 5.3.2 Casos automatizados

Regla de enlace: los casos automatizados **no describen pasos**. Cada uno enlaza al bloque exacto del script en GitHub, donde están los pasos y las verificaciones. Se ejecutan con `npm test` (PROC-05).

| ID | Nombre | Riesgo · Condición · Prioridad | Técnica y origen de los datos | Programa / Revisa | Script |
|---|---|---|---|---|---|
| TC-19 | Crear una reserva válida persiste exactamente los datos enviados | R01 (Alto) · CP-01 · P1 | EP, representante de la clase válida (DAT-01 con apellido único). | Santiago Montoya / Miguel Vallejo | [flujos_criticos.spec.js#L63-L86](../tests/flujos_criticos.spec.js#L63-L86) |
| TC-20 | Ciclo de vida completo de una reserva | R01, R02, R04, R06 (Alto/Medio) · CP-10 · P1 | ST, cobertura 0-switch de las transiciones T1 a T6. | Santiago Montoya / Miguel Vallejo | [flujos_criticos.spec.js#L88-L137](../tests/flujos_criticos.spec.js#L88-L137) |
| TC-21 | Eliminar sin autorización se rechaza | R06 (Alto) · CP-08, CP-10 · P1 | ST, transición inválida I1; EP, clase "sin autorización". | Santiago Montoya / Miguel Vallejo | [flujos_criticos.spec.js#L139-L161](../tests/flujos_criticos.spec.js#L139-L161) |
| TC-22 | Modificar una reserva eliminada se rechaza | R02 (Alto) · CP-10 · P1 | ST, transición inválida I2. | Santiago Montoya / Miguel Vallejo | [flujos_criticos.spec.js#L163-L185](../tests/flujos_criticos.spec.js#L163-L185) |
| TC-23 | La autorización Basic solo permite modificar con credenciales válidas | R06 (Alto) · CP-08 · P1 | EP, clase válida y clase inválida de `Authorization: Basic`. | Santiago Montoya / Miguel Vallejo | [flujos_criticos.spec.js#L187-L223](../tests/flujos_criticos.spec.js#L187-L223) |

> **Por qué se automatizan estos 5 y no otros.** Son flujos de regresión críticos (creación, ciclo de vida, control de acceso) y estables: no dependen de reglas de validación no documentadas. Los casos de validación (TC-01, TC-07 a TC-13) quedan manuales porque es probable que revelen defectos y requieren interpretar cada respuesta.

#### 5.3.3 Procedimientos de prueba

Cada procedimiento se ejecuta completo en una sola sesión de menos de 10 minutos (mitiga R07). Orden de ejecución: PROC-05 (humo) → P1 → P2.

| ID | Prioridad | Objetivo | Preparación | Secuencia | Cierre | Ejecuta |
|---|---|---|---|---|---|---|
| PROC-01 | P1 | Validar las reglas de fechas y precio de la creación (R08, R01) | Ejecutar "00 Preparación" de la colección: `GET /ping` → 201 y generar `{{sufijo}}`. | TC-02 → TC-09 → TC-01 → TC-07 → TC-08 → TC-10 (primero los válidos, para confirmar que la API crea) | Obtener token y eliminar cada `bookingid` creado, **incluidos los que la API aceptó por error**. Anotar los IDs en el resultado real. | Luisa Tamayo |
| PROC-02 | P1 | Validar la estructura y el formato de la creación (R08) | Igual que PROC-01. | TC-11 → TC-12 → TC-13 | Igual que PROC-01. | Susana Romero |
| PROC-03 | P1 | Validar modificación total y control de acceso (R02, R06) | `GET /ping`; `POST /auth` → `{{token}}`; crear reserva base con DAT-01 → `{{bookingid}}`. | TC-18 → TC-03 → TC-14 → TC-15 → TC-16 | `DELETE /booking/{{bookingid}}` con token; confirmar `GET` → 404. | Susana Romero |
| PROC-04 | P2 | Validar consulta y modificación parcial (R03, R04) | `GET /ping`; `POST /auth`; crear reserva base con DAT-01. | TC-17 → TC-04 → TC-05 (se consulta antes de modificar para tener el estado inicial) | Igual que PROC-03. | Susana Romero |
| PROC-05 | P1 | Regresión automatizada (R01, R02, R04, R06) | `npm install` (solo la primera vez). | `npm test` → TC-19 a TC-23 | Guardar `playwright-report/` como evidencia; los scripts limpian sus propios datos. | Santiago Montoya |

#### 5.3.4 Matriz de trazabilidad bidireccional

**Hacia adelante: Riesgo → Condición → Caso**

| Riesgo | Nivel | Condiciones | Casos | Cobertura |
|---|---|---|---|---|
| R08 | 🟥 Crítico | CP-02, CP-03, CP-04, CP-05 | TC-01, TC-02, TC-07, TC-08, TC-09, TC-10, TC-11, TC-12, TC-13 | ✅ 9 casos |
| R01 | 🟧 Alto | CP-01, CP-02, CP-03, CP-10 | TC-02, TC-09, TC-19, TC-20 | ✅ 4 casos |
| R02 | 🟧 Alto | CP-06, CP-07, CP-10 | TC-03, TC-14, TC-20, TC-22 | ✅ 4 casos |
| R06 | 🟧 Alto | CP-08, CP-09, CP-10 | TC-15, TC-16, TC-18, TC-20, TC-21, TC-23 | ✅ 6 casos |
| R03 | 🟨 Medio | CP-11 | TC-04, TC-17 | ✅ 2 casos (opción justificada) |
| R04 | 🟨 Medio | CP-10, CP-12 | TC-05, TC-20 | ✅ 2 casos (opción justificada) |
| R09, R10, R11, R12 | 🟨 Medio | — | — | Aceptados o mitigación indirecta (4.3) |
| R05, R13, R14, R15 | 🟩 Bajo | — | — | Aceptados (4.3) |

**Hacia atrás: Caso → Condición → Riesgo**

| Caso | Tipo | Técnica | Condición | Riesgo(s) | Prioridad |
|---|---|---|---|---|---|
| TC-01 | Manual | BVA | CP-02 | R08 | P1 |
| TC-02 | Manual | BVA | CP-02 | R08, R01 | P1 |
| TC-03 | Manual | EP | CP-06 | R02 | P1 |
| TC-04 | Manual | EP | CP-11 | R03 | P2 |
| TC-05 | Manual | EP | CP-12 | R04 | P2 |
| TC-07 | Manual | BVA | CP-02 | R08 | P1 |
| TC-08 | Manual | BVA | CP-03 | R08 | P1 |
| TC-09 | Manual | BVA | CP-03 | R08, R01 | P1 |
| TC-10 | Manual | EP | CP-03 | R08 | P1 |
| TC-11 | Manual | EP | CP-04 | R08 | P1 |
| TC-12 | Manual | EP | CP-04 | R08 | P1 |
| TC-13 | Manual | EP | CP-05 | R08 | P1 |
| TC-14 | Manual | EP | CP-07 | R02 | P1 |
| TC-15 | Manual | EP | CP-08 | R06 | P1 |
| TC-16 | Manual | EP | CP-08 | R06 | P1 |
| TC-17 | Manual | EP | CP-11 | R03 | P2 |
| TC-18 | Manual | EP | CP-09 | R06 | P1 |
| TC-19 | Automatizado | EP | CP-01 | R01 | P1 |
| TC-20 | Automatizado | ST | CP-10 | R01, R02, R04, R06 | P1 |
| TC-21 | Automatizado | ST + EP | CP-08, CP-10 | R06 | P1 |
| TC-22 | Automatizado | ST | CP-10 | R02 | P1 |
| TC-23 | Automatizado | EP | CP-08 | R06 | P1 |

**Verificación:** 22 casos, 0 casos huérfanos (todos tienen condición y riesgo), 100 % de los riesgos Críticos y Altos con al menos un caso. TC-06 no existe porque se retiró en la versión 1.0 (R05 aceptado); los IDs no se reutilizan para no romper la trazabilidad con las versiones anteriores.

### 5.4 Requisitos de entorno y datos de prueba

**Entornos**

| ID | Uso | Hardware y red | Software y versiones |
|---|---|---|---|
| AMB-01 | Casos manuales (PROC-01 a PROC-04) | Computador personal con Internet estable | Postman (versión de escritorio o web) con la colección `postman/restful-booker-casos-manuales.postman_collection.json` |
| AMB-02 | Casos automatizados (PROC-05) | Igual | Node.js 18 o superior, `@playwright/test` ≥ 1.49 (según `package.json`), Git. No requiere navegadores. |
| AMB-03 | Objeto de prueba (común) | Servidor de terceros | RESTful Booker, `https://restful-booker.herokuapp.com`, JSON. Instancia compartida que se reinicia cada 10 min. |
| AMB-04 | Gestión | — | Repositorio GitHub `plan-pruebas-restful-booker`, rama `main` protegida. |

**Datos**

| ID | Contenido | Generación | Usado en |
|---|---|---|---|
| DAT-01 | Reserva base válida (sección 5.3) | Manual, con `{{sufijo}}` único por procedimiento | Todos los procedimientos manuales |
| DAT-02 | Credenciales de prueba públicas `admin` / `password123` | Documentación de la API | Preparación de PROC-03, PROC-04, PROC-05; TC-23 |
| DAT-03 | Valores de BVA y EP (tablas 5.2.1 a 5.2.4) | Derivados con las técnicas | TC-01 a TC-18 |
| DAT-04 | Reservas automáticas con apellido `Prueba-<marca de tiempo>` | Función `reservaValida()` del script | TC-19 a TC-23 |

No se usan datos personales reales. Todos los datos son sintéticos y cada procedimiento elimina lo que crea.

### 5.5 Criterios de suspensión y finalización

**Criterios de entrada (para empezar a ejecutar)**

- Plan v1.0 en `main`, aprobado por el Test Manager.
- 22 casos diseñados y con revisión cruzada.
- `GET /ping` → 201 y `POST /auth` emite token.
- Colección de Postman importada y `npm test` ejecutado al menos una vez (prueba de humo).

**Criterios de suspensión**

| Situación | Acción |
|---|---|
| `GET /ping` falla 3 veces seguidas con 2 minutos entre intentos | Suspender toda la ejecución. |
| `POST /auth` no emite token con las credenciales válidas | Suspender PROC-03, PROC-04 y PROC-05 (dependen del token). |
| Más del 30 % de los casos de un procedimiento quedan ⛔ Bloqueado por reinicios de la instancia | Suspender ese procedimiento. |

**Criterio de reanudación:** `GET /ping` → 201 durante 5 minutos y token emitido. El procedimiento se repite **completo desde su preparación**, no desde el caso donde se detuvo.

**Criterios de finalización**

| # | Criterio | Meta |
|---|---|---|
| 1 | Casos P1 (riesgos Crítico y Alto) ejecutados | 100 % (19 de 19) |
| 2 | Casos P2 (riesgos Medio) ejecutados | ≥ 80 % (al menos 3 de 3, porque son pocos) |
| 3 | Valores límite y particiones de R08 ejecutados | 100 % |
| 4 | Riesgos Crítico y Alto con al menos un caso ejecutado | 100 % (4 de 4) |
| 5 | Fallos con incidente registrado en `docs/registro-incidentes.md` | 100 % |
| 6 | Incidentes Críticos y Altos reproducidos en un segundo intento (re-test) | 100 % |
| 7 | Independencia: ningún caso lo ejecuta quien lo diseñó | 100 % |
| 8 | Trazabilidad bidireccional sin huérfanos | Verificada por el Test Manager |
| 9 | Scripts automatizados | 5 de 5 ejecutan; si alguno falla por un defecto real, tiene incidente asociado |

> **Sobre "cero defectos abiertos".** Como la API es de un tercero (S-04), el equipo no puede corregir defectos. Por eso **no** se exige "0 defectos críticos abiertos", que haría imposible terminar. Se exige que cada defecto esté reportado, reproducido y declarado como **riesgo residual** en el informe de cierre.

---

## 6. Actividades de prueba y estimaciones

### 6.1 Desglose de tareas

Iniciales: **MV** Miguel Vallejo (Test Manager) · **SR** Susana Romero (Analista) · **LT** Luisa Tamayo (Analista) · **SM** Santiago Montoya (Automatizador).

| ID | Actividad | Resp. | Semana | Horas | Depende de |
|---|---|---|---|---|---|
| **1.0** | **Gestión de las pruebas** | | | **15,0** | |
| 1.1 | Declaración de tailoring y contexto (secciones 1 a 3) | MV | S1 | 3,0 | — |
| 1.2 | Matriz de riesgos v2.0 y tratamiento (sección 4) | MV | S1 | 3,0 | 1.1 |
| 1.3 | WBS, roles y cronograma (secciones 6 a 8) | MV | S1 | 2,0 | 1.2 |
| 1.4 | Seguimiento semanal (3 reuniones de 30 min × 4 personas) | Todos | S1–S3 | 6,0 | — |
| 1.5 | Monitoreo y control: revisión del avance de la ejecución | MV | S2 | 1,0 | 5.1 |
| **2.0** | **Preparación de entornos y datos** | | | **9,5** | |
| 2.1 | Repositorio GitHub: estructura, ramas y reglas | MV | S1 | 1,5 | — |
| 2.2 | Colección de Postman, variables y datos sintéticos | LT | S2 | 3,0 | 3.4 |
| 2.3 | Proyecto Node + Playwright y prueba de humo | SM | S1 | 3,0 | 2.1 |
| 2.4 | *Spike* de aprendizaje de Playwright para APIs (mitiga R17) | SM | S1 | 2,0 | 2.3 |
| **3.0** | **Diseño documental de casos (Markdown)** | | | **26,0** | |
| 3.1 | Derivación de CP-02 y CP-03 con BVA | SR | S1 | 2,0 | 1.2 |
| 3.2 | Derivación de CP-04, CP-05, CP-11 y CP-12 con EP | LT | S1 | 1,5 | 1.2 |
| 3.3 | Redacción de 6 casos manuales (TC-01, 02, 07, 08, 09, 10) | SR | S1 | 6,0 | 3.1 |
| 3.4 | Redacción de 6 casos manuales (TC-11, 12, 13, 04, 17, 05) | LT | S1 | 6,0 | 3.2 |
| 3.5 | Redacción de 5 casos manuales (TC-03, 14, 15, 16, 18) | MV | S2 | 5,0 | 1.2 |
| 3.6 | Especificación de 5 casos automatizados y modelo de estados | SM | S1 | 2,5 | 1.2 |
| 3.7 | Revisión cruzada de los casos de LT | SR | S1 | 1,0 | 3.4 |
| 3.8 | Revisión cruzada de los casos de SR | LT | S1 | 1,0 | 3.3 |
| 3.9 | Revisión de los casos de MV | SR | S2 | 1,0 | 3.5 |
| **4.0** | **Programación de scripts de automatización** | | | **11,5** | |
| 4.1 | Programación de TC-19 a TC-23 | SM | S2 | 8,0 | 2.3, 3.6 |
| 4.2 | Revisión de código de los scripts | MV | S2 | 1,5 | 4.1 |
| 4.3 | Depuración y estabilización | SM | S3 | 2,0 | 4.2 |
| **5.0** | **Ejecución y reporte de incidentes** | | | **14,5** | |
| 5.1 | PROC-01: ejecución de 6 casos | LT | S2 | 3,0 | 2.2, 3.3 |
| 5.2 | PROC-02 y PROC-04: ejecución de 6 casos | SR | S2 | 3,0 | 2.2, 3.4 |
| 5.3 | PROC-03: ejecución de 5 casos | SR | S2 | 2,5 | 2.2, 3.5 |
| 5.4 | Reporte de incidentes de PROC-02, 03 y 04 | SR | S2 | 2,0 | 5.2, 5.3 |
| 5.5 | Reporte de incidentes de PROC-01 | LT | S2 | 2,0 | 5.1 |
| 5.6 | PROC-05: regresión automatizada y reporte HTML | SM | S3 | 1,0 | 4.3 |
| 5.7 | Incidentes de los casos automatizados | SM | S3 | 1,0 | 5.6 |
| **6.0** | **Re-test y regresión** | | | **5,0** | |
| 6.1 | Re-test de incidentes y regresión manual (PROC-02 a 04) | SR | S3 | 2,5 | 5.4 |
| 6.2 | Re-test de incidentes y regresión manual (PROC-01) | LT | S3 | 2,5 | 5.5 |
| **7.0** | **Trazabilidad, cierre y release** | | | **13,0** | |
| 7.1 | Verificación de trazabilidad de los casos propios | SR | S3 | 1,0 | 6.1 |
| 7.2 | Verificación de trazabilidad de los casos propios | LT | S3 | 1,0 | 6.2 |
| 7.3 | Auditoría interna de trazabilidad del plan completo | MV | S3 | 2,0 | 7.1, 7.2 |
| 7.4 | Informe de cierre de pruebas | MV | S3 | 3,0 | 7.3 |
| 7.5 | Correcciones finales al documento | SR | S3 | 1,5 | 7.3 |
| 7.6 | Correcciones finales al documento | LT | S3 | 1,5 | 7.3 |
| 7.7 | Enlaces Markdown ↔ scripts y README | SM | S3 | 1,0 | 5.6 |
| 7.8 | Consolidación del release v1.0.0 (tag, PDF) | MV | S3 | 2,0 | 7.4 |
| | **Total** | | | **94,5** | |

### 6.2 Estimación de esfuerzo por actividad

**Base de la estimación (tasas unitarias)**

| Unidad | Tasa | Fundamento |
|---|---|---|
| Diseñar un caso manual (incluye datos y redacción en Markdown) | 1,0 h | El caso piloto TC-01 tomó cerca de 1 h en el taller de especificación. |
| Especificar un caso automatizado (sin pasos) | 0,5 h | Solo requiere técnica, datos y enlace. |
| Programar un script | 1,6 h | 8 h / 5 scripts; incluye el tiempo oculto de *debugging* inicial. |
| Ejecutar un caso manual con evidencia | 0,5 h | Enviar la solicitud, verificar con `GET`, capturar la evidencia y llenar la tabla. |
| Reportar un incidente | 0,5 h | Se estiman 8 incidentes manuales (la mayoría de los 9 casos de validación de R08 podrían fallar) + 2 automatizados. |

**Comprobación de viabilidad (las cuentas cuadran en 3 semanas)**

```text
Capacidad = 4 integrantes × 3 semanas × 10 h/semana = 120,0 h
Esfuerzo planificado (WBS)                           =  94,5 h
Reserva de contingencia = 120,0 − 94,5               =  25,5 h  (21,3 % de la capacidad)
```

**Carga por integrante y por semana** (máximo permitido: 10 h por semana)

| Integrante | Rol | S1 | S2 | S3 | Total |
|---|---|---|---|---|---|
| Miguel Vallejo (MV) | Test Manager | 10,0 | 8,0 | 7,5 | 25,5 |
| Susana Romero (SR) | Analista de pruebas | 9,5 | 9,0 | 5,5 | 24,0 |
| Luisa Tamayo (LT) | Analista de pruebas | 9,0 | 8,5 | 5,5 | 23,0 |
| Santiago Montoya (SM) | Automatizador | 8,0 | 8,5 | 5,5 | 22,0 |
| **Total del equipo** | | **36,5** | **34,0** | **24,0** | **94,5** |
| **Horas libres (reserva)** | | 3,5 | 6,0 | 16,0 | **25,5** |

- Ningún integrante supera las 10 h en ninguna semana, y la diferencia entre el que más y el que menos trabaja es de 3,5 h.
- La reserva se concentra en la semana 3 a propósito: es donde se materializan los riesgos R07 (re-ejecuciones por caídas del entorno) y R18 (retrasos acumulados).
- Si la reserva se agota, el orden de recorte es: (1) la regresión manual de PROC-04 (P2); (2) TC-17 y TC-05 (riesgos Medios). Nunca se recortan casos P1.

---

## 7. Personal

### 7.1 Roles y responsabilidades de prueba

| Rol | Integrante | Responsabilidades | Casos que diseña o programa | Casos que ejecuta |
|---|---|---|---|---|
| **Test Manager** | Miguel Angel Vallejo Giroldo | Declaración de tailoring; matriz de riesgos; coherencia de la trazabilidad; WBS y cronograma; arquitectura y reglas del repositorio; revisión de código; aprobación de *pull requests*; informe de cierre; release. | TC-03, TC-14, TC-15, TC-16, TC-18 (decisiones de autorización, por ser el riesgo de mayor responsabilidad del rol) | — (revisa el reporte de PROC-05) |
| **Analista de pruebas 1** | Susana Romero García | Derivación de condiciones de fechas y precio con BVA; redacción en Markdown; revisión cruzada; ejecución independiente; reporte de incidentes. | TC-01, TC-02, TC-07, TC-08, TC-09, TC-10 | PROC-02, PROC-03, PROC-04 (11 casos) |
| **Analista de pruebas 2** | Luisa Fernanda Tamayo Arias | Derivación de condiciones de estructura, consulta y modificación parcial con EP; colección de Postman; ejecución independiente; reporte de incidentes. | TC-11, TC-12, TC-13, TC-04, TC-17, TC-05 | PROC-01 (6 casos) |
| **Ejecutor / Automatizador** | Santiago Montoya Restrepo | Configuración de Node y Playwright; modelo de estados; programación y estabilización de scripts; ejecución de la regresión; incidentes de los automatizados; enlaces Markdown ↔ código. | TC-19, TC-20, TC-21, TC-22, TC-23 | PROC-05 |

**Matriz RACI de los entregables** (R = realiza, A = aprueba, C = consultado, I = informado)

| Entregable | MV | SR | LT | SM | Docente |
|---|---|---|---|---|---|
| Declaración de tailoring (2.3) | R/A | C | C | C | I |
| Matriz de riesgos (4) | R/A | C | C | C | I |
| Condiciones y casos manuales (5.1–5.3.1) | A | R | R | C | I |
| Scripts automatizados (5.3.2, `/tests`) | A | I | I | R | I |
| Colección de Postman | A | C | R | I | — |
| Ejecución y registro de incidentes | A | R | R | R | I |
| Informe de cierre y release | R/A | C | C | C | A (aprobación final) |

**Especialización temporal (para evitar que "todos hagan todo al mismo tiempo")**

| Semana | Quién lleva la mayor carga | Por qué |
|---|---|---|
| S1 | Test Manager y analistas | Se define el plan y se diseñan los casos; el automatizador prepara el entorno y aprende la herramienta. |
| S2 | Ejecutores (analistas cruzados) y automatizador | Se ejecutan los casos manuales y se programan los scripts. |
| S3 | Test Manager | Trazabilidad final, informe de cierre y release; los demás hacen re-test y correcciones. |

**Reglas de independencia:** quien diseña un caso no lo ejecuta (Susana ↔ Luisa; los casos de Miguel los ejecuta Susana); los scripts de Santiago los revisa Miguel antes de entrar a `main`.

---

## 8. Cronograma

### 8.1 Hitos y fechas de ejecución

Ciclo de 3 semanas: **S1** del 16 al 22 de noviembre, **S2** del 23 al 29 de noviembre y **S3** del 30 de noviembre al 6 de diciembre de 2026.

```mermaid
gantt
    title Plan de pruebas RESTful Booker – ciclo de 3 semanas
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    section Planificación y diseño
    Tailoring, contexto y matriz de riesgos (1.1–1.3)   :a1, 2026-11-16, 4d
    Repositorio, Node y Playwright (2.1, 2.3, 2.4)      :a2, 2026-11-16, 5d
    Condiciones y casos SR/LT/SM (3.1–3.4, 3.6–3.8)      :a3, 2026-11-18, 5d
    Casos de MV y su revisión (3.5, 3.9)                 :a4, 2026-11-21, 3d
    section Ejecución
    Colección de Postman (2.2)                           :b1, 2026-11-23, 2d
    Ejecución manual PROC-01 a PROC-04 (5.1–5.3)         :b2, 2026-11-25, 3d
    Reporte de incidentes (5.4, 5.5)                     :b3, 2026-11-26, 3d
    Programación y revisión de scripts (4.1, 4.2)        :b4, 2026-11-23, 7d
    section Cierre
    Depuración y regresión automatizada (4.3, 5.6, 5.7)  :c1, 2026-11-30, 2d
    Re-test y regresión manual (6.1, 6.2)                :c2, 2026-11-30, 3d
    Trazabilidad e informe de cierre (7.1–7.4)           :c3, 2026-12-02, 2d
    Correcciones y release v1.0.0 (7.5–7.8)              :c4, 2026-12-03, 2d
    Reserva de contingencia                              :c5, 2026-12-05, 2d
```

| Hito | Fecha | Criterio de cumplimiento | Evidencia en GitHub |
|---|---|---|---|
| H1 | Jue 19/11/2026 | Secciones 1 a 4 (tailoring y matriz de riesgos) aprobadas por el Test Manager | *Pull request* aprobado |
| H2 | Lun 23/11/2026 | 22 casos diseñados con revisión cruzada; plan listo para revisión del docente | Tag `v0.9.0-diseno` |
| H3 | Mié 25/11/2026 | Criterios de entrada cumplidos: Postman importado y prueba de humo de `npm test` | *Commit* de la colección y del reporte de humo |
| H4 | Sáb 28/11/2026 | Ciclo 1 de ejecución manual completo e incidentes registrados | `docs/registro-incidentes.md` actualizado |
| H5 | Dom 29/11/2026 | Scripts TC-19 a TC-23 en `main`, revisados | *Pull request* aprobado |
| H6 | Mié 02/12/2026 | Re-test y regresión completos; criterios de finalización evaluados | Resultados reales en la sección 5.3 |
| H7 | Vie 04/12/2026 | Release `v1.0.0` publicado: plan, resultados, incidentes e informe de cierre en Markdown y PDF | Release de GitHub |
| — | 05–06/12/2026 | Reserva de contingencia (no planificada) | — |
