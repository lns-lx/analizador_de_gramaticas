function solveRecursion(grammar) {
    let rules = grammar.split('\n').map(rule => rule.trim()).filter(rule => rule.length > 0);
    let newRules = {};
    
    rules.forEach(rule => {
        let [left, right] = rule.split('->').map(side => side.trim());
        let productions = right.split('|').map(prod => prod.trim());
        
        let recursive = productions.filter(prod => prod.startsWith(left));
        let nonRecursive = productions.filter(prod => !prod.startsWith(left));
        
        if (recursive.length > 0) {
            let newNonTerminal = left + "'";
            newRules[left] = nonRecursive.map(prod => prod + ' ' + newNonTerminal).join(' | ');
            newRules[left] += nonRecursive.length === 0 ? newNonTerminal : '';
            
            newRules[newNonTerminal] = recursive.map(prod => prod.slice(left.length) + ' ' + newNonTerminal).join(' | ');
            newRules[newNonTerminal] += ' | ε';
        } else {
            newRules[left] = right;
        }
    });
    
    let newGrammar = Object.entries(newRules).map(([left, right]) => `${left} -> ${right}`).join('\n');
    
    return newGrammar;
}

document.addEventListener('DOMContentLoaded', () => {
    const grammarInput = document.getElementById('grammar-input');
    const solveRecursionBtn = document.getElementById('solve-recursion');
    const output = document.getElementById('output');

    solveRecursionBtn.addEventListener('click', () => {
        const grammar = grammarInput.value;
        const result = solveRecursion(grammar);
        output.textContent = result;
    });
});