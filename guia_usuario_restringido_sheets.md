# Guía: Creación de Usuario Restringido y Aplicación conectada a Google Sheets

Este documento explica cómo diseñar e implementar una solución donde un usuario con contraseña solo pueda acceder a una aplicación específica (en este caso, un formulario de registro de personas) y cómo esos datos se guardan automáticamente en una hoja de cálculo de Google Drive.

## Arquitectura de la Solución

Para lograr esto de la manera más robusta y segura, dividiremos el problema en tres partes:
1. **La Base de Datos:** Google Sheets + Google Apps Script (para recibir los datos sin necesidad de un servidor backend complejo).
2. **La Aplicación:** Una página web sencilla (o aplicación de escritorio) con el formulario.
3. **El Usuario Restringido:** Configuración del Sistema Operativo en "Modo Kiosco" (Kiosk Mode) para que el usuario, tras loguearse, quede encerrado únicamente en esa aplicación.

---

## 1. Configuración de Google Sheets (Base de Datos)

En lugar de conectar la aplicación directamente a la API de Google (lo cual requiere autenticación OAuth compleja en el frontend), usaremos **Google Apps Script** para crear un Webhook que reciba los datos y los guarde.

### Pasos:
1. Crea una nueva hoja de cálculo en tu Google Drive.
2. Nombra las columnas en la primera fila (Ej: `A1: Fecha`, `B1: Nombre`, `C1: DNI`, `D1: Observaciones`).
3. Ve a **Extensiones > Apps Script**.
4. Borra el código que aparece y pega el siguiente:
   ```javascript
   function doPost(e) {
     // Abre la hoja de cálculo activa
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     
     // Parsea los datos enviados desde nuestra aplicación
     var datos = JSON.parse(e.postData.contents);
     
     // Agrega una nueva fila con los datos
     sheet.appendRow([
       new Date(), // Fecha y hora automática
       datos.nombre,
       datos.dni,
       datos.observaciones
     ]);
     
     // Devuelve una respuesta de éxito
     return ContentService.createTextOutput(JSON.stringify({"estado": "éxito"}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
5. Haz clic en el botón azul **Implementar > Nueva implementación**.
6. Haz clic en el ícono de la rueda dentada (Configuración) junto a "Seleccionar tipo" y elige **Aplicación web**.
7. En "Ejecutar como", elige **Tú**. En "Quién tiene acceso", elige **Cualquier persona**.
8. Haz clic en Implementar, autoriza los permisos si te lo pide, y **copia la URL de la aplicación web** generada. Esta será nuestra API.

---

## 2. Creación de la Aplicación de Registro

Ahora crearemos la aplicación en sí. Una forma muy fácil es hacer una página HTML estática que consuma la URL obtenida en el paso anterior. 

### Código de la Aplicación (`index.html`)
Guarda este código en un archivo llamado `index.html`.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de Personas</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: #f4f4f9; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
        }
        .formulario { 
            background: white; 
            padding: 40px; 
            border-radius: 8px; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.2); 
            width: 100%; 
            max-width: 400px; 
        }
        input, textarea, button { 
            width: 100%; 
            margin-bottom: 20px; 
            padding: 12px; 
            box-sizing: border-box; 
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button { 
            background: #007bff; 
            color: white; 
            border: none; 
            cursor: pointer; 
            font-size: 16px; 
            font-weight: bold;
        }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>

<div class="formulario">
    <h2>Nuevo Registro</h2>
    <input type="text" id="nombre" placeholder="Nombre Completo" required>
    <input type="text" id="dni" placeholder="DNI" required>
    <textarea id="observaciones" placeholder="Observaciones" rows="5"></textarea>
    <button onclick="enviarDatos()">Guardar Registro</button>
</div>

<script>
    // REEMPLAZA ESTA URL CON LA QUE COPIASTE DE GOOGLE APPS SCRIPT
    const GOOGLE_SCRIPT_URL = 'TU_URL_DE_APPS_SCRIPT_AQUI';

    function enviarDatos() {
        const btn = document.querySelector('button');
        btn.innerText = 'Guardando...';
        btn.disabled = true;

        const datos = {
            nombre: document.getElementById('nombre').value,
            dni: document.getElementById('dni').value,
            observaciones: document.getElementById('observaciones').value
        };

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Evita errores de políticas CORS desde un archivo local
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            alert('Registro guardado correctamente en Google Sheets');
            // Limpiar formulario
            document.getElementById('nombre').value = '';
            document.getElementById('dni').value = '';
            document.getElementById('observaciones').value = '';
            btn.innerText = 'Guardar Registro';
            btn.disabled = false;
        }).catch(err => {
            alert('Error al guardar el registro');
            btn.innerText = 'Guardar Registro';
            btn.disabled = false;
        });
    }
</script>

</body>
</html>
```

