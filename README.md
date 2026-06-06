# Sistema de Registro y Control de Acceso (Lector QR)

Bienvenido a este repositorio. Aquí encontrarás todos los archivos necesarios para implementar una arquitectura de hardware y software de **bajo costo** diseñada para controlar ingresos o registrar asistencia mediante códigos QR.

## 🎯 ¿Qué hace esta aplicación?

El núcleo de este proyecto es una aplicación web (Frontend) que utiliza la cámara de cualquier dispositivo (PC, tablet o celular) para leer códigos QR. 

Una vez que se escanea un código (que puede contener el DNI, el nombre de una persona, o un ID único), la aplicación envía esa información automáticamente y de forma silenciosa hacia una hoja de cálculo en **Google Sheets**, donde queda registrada junto con la fecha y hora exacta del escaneo. 

Todo esto funciona **sin necesidad de alquilar servidores** ni bases de datos costosas.

---

## 📂 Contenido del Repositorio

El proyecto se compone de las siguientes piezas clave:

1. **`qr_scanner/index.html` (La Aplicación):** 
   Es la interfaz visual. Está escrita en HTML, CSS y JavaScript puro. Utiliza la librería `html5-qrcode` para acceder a la cámara y la API `fetch` nativa del navegador para enviar los datos.

2. **`qr_scanner/codigo.gs` (El Backend Serverless):** 
   Es un script escrito en Google Apps Script que debe copiarse en tu cuenta de Google Drive. Actúa como un Webhook: recibe los datos de la aplicación y los inserta como una nueva fila en tu planilla de Google Sheets.

3. **`clase_asincronica.html` (El Material de Estudio):**
   Una presentación interactiva estilo PowerPoint (basada en Reveal.js) que explica toda la arquitectura técnica detrás del proyecto. Incluye conceptos de seguridad física como el **Modo Kiosco** de Windows, y guías de cómo instalar y usar Git.

4. **Guías en Markdown (`.md`):**
   Documentos paso a paso sobre cómo crear usuarios locales en Windows, cómo restringirlos y cómo publicar páginas web de forma gratuita utilizando GitHub Pages.

---

## 🚀 ¿Cómo probarlo?

Para usar este sistema tú mismo, debes seguir dos simples pasos detallados en la `clase_asincronica.html`:
1. Copiar el código de `codigo.gs` en las Extensiones de una hoja de cálculo de Google y publicarlo como Aplicación Web.
2. Copiar la URL que te genera Google y pegarla dentro del archivo `index.html` (en la variable `APPS_SCRIPT_URL`).
3. Subir el `index.html` a GitHub Pages (o simplemente abrirlo en tu navegador) ¡y empezar a escanear!

## 🛠️ Tecnologías Empleadas
- **Frontend:** HTML5, Vanilla CSS, JavaScript.
- **Backend / Base de Datos:** Google Apps Script, Google Sheets API.
- **Seguridad:** Kiosk Mode (Acceso Asignado en OS).
- **Despliegue:** GitHub Pages, Git.
