# 💖 Cerca a pesar de la distancia

> **Una experiencia web interactiva llena de amor, creada por Simón especialmente para Ali.**  
> *"Aunque existan kilómetros entre nosotros, cada latido de mi corazón lleva tu nombre."*

---

## 🌸 Descripción del Proyecto

**Cerca a pesar de la distancia** es una aplicación web interactiva y responsiva diseñada como un regalo digital para acompañar a Ali día a día. Durante 7 días, Ali podrá desbloquear sorpresas diarias protegidas con claves cariñosas y pistas tiernas, accediendo a:

- 💌 **Cartas personalizadas** con mensajes profundos para cada día.
- 🎬 **Carpetas de Google Drive** con videos y audios exclusivos.
- 🎵 **Música romántica ambiental** generada en tiempo real mediante Web Audio API.
- ✨ **Avatar interactivo** con caricatura personalizada y stickers desbloqueables.
- 💬 **Burbujas de amor interactivas** flotantes y lluvia de confeti.

---

## 📁 Estructura del Proyecto

```text
cerca-a-pesar-de-la-distancia/
├── index.html              # Estructura principal de la aplicación web
├── vercel.json             # Configuración y optimizaciones para Vercel
├── README.md               # Documentación y guía del proyecto
├── assets/
│   ├── caricatura_alis.png # Caricatura especial de Ali
│   ├── favicon.png         # Icono de la aplicación
│   └── stickers/           # Stickers decorativos e interactivos
│       ├── princesa_pug.svg
│       ├── abril_llama.svg
│       └── sobre_carta.svg
├── css/
│   └── styles.css          # Diseño Glassmorphism, animaciones y diseño responsivo
└── js/
    ├── config.js           # Configuración central (contraseñas, cartas, links de Drive)
    ├── music.js            # Sintetizador de melodías románticas con Web Audio API
    ├── confetti.js         # Efectos de celebración y partículas
    └── app.js              # Lógica principal, desbloqueo y estado en LocalStorage
```

---

## 🔑 Cómo Personalizar Contraseñas y Enlaces de Google Drive

Toda la información del proyecto se encuentra centralizada en el archivo **`js/config.js`**. Para personalizar los contenidos, solo debes editar ese archivo:

### 1. Actualizar las Contraseñas y Pistas Diarias
Dentro de `CONFIG.days`:
```javascript
{
  id: 1,
  title: "Día 1: El Comienzo de la Espera",
  password: "dia1alis", // <-- Cambia aquí la contraseña en minúsculas
  hint: "Pista: El nombre de este día + tu hermoso nombre", // <-- Pista mostrada
  driveUrl: "https://drive.google.com/drive/folders/TU_ID_DE_CARPETA_1", // <-- Enlace de Drive del Día 1
  letter: `Mi Ali hermosa, ...` // <-- Contenido de la carta
}
```

### 2. Actualizar la Carpeta Madre de Google Drive
En la propiedad `masterDriveFolder`:
```javascript
CONFIG.masterDriveFolder = "https://drive.google.com/drive/folders/TU_CARPETA_MADRE";
```

### 3. Modificar Frases de Amor o Dedicatorias
Puedes agregar o editar frases en `CONFIG.lovePhrases` y modificar los datos de la pareja en `CONFIG.couple`.

---

## 🚀 Despliegue en Vercel

Este proyecto está 100% optimizado para desplegarse de manera instantánea y gratuita en **Vercel**.

### Opción 1: Despliegue Automático desde GitHub (Recomendado)
1. Ingresa a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** ➜ **"Project"**.
3. Selecciona el repositorio **`cerca-a-pesar-de-la-distancia`**.
4. En **Framework Preset**, selecciona **Other** (o déjalo automático ya que es un sitio estático).
5. Haz clic en **"Deploy"**.
6. ¡Listo! Vercel te proporcionará una URL pública (ej. `https://cerca-a-pesar-de-la-distancia.vercel.app`) para compartir con Ali.

### Opción 2: Despliegue mediante Vercel CLI
Si tienes instalado Vercel CLI en tu terminal:
```bash
# Iniciar sesión en Vercel
vercel login

# Desplegar a producción
vercel --prod
```

---

## 🛠️ Tecnologías y Características

- **HTML5 Semántico & Accesible**: Estructura limpia y compatible con todos los navegadores móviles y de escritorio.
- **CSS3 Moderno**: Diseño Glassmorphism con paleta rosa/lavanda/dorado, variables CSS, gradientes suaves y animaciones fluidas.
- **JavaScript Moderno (ES6+)**: Modular, sin dependencias externas pesadas.
- **Web Audio API**: Melodías sintetizadas procedimentales sin requerir archivos MP3 pesados.
- **LocalStorage**: Guarda el progreso de los días desbloqueados en el dispositivo para que Ali no pierda su avance.

---

*Hecho con todo el amor del mundo para Ali ❤️.*
