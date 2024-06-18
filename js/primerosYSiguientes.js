import { inputGrammar } from './inputGrammar.js';
import { printGrammar } from './printGrammar.js';
import { calcularPrimeros, calcularSiguientes } from './calcularPrimerosYSiguientes.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnCalcular = document.getElementById('btnCalcular');
    const errorDiv = document.getElementById('errorPrimerosYSiguientes');
    const grammarInput = document.getElementById('grammarInput');
    const primerosDiv = document.getElementById('primeros');
    const siguientesDiv = document.getElementById('siguientes');

    btnCalcular.addEventListener('click', () => {
        try {
            let grammarText = grammarInput.value;
            let grammar = inputGrammar(grammarText);

            let primeros = calcularPrimeros(grammar);
            let siguientes = calcularSiguientes(grammar, primeros);

            primerosDiv.innerHTML = '';
            siguientesDiv.innerHTML = '';

            for (let nonTerminal in primeros) {
                let primerosList = Array.from(primeros[nonTerminal]).join(', ');
                primerosDiv.innerHTML += `<p><strong>Primeros(${nonTerminal}):</strong> { ${primerosList} }</p>`;
            }

            for (let nonTerminal in siguientes) {
                let siguientesList = Array.from(siguientes[nonTerminal]).join(', ');
                siguientesDiv.innerHTML += `<p><strong>Siguientes(${nonTerminal}):</strong> { ${siguientesList} }</p>`;
            }

            errorDiv.textContent = '';
        } catch (error) {
            errorDiv.textContent = error.message;
        }
    });
});
