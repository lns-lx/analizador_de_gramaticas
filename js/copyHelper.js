function copyText(elementId) {
    console.log('Copying text for element:', elementId);

    const textarea = document.getElementById(elementId);
    console.log('Textarea:', textarea);

    if (!textarea) {
        console.error(`Textarea with ID '${elementId}' not found.`);
        return;
    }

    textarea.select();
    textarea.setSelectionRange(0, 99999); /* For mobile devices */

    document.execCommand("copy");

    const copyButton = document.querySelector(`#${elementId} + .copy-button`);
    console.log('Copy button:', copyButton);

    if (copyButton) {
        copyButton.textContent = 'Copiado';
        setTimeout(() => {
            copyButton.textContent = 'Copiar ' + (elementId === 'grammar-input' ? 'Entrada' : (elementId === 'first-output' ? 'Primeros' : 'Siguientes'));
        }, 2000); // Cambia el texto de vuelta a su estado original después de 2 segundos (2000 milisegundos)
    } else {
        console.error(`Copy button for textarea '${elementId}' not found.`);
    }
}