---

## 3. Creación del Usuario Restringido (Modo Kiosco)

Para asegurar que el usuario ingrese con su contraseña y **solo** pueda usar esta aplicación sin navegar por internet ni abrir otras cosas en la PC, debemos configurar el sistema operativo en "Modo Kiosco".

### Opción A: En Windows 10/11 (Acceso Asignado)
Windows tiene una función nativa perfecta para esto:
1. Crea un usuario estándar local en Windows (Ej: `UsuarioRegistro`) con la contraseña que desees.
2. Ve a **Configuración > Cuentas > Familia y otros usuarios**.
3. Busca la opción **Configurar un quiosco** (Kiosk) o **Acceso asignado**.
4. Haz clic en "Comenzar" y selecciona el usuario que acabas de crear (`UsuarioRegistro`).
5. Elige la aplicación que podrá usar. Selecciona **Microsoft Edge**.
6. Selecciona la opción de usarlo como **"Señalización digital o interactiva"** (para que bloquee pestañas y barra de direcciones).
7. Como URL de inicio, coloca la ruta absoluta a tu archivo HTML (Ej: `file:///C:/ruta/a/tu/index.html`) o súbelo a un hosting gratuito (como Vercel o GitHub Pages) y coloca la URL web.
8. Cuando el usuario inicie sesión en la PC con su contraseña, **solo verá el formulario a pantalla completa**. No podrá minimizarlo, no verá el menú inicio, ni el escritorio. Para salir, deberá presionar `Ctrl + Alt + Supr`.

### Opción B: En Linux (Ubuntu)
1. Instala el navegador Chromium: `sudo apt install chromium-browser`
2. Crea el usuario: `sudo adduser usuarioregistro` y asígnale su contraseña.
3. Inicia sesión en ese usuario.
4. En Linux, puedes hacer que una aplicación se abra al inicio y a pantalla completa. Configura el inicio automático creando el archivo `~/.config/autostart/kiosk.desktop` con este contenido:
   ```ini
   [Desktop Entry]
   Type=Application
   Name=Kiosk
   Exec=chromium-browser --kiosk --incognito file:///ruta/a/tu/index.html
   X-GNOME-Autostart-enabled=true
   ```
5. Para un nivel de bloqueo mayor al estilo Kiosco puro, existen gestores de ventanas como `cage` (Wayland) o usar `gnome-kiosk-script` que evitan que el usuario pueda interactuar con el resto del sistema operativo.

## Resumen del Flujo de Trabajo
1. El empleado enciende la PC de su puesto de trabajo.
2. Inicia sesión en el usuario `UsuarioRegistro` ingresando su contraseña.
3. El sistema carga el perfil e inmediatamente se bloquea, mostrando únicamente el Formulario a pantalla completa.
4. El empleado ingresa el nombre, DNI y observaciones de las personas a lo largo de su turno y presiona "Guardar".
5. La aplicación envía los datos invisiblemente a Google Apps Script.
6. Google Apps Script agrega las filas automáticamente a tu documento privado de Google Sheets en Drive.
