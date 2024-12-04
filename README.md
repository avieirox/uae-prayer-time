# UAE Prayer Time Frontend Application

## ⚠️ IMPORTANTE
Este repositorio contiene SOLO el FRONTEND de la aplicación. 
El BACKEND está en un repositorio separado y debe estar corriendo para que esta aplicación funcione.

## Arquitectura del Sistema 🏗️
- **Frontend**: Esta aplicación (React + TypeScript)
- **Backend**: Aplicación separada en otro repositorio
- **Base de Datos**: MySQL (gestionada por el backend)

## Stack Tecnológico 🛠️

### Frontend
- React 18
- TypeScript
- Vite
- Ant Design para UI

## Configuración Inicial 🚀

1. Asegúrate de que el BACKEND esté corriendo primero

2. Instalar dependencias del frontend:
```bash
npm install
```

3. Configurar variables de entorno:
- Usar el archivo `.env` en la raíz del proyecto
- NO crear archivos `.env` adicionales en subdirectorios
- La aplicación usa exclusivamente MySQL como base de datos (a través del backend)

4. Iniciar el servidor de desarrollo del frontend:
```bash
npm run dev
```

## Conexión con el Backend 🔌
- El backend debe estar corriendo para que el frontend funcione
- Las llamadas API están configuradas para conectar con el backend
- Verificar que el backend esté accesible antes de reportar problemas de conexión

## Estructura del Proyecto 📁
```
/src
  /api        # Llamadas a la API
  /components # Componentes React
  /pages      # Páginas de la aplicación
  /config     # Configuraciones
```

## Notas Importantes ⚠️
- Esta aplicación usa EXCLUSIVAMENTE MySQL como base de datos (a través del backend)
- No se deben añadir configuraciones de otras bases de datos (como Supabase, Firebase, etc.)
- Mantener todas las variables de entorno en el archivo `.env` de la raíz

## Scripts Disponibles 📜
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la build de producción
