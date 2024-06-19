/**
 * Convierte la entrada del usuario en una estructura de gramática.
 * @param {String} grammarInput - La entrada del usuario.
 * @returns {Object} - La gramática en formato de objeto.
 */
export function inputGrammar(grammarInput) {
    let grammar = {};
    let productions = grammarInput.split(';');
    productions.forEach(production => {
        let [non_terminal, rules] = production.split('->');
        if (!non_terminal || !rules) {
            throw new Error('Formato inválido en la entrada de la gramática.');
        }
        non_terminal = non_terminal.trim();
        rules = rules.split('|');
        grammar[non_terminal] = rules.map(rule => rule.trim().split(''));
    });
    return grammar;
}
