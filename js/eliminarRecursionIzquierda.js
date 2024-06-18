/**
 * Elimina la recursión por la izquierda en una gramática.
 * @param {Object} grammar - La gramática original.
 * @returns {Object} - La gramática sin recursión por la izquierda.
 */
export function eliminarRecursionIzquierda(grammar) {
    const noTerminales = Object.keys(grammar);
    let newGrammar = {};

    noTerminales.forEach(Ai => {
        const productions = grammar[Ai];
        let newProductions = [];
        let recursivas = [];

        productions.forEach(prod => {
            if (prod[0] === Ai) {
                recursivas.push(prod.slice(1));
            } else {
                newProductions.push(prod);
            }
        });

        if (recursivas.length > 0) {
            let Ai_prime = Ai + "'";
            while (noTerminales.includes(Ai_prime) || newGrammar.hasOwnProperty(Ai_prime)) {
                Ai_prime += "'";
            }

            let newProductionsWithPrime = newProductions.map(prod => prod.concat([Ai_prime]));
            let newRecursivas = recursivas.map(rec => rec.concat([Ai_prime]));
            newRecursivas.push(['ε']);

            newGrammar[Ai] = newProductionsWithPrime;
            newGrammar[Ai_prime] = newRecursivas;
        } else {
            newGrammar[Ai] = newProductions;
        }
    });

    return newGrammar;
}
