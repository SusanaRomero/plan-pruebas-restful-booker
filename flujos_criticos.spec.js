// @ts-check
/**
 * Plan de pruebas PP-RB-2026-001 · Sección 5.3 · Casos automatizados TC-19 a TC-23
 * Objeto de prueba: API RESTful Booker, módulo de reservas (caja negra).
 *
 * Cada test declara en su encabezado: riesgo que mitiga, condición de prueba,
 * técnica de diseño (ISO/IEC/IEEE 29119-4) y origen de los datos.
 * Los casos manuales (TC-01 a TC-18) están en docs/plan-de-pruebas.md.
 *
 * Mitigaciones de riesgos de proyecto aplicadas en el código:
 *  - R07 (la instancia pública se reinicia cada 10 min): cada test crea sus
 *    propios datos, no depende de otro test y dura pocos segundos.
 *  - R16 (datos compartidos con otros usuarios): apellidos únicos por ejecución.
 */
const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// Datos de prueba (DAT-02 en la sección 5.4 del plan)
// ---------------------------------------------------------------------------
const CREDENCIALES = { username: 'admin', password: 'password123' };
const BASIC_VALIDA =
  'Basic ' + Buffer.from(`${CREDENCIALES.username}:${CREDENCIALES.password}`).toString('base64');
const BASIC_INVALIDA =
  'Basic ' + Buffer.from(`${CREDENCIALES.username}:clave-incorrecta`).toString('base64');

/** Reserva representativa de la clase válida (EP): todos los campos presentes y válidos. */
function reservaValida() {
  const sufijo = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    firstname: 'Ana',
    lastname: `Prueba-${sufijo}`,
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-10', checkout: '2026-12-11' },
    additionalneeds: 'Breakfast',
  };
}

/** Transición de sesión "sin token" -> "con token" (precondición de R02, R04, R05, R06). */
async function obtenerToken(request) {
  const respuesta = await request.post('/auth', { data: CREDENCIALES });
  expect(respuesta.status(), 'POST /auth con credenciales válidas').toBe(200);
  const cuerpo = await respuesta.json();
  expect(cuerpo.token, 'POST /auth debe emitir un token').toBeTruthy();
  return cuerpo.token;
}

/** Transición T1: Inexistente -> Activa. Devuelve el bookingid. */
async function crearReserva(request, datos) {
  const respuesta = await request.post('/booking', { data: datos });
  expect(respuesta.status(), 'POST /booking con datos válidos').toBe(200);
  const cuerpo = await respuesta.json();
  expect(cuerpo.bookingid, 'POST /booking debe devolver bookingid').toBeTruthy();
  return cuerpo.bookingid;
}

/** Cierre del procedimiento: elimina la reserva si todavía existe (no evalúa resultado). */
async function limpiar(request, bookingid, token) {
  if (!bookingid) return;
  await request.delete(`/booking/${bookingid}`, { headers: { Cookie: `token=${token}` } });
}

// ---------------------------------------------------------------------------
// TC-19 · R01 (Alto) · CP-01 · Partición de equivalencia, clase válida
// Datos: un representante de la clase "todos los campos obligatorios y el
// opcional presentes, con tipos y formatos válidos".
// ---------------------------------------------------------------------------
test('TC-19 Crear una reserva válida persiste exactamente los datos enviados', async ({ request }) => {
  const datos = reservaValida();
  const token = await obtenerToken(request);
  let bookingid;
  try {
    const respuesta = await request.post('/booking', { data: datos });
    expect(respuesta.status()).toBe(200);
    const cuerpo = await respuesta.json();
    bookingid = cuerpo.bookingid;
    expect(bookingid).toBeTruthy();
    expect(cuerpo.booking, 'La respuesta de creación devuelve los mismos datos').toEqual(datos);

    const consulta = await request.get(`/booking/${bookingid}`);
    expect(consulta.status()).toBe(200);
    expect(await consulta.json(), 'La consulta posterior devuelve los mismos datos').toEqual(datos);
  } finally {
    await limpiar(request, bookingid, token);
  }
});

