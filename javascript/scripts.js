/*CLASES*/
class Producto{
    constructor (nombre, sku, lote, cantidad_total){
        this.nombre = nombre
        this.sku = sku
        this.cantidad_total = cantidad_total
        this.lote = lote
    }
}

class Lote{
    constructor (id, sku, cantidad){
        this.id = id
        this.sku = sku
        this.cantidad = cantidad
    }
}
/*OBJETOS y VECTORES BASE PARA PODER TRABAJAR EN DESARROLLO DE LA ENTREGA */
let fine_beauty = new Producto("Fine Beauty", "FNBT01", ["0205202316"], 24)
let lote_1 = new Lote("0205202316", "FNBT01", 24)
let fine_power = new Producto("Fine Power","FNPW02", ["0605202314"], 12)
let lote_2 = new Lote("0605202314", "FNPW02", 12)
let array_productos = [fine_beauty, fine_power]
let array_lotes = [lote_1, lote_2]
cargar_storage(array_productos, 0)
cargar_storage(array_lotes,2)

const imagenHeader = document.getElementById("imagen_header")
// Agregar el evento de clic a la imagen para recargar el sitio
imagenHeader.addEventListener("click", function() {location.reload();})


/*FUNCIONES GENERALES*/

function cargar_producto_nuevo(){
    ///PRE: No recibe nada.
    ///POST: Devuelve un objeto de la clase Producto.

    let nombre_prod = document.getElementById("input_nombre").value
    let sku_prod = document.getElementById("input_sku").value
    let lote_prod = document.getElementById("input_lote").value
    let cant_prod = Number(document.getElementById("input_cant").value)

    return new Producto(nombre_prod, sku_prod, [lote_prod], cant_prod)
}

function cargar_lote_nuevo(){
    ///PRE: No recibe nada.
    ///POST: Devuelve un objeto de la clase Lote.

    let id_lote = document.getElementById("input_lote").value
    let sku_lote = document.getElementById("input_sku").value
    let cant_lote = Number(document.getElementById("input_cant").value)

    return new Lote(id_lote, sku_lote, cant_lote)
}

function cargar_storage(vector, limite){
    //PRE: Recibe una lista de objetos y un numero, con esto carga uno a uno en el storage.
    //POST: No devuelve nada.
    for (let objeto of vector){
        localStorage.setItem(limite, JSON.stringify(objeto))
        limite += 1
    }
}

function quitar_duplicados(lista){
    //PRE: Recibe una lista.
    //POST: Devuelve una nueva lista copiada de la original pero sin valores duplicados
    let nueva_lista = []
  
    lista.forEach(elemento => {
      if (!nueva_lista.includes(elemento)) {
        nueva_lista.push(elemento)
      }
    })
  
    return nueva_lista
}

function recargar_arrays_globales(lista_lotes, lista_prod){
    //PRE: Recibe los 2 arrays globales.
    //POST: No devuelve nada pero carga estos arrays con lo que haya en el storage.
    for(let i=0; i<localStorage.length; i++){

        let clave = localStorage.key(i)
        let objeto_jason = localStorage.getItem(clave)
        let objeto_actual = JSON.parse(objeto_jason)
        let tamaño_objeto = Object.keys(objeto_actual).length

        if(tamaño_objeto == 3){
            let encontrado = lista_lotes.some((lote) => lote.id === objeto_actual.id)
            if (!encontrado) {
              lista_lotes.push(objeto_actual)}

        }else if(tamaño_objeto == 4){
            let encontrado = lista_prod.some((prod) => prod.sku === objeto_actual.sku)
            if (!encontrado) {
              lista_prod.push(objeto_actual)}
        }
    }

}

function eliminar_elemento_storage(valor, parametro_valido){
    //PRE: Recibe una lista de objetos y el valor de una propiedad en string.
    //POST: No devuelve nada, solo saca del storage el/los objetos con propiedad que contenga ese valor.
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i)
        const objetoJSON = JSON.parse(localStorage.getItem(clave))

        if(parametro_valido == "nombre"){
            if (objetoJSON && objetoJSON.nombre === valor) {
                localStorage.removeItem(clave)
            }
        }
        else if(parametro_valido == "id"){
            if (objetoJSON && objetoJSON.id === valor) {
                localStorage.removeItem(clave)
            }
        }
        
    }
}

/*INDEX*/
function desplegar_DOM_index(){
    //PRE: No recibe nada. 
    //POST: No devuelve nada.
    recargar_arrays_globales(array_productos, array_lotes)

    const botones = document.getElementsByClassName("boton_principal_index")

    for (const boton of botones) {
        boton.addEventListener("click", devolver_boton_index)
    }

}

