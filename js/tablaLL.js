function parseInput(input) {
    const lines = input.trim().split('\n');
    const result = {};
    let currentSymbol = '';
    lines.forEach(line => {
        if (line.includes(':')) {
            [currentSymbol, setStr] = line.split(':');
            currentSymbol = currentSymbol.trim();
            result[currentSymbol] = new Set(setStr.replace(/[{} ]/g, '').split(','));
        }
    });
    return result;
}

function parseGrammar(grammar) {
    const rules = {};
    grammar.split('\n').forEach(line => {
        const [left, right] = line.split('->').map(s => s.trim());
        if (!rules[left]) {
            rules[left] = [];
        }
        rules[left] = rules[left].concat(right.split('|').map(p => p.trim()));
    });
    return rules;
}

function constructLL1Table(FIRST, FOLLOW, grammar) {
    const table = {};
    const nonTerminals = Object.keys(grammar);
    const terminals = new Set(['$']);
    
    // Recolectar todos los terminales
    Object.values(FIRST).forEach(set => set.forEach(terminal => {
        if (terminal !== 'ε') terminals.add(terminal);
    }));

    // Inicializar tabla
    nonTerminals.forEach(nt => {
        table[nt] = {};
        terminals.forEach(t => {
            table[nt][t] = '';
        });
    });

    // Llenar la tabla
    Object.entries(grammar).forEach(([nt, productions]) => {
        productions.forEach(production => {
            const productionFirst = calculateProductionFirst(production, FIRST);
            
            productionFirst.forEach(symbol => {
                if (symbol !== 'ε') {
                    table[nt][symbol] = production;
                }
            });

            if (productionFirst.has('ε')) {
                FOLLOW[nt].forEach(symbol => {
                    if (symbol === '$' || !table[nt][symbol]) {
                        table[nt][symbol] = production;
                    }
                });
            }
        });
    });

    // Ordenar los terminales, pero asegurarse de que '$' esté al final
    const sortedTerminals = Array.from(terminals)
        .filter(t => t !== '$')
        .sort();
    sortedTerminals.push('$');

    return { table, terminals: sortedTerminals, nonTerminals };
}

function calculateProductionFirst(production, FIRST) {
    const result = new Set();
    const symbols = production.split(' ');
    
    for (let symbol of symbols) {
        if (symbol === 'ε') {
            result.add('ε');
            break;
        }
        
        const symbolFirst = FIRST[symbol] || new Set([symbol]);
        symbolFirst.forEach(s => {
            if (s !== 'ε') result.add(s);
        });
        
        if (!symbolFirst.has('ε')) break;
        
        if (symbol === symbols[symbols.length - 1]) {
            result.add('ε');
        }
    }
    
    return result;
}

function generateTableHTML(tableData) {
    const { table, terminals, nonTerminals } = tableData;
    let html = '<table><tr><th></th>';
    
    // Los terminales ya están ordenados, así que solo los iteramos
    terminals.forEach(t => {
        html += `<th>${t}</th>`;
    });
    html += '</tr>';

    nonTerminals.forEach(nt => {
        html += `<tr><th>${nt}</th>`;
        terminals.forEach(t => {
            html += `<td>${table[nt][t] || ''}</td>`;
        });
        html += '</tr>';
    });

    html += '</table>';
    return html;
}

document.addEventListener('DOMContentLoaded', () => {
    const firstInput = document.getElementById('first-input');
    const followInput = document.getElementById('follow-input');
    const grammarInput = document.getElementById('grammar-input');
    const constructButton = document.getElementById('construct-table');
    const tableOutput = document.getElementById('table-output');

    constructButton.addEventListener('click', () => {
        const FIRST = parseInput(firstInput.value);
        const FOLLOW = parseInput(followInput.value);
        const grammar = parseGrammar(grammarInput.value);
        
        const tableData = constructLL1Table(FIRST, FOLLOW, grammar);
        const tableHTML = generateTableHTML(tableData);
        
        tableOutput.innerHTML = tableHTML;
    });
});