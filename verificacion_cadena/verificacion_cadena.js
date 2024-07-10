function verificarCadena() {
    const llTableInput = document.getElementById('llTable').value;
    const inputString = document.getElementById('inputString').value;
    const resultadoDiv = document.getElementById('resultado');

    try {
        const llTable = JSON.parse(llTableInput);
        const resultado = analizarCadena(llTable, inputString);
        resultadoDiv.innerHTML = resultado ? "La cadena es aceptada." : "La cadena es rechazada.";
    } catch (error) {
        resultadoDiv.innerHTML = "Error: " + error.message;
    }
}

function analizarCadena(llTable, inputString) {
    const stack = ['$', Object.keys(llTable)[0]]; // Asumimos que la primera clave es el símbolo inicial
    let inputIndex = 0;

    while (stack.length > 0) {
        const topStack = stack[stack.length - 1];
        const currentInput = inputString[inputIndex] || '$';

        if (topStack === '$' && currentInput === '$') {
            return true; // Aceptación
        }

        if (topStack === currentInput) {
            stack.pop();
            inputIndex++;
        } else if (llTable[topStack] && llTable[topStack][currentInput]) {
            stack.pop();
            const production = llTable[topStack][currentInput];
            if (production !== 'ε') {
                for (let i = production.length - 1; i >= 0; i--) {
                    stack.push(production[i]);
                }
            }
        } else {
            return false; // Rechazo
        }
    }

    return false; // Si salimos del bucle sin aceptar, rechazamos
}