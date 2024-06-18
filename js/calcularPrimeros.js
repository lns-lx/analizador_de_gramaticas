/**
 * Calcula el conjunto de Primeros para una gramática.
 * @param {Object} grammar - La gramática en formato de objeto.
 * @returns {Object} - Los conjuntos de Primeros de cada no terminal.
 */
export function calcularPrimeros(grammar) {
    const primeros = {};

    const obtenerPrimeros = (simbolo) => {
        if (primeros[simbolo]) return primeros[simbolo];
        if (!grammar[simbolo]) return new Set([simbolo]); // Terminal

        primeros[simbolo] = new Set();
        for (const produccion of grammar[simbolo]) {
            for (const s of produccion) {
                const primerosS = obtenerPrimeros(s);
                primeros[simbolo] = new Set([...primeros[simbolo], ...primerosS]);
                if (!primerosS.has('ε')) break; // Stop if ε is not in primeros(S)
            }
        }
        return primeros[simbolo];
    };

    for (const noTerminal of Object.keys(grammar)) {
        obtenerPrimeros(noTerminal);
    }

    return primeros;
}