function devolver_boton_index(event){

    const boton_clickeado = event.target
    const valor_boton = boton_clickeado.value

    if(valor_boton == "mod"){
        //desplega el dom modificaciones
        desplegar_DOM_modificaciones()

        const boton_pr = document.getElementById("boton_index_mod")
        boton_pr.removeEventListener("click",devolver_boton_index)
    }
    else if(valor_boton == "vis"){
        //desplega el dom visualizaciones
        desplegar_DOM_visualizaciones()
        const boton_pr = document.getElementById("boton_index_vis")
        boton_pr.removeEventListener("click",devolver_boton_index)

    }
    return
}

function desplegar_DOM_modificaciones(){
    //PRE: No recibe nada.
    //POST: No devuelve nada.

    let div_mod = document.createElement("div")
    div_mod.classList.add("container_modificar")

    div_mod.innerHTML = `
    <h1 class="titulo">MODIFICACIONES</h1>
    <button id="boton_agregar" class="boton boton_modificar" value="agregar">AGREGAR</button>
    <button id="boton_quitar" class="boton boton_modificar" value="quitar">QUITAR</button>`;

    let main_index = document.querySelector(".main_index")
    main_index.appendChild(div_mod)

    realizar_operaciones_modificar()
    return
}

function desplegar_DOM_visualizaciones(){
    //PRE: No recibe nada.
    //POST: No devuelve nada.

    let div_vis = document.createElement("div")
    div_vis.classList.add("container_visualizar")
    div_vis.id = "div_visuales_principal"

    div_vis.innerHTML = `
    <h1 class="titulo titulo_vis">VISUALIZACIONES</h1>
    <button id="boton_vis_prod" class="boton boton_principal_vis" value="productos">PRODUCTOS</button>
    <button id="boton_vis_lote" class="boton boton_principal_vis" value="lotes">LOTES</button>`;
    
    let main_index = document.querySelector(".main_index")
    main_index.appendChild(div_vis)

    realizar_operaciones_visuales()
    return
}

/*MODIFICACIONES*/
function crear_formulario(param){
    //PRE: Recibe un string que sirve para ver que if ejecutar
    //POST: No devuelve nada, pero crea el segundo div de modificar

    
    let formulario = document.createElement("form")
    formulario.classList.add("formulario")
    
    if(param == "productos"){
        formulario.innerHTML = `
                <input class= "entrybox" id="input_nombre" type="text" minlength="1" placeholder="nombre del producto">
                <input class= "entrybox" id="input_lote" type="text" minlength="1" placeholder="lote">
                <input class= "entrybox" id="input_sku" type="text" minlength="1" placeholder="SKU">
                <input class= "entrybox" id="input_cant" type="number" minlength="1" placeholder="cantidad">
                <button class = "boton" id="boton_cargar_ingreso" >CARGAR PRODUCTO</button>`;
    }
    else if(param == "lotes"){
        formulario.innerHTML = `
                <input class= "entrybox" id="input_lote" type="text" minlength="1" placeholder="lote">
                <input class= "entrybox" id="input_sku" type="text" minlength="1" placeholder="SKU">
                <input class= "entrybox" id="input_cant" type="number" minlength="1" placeholder="cantidad">
                <button class = "boton" id="boton_cargar_ingreso" >CARGAR LOTE</button>`;
    }
    const div_form = document.createElement("div")
    div_form.classList.add("container_formulario")
    div_form.appendChild(formulario)

    let main_index = document.querySelector(".main_index")
    main_index.appendChild(div_form)

    

    evento_cargar_elemento(param)

}

function crear_searchbar(param){
    //PRE: Recibe un string que sirve para ver que if ejecutar
    //POST: No devuelve nada, pero crea el segundo div de modificar

    let div_quitar = document.createElement("div")
    div_quitar.classList.add("container_searchbar")

    if(param == "productos")
        div_quitar.innerHTML = `
        <input type="search" id="search_input" name="search" placeholder="producto a eliminar...">
        <button id="boton_eliminar" class="boton">ELIMINAR</button>`;
    
    else if(param == "lotes"){
        div_quitar.innerHTML = `
        <input type="search" id="search_input" name="search" placeholder="lote a eliminar...">
        <button id="boton_eliminar" class="boton">ELIMINAR</button>`;
    }

    let main_index = document.querySelector(".main_index")
    main_index.appendChild(div_quitar)
    

    evento_eliminar_objeto(param)
}

