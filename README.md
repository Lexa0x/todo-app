# 📝 README - ToDo App con Autenticación (MERN Stack)

## 🌟 Descripción del Proyecto
Aplicación web fullstack para gestión de tareas con autenticación JWT, desarrollada con el stack MERN (MongoDB, Express, React, Node.js). Permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas de forma privada y segura.

## 🚀 Enlaces del Proyecto
- **Frontend (Vercel): https://todo-app-seven-iota-39.vercel.app/
- **Backend (Render): https://todo-app-tvng.onrender.com
- **Repositorio GitHub: https://github.com/Lexa0x/todo-app

## 🛠 Tecnologías Utilizadas

### Backend
| Tecnología | Uso |
|------------|-----|
| Node.js | Entorno de ejecución |
| Express | Framework para API REST |
| MongoDB | Base de datos NoSQL |
| Mongoose | ODM para MongoDB |
| JWT | Autenticación segura |
| Bcrypt | Hash de contraseñas |
| Helmet | Seguridad HTTP |
| CORS | Gestión de origenes cruzados |
| Express Rate Limit | Protección contra DDoS |

### Frontend
| Tecnología | Uso |
|------------|-----|
| React | Biblioteca frontend |
| Vite | Bundler y herramienta de desarrollo |
| Tailwind CSS | Estilización responsive |
| Axios | Peticiones HTTP |
| React Router | Navegación |
| Framer Motion | Animaciones |
| React Hot Toast | Notificaciones |

## 🔍 Funcionalidades Principales

### Core
- ✅ Autenticación con JWT (registro/login)
- 🔐 Tareas privadas por usuario
- 📝 CRUD completo de tareas
- 🎨 UI responsive con Tailwind CSS
- 📱 Diseño mobile-first

### Extras Implementados
- 🛡️ API Client/Secret para seguridad adicional
- ⏱️ Rate-limiting en el backend
- 🔄 Persistencia de sesión con localStorage
- 💅 Animaciones con Framer Motion
- 🗑️ Confirmación modal para eliminar tareas

## 🏗️ Estructura del Proyecto

```
/backend
  /controllers  # Lógica de endpoints
  /middlewares  # Auth, ErrorHandler, etc.
  /models       # Schemas de MongoDB
  /routes       # Definición de rutas
  /utils        # Funciones auxiliares
  app.js        # Configuración principal
  server.js     # Inicio de la aplicación

/frontend
  /src
    /api        # Conexión con backend
    /components # Componentes reutilizables
    /context    # AuthContext
    /pages      # Vistas principales
App.jsx
main.jsx
```

## 🔧 Configuración del Entorno

### Variables de Entorno (Backend)
Crear archivo `.env` en `/backend`:
```env
MONGODB_URI=mongodb+srv://todo-app-user:tym1cf2YGVmp9ujm@todo-app.3byxjjp.mongodb.net/?retryWrites=true&w=majority&appName=Todo-app
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjBkMjQwMzI1YzVkMjYwNDU4YzYwYiIsImlhdCI6MTcwNjE0OTQwMCwiZXhwIjoxNzA2MjM1ODAwfQ.4Q7WUZvQ5Y9Q9Z3X6Q5Y9Q9Z3X6Q5Y9Q9Z3X6Q5Y9Q9Z3X
PORT=4000
JWT_EXPIRES_IN=7d
```

### Variables de Entorno (Frontend)
Crear archivo `.env` en `/frontend`:
```env
VITE_API_URL=https://todo-app-tvng.onrender.com
```

## 🚀 Instalación y Ejecución

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📌 Decisiones Técnicas

1. **Autenticación JWT**: Elegida por su stateless nature y escalabilidad.
2. **Tailwind CSS**: Agiliza el desarrollo responsive sin sacrificar customización.
3. **Framer Motion**: Para animaciones fluidas y profesionales.
4. **API Client/Secret**: Primera capa de seguridad adicional.
5. **Deploy separado**: Backend en Render (Node.js) y frontend en Vercel (optimizado para React).

## 🧪 Testing
Credenciales de prueba:
- Email: `test@example.com`
- Contraseña: `password123`

O registra un nuevo usuario desde la interfaz.

## ✅ Criterios Cumplidos

| Requisito | Implementación |
|-----------|----------------|
| CRUD Tasks | ✅ Completo |
| Auth JWT | ✅ Login/Register/Verify |
| Seguridad | ✅ Bcrypt, Helmet, Rate-limiting |
| Responsive | ✅ Tailwind mobile-first |
| Deploy | ✅ Vercel + Render |
| Bonus | ✅ 4/4 implementados |

## 📄 Licencia
Este proyecto fue desarrollado como prueba técnica para JDigital Group Solutions. No está autorizado su uso, distribución o modificación sin consentimiento explícito.