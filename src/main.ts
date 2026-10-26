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

const sala = inicializarSala(8, 10);
mostrarSala(sala);

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