function desplegar_DOM_formulario_agregar(){
    //PRE: No recibe nada.
    //POST: No devuelve nada, pero almacena el evento del boton.
    

    let combobox = document.getElementById("combobox_mod")

    let seleccion_combo = combobox.value

    if(seleccion_combo == "PROD"){
        crear_formulario("productos")
    }
    else if(seleccion_combo == "LOTE"){
        crear_formulario("lotes")
    }
    
}

function desplegar_DOM_eliminar(){
    //PRE: No recibe nada.
    //POST: No devuelve nada, pero almacena el evento del boton.
    
    let combobox = document.getElementById("combobox_mod")
    let seleccion_combo = combobox.value
    
    

    if(seleccion_combo == "PROD"){
        crear_searchbar("productos")
    }
    else if(seleccion_combo == "LOTE"){
        crear_searchbar("lotes")
    }
    
}

function devolver_boton_modificar(event){
    //PRE: Recibe el evento del boton.
    //POST: No devuelve nada pero crea el primer div de modificar.

    let boton_clickeado = event.target
    let valor_boton = boton_clickeado.value

    let combobox = document.createElement("select")
    combobox.classList.add("combobox")
    combobox.id = "combobox_mod"
    combobox.innerHTML = `
        <option value=""></option>
        <option value="PROD">PRODUCTOS</option>
        <option value="LOTE">LOTES</option>`;


    let boton_enviar = document.createElement("button")
    boton_enviar.id = "boton_enviar_selec_mod"
    boton_enviar.classList.add("boton")
    boton_enviar.textContent = "ENVIAR"

    let div_mod = document.querySelector(".container_modificar")
    div_mod.appendChild(combobox)
    div_mod.appendChild(boton_enviar)


    if(valor_boton == "agregar"){
        //desplega el formulario para agregar
        let boton = document.getElementById("boton_agregar")
        boton.removeEventListener("click", devolver_boton_modificar)
    
        const boton_enviar = document.getElementById("boton_enviar_selec_mod")
        boton_enviar.addEventListener("click", function() {desplegar_DOM_formulario_agregar()})
       
        
    }
    else if(valor_boton == "quitar"){
        //desplega el formulario para quitar
        let boton = document.getElementById("boton_quitar")
        boton.removeEventListener("click", devolver_boton_modificar)

        const boton_enviar = document.getElementById("boton_enviar_selec_mod")
        boton_enviar.addEventListener("click", function() {desplegar_DOM_eliminar() })

    }
}

function realizar_operaciones_modificar(){
    //PRE: No recibe nada.
    //POST: No devuelve nada, pero almacena el evento del boton

    const botones = document.getElementsByClassName("boton_modificar")

    for (const boton of botones) {
        boton.addEventListener("click", devolver_boton_modificar)
    }

}

function evento_cargar_elemento(parametro){
    //PRE: No recibe nada.
    //POST: No devuelve nada, pero ejecuta el evento de cambios en el storage.

    let boton_ingreso_dom = document.getElementById("boton_cargar_ingreso")
    boton_ingreso_dom.addEventListener("click", function() {
        boton_ingreso_dom.disabled = true
        cargar_elemento(array_lotes, array_productos, parametro)})
}

function cargar_elemento(lista_lotes, lista_productos, resultado_dom){
    //PRE: Recibe el array global de lotes y productos y ademas recibe un string que sirve para ver que if resuelve.
    //POST: No devuelve nada, pero realiza cambios en el storage y en los arrays globales.
    if(resultado_dom == "productos"){
        let objeto_agregado = cargar_producto_nuevo()
        lista_productos.push(objeto_agregado)
        cargar_storage([objeto_agregado], localStorage.length+1)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto cargado correctamente\n(para recargar clickee el logo FINE blanco)',
            showConfirmButton: false,
            timer: 1500
          })

    }else if(resultado_dom == "lotes"){
        let objeto_agregado = cargar_lote_nuevo()
        lista_lotes.push(objeto_agregado)
        cargar_storage([objeto_agregado], localStorage.length+1)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Lote cargado correctamente\n(para recargar clickee el logo FINE blanco)',
            showConfirmButton: false,
            timer: 1500
          })
    }


    recargar_arrays_globales(array_productos, array_lotes)
}

function evento_eliminar_objeto(param){
    //PRE: Recibe una lista vacia.
    //POST: Devuelve la lista cargada una vez realizado el evento.

    let boton_eliminar = document.getElementById("boton_eliminar")
    boton_eliminar.addEventListener("click", function() {quitar_elemento(param)})

}

