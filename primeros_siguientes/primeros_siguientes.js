function calculateFirstAndFollow(grammar) {
    const rules = parseGrammar(grammar);
    const nonTerminals = Object.keys(rules);
    const terminals = getTerminals(rules);

    const FIRST = calculateFirst(rules, nonTerminals, terminals);
    const FOLLOW = calculateFollow(rules, nonTerminals, terminals, FIRST);

    return { FIRST, FOLLOW };
}

function parseGrammar(grammar) {
    const rules = {};
    grammar.split('\n').forEach(line => {
        const [left, right] = line.split('->').map(s => s.trim());
        rules[left] = right.split('|').map(s => s.trim());
    });
    return rules;
}

function getTerminals(rules) {
    const allSymbols = new Set();
    const nonTerminals = new Set(Object.keys(rules));
    
    Object.values(rules).flat().forEach(production => {
        production.split(' ').forEach(symbol => allSymbols.add(symbol));
    });
    
    return Array.from(allSymbols).filter(symbol => !nonTerminals.has(symbol) && symbol !== 'ε');
}

function calculateFirst(rules, nonTerminals, terminals) {
    const FIRST = {};
    nonTerminals.forEach(nt => FIRST[nt] = new Set());
    terminals.forEach(t => FIRST[t] = new Set([t]));

    let changed;
    do {
        changed = false;
        nonTerminals.forEach(A => {
            rules[A].forEach(production => {
                const symbols = production.split(' ');
                let allDeriveEpsilon = true;
                for (let X of symbols) {
                    if (X === 'ε') {
                        if (!FIRST[A].has('ε')) {
                            FIRST[A].add('ε');
                            changed = true;
                        }
                    } else {
                        const firstX = Array.from(FIRST[X]).filter(s => s !== 'ε');
                        firstX.forEach(s => {
                            if (!FIRST[A].has(s)) {
                                FIRST[A].add(s);
                                changed = true;
                            }
                        });
                        if (!FIRST[X].has('ε')) {
                            allDeriveEpsilon = false;
                            break;
                        }
                    }
                }
                if (allDeriveEpsilon && !FIRST[A].has('ε')) {
                    FIRST[A].add('ε');
                    changed = true;
                }
            });
        });
    } while (changed);

    return FIRST;
}

function calculateFollow(rules, nonTerminals, terminals, FIRST) {
    const FOLLOW = {};
    nonTerminals.forEach(nt => FOLLOW[nt] = new Set());
    FOLLOW[nonTerminals[0]].add('$');  // Add $ to FOLLOW of start symbol

    let changed;
    do {
        changed = false;
        nonTerminals.forEach(A => {
            nonTerminals.forEach(B => {
                rules[B].forEach(production => {
                    const symbols = production.split(' ');
                    let i = symbols.indexOf(A);
                    while (i !== -1) {
                        if (i === symbols.length - 1) {
                            // A is at the end, add FOLLOW(B) to FOLLOW(A)
                            FOLLOW[B].forEach(s => {
                                if (!FOLLOW[A].has(s)) {
                                    FOLLOW[A].add(s);
                                    changed = true;
                                }
                            });
                        } else {
                            // There are symbols after A
                            let allDeriveEpsilon = true;
                            for (let j = i + 1; j < symbols.length; j++) {
                                const X = symbols[j];
                                const firstX = Array.from(FIRST[X]).filter(s => s !== 'ε');
                                firstX.forEach(s => {
                                    if (!FOLLOW[A].has(s)) {
                                        FOLLOW[A].add(s);
                                        changed = true;
                                    }
                                });
                                if (!FIRST[X].has('ε')) {
                                    allDeriveEpsilon = false;
                                    break;
                                }
                            }
                            if (allDeriveEpsilon) {
                                // All symbols after A can derive ε, add FOLLOW(B) to FOLLOW(A)
                                FOLLOW[B].forEach(s => {
                                    if (!FOLLOW[A].has(s)) {
                                        FOLLOW[A].add(s);
                                        changed = true;
                                    }
                                });
                            }
                        }
                        i = symbols.indexOf(A, i + 1);
                    }
                });
            });
        });
    } while (changed);

    return FOLLOW;
}

document.addEventListener('DOMContentLoaded', () => {
    const grammarInput = document.getElementById('grammar-input');
    const calculateBtn = document.getElementById('calculate-first-follow');
    const output = document.getElementById('output');

    calculateBtn.addEventListener('click', () => {
        const grammar = grammarInput.value;
        const result = calculateFirstAndFollow(grammar);
        
        let outputText = "PRIMERO:\n";
        for (let [nt, first] of Object.entries(result.FIRST)) {
            outputText += `${nt}: {${Array.from(first).join(', ')}}\n`;
        }
        
        outputText += "\nSIGUIENTE:\n";
        for (let [nt, follow] of Object.entries(result.FOLLOW)) {
            outputText += `${nt}: {${Array.from(follow).join(', ')}}\n`;
        }
        
        output.textContent = outputText;
    });
});
