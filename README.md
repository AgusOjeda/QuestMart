# QuestMart - Documentación Técnica

## Descripción General

QuestMart es una tienda de videojuegos que integra datos de dos APIs:
- **RAWG Video Games Database API**: Proporciona información detallada sobre videojuegos (títulos, imágenes, géneros, etc.)
- **CheapShark Deals API**: Ofrece información sobre precios y ofertas de juegos en diferentes tiendas online

La aplicación permite a los usuarios:
- Explorar un catálogo de juegos
- Buscar juegos específicos
- Ver precios actualizados de los juegos
- Obtener información detallada de cada juego

## Estructura del Proyecto

```
src/
├── components/         # Componentes de UI
│   ├── GameApp.tsx     # Componente principal y navegación
│   ├── GameList.tsx    # Vista de catálogo de juegos
│   └── GameSearch.tsx  # Vista de búsqueda de juegos
├── hooks/              # Custom hooks
│   └── useGameData.ts  # Hooks para obtener datos combinados de las APIs
├── services/           # Servicios para comunicación con APIs
│   ├── rawg.service.ts          # Comunicación con RAWG API
│   └── cheapsharkdeals.service.ts  # Comunicación con CheapShark API
├── types/              # Definiciones de tipos
│   ├── rawg.types.ts          # Tipos para los datos de RAWG
│   ├── cheapshark.types.ts    # Tipos para los datos de CheapShark
│   └── game.types.ts          # Tipos combinados para la aplicación
├── App.tsx             # Componente raíz
└── main.tsx            # Punto de entrada
```

## Servicios de API

### RAWG Service (`rawg.service.ts`)

Implementa las funciones para comunicarse con la API de RAWG:

- `getGames(page, pageSize)`: Obtiene lista de juegos con paginación
- `searchGames(query, page, pageSize)`: Busca juegos por palabra clave
- `filterGamesByGenre(genreId, page, pageSize)`: Filtra juegos por género
- `getGameDetails(gameId)`: Obtiene detalles específicos de un juego
- `getGenres()`: Obtiene lista de géneros disponibles

La API key se configura a través de variables de entorno (`.env.local`).

### CheapShark Service (`cheapsharkdeals.service.ts`)

Implementa funciones para comunicarse con la API de CheapShark:

- `getStores()`: Obtiene lista de tiendas disponibles
- `getGameDeals(title, limit)`: Busca ofertas de juegos por título
- `getGameDealById(gameId)`: Obtiene detalles de un juego específico por ID

Incluye una caché interna para optimizar peticiones repetidas a la lista de tiendas.

## Tipos de Datos

### RAWG Types (`rawg.types.ts`)

Define interfaces para los datos de juegos de RAWG:
- `Game`: Información básica y detallada de un juego
- `Genre`, `Platform`, `Developer`, `Publisher`: Entidades relacionadas
- `RAWGResponse`: Respuesta paginada de la API

### CheapShark Types (`cheapshark.types.ts`)

Define interfaces para los datos de precios:
- `GameDeal`: Información de ofertas de un juego
- `Deal`: Detalles de una oferta específica
- `Store`: Información de una tienda

### Game Types (`game.types.ts`)

Define tipos combinados para la aplicación:
- `GameWithPrices`: Extiende `Game` con información de precios de CheapShark

## Custom Hooks

Se utiliza SWR (stale-while-revalidate) para gestionar el estado, caché y revalidación de datos.

### Hooks en `useGameData.ts`

- `useGames(page, pageSize)`: Obtiene lista de juegos con sus precios
- `useGameSearch(searchTerm, page, pageSize)`: Busca juegos por término
- `useGameDetails(gameId)`: Obtiene detalles de un juego específico con precios
- `useGamesByGenre(genreId, page, pageSize)`: Filtra juegos por género con precios
- `useGenres()`: Obtiene géneros disponibles

Beneficios de usar SWR:
- Caché automática
- Revalidación inteligente (al recuperar foco, reconexión, etc.)
- Deduplicación de peticiones
- Manejo optimizado de estados de carga y error

## Componentes de UI

### GameApp (`GameApp.tsx`)

Componente principal que gestiona la navegación entre vistas:
- Catálogo de juegos
- Búsqueda de juegos

### GameList (`GameList.tsx`)

Muestra el catálogo de juegos con:
- Paginación (carga más juegos al hacer scroll)
- Tarjetas de juego con imagen, título, rating y precio
- Indicadores de carga
- Manejo de errores

### GameSearch (`GameSearch.tsx`)

Permite buscar juegos con:
- Input de búsqueda con debounce (500ms)
- Tarjetas de resultados
- Paginación
- Indicadores de carga y mensajes cuando no hay resultados

## Configuración y Uso

### Requisitos Previos

- Node.js y npm/yarn
- API key de RAWG (https://rawg.io/apidocs)

### Configuración

1. Crear archivo `.env.local` con la API key de RAWG:
   ```
   VITE_RAWG_API_KEY=tu_api_key_aqui
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Iniciar aplicación en modo desarrollo:
   ```
   npm run dev
   ```

## Patrones y Mejores Prácticas Implementadas

1. **Separación de responsabilidades**:
   - Services: Comunicación con APIs
   - Hooks: Gestión de estado y lógica de UI
   - Componentes: Presentación y manejo de eventos de usuario

2. **Tipado estricto con TypeScript**:
   - Interfaces bien definidas
   - Tipado de respuestas de API
   - Tipos combinados para la integración de múltiples fuentes

3. **Gestión eficiente de datos**:
   - Caché con SWR
   - Revalidación inteligente
   - Paginación optimizada

4. **Experiencia de usuario**:
   - Estados de carga claros
   - Manejo de errores
   - Debounce en la búsqueda
   - Interfaz responsiva

5. **Configuración centralizada**:
   - Variables de entorno para claves de API
   - Configuración global de SWR

