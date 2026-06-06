# Guía paso a paso: Cómo publicar un sitio en GitHub Pages

GitHub Pages es un servicio gratuito de GitHub que te permite alojar sitios web estáticos (páginas hechas con HTML, CSS y JavaScript) directamente desde un repositorio, sin necesidad de configurar un servidor o pagar hosting.

A continuación, se detallan los pasos para publicar tu aplicación web (como el lector de códigos QR) usando este servicio.

---

## Paso 1: Crear un repositorio en GitHub

1. Inicia sesión en tu cuenta de [GitHub](https://github.com/).
2. Haz clic en el botón verde **"New"** (Nuevo) situado en la parte izquierda de la pantalla, o en el ícono **"+"** en la esquina superior derecha y selecciona **"New repository"**.
3. En **Repository name**, escribe un nombre para tu proyecto (por ejemplo: `lector-qr-sheets`).
4. Selecciona si quieres que el repositorio sea **Public** (Público) o **Private** (Privado). 
   - *Aclaración:* GitHub Pages es gratuito para repositorios públicos. Si usas un repositorio privado en una cuenta gratuita de GitHub, no podrás usar Pages.
5. Haz clic en el botón verde **"Create repository"** en la parte inferior.

---

## Paso 2: Subir los archivos al repositorio

Si no estás familiarizado con la consola de Git, la forma más rápida de subir los archivos es a través del propio navegador web:

1. En la página de inicio de tu nuevo repositorio, busca el enlace que dice **"uploading an existing file"** (subir un archivo existente) y haz clic en él.
2. Arrastra tu archivo `index.html` (junto con carpetas de imágenes o estilos si los tuvieras) hacia el recuadro que aparece en pantalla, o haz clic en "choose your files" para buscarlos en tu PC.
3. Una vez que los archivos terminen de cargar, baja hasta la sección **"Commit changes"** (Confirmar cambios).
4. Escribe un mensaje breve (por ejemplo: "Subir index.html") y asegúrate de que esté seleccionada la opción **"Commit directly to the `main` branch"**.
5. Haz clic en el botón verde **"Commit changes"**.

*Importante: Para que GitHub reconozca tu página automáticamente, el archivo principal debe llamarse obligatoriamente `index.html`.*

---

## Paso 3: Activar GitHub Pages

Ahora que el código está en tu repositorio, debemos decirle a GitHub que habilite la función de página web.

1. En la página principal de tu repositorio, haz clic en la pestaña **"Settings"** (Configuración) ubicada en la barra superior (tiene un ícono de un engranaje).
2. En el menú lateral izquierdo, desplázate un poco hacia abajo y haz clic en la sección **"Pages"**.
3. En la pantalla de configuración de Pages, ve a la sección "Build and deployment" (Compilación e implementación):
   - En **Source** (Origen), asegúrate de que diga **"Deploy from a branch"**.
   - Justo debajo, en la sección **Branch** (Rama), haz clic en el menú desplegable que dice "None" y selecciona la rama **`main`** (o `master`).
   - Al lado, deja seleccionada la opción **`/ (root)`**.
4. Haz clic en el botón **"Save"** (Guardar).

---

## Paso 4: Esperar y acceder a tu página web

1. Una vez guardada la configuración, GitHub comenzará a preparar ("compilar") tu sitio en sus servidores. Esto es un proceso automático que suele tardar entre 1 y 2 minutos.
2. Si recargas la página de "Settings > Pages" después de un ratito, verás aparecer un mensaje en la parte superior con un tilde verde indicando:
   > **"Your site is live at https://[tu-usuario].github.io/[nombre-del-repositorio]/"**
3. ¡Listo! Haz clic en ese enlace o cópialo. 

Esa será la URL pública de tu aplicación. Puedes abrirla desde tu celular, probar la cámara para escanear el QR y verificar cómo envía los datos al Google Sheets.
