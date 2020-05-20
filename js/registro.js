let myStorage = window.localStorage;
/* myStorage.setItem('datajson',JSON.stringify(registro)); */
let registrados = []; 
function RegistroUsuario(){
    let usuario = document.getElementById("usuario").value;
    let contrasenia = document.getElementById("contrasenia").value;
    let mail = document.getElementById("mail").value;
    console.log('Registro Completo');
    let registrado = {
        username: usuario,
        password: contrasenia,
        email: mail,
    }
    registrados.push(registrado);
    myStorage.setItem('datasson', JSON.stringify(registrados));
}


let Pagina = {
    alert("gola")
    _countRegistros: 0,
    _registrados: [],
}



