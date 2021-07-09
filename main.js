
// Codigo antiguo para cargar valores desde el HTML.
// const node_p_rx = document.getElementById('p_rx');
// const node_d = document.getElementById('d');
// const node_f = document.getElementById('f');
// const node_G_rx = document.getElementById('G_rx');
// const node_G_tx = document.getElementById('G_tx');
// const node_salida = document.getElementById('salida');

// function calcular() {
//     const p_rx = parseFloat(node_p_rx.value);
//     const d = parseFloat(node_d.value);
//     const f = parseFloat(node_f.value);
//     const G_rx = parseFloat(node_G_rx.value);
//     const G_tx = parseFloat(node_G_tx.value);

//     console.log({
//         p_rx, d, f, G_rx, G_tx
//     });

//     const sal = calculoesplibre(p_rx, d, f, G_tx, G_rx);
//     node_salida.textContent = `Potencia de receptor: ${sal} dBm`;
// }
// //////////////////////////////


function createInput(parent, label, type, defaultValue) {
    const labelNode = document.createElement('label');
    labelNode.textContent = label;

    const inputNode = document.createElement('input');
    inputNode.type = type;
    if (defaultValue) inputNode.value = defaultValue;
    parent.append(label, inputNode, document.createElement('br'));
    return inputNode;
}

function createButton(parent, label, callback) {
    const elem = document.createElement('button');
    elem.textContent = label;
    parent.append(elem);
    if (callback) elem.onclick = callback;
    return elem;
}

(function() {
    const container = document.createElement('div');
    document.body.append(container);

    const title = document.createElement('h1');
    title.textContent = 'Formula espacio libre';
    container.append(title);

    // Valores de entrada
    const inputNodes = {
        p_rx: createInput(container, 'Potencia de transmisor (W)', 'number', 1),
        d: createInput(container, 'Distancia entre antenas (km)', 'number', 1),
        f: createInput(container, 'Frecuencia (MHz)', 'number', 1),
        G_rx: createInput(container, 'Ganancia antena Receptora', 'number', 1),
        G_tx: createInput(container, 'Ganancia antena Transmisora', 'number', 1),
        h_1: createInput(container, 'Distancia antena Transmisora', 'number', 20),
        h_2: createInput(container, 'Distancia antena Receptora', 'number', 10),

    };
    
    const salida = document.createElement('p');
    function actualizarResultado() {
        let val = {};

        // Mapear cada nodo DOM de entrada (cada <input>)
        // a sus valores numericos.
        for (const key in inputNodes) 
            val[key] = parseFloat(inputNodes[key].value);

        // Calcular el resultado
        const sal = calculoesplibre(val.p_rx, val.d, val.f, val.G_tx, val.G_rx);
        const sal2 = calculodistanciamax(h_1, h_2); 

        // Expresar el resultado en el nodo de salida <p>
        salida.textContent = `Potencia de receptor: ${sal} dBm`;
        salida.textContent = `Distancia maxima entre antenas: ${sal2} dBm`;

    }
    actualizarResultado(); // Actualizar por primera vez

    const button = createButton(container, 'Calcular potencia de receptor (dBm)', actualizarResultado);
    const button = createButton1(container, 'Calcular la distancia máxima entre antenas', actualizarResultado);

    container.append(button, salida);


})()