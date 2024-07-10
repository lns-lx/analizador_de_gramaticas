//import { addCopyButton } from './js/copyButton.js';

function solveAmbiguity(grammar) {
    let rules = grammar.split('\n').map(rule => rule.trim()).filter(rule => rule.length > 0);
    let newRules = {};
    
    rules.forEach(rule => {
        let [left, right] = rule.split('->').map(side => side.trim());
        let productions = right.split('|').map(prod => prod.trim());
        
        let commonPrefix = findCommonPrefix(productions);
        
        if (commonPrefix) {
            let newNonTerminal = left + "'";
            let commonLength = commonPrefix.length;
            
            newRules[left] = commonPrefix + ' ' + newNonTerminal;
            newRules[newNonTerminal] = productions
                .map(prod => prod.slice(commonLength).trim())
                .filter(prod => prod.length > 0)
                .join(' | ');
            newRules[newNonTerminal] += productions.some(prod => prod.length === commonLength) ? ' | ε' : '';
        } else {
            newRules[left] = right;
        }
    });
    
    let newGrammar = Object.entries(newRules).map(([left, right]) => `${left} -> ${right}`).join('\n');
    
    return newGrammar;
}

function findCommonPrefix(productions) {
    if (productions.length < 2) return null;
    let prefix = '';
    let i = 0;
    while (productions.every(prod => prod[i] === productions[0][i])) {
        prefix += productions[0][i];
        i++;
    }
    return prefix.length > 0 ? prefix : null;
}


document.addEventListener('DOMContentLoaded', () => {
    const grammarInput = document.getElementById('grammar-input');
    const solveAmbiguityBtn = document.getElementById('solve-ambiguity');
    const output = document.getElementById('output');

    solveAmbiguityBtn.addEventListener('click', () => {
        const grammar = grammarInput.value;
        const result = solveAmbiguity(grammar);
        output.textContent = result;

        addCopyButton(result, output);
    });
});


/*
document.addEventListener('DOMContentLoaded', () => {
    const grammarInput = document.getElementById('grammar-input');
    const solveAmbiguityBtn = document.getElementById('solve-ambiguity');
    const output = document.getElementById('output');

    solveAmbiguityBtn.addEventListener('click', () => {
        const grammar = grammarInput.value;
        const result = solveAmbiguity(grammar);
        output.textContent = result;
        
        // Crear el botón de copiar
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar';
        copyButton.classList.add('copy-button');
        output.parentNode.appendChild(copyButton); // Añadir el botón como hijo del contenedor de output
        
        // Mostrar el botón de copiar
        copyButton.style.display = 'block';
        
        // Agregar funcionalidad de copiar al botón
        copyButton.addEventListener('click', () => {
            const textarea = document.createElement('textarea');
            textarea.value = result;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            // Cambiar el texto del botón a "Copiado"
            copyButton.textContent = 'Copiado';

            // Opcional: Después de cierto tiempo, volver a "Copiar" si se desea
            setTimeout(() => {
                copyButton.textContent = 'Copiar';
            }, 1500); // Cambiar de vuelta a "Copiar" después de 1.5 segundos (1500 milisegundos)
        });
    });
});
*/
