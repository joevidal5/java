let myStorage = window.localStorage;

function mostrar(ocultarPag){
    document.getElementById(ocultarPag).style.display="block";
}

function ocultar(ocultarPag){
    document.getElementById(ocultarPag).style.display="none";
}


let PVenta = { 
    /*  creamos un espacio de nombre PVenta
        vamos a crear un CRUD (Create, Read, Update, Delete)
        Vamos almacenar nuestras objetos en Arrays y respaldarlos con localStorage
        recordar que el id de cada Objeto debe ser unico en su Lista
    */

    
    _usuarios:[{
        iduser: 0,
        username: 'admin',
        password: 'admin',
        email: 'admin@itecriocuarto.org.ar',
    }
    ], //  Usuario(id,usuario,clave)
                  //  Ejemplo  {id:0,usuario:'admin',clave:'root'}
    _categorias:[], // Categoria (id, nombre , idPadre , detalle, porcgancia) 
                    // Ejemplo Categoria {id:0,nombre:'General',idPadre:0,detalle:'Todas las Categorias',porcganancia:35.5}
    _productos:[], // Producto(id,codigo,foto,nombre,idCategoria,precioc,preciov,conteo:[KILO | UNIDAD])
    _facturas:[],
    _detFacturas:[],
    _currentUser:[],

    _cantidad : 0,
    
    // Metodos de nuestro Punto de Venta
    // Recordar solo agregar los metodos de la Api.
    RegistroUsuario(){
        var esta = false;
        let usuario = document.getElementById("user").value;
        let contrasenia = document.getElementById("password").value;
        let mail = document.getElementById("mail").value;
        let registrado = {
            iduser: this._cantidad + 1,
            username: usuario,
            password: contrasenia,
            email: mail,
            
        }
        this._cantidad = this._cantidad + 1;
        
    
        for (var i = 0; i<this._usuarios.length; i++){
            console.log(i);
            console.log('gola');
            if (usuario == this._usuarios[i]['username'] || mail == this._usuarios[i]['email']) {
                alert('Este usuario se encuentra registrado');
                esta = true;
            }
        }
    
        if (!esta){
            this._usuarios.push(registrado);
            this._currentUser={
                current: 'True',
                username: usuario,
            }
            this.saveData();
            console.log('update')
            console.log(this._usuarios)
            alert('registrado')
            ocultar('registro');
            mostrar('home');
            document.getElementById('nameSesion').innerHTML = this._currentUser['username'];
            mostrar('sesionName');
        }
        
        
    },

    loginUsuario (){
        let usuario = document.getElementById("usuario").value;
        let pass = document.getElementById("pass").value;
        for (var i = 0; i<this._usuarios.length; i++){
            console.log(i);
            console.log('gola');
            if ((usuario == this._usuarios[i]['username'] || this._usuarios == this._usuarios[i]['email']) && pass == this._usuarios[i]["password"]) {
                alert('Este usuario se encuentra registrado');
                esta = true;
                ocultar('sesion'); 
                ocultar('login'); 
                mostrar('home');
                mostrar('sesionName');
                this._currentUser={
                    current: 'True',
                    username: usuario,
                }
                document.getElementById('nameSesion').innerHTML = this._currentUser['username'];
                this.saveData();
            }

        }
        
        
    },

    getUsuario:function(idUsuario){
       let usuario=null;
       PVenta._usuarios.map((u)=> {if (u.id == idUsuario) return usuario=u});
       return usuario;
    },

    getUsuarios(){
        return PVenta._usuarios;
    },

    deleteUsuario(idUsuario){
       
    },

    deleteCurrentUser(){
        
        for (let i = 0; i<this._cantidad; i++){
            if (this._currentUser['username'] == this._usuarios[i]['username']){
                console.log('lo encontre');
                console.log("aca esta i:"+i);
                if(i == 0){
                    PVenta._usuarios.splice(0);
                }else{
                    PVenta._usuarios.splice(i, i);
                }
                console.log(PVenta._usuarios);
                this._currentUser['current'] = 'none';
                this._currentUser['username'] = 'none';
                this._cantidad = this._cantidad - 1 
                this.saveData();
                window.location.reload(true); 
            }
        }
            
    },
    
    cargoParaEditar(){
        console.log("entre update")
        let usuario = this._currentUser['username'] 
        for(var i = 0; i<this._cantidad; i++){
            if(usuario == this._usuarios[i]['username']){
                console.log('encontre coincidencia')
                document.getElementById('userEdit').value = usuario;
                document.getElementById('passwordEdit').value = this._usuarios[i]['password'];
                document.getElementById('mailEdit').value = this._usuarios[i]['email'];
            }
        }
    },

    updateUsuario(){
        let usuario = this._currentUser['username'] 
        for(var i = 0; i<this._cantidad; i++){
            if(usuario == this._usuarios[i]['username']){
                let usuario = document.getElementById("userEdit").value;
                let contrasenia = document.getElementById("passwordEdit").value;
                let mail = document.getElementById("mailEdit").value;
                this._usuarios[i]['username'] = usuario;
                this._usuarios[i]['email'] = mail;
                this._usuarios[i]['password'] = contrasenia;
                this._currentUser['username'] = usuario;
                this.saveData();
                window.location.reload(true);
            }
        }
    },

    addUsuario(usuario){
       PVenta._usuarios.push(usuario);
       this.saveData();

    },

    saveData(){
        let data={
            usuarios:this._usuarios,
            categorias: this._categorias,
            productos: this._productos,
            facturas: this._facturas,
            detFacturas: this._detFacturas,
            currentUser: this._currentUser,
            cantidadUsers: this._cantidad,
        }
        myStorage.setItem('datajson',JSON.stringify(data));
        console.log('OK');
    },

    cerrarSesion(){
        this._currentUser['current'] = 'none';
        this._currentUser['username'] = 'none';
        this.saveData();
        window.location.reload(true);
    },

    init:function(){
        //cargamos todos nuestros array del localStorage
    let data = myStorage.getItem('datajson');
    if (data){
        data = JSON.parse(data);
        this._usuarios = data.usuarios;
        this._categorias = data.categorias;
        this._productos = data.productos;
        this._facturas = data.facturas;
        this._detFacturas = data.detFacturas;
        this._currentUser = data.currentUser;
        this._cantidad = data.cantidadUsers;
        console.log(this._cantidad)
        if (this._currentUser['current'] == 'True'){
            document.getElementById('nameSesion').innerHTML = this._currentUser['username'];
            ocultar('sesion');
            mostrar('sesionName');
        }  
    }else{
        this._currentUser={
            current: 'none',
            username: 'none',
        }s
        this.saveData();
    }
    
        
    }

}

PVenta.init();// metodo obligatorio primero que todos para cargar datos desde el localStorage
PVenta.getUsuarios();