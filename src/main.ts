type Asiento = 0 | 1; // 0 = disponible, 1 = ocupado
type Sala = Asiento[][];

// Crea una sala con la cantidad de filas y columnas indicada, inicialmente libre.
function inicializarSala(filas: number, columnas: number): Sala {
  return Array.from({ length: filas }, () =>
    Array<Asiento>(columnas).fill(0),
  );
}

// Imprime la sala usando L para libre y X para ocupado, con índices desde 1.
function mostrarSala(sala: Sala): void {
  const cantidadColumnas = sala[0]?.length ?? 0;
  const encabezado = Array.from({ length: cantidadColumnas }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  console.log(`     ${encabezado.join(" ")}`);

  sala.forEach((fila, indice) => {
    const asientos = fila
      .map((asiento) => (asiento === 1 ? "X" : "L"))
      .join("  ");

    console.log(`${String(indice + 1).padStart(2, "0")} | ${asientos}`);
  });
}

// Reserva una posición válida y libre; devuelve un mensaje con el resultado.
function reservarAsiento(sala: Sala, fila: number, columna: number): string {
  const indiceFila = fila - 1;
  const indiceColumna = columna - 1;
  const cantidadColumnas = sala[0]?.length ?? 0;

  if (
    indiceFila < 0 ||
    indiceFila >= sala.length ||
    indiceColumna < 0 ||
    indiceColumna >= cantidadColumnas
  ) {
    return `Error: la fila ${fila} o la columna ${columna} no existe.`;
  }

  if (contarAsientos(sala).disponibles === 0) {
    return "Error: la sala está completa; no hay asientos disponibles.";
  }

  if (sala[indiceFila][indiceColumna] === 1) {
    return `Error: el asiento de la fila ${fila}, columna ${columna} ya está ocupado.`;
  }

  sala[indiceFila][indiceColumna] = 1;
  return `Éxito: asiento reservado en la fila ${fila}, columna ${columna}.`;
}

// Cuenta y devuelve cuántos asientos están ocupados y disponibles.
function contarAsientos(sala: Sala): { ocupados: number; disponibles: number } {
  let ocupados = 0;
  let disponibles = 0;

  sala.forEach((fila) => {
    fila.forEach((asiento) => {
      if (asiento === 1) {
        ocupados++;
      } else {
        disponibles++;
      }
    });
  });

  return { ocupados, disponibles };
}

// Busca el primer grupo de asientos libres contiguos en una misma fila.
function buscarAsientosContiguos(
  sala: Sala,
  cantidad: number,
): { fila: number; columnaInicial: number; columnaFinal: number } | null {
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    return null;
  }

  for (let indiceFila = 0; indiceFila < sala.length; indiceFila++) {
    let libresConsecutivos = 0;

    for (
      let indiceColumna = 0;
      indiceColumna < sala[indiceFila].length;
      indiceColumna++
    ) {
      if (sala[indiceFila][indiceColumna] === 0) {
        libresConsecutivos++;
        if (libresConsecutivos === cantidad) {
          return {
            fila: indiceFila + 1,
            columnaInicial: indiceColumna - cantidad + 2,
            columnaFinal: indiceColumna + 1,
          };
        }
      } else {
        libresConsecutivos = 0;
      }
    }
  }

  return null;
}

// Prepara un escenario de prueba ocupando las primeras posiciones de la matriz.
function crearSalaDePrueba(asientosOcupados: number): Sala {
  const sala = inicializarSala(8, 10);

  for (let indice = 0; indice < asientosOcupados; indice++) {
    const fila = Math.floor(indice / 10);
    const columna = indice % 10;
    sala[fila][columna] = 1;
  }

  return sala;
}

// Ejecuta los intentos de reserva indicados e imprime el estado y conteo final.
function ejecutarEscenario(
  nombre: string,
  sala: Sala,
  reservas: [fila: number, columna: number][] = [],
): void {
  console.log(`\n=== ${nombre} ===`);

  reservas.forEach(([fila, columna]) => {
    console.log(reservarAsiento(sala, fila, columna));
  });

  mostrarSala(sala);
  const conteo = contarAsientos(sala);
  console.log(`Asientos ocupados: ${conteo.ocupados}`);
  console.log(`Asientos disponibles: ${conteo.disponibles}`);
}

