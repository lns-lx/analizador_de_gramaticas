import { calcularPrimeros } from './calcularPrimeros.js';

/**
 * Calcula el conjunto de Siguientes para una gramática.
 * @param {Object} grammar - La gramática en formato de objeto.
 * @returns {Object} - Los conjuntos de Siguientes de cada no terminal.
 */
export function calcularSiguientes(grammar) {
    const primeros = calcularPrimeros(grammar);
    const siguientes = {};

    for (const noTerminal of Object.keys(grammar)) {
        siguientes[noTerminal] = new Set();
    }

    siguientes[Object.keys(grammar)[0]].add('$'); // Start symbol

    let cambio = true;
    while (cambio) {
        cambio = false;

        for (const [noTerminal, producciones] of Object.entries(grammar)) {
            for (const produccion of producciones) {
                for (let i = 0; i < produccion.length; i++) {
                    const B = produccion[i];
                    if (!grammar[B]) continue;

                    const beta = produccion.slice(i + 1);
                    const primerosBeta = beta.length > 0 ? new Set(beta.flatMap(x => [...primeros[x]])) : new Set(['ε']);
                    const antes = siguientes[B].size;

                    if (primerosBeta.has('ε')) {
                        primerosBeta.delete('ε');
                        siguientes[B] = new Set([...siguientes[B], ...siguientes[noTerminal]]);
                    }
                    siguientes[B] = new Set([...siguientes[B], ...primerosBeta]);

                    if (siguientes[B].size > antes) {
                        cambio = true;
                    }
                }
            }
        }
    }

    return siguientes;
}
