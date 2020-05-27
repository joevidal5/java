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

    
    _usuarios:[], //  Usuario(id,usuario,clave)
                  //  Ejemplo  {id:0,usuario:'admin',clave:'root'}
    _categorias:[], // Categoria (id, nombre , idPadre , detalle, porcgancia) 
                    // Ejemplo Categoria {id:0,nombre:'General',idPadre:0,detalle:'Todas las Categorias',porcganancia:35.5}
    _productos:[], // Producto(id,codigo,foto,nombre,idCategoria,precioc,preciov,conteo:[KILO | UNIDAD])
    _facturas:[],
    _detFacturas:[],
    _currentUser:[],

    
    // Metodos de nuestro Punto de Venta
    // Recordar solo agregar los metodos de la Api.
    RegistroUsuario(){
        var esta = false;
        let usuario = document.getElementById("user").value;
        let contrasenia = document.getElementById("password").value;
        let mail = document.getElementById("mail").value;
        let registrado = {
            username: usuario,
            password: contrasenia,
            email: mail,
            
        }
    
        for (var i = 0; i<this._usuarios.length; i++){
            console.log(i);
            console.log('gola');
            if (usuario == this._usuarios[i]['username'] || mail == this._usuarios[i]['email']) {
                alert('Este usuario se encuentra registrado');
                esta = true;
                window.location.reload(true);
                ocultar(document.getElementById('sesion')); 
                ocultar(document.getElementById('login')); 
                mostrar(document.getElementById('sesionName'));
            }
        }
    
        if (!esta){
            this._usuarios.push(registrado);
            this.saveData();
            console.log('update')
            console.log(this._usuarios)
        }
        
        
    },

    loginUsuario (){
        let esta = false;
        let usuario = document.getElementById("usuario").value;
        let pass = document.getElementById("pass").value;
        let registrado = {
            username: usuario,
            password: pass,
            email: usuario,
            
        }
        for (var i = 0; i<this._usuarios.length; i++){
            console.log(i);
            console.log('gola');
            if ((usuario == this._usuarios[i]['username'] || this._usuarios == registrados[i]['email']) && pass == this._usuarios[i]["password"]) {
                alert('Este usuario se encuentra registrado');
                esta = true;
                window.location.reload(true);
                
                this._currentUser={
                    curret: 'True',
                    username: usuario,
                }
                this.saveData();
            }

        }
        if(!esta){
            alert('El usuario ingresado no se encuentra registrado')
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
    updateUsuario(usuario){

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
        }
        myStorage.setItem('datajson',JSON.stringify(data));
        console.log('OK');
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
    }else{
        this._currentUser={
            curret: 'none',
            username: 'none',
        }
        this.saveData();
    }
    
        
    }

}




PVenta.init();// metodo obligatorio primero que todos para cargar datos desde el localStorage
PVenta.getUsuarios();

