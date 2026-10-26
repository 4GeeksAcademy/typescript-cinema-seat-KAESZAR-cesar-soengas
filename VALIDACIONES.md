# Validaciones del sistema de reservas de asientos

## Entorno

- **Lenguaje:** TypeScript
- **Ejecución en consola:** `tsx` mediante el script `npm run console`

## Registro de validaciones

| Validación | Comando | Resultado esperado | Estado |
|---|---|---|---|
| Comprobar tipos de TypeScript | `npm run typecheck` | Finaliza sin errores | ✅ Aprobada |
| Mostrar la sala en la consola | `npm run console` | Imprime 8 filas y 10 columnas, con `L` para asientos libres y `X` para ocupados | ✅ Aprobada |
| Reservar un asiento disponible | `npm run console` | Reserva la fila 3, columna 5; informa éxito y muestra ese asiento como `X` | ✅ Aprobada |
| Ejecutar escenarios de ocupación | `npm run console` | Muestra sala vacía (0/80 ocupados), parcialmente ocupada, casi llena (79/80) y llena (80/80), con mensajes adecuados | ✅ Aprobada |
| Buscar asientos contiguos | `npm run console` | Encuentra 3 asientos consecutivos en la fila 3, columnas 6–8; informa que no hay cuando la sala está llena | ✅ Aprobada |

## Validaciones de reserva pendientes

Queda agregar y ejecutar escenarios específicos para comprobar que:

- No se pueda reservar dos veces el mismo asiento y se devuelva un mensaje de error (el programa ya muestra este caso en el escenario de sala parcialmente ocupada).
- Se rechacen filas o columnas fuera de los límites de la sala.
- La búsqueda de asientos contiguos rechace cantidades inválidas (cero, negativas o no enteras) y grupos que no caben en ninguna fila aunque haya asientos libres aislados.

> Al realizar cada comprobación pendiente, anota el comando, el resultado y la fecha.