document.addEventListener('DOMContentLoaded', () => {
    const codeTextArea = document.getElementById('codeTextArea');
    const btnAnalyzeLexical = document.getElementById('btnAnalyzeLexical');
    const btnClear = document.getElementById('btnClear');
    const tokensTable = document.getElementById('tokensTable').querySelector('tbody');
    const errorDiv = document.getElementById('errorLexical');

    // Evento para analizar el código léxico
    btnAnalyzeLexical.addEventListener('click', () => {
        const code = codeTextArea.value.trim();
        if (code) {
            try {
                const tokens = analyzeCode(code);
                displayTokens(tokens);
                errorDiv.textContent = ''; // Limpiar cualquier error previo
            } catch (error) {
                errorDiv.textContent = error.message;
            }
        } else {
            errorDiv.textContent = 'Por favor, ingrese algún código para analizar.';
        }
    });

    // Evento para limpiar el área de texto y la tabla de tokens
    btnClear.addEventListener('click', () => {
        codeTextArea.value = '';
        tokensTable.innerHTML = '';
        errorDiv.textContent = '';
    });

    // Función para analizar el código y generar tokens
    function analyzeCode(code) {
        const tokens = [];
        const lines = code.split('\n');
        let lineNumber = 0;

        lines.forEach(line => {
            lineNumber++;
            const words = line.split(/\s+/);
            words.forEach(word => {
                if (word.match(/^[a-zA-Z_]\w*$/)) {
                    tokens.push({ line: lineNumber, token: 'IDENTIFICADOR', attribute: word });
                } else if (word.match(/^\d+$/)) {
                    tokens.push({ line: lineNumber, token: 'ENTERO', attribute: word });
                } else if (word.match(/^\d+\.\d+$/)) {
                    tokens.push({ line: lineNumber, token: 'FLOAT', attribute: word });
                } else if (word.match(/^".*"$/)) {
                    tokens.push({ line: lineNumber, token: 'CADENA', attribute: word });
                } else if (['+', '-', '*', '/'].includes(word)) {
                    tokens.push({ line: lineNumber, token: 'OPERADOR', attribute: word });
                } else if (['for', 'if', 'else'].includes(word)) {
                    tokens.push({ line: lineNumber, token: 'PALABRA_RESERVADA', attribute: word });
                } else if (word === '=') {
                    tokens.push({ line: lineNumber, token: 'OPERADOR_ASIGNACION', attribute: word });
                } else if (word === ';') {
                    tokens.push({ line: lineNumber, token: 'PUNTO_Y_COMA', attribute: word });
                } else if (word === '(') {
                    tokens.push({ line: lineNumber, token: 'PARENTESIS_IZQ', attribute: word });
                } else if (word === ')') {
                    tokens.push({ line: lineNumber, token: 'PARENTESIS_DER', attribute: word });
                } else {
                    tokens.push({ line: lineNumber, token: 'INVALIDO', attribute: word });
                }
            });
        });

        return tokens;
    }

    // Función para mostrar los tokens en la tabla
    function displayTokens(tokens) {
        tokensTable.innerHTML = '';
        tokens.forEach(token => {
            const row = tokensTable.insertRow();
            row.insertCell(0).textContent = token.line;
            row.insertCell(1).textContent = token.token;
            row.insertCell(2).textContent = token.attribute;
        });
    }
});
