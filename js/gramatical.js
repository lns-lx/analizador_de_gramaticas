import { eliminarRecursionIzquierda } from './eliminarRecursionIzquierda.js';
import { factorizarGramatica } from './factorizarGramatica.js';
import { printGrammar } from './printGrammar.js';
import { inputGrammar } from './inputGrammar.js';

/**
 * Procesa la gramática ingresada por el usuario.
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnAnalyzeGrammar = document.getElementById('btnAnalyzeGrammar');
    const errorGrammar = document.getElementById('errorGrammar');
    const originalGrammar = document.getElementById('originalGrammar');
    const noRecursionGrammar = document.getElementById('noRecursionGrammar');
    const factoredGrammar = document.getElementById('factoredGrammar');

    btnAnalyzeGrammar.addEventListener('click', () => {
        try {
            let grammarInput = document.getElementById('grammarInput').value;
            let grammar = inputGrammar(grammarInput);

            originalGrammar.textContent = printGrammar(grammar);

            grammar = eliminarRecursionIzquierda(grammar);
            noRecursionGrammar.textContent = printGrammar(grammar);

            grammar = factorizarGramatica(grammar);
            factoredGrammar.textContent = printGrammar(grammar);

            errorGrammar.textContent = '';  // Limpiar cualquier error previo
        } catch (error) {
            errorGrammar.textContent = error.message;
        }
    });
});
