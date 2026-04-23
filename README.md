# Curso React + TypeScript — Fox Gallery

Proyecto básico de aprendizaje para el curso de **React con TypeScript**. Cada clase del curso se integra como una rama independiente y se une al `main` mediante Pull Requests, de forma que el historial del repositorio refleja el avance progresivo de los temas.

La aplicación es una **galería de zorros** construida con [Next.js](https://nextjs.org) (Pages Router), que consume imágenes aleatorias del servicio público [randomfox.ca](https://randomfox.ca). Sirve como hilo conductor para practicar los conceptos del curso sobre un mismo producto visible.

## Temas cubiertos hasta ahora

Ordenados por las ramas/clases del repositorio:

1. Configuración y creación del proyecto
2. Creación de componentes
3. Props con React + TypeScript
4. Tipado de `useState`
5. Eventos en TypeScript
6. Lazy loading con `IntersectionObserver`
7. Reto `onLazyLoad`
8. Componentes genéricos en TypeScript
9. Tipos globales (archivos `.d.ts`)
10. Tipos personalizados y su definición
11. Integración de plugins externos (Plausible, Lodash) tipados manualmente
12. Estilos y diseño — tema **Fox Gallery** (rama actual)

## Funcionalidades de la galería

- Agregar zorros aleatorios con estado de carga (spinner).
- Galería en grid responsivo con animación de entrada y hover.
- Skeleton shimmer mientras la imagen termina de descargar.
- Marcar zorros como favoritos y eliminarlos individualmente.
- Contador de imágenes y botón para limpiar la galería.
- Empty state cuando aún no se ha agregado ningún zorro.
- Evento `add_fox` / `remove_fox` reportado a Plausible Analytics.

## Stack

- **Next.js 16** (Pages Router)
- **React 19** + **TypeScript** en modo estricto
- **Tailwind CSS v3** disponible, junto a CSS global personalizado
- **Lodash** y **Plausible** con stubs de tipos escritos a mano en `@types/` (ejercicio del curso)

## Ponerlo en marcha

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — correr la build de producción
- `npm run lint` — ESLint con la configuración de Next

## Estructura relevante

```
pages/            Páginas del Pages Router (index.tsx, _app.tsx)
components/       Componentes reutilizables (LazyImage, FoxCard)
@types/           Tipos ambient hechos a mano para dependencias externas
style/globals.css Tema visual Fox Gallery + Tailwind
app.d.ts          Tipos globales compartidos (IFoxImageItem)
```
