# Validaciones del sistema de reservas de asientos

## Entorno

- **Lenguaje:** TypeScript
- **Ejecución en consola:** `tsx` mediante el script `npm run console`

## Registro de validaciones

| Validación | Comando | Resultado esperado | Estado |
|---|---|---|---|
| Comprobar tipos de TypeScript | `npm run typecheck` | Finaliza sin errores | ✅ Aprobada |
| Mostrar la sala en la consola | `npm run console` | Imprime 8 filas y 10 columnas, con `L` para asientos libres y `X` para ocupados | ✅ Aprobada |

## Comprobación manual de reservas

Al probar una reserva, verificar que:

- La posición indicada corresponda a la fila y columna correctas.
- Un asiento reservado se muestre como `X`.
- No se pueda reservar un asiento que ya está ocupado.
- Se rechacen filas o columnas fuera de los límites de la sala.

> Registrar aquí el comando, el resultado y la fecha de cada nueva validación.