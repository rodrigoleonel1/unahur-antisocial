# Antisocial-UNAHUR

Este proyecto es una red social desarrollada con React-TypeScript, que permite a los usuarios registrarse, iniciar sesión, crear publicaciones con imágenes y etiquetas, comentar posteos y visitar perfiles de otros usuarios, asi como seguirlos y dejarlos de seguir.

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Creación de publicaciones
- Creación de nuevas etiquetas
- Sistema de comentarios en las publicaciones
- Perfiles de usuario
- Rutas protegidas (crear publicación y ver perfil requieren estar autenticado)
- Tema claro/oscuro

## Tecnologías utilizadas

- React
- TypeScript
- React Router DOM
- Tailwind CSS
- Lucide React (iconos)

## Instrucciones para correr el repositorio

### Requisitos previos

- Node.js
- El backend de Antisocial corriendo localmente (Se puede clonar desde: https://github.com/EP-UnaHur-2026C1/copia-anti-social-documental-tp-persistenten-ts)

### Pasos

1. Cloná el repositorio o descomprimí el proyecto:

```bash
   git clone "https://github.com/rodrigoleonel1/unahur-antisocial"
   cd antisocial
```

2. Instalá las dependencias:

```bash
   npm install
```

3. Verificá el archivo `.env` debe contener la URL base del backend:

```
   VITE_API_URL=http://localhost:3000
```

4. Iniciá el servidor:

```bash
   npm run dev
```

5. Abrí http://localhost:5173 en el navegador.

## URL de la API utilizada

El el proyecto consume una API propia, disponible para clonar desde:

https://github.com/EP-UnaHur-2026C1/copia-anti-social-documental-tp-persistenten-ts

Este backend debe estar corriendo localmente para que la aplicación funcione correctamente. 
