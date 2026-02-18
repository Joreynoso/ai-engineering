# AI Engineering Project

Prueba de concepto sobre la implementación de Inteligencia Artificial en un entorno Full Stack. Utiliza un backend Node.js que se conecta a cualquier proveedor de IA compatible con la arquitectura de OpenAI, actualmente configurado con **Groq AI** por su rendimiento y velocidad.

## 🚀 Arquitectura del Proyecto

El proyecto está organizado como un monorepo (usando npm workspaces):

- **`/backend`**: Servidor Express que gestiona la lógica de IA, validación de datos y rutas de API.
- **`/frontend`**: Aplicación React construida con Vite para una experiencia de desarrollo rápida y eficiente.

## 🧠 Integración con IA

La integración está construida sobre el **SDK oficial de OpenAI**, lo que la hace **agnóstica al proveedor**. Basta con cambiar la `baseURL` y la `apiKey` en el archivo `.env` para usar cualquier proveedor compatible, como:

| Proveedor | Base URL |
|-----------|----------|
| **Groq** (por defecto) | `https://api.groq.com/openai/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Azure OpenAI | `https://<recurso>.openai.azure.com/openai` |
| Ollama (local) | `http://localhost:11434/v1` |
| LM Studio | `http://localhost:1234/v1` |

La configuración del proveedor y modelo se centraliza en `backend/config.js`.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js & Express**: Framework base para el servidor.
- **OpenAI SDK**: Cliente HTTP para comunicarse con cualquier API compatible con OpenAI.
- **Groq AI**: Proveedor de IA por defecto (modelos Llama de alta velocidad).
- **Zod**: Validación de esquemas y tipos de datos.
- **dotenv**: Gestión de variables de entorno.
- **CORS**: Gestión de acceso entre dominios.

### Frontend
- **React 19**: Biblioteca para la interfaz de usuario.
- **Vite**: Herramienta de construcción y servidor de desarrollo.
- **React Router 7**: Gestión de rutas en el cliente.
- **Zustand**: Gestión del estado global de forma ligera.
- **Snarkdown**: Parser de Markdown a HTML rápido.

## ⚙️ Configuración y Ejecución

### Requisitos Previos
- Node.js 18 o superior
- Una API key de tu proveedor de IA (por defecto: Groq)

### Instalación
Desde la raíz del proyecto, instala todas las dependencias:
```bash
npm install
```

### Variables de entorno
Crea el archivo `backend/.env` con las siguientes variables:

```env
# API Key de tu proveedor (Groq, OpenAI, etc.)
GROQ_API_KEY=tu_api_key_aqui

# Modelo a usar (opcional, hay un valor por defecto en config.js)
GROQ_MODEL=llama-3.1-8b-instant
```

> Puedes obtener una API key gratuita de Groq en [console.groq.com](https://console.groq.com).

### Modelos disponibles en Groq
| Modelo | ID |
|--------|----|
| Llama 3.1 8B (rápido) | `llama-3.1-8b-instant` |
| Llama 3.3 70B | `llama-3.3-70b-versatile` |
| Llama 3.1 70B | `llama-3.1-70b-versatile` |
| Mixtral 8x7B | `mixtral-8x7b-32768` |

### Ejecución en Desarrollo
Puedes levantar ambos servicios desde la raíz del proyecto:

```bash
# Backend (Express en http://localhost:1234)
npm run dev:backend

# Frontend (Vite en http://localhost:5173)
npm run dev:frontend
```

## 🔒 Seguridad
El archivo `backend/.env` contiene credenciales sensibles y **no debe subirse al repositorio**. Está incluido en `.gitignore`. Nunca expongas tu API key en el código fuente.
