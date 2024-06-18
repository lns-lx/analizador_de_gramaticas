/**
 * Factoriza una gramática.
 * @param {Object} grammar - La gramática original.
 * @returns {Object} - La gramática factorizada.
 */
export function factorizarGramatica(grammar) {
    function longestCommonPrefix(strs) {
        if (!strs.length) return [];
        const shortest = strs.reduce((a, b) => a.length <= b.length ? a : b);
        for (let i = 0; i < shortest.length; i++) {
            if (!strs.every(str => str[i] === shortest[i])) {
                return shortest.slice(0, i);
            }
        }
        return shortest;
    }

    let newGrammar = {};
    Object.entries(grammar).forEach(([nonTerminal, productions]) => {
        if (productions.length > 1) {
            const prefix = longestCommonPrefix(productions);
            if (prefix.length) {
                let A_prime = nonTerminal + "'";
                while (grammar.hasOwnProperty(A_prime) || newGrammar.hasOwnProperty(A_prime)) {
                    A_prime += "'";
                }

                let newProductions = [];
                productions.forEach(prod => {
                    if (JSON.stringify(prod.slice(0, prefix.length)) === JSON.stringify(prefix)) {
                        let newProd = prod.slice(prefix.length);
                        if (!newProd.length) newProd = ['ε'];
                        newProductions.push(newProd);
                    } else {
                        if (!newGrammar[nonTerminal]) newGrammar[nonTerminal] = [];
                        newGrammar[nonTerminal].push(prod);
                    }
                });

                newGrammar[nonTerminal] = [prefix.concat([A_prime])];
                newGrammar[A_prime] = newProductions;
            } else {
                newGrammar[nonTerminal] = productions;
            }
        } else {
            newGrammar[nonTerminal] = productions;
        }
    });

    return newGrammar;
}
