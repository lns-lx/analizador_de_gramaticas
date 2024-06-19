import { inputGrammar } from './inputGrammar.js';
import { printGrammar } from './printGrammar.js';
import { calcularPrimeros } from './calcularPrimeros.js';
import { calcularSiguientes } from './calcularSiguientes.js';

/**
 * Procesa la gramática ingresada por el usuario y calcula los conjuntos de primeros y siguientes.
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnCalculateSets = document.getElementById('btnCalculateSets');
    const errorSets = document.getElementById('errorSets');
    const originalGrammar = document.getElementById('originalGrammar');
    const firstSets = document.getElementById('firstSets');
    const followSets = document.getElementById('followSets');

    btnCalculateSets.addEventListener('click', () => {
        try {
            let grammarInput = document.getElementById('grammarInput').value;
            let grammar = inputGrammar(grammarInput);

            originalGrammar.textContent = printGrammar(grammar);

            let primeros = calcularPrimeros(grammar);
            let siguientes = calcularSiguientes(grammar);

            firstSets.textContent = JSON.stringify(primeros, null, 2);
            followSets.textContent = JSON.stringify(siguientes, null, 2);

            errorSets.textContent = '';  // Limpiar cualquier error previo
        } catch (error) {
            errorSets.textContent = error.message;
        }
    });
});