function quitar_elemento(tipo_opcion){
    //PRE: Recibe una lista que tiene 2 elementos y son los arrays globales.
    //POST: No devuelve nada, pero ejecuta cambios en los arrays y en el storage.

    const elemento_search = document.getElementById("search_input")
    let elemento_eliminar = elemento_search.value 
    
    
    if(tipo_opcion == "productos"){
        lista = array_productos
        eliminar_elemento_storage(elemento_eliminar, "nombre")

        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Producto eliminado correctamente\n(para recargar clickee el logo FINE blanco)',
            showConfirmButton: false,
            timer: 1500
          })

    } else if(tipo_opcion == 'lotes'){
        lista = array_lotes
        console.log(tipo_opcion)
        eliminar_elemento_storage(elemento_eliminar, "id")
        
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Lote eliminado correctamente\n(para recargar clickee el logo FINE blanco)',
            showConfirmButton: false,
            timer: 1500
          })

    }
    else{
        alert("objeto no encontrado")
    }

    let detener_boton = document.getElementById("boton_eliminar")
    detener_boton.removeEventListener("click",  function() {quitar_elemento(tipo_opcion)})
}
/*VISUALIZACIONES*/
function obtener_objetos_json_storage(propiedad) {
    //PRE: Recibe un string con la propiedad para filtrar del storage.
    //POST: Devuelve todos los objetos del storage con ese atributo.
    
    const lista_con_objetos = []

    if(propiedad == "nombre"){
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i)
            const objeto_JSON = JSON.parse(localStorage.getItem(clave))
    
            if (objeto_JSON && objeto_JSON.hasOwnProperty("nombre")) {
                lista_con_objetos.push(objeto_JSON)
            }
        }
    }
    else if(propiedad == "id"){
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i)
            const objeto_JSON = JSON.parse(localStorage.getItem(clave))
    
            if (objeto_JSON && objeto_JSON.hasOwnProperty("id")) {
                lista_con_objetos.push(objeto_JSON)
            }
        }
    }

    return lista_con_objetos
}


function listado_completo(parametro){
    //PRE: Recibe un parametro tipo string para ver que objeto del storage filtrar.
    //POST: Devuelve un innerHTML con la tabla terminada.

    let tablaHTML = '<table class="tabla">';

    if(parametro == "PROD"){
        let lista_objetos = obtener_objetos_json_storage("nombre")

        tablaHTML += '<tr><th>PRODUCTO</th><th>CANTIDAD</th></tr>';
        for (const objeto of lista_objetos) {
            const nombre = objeto.nombre;
            const cantidad_total = objeto.cantidad_total;
            tablaHTML += `<tr><td>${nombre}</td><td>${cantidad_total}</td></tr>`;
        }
    
        tablaHTML += '</table>';
    }
    else if(parametro == "LOTE"){
        let lista_objetos = obtener_objetos_json_storage("id")

        tablaHTML += '<tr><th>LOTE</th><th>CANTIDAD</th></tr>';
        for (const objeto of lista_objetos) {
            const id = objeto.id;
            const cantidad = objeto.cantidad;
            tablaHTML += `<tr><td>${id}</td><td>${cantidad}</td></tr>`;

    }
    }

    return tablaHTML;  
}


function realizar_operaciones_visuales(){
    //PRE: No recibe nada.
    //POST: No devuelve nada pero ejecuta el evento para desplegar la tabla.

    let botones_vis = document.getElementsByClassName("boton_principal_vis")

    for (const boton of botones_vis) {
        boton.addEventListener("click", devolver_boton_visual)
    }
}


function devolver_boton_visual(event){
    //PRE: Recibe la variable de evento
    //POST: No devuelve nada, pero agrega al DOM la tabla con el listado de stock
    let boton_clickeado_vis = event.target
    const valor_boton = boton_clickeado_vis.value

    let div_vis_2 = document.createElement("div")
    div_vis_2.classList.add("container_botones_1")
    div_vis_2.id = "div_visuales_2"
    let tabla = document.createElement("table")
    tabla.classList.add("tabla")

    if(valor_boton == "productos"){

        tabla.innerHTML = listado_completo("PROD")

    }else if(valor_boton == "lotes"){
        tabla.innerHTML = listado_completo("LOTE")
    }

    div_vis_2.appendChild(tabla)
    console.log("si llegue aca deberia estar el div.")

    let main_index = document.querySelector(".main_index")
    main_index.appendChild(div_vis_2)


}
/*EJECUCION DEL PROGRAMA*/
desplegar_DOM_index()