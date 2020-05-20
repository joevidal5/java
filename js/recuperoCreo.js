function mostrar(ocultarPag){
    document.getElementById(ocultarPag).style.display="block";
}

function ocultar(ocultarPag){
    document.getElementById(ocultarPag).style.display="none";
}

let myStorage = window.localStorage;
let registros = myStorage.getItem('datajson');
if(!registros){
    let registro = [];
    myStorage.setItem('datajson',JSON.stringify(registro));
}




