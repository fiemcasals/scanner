function doPost(e) {
  // Obtenemos la hoja activa (asegúrate de estar en la hoja correcta)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    // Extraemos el valor "codigo" enviado por nuestro HTML (vía form-urlencoded)
    var qrContent = e.parameter.codigo;
    
    // Si la hoja está completamente vacía, agregamos cabeceras
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha y Hora", "Contenido del QR"]);
      
      // Opcional: poner las cabeceras en negrita
      sheet.getRange("A1:B1").setFontWeight("bold");
    }
    
    // Insertamos la nueva fila con la fecha actual y el código escaneado
    sheet.appendRow([new Date(), qrContent]);
    
    // Devolvemos un mensaje de éxito
    return ContentService.createTextOutput("Registro exitoso").setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    // Si hay error, lo devolvemos
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

// Opcional: manejador GET por si abres la URL del script directamente en el navegador
function doGet(e) {
  return ContentService.createTextOutput("La API está funcionando correctamente. Esperando solicitudes POST.");
}
