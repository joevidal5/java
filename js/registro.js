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

function loginUsuario (){
    let usuario = document.getElementById("usuario").value;
    let pass = document.getElementById("pass").value;
    registrados = myStorage.getItem('datajson');
    if (registrados){
        registrados = JSON.parse(registrados);
    }
    let registrado = {
        username: usuario,
        password: pass,
        email: usuario,
        
    }
    for (var i = 0; i<registrados.length; i++){
        console.log(i);
        console.log('gola');
        if ((usuario == registrados[i]['username'] || usuario == registrados[i]['email']) && pass == registrados[i]["password"]) {
            alert('Este usuario se encuentra registrado');
            window.location.reload(true);
            let current_user = myStorage.getItem('usercurrent');
            current_user = JSON.parse(current_user)
            current_user['current'] = 'true';
            current_user['user']= usuario;
            myStorage.setItem('usercurrent',JSON.stringify(current_user));
        }
    }
    
    
    
}


function mostrar(ocultarPag){
    document.getElementById(ocultarPag).style.display="block";
}

function ocultar(ocultarPag){
    document.getElementById(ocultarPag).style.display="none";
}