if (typeof document === "undefined") {
  // Los escenarios de consola solo corren con `npm run console`.
  ejecutarEscenario("a) Sala vacía", crearSalaDePrueba(0));
  ejecutarEscenario("b) Sala parcialmente ocupada", crearSalaDePrueba(25), [
    [3, 6],
    [1, 1],
  ]);
  ejecutarEscenario("c) Sala casi llena", crearSalaDePrueba(78), [[8, 9]]);
  ejecutarEscenario("d) Sala completamente llena", crearSalaDePrueba(80), [
    [1, 1],
  ]);

  console.log("\n=== Búsqueda del primer par de asientos contiguos ===");
  const resultadoPar = buscarAsientosContiguos(inicializarSala(8, 10), 2);
  if (resultadoPar) {
    console.log(
      `Primer par encontrado: fila ${resultadoPar.fila}, columnas ${resultadoPar.columnaInicial} y ${resultadoPar.columnaFinal}.`,
    );
  } else {
    console.log("No se encontraron dos asientos contiguos disponibles.");
  }

  const salaSinPares = crearSalaDePrueba(80);
  salaSinPares[0][0] = 0;
  salaSinPares[0][2] = 0;
  if (!buscarAsientosContiguos(salaSinPares, 2)) {
    console.log(
      "No se encontraron dos asientos contiguos disponibles; los asientos libres están separados.",
    );
  }
} else {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLElement>("#app");
    if (!app) return;

    // La matriz bidimensional es la única fuente del estado de los asientos.
    const sala = inicializarSala(8, 10);

    app.innerHTML = `
      <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold text-slate-900">Selecciona tus asientos</h2>
            <p class="mt-1 text-sm text-slate-600">Haz clic en un asiento libre para reservarlo.</p>
          </div>
          <div class="flex gap-4 text-sm" aria-label="Leyenda">
            <span class="flex items-center gap-2"><span class="h-4 w-4 rounded bg-blue-500"></span>Libre</span>
            <span class="flex items-center gap-2"><span class="h-4 w-4 rounded bg-red-500"></span>Ocupado</span>
          </div>
        </div>

        <div class="mb-6 overflow-x-auto pb-2">
          <div class="mx-auto min-w-[32rem] max-w-[32rem] pl-8">
            <div class="w-[30rem] rounded-t-[50%] bg-slate-200 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
              Pantalla
            </div>
          </div>
        </div>
        <div id="mapa-asientos" class="space-y-2 overflow-x-auto pb-2"></div>

        <p id="estado-reserva" class="mt-4 min-h-6 text-sm font-medium" role="status" aria-live="polite"></p>
        <div class="mt-3 flex flex-wrap gap-6 border-t border-slate-200 pt-4 text-sm text-slate-700">
          <p>Ocupados: <strong id="total-ocupados">0</strong></p>
          <p>Disponibles: <strong id="total-disponibles">80</strong></p>
        </div>
      </section>
    `;

    const mapa = document.querySelector<HTMLElement>("#mapa-asientos");
    const estado = document.querySelector<HTMLElement>("#estado-reserva");
    const ocupados = document.querySelector<HTMLElement>("#total-ocupados");
    const disponibles = document.querySelector<HTMLElement>("#total-disponibles");
    if (!mapa || !estado || !ocupados || !disponibles) return;
    const mapaElemento = mapa;
    const ocupadosElemento = ocupados;
    const disponiblesElemento = disponibles;

    // Dibuja botones desde la matriz y actualiza el resumen de disponibilidad.
    function actualizarMapa(): void {
      mapaElemento.innerHTML = sala
        .map(
          (fila, indiceFila) => `
            <div class="mx-auto grid min-w-[32rem] max-w-[32rem] grid-cols-[2rem_1fr] items-center">
              <span class="text-sm font-semibold text-slate-500">${indiceFila + 1}</span>
              <div class="flex w-[30rem] items-center justify-center gap-8">
                <div class="grid grid-cols-3 gap-2">
                  ${fila.slice(0, 3).map((asiento, indiceColumna) => renderizarAsiento(asiento, indiceFila, indiceColumna)).join("")}
                </div>
                <div class="grid grid-cols-4 gap-2">
                  ${fila.slice(3, 7).map((asiento, indiceColumna) => renderizarAsiento(asiento, indiceFila, indiceColumna + 3)).join("")}
                </div>
                <div class="grid grid-cols-3 gap-2">
                  ${fila.slice(7, 10).map((asiento, indiceColumna) => renderizarAsiento(asiento, indiceFila, indiceColumna + 7)).join("")}
                </div>
              </div>
            </div>
          `,
        )
        .join("");

      const conteo = contarAsientos(sala);
      ocupadosElemento.textContent = String(conteo.ocupados);
      disponiblesElemento.textContent = String(conteo.disponibles);
    }

    // Genera un botón accesible para una posición de la matriz.
    function renderizarAsiento(
      asiento: Asiento,
      indiceFila: number,
      indiceColumna: number,
    ): string {
      const ocupado = asiento === 1;
      const estilo = ocupado
        ? "cursor-not-allowed bg-red-500 text-white"
        : "bg-blue-500 text-white transition hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-700";

      return `
        <button
          type="button"
          data-fila="${indiceFila + 1}"
          data-columna="${indiceColumna + 1}"
          aria-label="Fila ${indiceFila + 1}, asiento ${indiceColumna + 1}, ${ocupado ? "ocupado" : "libre"}"
          ${ocupado ? "disabled" : ""}
          class="h-9 w-9 rounded-md text-xs font-semibold ${estilo}"
        >${ocupado ? "X" : "L"}</button>
      `;
    }

    // Reserva el asiento clicado, comunica el resultado y redibuja el mapa.
    mapaElemento.addEventListener("click", (evento: MouseEvent) => {
      const objetivo = evento.target;
      if (!(objetivo instanceof HTMLButtonElement)) return;

      const fila = Number(objetivo.dataset.fila);
      const columna = Number(objetivo.dataset.columna);
      const mensaje = reservarAsiento(sala, fila, columna);

      estado.textContent = mensaje;
      estado.className = `mt-4 min-h-6 text-sm font-medium ${
        mensaje.startsWith("Éxito") ? "text-emerald-700" : "text-red-700"
      }`;
      actualizarMapa();
    });

    actualizarMapa();
  });
}

export {};