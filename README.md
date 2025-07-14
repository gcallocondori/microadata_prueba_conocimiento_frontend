# MICRODATA Frontend

Este proyecto es el frontend de la aplicación de inventarios MICRODATA, desarrollado con Next.js (App Router) y Tailwind CSS. Consume un backend RESTful en Spring Boot expuesto en la variable de entorno `NEXT_PUBLIC_API_BASE_URL`.

---

## Requisitos

- **Node.js** v18 o superior
- **npm** v9 o superior
- Cuenta en **Vercel** (u otro proveedor compatible con Next.js)

---

## Configuración de variables de entorno

Crea un fichero `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Desarrollo local

1. Instala dependencias:
```
npm install
```
2. Levanta el servidor de desarrollo:
```
npm run dev
```
3. Abre en tu navegador:
```
http://localhost:3000
```

## Despliegue
1. Genera la versión de producción:
```
npm run build
```
2. Inicia el servidor:
```
npm start
```
3. Accede a:
```
http://localhost:3000
```