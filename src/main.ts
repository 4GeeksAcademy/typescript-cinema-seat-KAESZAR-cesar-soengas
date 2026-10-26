type Asiento = 0 | 1; // 0 = disponible, 1 = ocupado
type Sala = Asiento[][];

function inicializarSala(filas: number, columnas: number): Sala {
  return Array.from({ length: filas }, () =>
    Array<Asiento>(columnas).fill(0),
  );
}

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

  if (sala[indiceFila][indiceColumna] === 1) {
    return `Error: el asiento de la fila ${fila}, columna ${columna} ya está ocupado.`;
  }

  sala[indiceFila][indiceColumna] = 1;
  return `Éxito: asiento reservado en la fila ${fila}, columna ${columna}.`;
}

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

const sala = inicializarSala(8, 10);
console.log(reservarAsiento(sala, 3, 5));
mostrarSala(sala);
const conteo = contarAsientos(sala);
console.log(`Asientos ocupados: ${conteo.ocupados}`);
console.log(`Asientos disponibles: ${conteo.disponibles}`);

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