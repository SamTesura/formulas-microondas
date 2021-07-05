"use strict"

function calculoganancia(Pot) {//Calcular la ganancia en dBm

    // Formula potencia en dBm
    var gain1m = 10 * Math.log10(Pot * 10 ** 3);
    // Convertir a flotante
    parseFloat(gain1m)
    // Mostrar resultado
    console.log(gain1m + " " + "dBm")
    return gain1m
}

function calculopotencia(gain2m, Pot_1) {// Calcular la potencia en W

    //Calcular la potencia a partir de ganancia dBm
    var Pot_1 = Math.pow(10, (gain2m - 30) / 10);
    // Convertir a flotante
    parseFloat(Pot_1)
    // Mostrar resultado
    console.log(Pot_1 + " " + "W")
}

function calculoalturamax(h_1, h_2) {// Calcular la altura maxima

    // Calcular Dmax
    var dmax = (4.12 * (Math.sqrt(h_1) + Math.sqrt(h_2)));
    // Convertir a flotante
    parseFloat(dmax)
    // Mostrar resultado
    console.log(dmax + " " + "Km")
}

/**
 * Calcula la pérdida de potencia en el espacio libre
 * @param {*} dis Distancia en kilómetros
 * @param {*} freq Frecuencia en MHz
 * @param {*} gtx_db Ganancia del Tx en dB
 * @param {*} grx_db Ganacia del Gx en dB
 * @param {*} Potx Potencia del Tx en W
 */
function calculoesplibre(Potx, dis, freq, gtx_db, grx_db) {// Calcular perdida de espacio libre

    var gain1m = calculoganancia(Potx)
    // Ecuacion de Friis
    var Lo_db = (32.5 + 20 * Math.log10(dis) + 20 * Math.log10(freq));
    // Perdida de espacio libre
    var Potrx_dbm = (gain1m + gtx_db + grx_db - Lo_db);
    console.log(`Lo=${Lo_db}`);
    // Mostrar resultado
    console.log(Potrx_dbm + " " + "dBm")
    return Potrx_dbm
}