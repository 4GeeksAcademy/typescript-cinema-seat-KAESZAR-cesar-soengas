# Sistema de reservas de asientos de cine


Aplicación web para visualizar la sala de cine y reservar asientos usando TypeScript, HTML y Tailwind CSS.

## Antes de empezar

Instala los paquetes escribiendo:

```bash
npm install
```

## Como ejecuto la interfaz de reservas?

Instala las dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run start
```

Abre en el navegador la URL local que muestre Vite (normalmente `http://localhost:5173`). En el mapa, haz clic en un asiento azul disponible para reservarlo; los asientos ocupados se muestran en rojo.

## Como ejecuto esto en GitHub Codespaces?

Usa el mismo servidor de desarrollo:

```bash
npm run start
```

Vite esta configurado para escuchar en `0.0.0.0`, asi que Codespaces puede detectar y redirigir automaticamente el puerto `5173`.

## Como ejecuto solo la validacion de TypeScript?

Usa este comando para validar solo TypeScript sin iniciar Vite:

```bash
npm run typecheck
```

## Como ejecuto `main.ts` desde la terminal?

Si quieres ejecutar `./src/main.ts` directamente y ver la salida de `console.log` en la terminal, usa:

```bash
npm run console
```

Este comando ya viene conectado por defecto a `./src/main.ts`.

## Donde escribo mi codigo?

Depende del lenguaje:

- `./src/main.ts` para la logica en TypeScript.
- `./src/style.css` para estilos (Tailwind CSS v4 ya viene importado).
- `./index.html` para el HTML base.

Puedes agregar mas archivos cuando quieras, solo asegúrate de importarlos desde `main.ts`.

La interfaz presenta la sala, el estado de los asientos y los conteos de ocupados y disponibles.

## Solucion de problemas

### No veo mis cambios...

Cada vez que cambias cualquier archivo dentro de `./src`, el sitio se refresca automaticamente (hot reload).

Si aun no ves cambios, recarga limpiando cache:

- Mac: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

## Como incluyo mas imagenes en mi proyecto?

Agregalas dentro de `./public` y referencialas en HTML con `/nombre-imagen.ext`.

Ejemplo:

```html
<img src="/rigo-baby.jpg" alt="Rigo" />
```

## Como incluyo mas archivos TypeScript?

Agrega archivos en `./src` e importalos desde `main.ts`.

Ejemplo:

```ts
import { myVar } from "./file2";
```

## Como publico el sitio?

Este boilerplate es compatible con Vercel en un solo paso.




