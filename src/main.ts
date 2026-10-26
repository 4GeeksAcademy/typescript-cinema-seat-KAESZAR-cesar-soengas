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
): { fila: number; columnaInicial: number } | null {
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

// Prueba salas vacías, parcialmente ocupadas, casi llenas y completamente llenas.
ejecutarEscenario("a) Sala vacía", crearSalaDePrueba(0));
ejecutarEscenario("b) Sala parcialmente ocupada", crearSalaDePrueba(25), [
  [3, 6], // Reserva disponible.
  [1, 1], // Intenta reservar un asiento ya ocupado.
]);
ejecutarEscenario("c) Sala casi llena", crearSalaDePrueba(78), [[8, 9]]);
ejecutarEscenario("d) Sala completamente llena", crearSalaDePrueba(80), [
  [1, 1],
]);

// Comprueba los mensajes de búsqueda cuando hay espacio y cuando no lo hay.
console.log("\n=== Búsqueda de asientos contiguos ===");
const resultadoContiguos = buscarAsientosContiguos(crearSalaDePrueba(25), 3);
if (resultadoContiguos) {
  const ultimaColumna = resultadoContiguos.columnaInicial + 2;
  console.log(
    `Asientos contiguos encontrados: fila ${resultadoContiguos.fila}, columnas ${resultadoContiguos.columnaInicial}-${ultimaColumna}.`,
  );
} else {
  console.log("No se encontraron suficientes asientos contiguos disponibles.");
}

const resultadoSalaLlena = buscarAsientosContiguos(crearSalaDePrueba(80), 2);
if (!resultadoSalaLlena) {
  console.log("No se encontraron asientos contiguos: la sala está completa.");
}

// Conserva el mensaje del proyecto cuando se abre en el navegador.
if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLParagraphElement>("#app");
    if (app) {
      app.textContent = "If you can see this, Tailwind is working.";
    }
  });
}

export {};