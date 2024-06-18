/**
 * Convierte la gramática en un formato legible.
 * @param {Object} grammar - La gramática a imprimir.
 * @returns {String} - La gramática en formato legible.
 */
export function printGrammar(grammar) {
    return Object.entries(grammar).map(([nonTerminal, productions]) => {
        return `${nonTerminal} -> ${productions.map(prod => prod.join('')).join(' | ')}`;
    }).join('\n');
}
