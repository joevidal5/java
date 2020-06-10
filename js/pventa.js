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
    _categorias:[{idCategori : 1, nameCategori: 'liquidos'}, {idCategori : 2, nameCategori: 'repuestos'}, {idCategori : 3, nameCategori: 'equipos'}], // Categoria (id, nombre , idPadre , detalle, porcgancia) 
                    // Ejemplo Categoria {id:0,nombre:'General',idPadre:0,detalle:'Todas las Categorias',porcganancia:35.5}
    _productos:[], // Producto(id,codigo,foto,nombre,idCategoria,precioc,preciov,conteo:[KILO | UNIDAD])
    _facturas:[],
    _detFacturas:[],
    _currentUser:[],

    _cantidad : 1,
    _cantidadProductos: 0,
    
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

    base64(){
        let imgP = document.getElementById("file").files;
        var fileToLoad = imgP[0];
        let fileReader = new FileReader();
        fileReader.addEventListener('load', function(e) {
            fileToLoad = e.target.result; // <--- data: base64
            console.log ('Convierto en base64 ' + fileToLoad);

            imgP = fileToLoad;

            myStorage.setItem('images',JSON.stringify(imgP));

            
        });
        fileReader.readAsDataURL(fileToLoad);

    },

    cargarProducto(){
        let dataImg = myStorage.getItem('images')
        dataImg = dataImg.split('"');
        var imgP = dataImg[1];
        this._cantidadProductos = this._cantidadProductos + 1 ;
        let idp = this._cantidadProductos;
        let categoriap = document.getElementById('selecCategori').value;
        console.log(categoriap)
        let nombreP = document.getElementById('nombreProducto').value;
        let precioP = document.getElementById('precioProducto').value;
        let descripP = document.getElementById('descripcionProducto').value;
        let cantidaP = document.getElementById('cantidadProducto').value;
        
            /*let img = {
                idP: idp,
                image: imgP,
            }
            myStorage.setItem('images',JSON.stringify(img));
            let dataImg = myStorage.getItem('images');
            this._imagenes.push(img);
            this.saveData();*/


        let producto = {
            idP: idp,
            img: imgP,
            nombre: nombreP,
            precio: precioP,
            decripcion: descripP,
            stock: cantidaP,
            categoria: categoriap,
        }
        
        this._productos.push(producto);
        this.saveData();

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
            window.location.reload(true);
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
        console.log("asdasda")
        for (let i = 0; i<this._cantidad; i++){
            console.log("pruba : "+i)
            if (this._currentUser['username'] == this._usuarios[i]['username']){
                if(this._currentUser['username'] == "admin"){
                    alert("NO SE PUEDE BORRAR EL ADMIN SOS PELOTUDO O ESTAS PRACTICANDO");
                }else{
                    console.log('lo encontre');
                    console.log("aca esta i:"+i);
                    PVenta._usuarios.splice(i, i);
                    console.log(PVenta._usuarios);
                    this._currentUser['current'] = 'none';
                    this._currentUser['username'] = 'none';
                    this._cantidad = this._cantidad - 1 
                    this.saveData();
                    window.location.reload(true); 
                } 
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
            cantidadProductos: this._cantidadProductos,
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


    sendEmail(){
        let nombre = document.getElementById('nameQuestion').value;
        let mail = document.getElementById('mailQuestion').value;
        let consulta = document.getElementById('mensaje').value;

        Email.send({
            Host : "smtp.gmail.com",
            Username : "m.olmedo@itecriocuarto.org.ar",
            Password : "joopkkajexrqqrtf",
            To : "j.vidal@itecriocuarto.org.ar",
            From : "m.olmedo@itecriocuarto.org.ar",
            Subject : "Consulta",
            Body : "<html><h2>"+nombre+"</h2><strong>Posee esta cosulta "+ consulta + " </strong><br></br><em>Para comunicarte con el remitente de esta consulta tratar con: "+ mail +"el joel se la come</em></html>"
        }).then(
          alert("su consulta fue enviada")
        );
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
            this._cantidadProductos = data.cantidadProductos;

            if (this._currentUser['current'] == 'True'){
                document.getElementById('nameSesion').innerHTML = this._currentUser['username'];
                ocultar('sesion');
                mostrar('sesionName');
                if (this._usuarios[0]['username']== this._currentUser['username']){
                    console.log('no anda')
                    mostrar('botonAgregar');
                }else{
                    ocultar('botonAgregar')
                }
            }  
        }else{
            this._currentUser={
                current: 'none',
                username: 'none',
            }
            this.saveData();
        }
    
        let divLiquidos = document.getElementById('liquidos');
        let divContenedorLiquidos = document.createElement('div');
        divContenedorLiquidos.className += 'd-flex row';
        console.log("asd")
        for (var j = 0; j<this._cantidadProductos; j++){
            console.log("entre en el for");
            if(this._productos[j]['categoria'] == 1){
                console.log('encontre un liquido :'+this._productos[j]['nombre']);
                var divProducto = document.createElement('div');
                divProducto.className += 'col-lg-4 col-md-6 col-sm-4 col-xs-12';
                divProducto.style.width+= "18rem" ;
                let carta = document.createElement('div');
                carta.className += "card-body";
                let imgProducto = document.createElement('img');
                imgProducto.className += 'img pequenia';
                imgProducto.id += 'imgTest';
                imgProducto.src += this._productos[j]['img'];
                let tituloProducto = document.createElement('h5');
                tituloProducto.className += 'card-title';
                let contenidoTitulo = document.createTextNode(this._productos[j]['nombre']);
                let precioProducto = document.createElement('h2');
                let contenidoPrecio = document.createTextNode('$'+this._productos[j]['precio']);

                let stockProducto = document.createElement('h6');
                let contenidoStock = document.createTextNode('Stock de producto: ' +this._productos[j]['stock'])

                let descripProduc = document.createElement('p');
                let contenidoDescr = document.createTextNode(this._productos[j]['decripcion']);


                tituloProducto.appendChild(contenidoTitulo);
                precioProducto.appendChild(contenidoPrecio);
                stockProducto.appendChild(contenidoStock);
                descripProduc.appendChild(contenidoDescr);

                carta.appendChild(imgProducto);
                carta.appendChild(tituloProducto);
                carta.appendChild(precioProducto);
                carta.appendChild(stockProducto);
                carta.appendChild(descripProduc);

                divProducto.appendChild(carta);
            }
            divContenedorLiquidos.appendChild(divProducto);
            divLiquidos.appendChild(divContenedorLiquidos);
        }
        
    }

}

document.getElementById("pass")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("button").click();
    }
});

document.getElementById("mail")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("buttonReg").click();
    }
});

PVenta.init();// metodo obligatorio primero que todos para cargar datos desde el localStorage
PVenta.getUsuarios();