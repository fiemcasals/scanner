# Guía: Cómo crear un nuevo usuario y su contraseña en Windows

Existen varias formas de crear una cuenta de usuario local con contraseña en Windows (versiones 10 y 11). A continuación, se detallan los tres métodos más utilizados, desde el más sencillo y gráfico hasta el método por línea de comandos.

---

## Método 1: A través de la Configuración (Recomendado)

Esta es la forma estándar y más gráfica para crear un usuario en Windows 10 y 11.

1. **Abrir la Configuración:**
   - Haz clic en el botón de **Inicio** y luego en el icono de engranaje ⚙️ (**Configuración**).
   - *Atajo de teclado:* Presiona `Windows + I`.

2. **Ir a Cuentas:**
   - En la ventana de Configuración, haz clic en **Cuentas**.

3. **Agregar el usuario:**
   - En el menú lateral izquierdo (o en el listado central en Windows 11), selecciona **Familia y otros usuarios** (en Windows 11 puede llamarse simplemente **Otros usuarios**).
   - En la sección "Otros usuarios", haz clic en el botón que dice **Agregar otra persona a este equipo** (o "Agregar cuenta").

4. **Crear una cuenta local (Sin cuenta de Microsoft):**
   - Windows intentará que crees una cuenta de Microsoft. Para evitar esto, haz clic en el enlace que dice **"No tengo los datos de inicio de sesión de esta persona"**.
   - En la siguiente pantalla, haz clic en **"Agregar un usuario sin cuenta Microsoft"**.

5. **Configurar Nombre y Contraseña:**
   - Se abrirá un formulario. Ingresa el **Nombre de usuario** (Ej: *UsuarioRegistro*).
   - Escribe la **Contraseña** y confírmala escribiéndola de nuevo.
   - *Nota de seguridad:* Windows te pedirá que elijas 3 preguntas de seguridad por si alguna vez olvidas la contraseña. Complétalas.
   - Haz clic en **Siguiente**. ¡Listo! El usuario ya está creado.

---

## Método 2: A través de la línea de comandos (Súper rápido)

Si necesitas crear el usuario en segundos y te sientes cómodo usando comandos, este es el mejor método.

1. **Abrir Símbolo del sistema como Administrador:**
   - Haz clic en el menú **Inicio** y escribe `cmd`.
   - Aparecerá "Símbolo del sistema". En el panel derecho (o haciendo clic derecho sobre él), elige **Ejecutar como administrador**.
   - Confirma el cartel de permisos diciendo "Sí".

2. **Ejecutar el comando de creación:**
   - En la ventana negra, escribe exactamente el siguiente comando reemplazando los datos y presiona `Enter`:
     ```cmd
     net user NombreDeUsuario TuContraseñaSegura /add
     ```
   - *Ejemplo:* Si quieres crear un usuario llamado `Operador` con la contraseña `123456`, escribirías:
     ```cmd
     net user Operador 123456 /add
     ```

3. **Verificación:**
   - Si todo salió bien, verás el mensaje: *"Se ha completado el comando correctamente."* El usuario ya existe y puede iniciar sesión.

---

## Método 3: A través de Administración de equipos (Avanzado)

Este método es muy útil para administradores de sistemas porque permite gestionar permisos de forma más visual. *(Nota: No está disponible en las versiones "Home" de Windows).*

1. **Abrir Administración de equipos:**
   - Haz clic derecho sobre el botón de **Inicio** (o presiona `Windows + X`) y selecciona **Administración de equipos**.

2. **Ir a Usuarios Locales:**
   - En el panel izquierdo, despliega **Herramientas del sistema** > **Usuarios y grupos locales** > **Usuarios**.

3. **Crear el usuario:**
   - Haz clic derecho en cualquier espacio en blanco del panel central (donde se listan los usuarios) y selecciona **Usuario nuevo...**.
   - En la ventana que aparece, completa el **Nombre de usuario** y la **Contraseña** (dos veces).
   - Opcionalmente, desmarca la casilla "El usuario debe cambiar la contraseña en el siguiente inicio de sesión" si quieres que la contraseña que le pusiste sea definitiva.
   - Marca la casilla "La contraseña nunca expira" si así lo deseas.
   - Haz clic en **Crear** y luego en **Cerrar**.

---

### ¿Cómo iniciar sesión con el nuevo usuario?
Una vez creado el usuario por cualquiera de estos métodos, simplemente presiona `Ctrl + Alt + Supr` y selecciona **Cerrar sesión** (o **Cambiar de usuario**). En la pantalla de bloqueo de Windows, verás el nuevo usuario en la esquina inferior izquierda listo para ser utilizado con la contraseña que le asignaste.
