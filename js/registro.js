let myStorage = window.localStorage;
let registrados = myStorage.getItem('registrados')
if (registrados){
    registrados = JSON.parse(registrados)
}

let Pagina = {

    _registrados: [],
    
    RegistroUsuario(){
        let usuario = document.getElementById('usuario').value;
        let contrasenia = document.getElementById("contrasenia").value;
        let mail = document.getElementById("mail").value;
        console.log('Registro Completo');
        let registrado = {
            usuarioR: usuario,
            contraseniaR: contrasenia,
            mailR: mail,
        }
        this._registrados.push(registrado)
        myStorage.setItem('datosPagina', JSON.stringify(this._registrados))
    },
    
}



