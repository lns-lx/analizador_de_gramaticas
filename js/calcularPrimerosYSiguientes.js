export function calcularPrimeros(grammar) {
    let primeros = {};
    for (let nonTerminal in grammar) {
        primeros[nonTerminal] = new Set();
    }

    let agregarPrimeros = (symbol, primerosSymbol) => {
        for (let terminal of primerosSymbol) {
            primeros[symbol].add(terminal);
        }
    };

    let cambiar = true;
    while (cambiar) {
        cambiar = false;
        for (let nonTerminal in grammar) {
            for (let production of grammar[nonTerminal]) {
                for (let symbol of production) {
                    if (grammar[symbol]) { // No terminal
                        let sizeAntes = primeros[nonTerminal].size;
                        agregarPrimeros(nonTerminal, primeros[symbol]);
                        if (primeros[nonTerminal].size > sizeAntes) {
                            cambiar = true;
                        }
                        if (!primeros[symbol].has('ε')) {
                            break;
                        }
                    } else { // Terminal
                        let sizeAntes = primeros[nonTerminal].size;
                        primeros[nonTerminal].add(symbol);
                        if (primeros[nonTerminal].size > sizeAntes) {
                            cambiar = true;
                        }
                        break;
                    }
                }
            }
        }
    }
    return primeros;
}

export function calcularSiguientes(grammar, primeros) {
    let siguientes = {};
    for (let nonTerminal in grammar) {
        siguientes[nonTerminal] = new Set();
    }
    siguientes[Object.keys(grammar)[0]].add('$'); // El símbolo inicial

    let agregarSiguientes = (symbol, siguientesSymbol) => {
        for (let terminal of siguientesSymbol) {
            siguientes[symbol].add(terminal);
        }
    };

    let cambiar = true;
    while (cambiar) {
        cambiar = false;
        for (let nonTerminal in grammar) {
            for (let production of grammar[nonTerminal]) {
                for (let i = 0; i < production.length; i++) {
                    let symbol = production[i];
                    if (grammar[symbol]) { // No terminal
                        let siguiente = new Set();
                        for (let j = i + 1; j < production.length; j++) {
                            let siguienteSymbol = production[j];
                            if (grammar[siguienteSymbol]) { // No terminal
                                agregarSiguientes(siguiente, primeros[siguienteSymbol]);
                                if (!primeros[siguienteSymbol].has('ε')) {
                                    break;
                                }
                            } else { // Terminal
                                siguiente.add(siguienteSymbol);
                                break;
                            }
                        }
                        if (i + 1 === production.length || siguiente.has('ε')) {
                            agregarSiguientes(siguiente, siguientes[nonTerminal]);
                        }
                        let sizeAntes = siguientes[symbol].size;
                        agregarSiguientes(symbol, siguiente);
                        if (siguientes[symbol].size > sizeAntes) {
                            cambiar = true;
                        }
                    }
                }
            }
        }
    }
    return siguientes;
}
