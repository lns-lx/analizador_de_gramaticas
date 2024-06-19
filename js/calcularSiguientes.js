import { calcularPrimeros } from './primeros.js';

/**
 * Calcula el conjunto de siguientes (Follow) de una gramática.
 * @param {Object} grammar - La gramática.
 * @returns {Object} - Conjuntos de siguientes para cada no terminal.
 */
export function calcularSiguientes(grammar) {
    const primeros = calcularPrimeros(grammar);
    const siguientes = {};

    // Inicializa los conjuntos de siguientes
    Object.keys(grammar).forEach(nonTerminal => {
        siguientes[nonTerminal] = new Set();
    });

    siguientes[Object.keys(grammar)[0]].add('$'); // El símbolo de inicio contiene '$'

    let cambios = true;
    while (cambios) {
        cambios = false;

        Object.keys(grammar).forEach(nonTerminal => {
            grammar[nonTerminal].forEach(production => {
                for (let i = 0; i < production.length; i++) {
                    const symbol = production[i];
                    if (grammar[symbol]) { // Si es un no terminal
                        let j = i + 1;
                        while (j < production.length && grammar[production[j]]) {
                            const initialSize = siguientes[symbol].size;
                            primeros[production[j]].forEach(item => {
                                if (item !== 'ε') {
                                    siguientes[symbol].add(item);
                                }
                            });
                            if (siguientes[symbol].size !== initialSize) {
                                cambios = true;
                            }
                            if (!primeros[production[j]].includes('ε')) {
                                break;
                            }
                            j++;
                        }
                        if (j === production.length) {
                            const initialSize = siguientes[symbol].size;
                            siguientes[nonTerminal].forEach(item => siguientes[symbol].add(item));
                            if (siguientes[symbol].size !== initialSize) {
                                cambios = true;
                            }
                        } else if (!grammar[production[j]]) {
                            const initialSize = siguientes[symbol].size;
                            siguientes[symbol].add(production[j]);
                            if (siguientes[symbol].size !== initialSize) {
                                cambios = true;
                            }
                        }
                    }
                }
            });
        });
    }

    // Convierte los conjuntos en arrays para facilitar su impresión
    Object.keys(siguientes).forEach(nonTerminal => {
        siguientes[nonTerminal] = Array.from(siguientes[nonTerminal]);
    });

    return siguientes;
}
