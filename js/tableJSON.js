// Función para convertir la tabla HTML a formato JSON
function tableToJSON(table) {
    const headers = Array.from(table.querySelectorAll('th:not(:first-child)'))
        .map(th => th.textContent.trim());
    
    const rows = Array.from(table.querySelectorAll('tr:not(:first-child)'));
    
    const jsonData = rows.reduce((acc, row) => {
        const nonTerminal = row.querySelector('th').textContent.trim();
        const cells = Array.from(row.querySelectorAll('td'));
        
        acc[nonTerminal] = headers.reduce((rowAcc, header, index) => {
            const cellContent = cells[index].textContent.trim();
            if (cellContent) {
                rowAcc[header] = cellContent;
            }
            return rowAcc;
        }, {});
        
        return acc;
    }, {});
    
    return JSON.stringify(jsonData, null, 2);
}

// Función para copiar el JSON al portapapeles
function copyJSONToClipboard() {
    const table = document.querySelector('#table-output table');
    if (!table) {
        alert('Por favor, genera la tabla LL(1) primero.');
        return;
    }
    
    const jsonString = tableToJSON(table);
    
    // Crear un elemento textarea temporal
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = jsonString;
    document.body.appendChild(tempTextArea);
    
    // Seleccionar y copiar el contenido
    tempTextArea.select();
    document.execCommand('copy');
    
    // Eliminar el elemento temporal
    document.body.removeChild(tempTextArea);
    
    alert('La tabla LL(1) ha sido copiada como JSON al portapapeles.');
}

// Agregar el botón de copiar JSON después de generar la tabla
document.addEventListener('DOMContentLoaded', () => {
    const constructButton = document.getElementById('construct-table');
    const outputSection = document.querySelector('.output-section');
    
    const copyJSONButton = document.createElement('button');
    copyJSONButton.textContent = 'Copiar Tabla como JSON';
    copyJSONButton.addEventListener('click', copyJSONToClipboard);
    
    constructButton.addEventListener('click', () => {
        // Esperar a que la tabla se genere
        setTimeout(() => {
            if (!outputSection.contains(copyJSONButton)) {
                outputSection.appendChild(copyJSONButton);
            }
        }, 100);
    });
});