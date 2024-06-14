// ==UserScript==
// @name         LAB4
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       IMANJARUFE
// @description  Laboratorio cripto udp
// @match        https://cripto.tiiny.site
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
// ==/UserScript==

(function() {
    'use strict';

    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js'; // URL de donde debe cargar la libreria CryptoJS
    script.integrity = 'sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

// PASO 1: ENCONTRAR LA LLAVE.

    const parrafo = document.body.innerText; //Se obtiene todo el texto del sitio.
    const oraciones = parrafo.split(/[.]+/); //Se divide en oraciones el texto.
    let llave = ''; //Variable vacia en donde se almacenara la primera letra de cada oración, ya que esas corresponden a la clave.

    //Se Recorre cada oración y se obtenie solo el primer caracter.
    oraciones.forEach((sentence) => {
        const firstChar = sentence.trim().charAt(0);
        llave += firstChar;
    });

    console.log(`La llave es: ${llave}`);

// PASO 2: DETERMINAR LA CANTIDAD DE MENSAJES CIFRADOS.

    var Ids = document.querySelectorAll('[id]'); //Selecciona todos los elementos en el documento HTML que tienen un atributo id
    //Luego imprime en consola el mensaje que indica la cantidad de elementos de la colección ids.
    console.log(`Los mensajes cifrados son: ${Ids.length}`);

//PASO 3: OBTENER MENSAJES CIFRADOS Y DESCIFRARLOS.

    function decrypt(men_encriptado, llave) {
//Convierte una cadena de texto codificada en Base64 (men_encriptado) en un WordArray (estructura de datos utilizada por CryptoJS para manejar datos binarios. Necesario ya que CryptoJS trabaja con datos en formato WordArray.
        const ciphertext = CryptoJS.enc.Base64.parse(men_encriptado);
//Al igual que para el men_encriptado, convierte la cadena de texto (llave) en un WordArray utilizando la codificación UTF-8.
        const keyBytes = CryptoJS.enc.Utf8.parse(llave);
//Define el modo de operación y el esquema de padding para las operaciones con CryptoJS.
        const parametros = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
//Se realiza el descifrado de un mensaje cifrado utilizando el algoritmo 3DES y convierte el resultado descifrado en una cadena de texto UTF-8.
        const decrypted = CryptoJS.TripleDES.decrypt(
        { ciphertext: ciphertext },
            keyBytes,
            parametros
        );
        return decrypted.toString(CryptoJS.enc.Utf8); // Devuelve el mensaje descifrado.
    }
    
// Recorre cada elemento en el array Ids, descifra el mensaje y lo muestra en la consola
Ids.forEach((Id) => {
    const mensaje = decrypt(Id.id, llave);
    console.log(`${Id.id} ${mensaje}`);

// Crea un nuevo elemento div y agrega el mensaje descifrado al cuerpo del documento
    const div = document.createElement("div");
    div.textContent = mensaje;
    document.body.appendChild(div);
});


})();
