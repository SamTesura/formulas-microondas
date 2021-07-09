"use strict"

/**
 * Calcular la ganancia en dBm
 * @param {*} Pot Potencia en W
 * @returns 
 */
function calculoganancia(Pot) {

    // Formula potencia en dBm
    var gain1m = 10 * Math.log10(Pot * 10 ** 3);
    // Convertir a flotante
    parseFloat(gain1m)
    // Mostrar resultado
    console.log(gain1m + " " + "dBm")
    return gain1m
}
/**
 * Calcular la potencia en W
 * @param {*} gain2m Ganancia en dBm
 */
function calculopotencia(gain2m) {

    //Calcular la potencia a partir de ganancia dBm
    var Pot_1 = Math.pow(10, (gain2m - 30) / 10);
    // Convertir a flotante
    parseFloat(Pot_1)
    // Mostrar resultado
    console.log(Pot_1 + " " + "W")
}
/**
 * Calcular la distancia maxima
 * @param {*} h_1 Altura 1
 * @param {*} h_2 Altura 2
 */
function calculodismax(h_1, h_2) {

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
function calculoesplibre(Potx, dis, freq, gtx_db, grx_db) {
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