/**
 * Calcula el conjunto de primeros (First) de una gramática.
 * @param {Object} grammar - La gramática.
 * @returns {Object} - Conjuntos de primeros para cada no terminal.
 */
export function calcularPrimeros(grammar) {
    const primeros = {};

    // Inicializa los conjuntos de primeros
    Object.keys(grammar).forEach(nonTerminal => {
        primeros[nonTerminal] = new Set();
    });

    let cambios = true;
    while (cambios) {
        cambios = false;

        Object.keys(grammar).forEach(nonTerminal => {
            grammar[nonTerminal].forEach(production => {
                for (let symbol of production) {
                    if (grammar[symbol]) { // Si es un no terminal
                        const initialSize = primeros[nonTerminal].size;
                        primeros[symbol].forEach(item => primeros[nonTerminal].add(item));
                        if (primeros[nonTerminal].size !== initialSize) {
                            cambios = true;
                        }
                        if (!primeros[symbol].has('ε')) {
                            break;
                        }
                    } else { // Es un terminal
                        if (!primeros[nonTerminal].has(symbol)) {
                            primeros[nonTerminal].add(symbol);
                            cambios = true;
                        }
                        break;
                    }
                }
            });
        });
    }

    // Convierte los conjuntos en arrays para facilitar su impresión
    Object.keys(primeros).forEach(nonTerminal => {
        primeros[nonTerminal] = Array.from(primeros[nonTerminal]);
    });

    return primeros;
}
