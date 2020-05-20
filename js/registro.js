let myStorage = window.localStorage;
let registro = {
    hola: "temana",
    chau: 'taluego'
}
myStorage.setItem('datajson',JSON.stringify(registro));
let registrados = myStorage.getItem('registrados')

if (registrados){
    registrados = JSON.parse(registrados)
    
}else{
    
}

function RegistroUsuario(){
    let usuario = document.getElementById('usuario').value;
    let contrasenia = document.getElementById("contrasenia").value;
    let mail = document.getElementById("mail").value;
    console.log('Registro Completo');
    let registrado = {
        usuarioR: usuario,
        contraseniaR: contrasenia,
        mailR: mail,
    }
    registrados.push(registrado)
    myStorage.setItem('datosPagina', JSON.stringify(this._registrados))
},


let Pagina = {
    alert("gola")
    _countRegistros: 0,
    _registrados: [],
    
    
    
}



