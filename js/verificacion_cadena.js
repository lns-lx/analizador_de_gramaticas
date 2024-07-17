//function verificarCadena() {
//    const llTableInput = document.getElementById('llTable').value;
//    const inputString = document.getElementById('inputString').value;
//    const resultadoDiv = document.getElementById('resultado');
//
//    try {
//        const llTable = JSON.parse(llTableInput);
//        const resultado = analizarCadena(llTable, inputString);
//        resultadoDiv.innerHTML = resultado ? "La cadena es aceptada." : "La cadena es rechazada.";
//    } catch (error) {
//        resultadoDiv.innerHTML = "Error: " + error.message;
//    }
//}
//
//function analizarCadena(llTable, inputString) {
//    const stack = ['$', Object.keys(llTable)[0]]; // Assume the first key is the start symbol
//    let inputIndex = 0;
//    inputString += '$'; // Add end marker to input string
//
//    while (stack.length > 0) {
//        const topStack = stack.pop();
//        const currentInput = inputString[inputIndex];
//
//        if (topStack === '$' && currentInput === '$') {
//            return true; // Acceptance
//        }
//
//        if (topStack === currentInput) {
//            inputIndex++;
//        } else if (llTable[topStack] && llTable[topStack][currentInput]) {
//            const production = llTable[topStack][currentInput];
//            if (production !== 'ε') {
//                for (let i = production.length - 1; i >= 0; i--) {
//                    stack.push(production[i]);
//                }
//            }
//        } else if (llTable[topStack] && llTable[topStack]['$'] === 'ε') {
//            // Special handling for empty productions
//            // Continue without pushing anything to the stack
//        } else {
//            return false; // Rejection
//        }
//    }
//
//    return inputIndex === inputString.length; // Accept only if the entire input has been consumed
//}

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
    const stack = ['$', Object.keys(llTable)[0]]; // Assume the first key is the start symbol
    let inputIndex = 0;
    inputString += '$'; // Add end marker to input string
    
    while (stack.length > 0) {
        const topStack = stack.pop();
        const currentInput = inputString[inputIndex];
    
        if (topStack === '$' && currentInput === '$') {
            return true; // Acceptance
        }
    
        if (topStack === currentInput) {
            inputIndex++;
        } else if (llTable[topStack] && llTable[topStack][currentInput]) {
            const production = llTable[topStack][currentInput];
            if (production !== 'ε') {
                for (let i = production.length - 1; i >= 0; i--) {
                    stack.push(production[i]);
                }
            }
        } else if (llTable[topStack] && llTable[topStack]['$'] === 'ε') {
            // Special handling for empty productions
            // Continue without pushing anything to the stack
        } else {
            return false; // Rejection
        }
    }
    
    return inputIndex === inputString.length; // Accept only if the entire input has been consumed
}
    
    