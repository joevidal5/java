/* myStorage.setItem('datajson',JSON.stringify(registro)); */
let registrados = []; 
function RegistroUsuario(){
    var esta = false;
    let usuario = document.getElementById("user").value;
    let contrasenia = document.getElementById("password").value;
    let mail = document.getElementById("mail").value;
    registrados = myStorage.getItem('datajson');
    if (registrados){
        registrados = JSON.parse(registrados);
    }
    let registrado = {
        username: usuario,
        password: contrasenia,
        email: mail,
        
    }

    for (var i = 0; i<registrados.length; i++){
        console.log(i);
        console.log('gola');
        if (usuario == registrados[i]['username'] || mail == registrados[i]['email']) {
            alert('Este usuario se encuentra registrado');
            esta = true;
        }
    }

    if (!esta){
        registrados.push(registrado);
        myStorage.setItem('datajson', JSON.stringify(registrados));
        console.log('update')
        console.log(registrados)
    }
    
    
}





