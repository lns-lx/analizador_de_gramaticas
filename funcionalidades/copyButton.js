// Importar el archivo CSS
import './copyButton.css';

// Función para crear y gestionar el botón de copiar
function addCopyButton(result, outputContainer) {
    // Crear el botón de copiar
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar';
    copyButton.classList.add('copy-button');
    outputContainer.parentNode.appendChild(copyButton); // Añadir el botón como hijo del contenedor de output

    // Mostrar el botón de copiar
    copyButton.style.display = 'block';

    // Agregar funcionalidad de copiar al botón
    copyButton.addEventListener('click', () => {
        const textarea = document.createElement('textarea');
        textarea.value = result;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Cambiar el texto del botón a "Copiado"
        copyButton.textContent = 'Copiado';

        // Opcional: Después de cierto tiempo, volver a "Copiar" si se desea
        setTimeout(() => {
            copyButton.textContent = 'Copiar';
        }, 1500); // Cambiar de vuelta a "Copiar" después de 1.5 segundos (1500 milisegundos)
    });
}

// Exportar la función para poder ser importada en otros scripts
export { addCopyButton };
