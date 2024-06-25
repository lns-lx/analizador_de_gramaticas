# Construcción de Tabla LL(1)

Este proyecto proporciona una interfaz web para la construcción de una tabla LL(1) a partir de los conjuntos FIRST, FOLLOW y la gramática ingresada por el usuario. La tabla LL(1) se genera y muestra dinámicamente en la página web.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `index.html`: Página principal del proyecto.
- `tablaLL.html`: Página de construcción de la tabla LL(1).
- `tablaLL.css`: Hoja de estilo CSS para la página de construcción de la tabla LL(1).
- `tablaLL.js`: Archivo JavaScript para manejar la lógica de construcción de la tabla LL(1).

## Uso

1. **Página Principal**:
   - La página principal (`index.html`) proporciona enlaces a diferentes funcionalidades del proyecto.

2. **Construcción de la Tabla LL(1)**:
   - En la página `tablaLL.html`, el usuario puede ingresar los conjuntos FIRST, FOLLOW y la gramática.
   - Al hacer clic en el botón "Construir Tabla LL(1)", se generará y mostrará la tabla LL(1) en la sección de salida.

### Ejemplo de Gramáticas

A continuación se presentan algunos ejemplos de gramáticas junto con sus respectivas reescrituras:

1. **Gramática con Recursividad por la Izquierda Eliminada**:

   **Original**:
   ```
   A -> A a | b
   ```

   **Eliminación de Recursividad**:
   ```
   A -> b A'
   A' -> a A' | ε
   ```

2. **Gramática para una Expresión**:

   **Original**:
   ```
   E -> E + T | T
   T -> T * F | F
   F -> ( E ) | id
   ```

   **Factorización y Eliminación de Recursividad**:
   ```
   E -> T E'
   E' -> + T E' | ε
   T -> F T'
   T' -> * F T' | ε
   F -> ( E ) | id
   ```

3. **Gramática Ambigua**:

   **Original**:
   ```
   S -> if E then S | if E then S else S | other
   ```

   **Eliminación de Ambigüedad**:
   ```
   S -> if E then S S'
   S' -> else S | ε
   S -> other
   ```

4. **Gramática con Producciones Múltiples**:

   **Original**:
   ```
   A -> aB | aC
   B -> b
   C -> c
   ```

   **Factorización**:
   ```
   A -> a A'
   A' -> B | C
   B -> b
   C -> c
   ```

### Ejemplo de Conjuntos FIRST y FOLLOW

Para una gramática simple:

**Conjuntos FIRST**:
```
S: {a, b}
A: {a, ε}
B: {b}
a: {a}
b: {b}
```

**Conjuntos FOLLOW**:
```
S: {$}
A: {b, $}
B: {$}
```

**Producciones**:
```
S -> A B
A -> a A
A -> ε
B -> b
```