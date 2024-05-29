function eliminarRecursionIzquierda(grammar) {
    const noTerminales = Object.keys(grammar);
    let newGrammar = {};

    noTerminales.forEach((Ai, i) => {
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

function factorizarGramatica(grammar) {
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

function printGrammar(grammar) {
    return Object.entries(grammar).map(([nonTerminal, productions]) => {
        return `${nonTerminal} -> ${productions.map(prod => prod.join('')).join(' | ')}`;
    }).join('\n');
}

function inputGrammar(grammarInput) {
    let grammar = {};
    let productions = grammarInput.split(';');
    productions.forEach(production => {
        let [non_terminal, rules] = production.split('->');
        non_terminal = non_terminal.trim();
        rules = rules.split('|');
        grammar[non_terminal] = rules.map(rule => rule.trim().split(''));
    });
    return grammar;
}

function processGrammar() {
    let grammarInput = document.getElementById('grammarInput').value;
    let grammar = inputGrammar(grammarInput);

    document.getElementById('originalGrammar').textContent = printGrammar(grammar);

    grammar = eliminarRecursionIzquierda(grammar);
    document.getElementById('noRecursionGrammar').textContent = printGrammar(grammar);

    grammar = factorizarGramatica(grammar);
    document.getElementById('factoredGrammar').textContent = printGrammar(grammar);
}
