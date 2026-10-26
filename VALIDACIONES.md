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

## Validaciones de reserva pendientes

Todavía queda comprobar que:

- No se pueda reservar dos veces el mismo asiento y se devuelva un mensaje de error.
- Se rechacen filas o columnas fuera de los límites de la sala.

> Al realizar cada comprobación, registra aquí el comando, el resultado y la fecha.