// ---------------------------------------------------------------------------
// TC-20 · R01, R02, R04, R06 (y R05 de forma incidental) · CP-10
// Transición de estados, cobertura 0-switch: cada transición válida del
// modelo de la sección 5.2 se recorre una vez (T1 a T6).
// ---------------------------------------------------------------------------
test('TC-20 Ciclo de vida completo de una reserva recorre todas las transiciones válidas', async ({ request }) => {
  const datos = reservaValida();
  const token = await obtenerToken(request);
  const auth = { Cookie: `token=${token}` };
  let bookingid;

  await test.step('T1 Inexistente -> Activa (POST /booking)', async () => {
    bookingid = await crearReserva(request, datos);
  });

  await test.step('T2 Activa -> Activa (GET /booking/{id})', async () => {
    const r = await request.get(`/booking/${bookingid}`);
    expect(r.status()).toBe(200);
    expect(await r.json()).toEqual(datos);
  });

  const modificada = { ...datos, totalprice: 180, depositpaid: false };
  await test.step('T3 Activa -> Activa modificada (PUT con token)', async () => {
    const r = await request.put(`/booking/${bookingid}`, { headers: auth, data: modificada });
    expect(r.status()).toBe(200);
    const g = await request.get(`/booking/${bookingid}`);
    expect(await g.json()).toEqual(modificada);
  });

  await test.step('T4 Activa -> Activa modificada parcialmente (PATCH con token)', async () => {
    const r = await request.patch(`/booking/${bookingid}`, {
      headers: auth,
      data: { firstname: 'Ana Lucía' },
    });
    expect(r.status()).toBe(200);
    const g = await request.get(`/booking/${bookingid}`);
    expect(await g.json(), 'Solo cambia firstname').toEqual({ ...modificada, firstname: 'Ana Lucía' });
  });

  await test.step('T5 Activa -> Eliminada (DELETE con token)', async () => {
    const r = await request.delete(`/booking/${bookingid}`, { headers: auth });
    // La documentación de la API define 201 como respuesta de eliminación exitosa.
    expect(r.status()).toBe(201);
  });

  await test.step('T6 Eliminada -> Eliminada (GET devuelve 404)', async () => {
    const r = await request.get(`/booking/${bookingid}`);
    expect(r.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// TC-21 · R06 (Alto) · CP-08 y CP-10
// Transición de estados, transición inválida: DELETE sin autorización desde
// el estado Activa. Partición de equivalencia de la autorización: clase
// "sin credencial".
// ---------------------------------------------------------------------------
test('TC-21 Eliminar sin autorización se rechaza y la reserva sigue activa', async ({ request }) => {
  const datos = reservaValida();
  const token = await obtenerToken(request);
  let bookingid;
  try {
    bookingid = await crearReserva(request, datos);

    const r = await request.delete(`/booking/${bookingid}`);
    expect(r.status(), 'DELETE sin Cookie ni Authorization').toBe(403);

    const g = await request.get(`/booking/${bookingid}`);
    expect(g.status(), 'La reserva debe seguir existiendo').toBe(200);
    expect(await g.json()).toEqual(datos);
  } finally {
    await limpiar(request, bookingid, token);
  }
});

// ---------------------------------------------------------------------------
// TC-22 · R02 (Alto) · CP-10
// Transición de estados, transición inválida: PUT autorizado sobre una
// reserva en estado Eliminada. No debe responder 200 ni "revivir" la reserva.
// ---------------------------------------------------------------------------
test('TC-22 Modificar una reserva eliminada se rechaza y no la vuelve a crear', async ({ request }) => {
  const datos = reservaValida();
  const token = await obtenerToken(request);
  const auth = { Cookie: `token=${token}` };

  const bookingid = await crearReserva(request, datos);
  const borrado = await request.delete(`/booking/${bookingid}`, { headers: auth });
  expect(borrado.status(), 'Precondición: la reserva queda Eliminada').toBe(201);

  const r = await request.put(`/booking/${bookingid}`, {
    headers: auth,
    data: { ...datos, totalprice: 999 },
  });
  expect(r.status(), 'PUT sobre reserva eliminada no puede ser exitoso').not.toBe(200);

  const g = await request.get(`/booking/${bookingid}`);
  expect(g.status(), 'La reserva sigue sin existir').toBe(404);
});

// ---------------------------------------------------------------------------
// TC-23 · R06 (Alto) · CP-08
// Partición de equivalencia sobre el mecanismo de autorización alternativo
// (encabezado Authorization: Basic). Un representante de la clase válida
// (admin/password123) y uno de la clase inválida (contraseña incorrecta).
// ---------------------------------------------------------------------------
test('TC-23 La autorización Basic solo permite modificar con credenciales válidas', async ({ request }) => {
  const datos = reservaValida();
  const token = await obtenerToken(request);
  let bookingid;
  try {
    bookingid = await crearReserva(request, datos);

    await test.step('Clase inválida: Basic con contraseña incorrecta -> 403 y sin cambios', async () => {
      const r = await request.put(`/booking/${bookingid}`, {
        headers: { Authorization: BASIC_INVALIDA },
        data: { ...datos, totalprice: 500 },
      });
      expect(r.status()).toBe(403);
      const g = await request.get(`/booking/${bookingid}`);
      expect(await g.json()).toEqual(datos);
    });

    await test.step('Clase válida: Basic admin/password123 -> 200 y datos reemplazados', async () => {
      const nuevos = { ...datos, totalprice: 200 };
      const r = await request.put(`/booking/${bookingid}`, {
        headers: { Authorization: BASIC_VALIDA },
        data: nuevos,
      });
      expect(r.status()).toBe(200);
      const g = await request.get(`/booking/${bookingid}`);
      expect(await g.json()).toEqual(nuevos);
    });
  } finally {
    await limpiar(request, bookingid, token);
  }
});
