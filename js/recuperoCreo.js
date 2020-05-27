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

let current_user = myStorage.getItem('usercurrent');
if(!current_user){
    let current_user = {
        current: 'false',
        user: '',
    }
    myStorage.setItem('usercurrent',JSON.stringify(current_user));
    ocultar(document.getElementById('sesionName'));
}else{
    current_user = JSON.parse(current_user)
    console.log('hawai')
    console.log(current_user['current'])
    if (current_user['current'] == 'true'){
        mostrar(document.getElementById('sesionName'));
        document.getElementById('nameSesion').innerHTML = current_user['user'];
    }
    
    
    
    mostrar(sesionName)
}



