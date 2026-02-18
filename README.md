# AI Engineering Project - Prueba de IA en Backend y Frontend

Este proyecto es una prueba de concepto (PoC) sobre la implementación de Inteligencia Artificial en un entorno Full Stack. Utiliza un backend en Node.js para interactuar con la API de OpenAI y un frontend en React para proporcionar una interfaz de usuario dinámica y moderna.

## 🚀 Arquitectura del Proyecto

El proyecto está organizado como un monorepo (usando npm workspaces):

- **`/backend`**: Servidor Express que gestiona la lógica de IA, validación de datos y rutas de API.
- **`/frontend`**: Aplicación React construida con Vite para una experiencia de desarrollo rápida y eficiente.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js & Express**: Framework base para el servidor.
- **OpenAI SDK**: Integración con modelos de IA.
- **Zod**: Validación de esquemas y tipos de datos.
- **CORS**: Gestión de acceso entre dominios.

### Frontend
- **React 19**: Biblioteca para la interfaz de usuario.
- **Vite**: Herramienta de construcción y servidor de desarrollo.
- **React Router 7**: Gestión de rutas en el cliente.
- **Zustand**: Gestión del estado global de forma ligera.
- **Snarkdown**: Parser de Markdown a HTML rápido.

## ⚙️ Configuración y Ejecución

### Requisitos Previos
- Node.js (versión 18 o superior recomendada)
- Una clave de API de OpenAI (configurada en `.env`)

### Instalación
Desde la raíz del proyecto, instala todas las dependencias:
```bash
npm install
```

### Ejecución en Desarrollo
Puedes levantar ambos servicios simultáneamente desde la raíz:

- **Backend**: `npm run dev:backend`
- **Frontend**: `npm run dev:frontend`

## 🔒 Seguridad
Los archivos de configuración sensible (`.env`) están protegidos y no deben subirse al repositorio. Asegúrate de crear tu propio archivo `.env` en la carpeta `backend/` basándote en la documentación del proyecto.
