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
/*FUNCIONES GENERALES*/
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
/*FUNCIONES MODIFICAR*/

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

function devolver_valor_section_1_modificar(elemento_dom){
    //PRE: Recibe el elemento capturado del section.
    //POST: devuelve un valor tomado de la seleccion del combobox.
    let valor_cap = elemento_dom.value;
    let valor = "";

    if (!valor_cap) {
        valor = "ERROR";
    } else {
        if (valor_cap === 'op_prod') {
            valor = "PROD";
        } else {
            valor = "LOTES";
        }
    }

  return valor;
}

function devolver_valor_section_2_modificar(elemtno_dom){
    //PRE: Recibe el elemento capturado del section.
    //POST: devuelve un valor tomado de la seleccion del combobox.
    let valor_cap = elemtno_dom.value;
    let valor = "";

    if (!valor_cap) {
        valor = "ERROR";
    } else {
        if (valor_cap == 'op_agregar') {
            valor = "AGREGAR";
        } else {
            valor = "QUITAR";
        }
    }

  return valor;
}

function desplegar_contenedor_2_modificar(){
    //PRE: No recibe nada.
    //POST: Crea el contenedor correspondiente, no devuele nada.
    let lista_filtrada = []
    let valor_capturado_mod_1 = document.querySelector(".combobox_opcion_mod_1")
    let tipo_opcion_1 = devolver_valor_section_1_modificar(valor_capturado_mod_1)
    let valor_capturado_mod_2 = document.querySelector(".combobox_opcion_mod_2")
    let tipo_opcion_2 = devolver_valor_section_2_modificar(valor_capturado_mod_2)

    if(tipo_opcion_2 == "AGREGAR"){    
        let formulario = document.createElement("form")
        formulario.classList.add("formulario")
        
        if(tipo_opcion_1 == 'PROD'){
            formulario.innerHTML = `
                <input class= "entrybox" id="input_nombre" type="text" minlength="1" placeholder="nombre del producto">
                <input class= "entrybox" id="input_lote" type="text" minlength="1" placeholder="lote">
                <input class= "entrybox" id="input_sku" type="text" minlength="1" placeholder="SKU">
                <input class= "entrybox" id="input_cant" type="number" minlength="1" placeholder="cantidad">
                <button class = "boton" id="boton_cargar_ingreso" >CARGAR PRODUCTO</button>`;
        }
        else if(tipo_opcion_1 == 'LOTES'){
            formulario.innerHTML = `
                <input class= "entrybox" id="input_lote" type="text" minlength="1" placeholder="lote">
                <input class= "entrybox" id="input_sku" type="text" minlength="1" placeholder="SKU">
                <input class= "entrybox" id="input_cant" type="number" minlength="1" placeholder="cantidad">
                <button class = "boton" id="boton_cargar_ingreso" >CARGAR LOTE</button>`;
        }

        let contenedor = document.getElementsByClassName("container_mod_2")
        contenedor[0].appendChild(formulario)
        
        evento_cargar_elemento()

        
    }else if(tipo_opcion_2 == "QUITAR"){
        let combobox_nueva = document.createElement("select")
        combobox_nueva.classList.add("nueva_combo")
        let objetos_storage = []

        for(let i=0; i<localStorage.length; i++){
            let clave = localStorage.key(i)
            let objeto_jason = localStorage.getItem(clave)
            let objeto_actual = JSON.parse(objeto_jason)

            if(("nombre" in objeto_actual)&&(tipo_opcion_1 == "PROD")){
                objetos_storage.push(objeto_actual.nombre)

            }else if(("id" in objeto_actual)&&(tipo_opcion_1 == "LOTES")){
                objetos_storage.push(objeto_actual.id)
            }
           
        }
        objetos_storage = quitar_duplicados(objetos_storage)
        objetos_storage.forEach((elemento) => {
            let option = document.createElement("option")
            option.value = elemento
            option.textContent = elemento
            combobox_nueva.appendChild(option)
        })
        let contenedor = document.getElementsByClassName('container_mod_2')
        contenedor[0].appendChild(combobox_nueva)
        let boton_aceptar = document.createElement("button")
        boton_aceptar.textContent = "QUITAR"
        boton_aceptar.classList.add("boton")
        boton_aceptar.id = "boton_eliminar"
        contenedor[0].appendChild(boton_aceptar)

        evento_eliminar_objeto(lista_filtrada)
    }
    const detener_boton = document.getElementById("guardar_seleccion")
    detener_boton.removeEventListener("click", desplegar_contenedor_2_modificar)
}

function eliminar_producto(lista_objeto, producto){
    //PRE: Recibe la lista con los objetos productos y una cadena con el producto a eliminar.
    //POST: Devuelve la lista pero sin el producto a eliminar.

    let nueva_lista = lista_objeto.filter(objeto => {
        for (let propiedad in objeto){
            if(objeto[propiedad] === producto){
                return false
            }
        }
        return true
    })
    
      return nueva_lista
}

function eliminar_elemento_storage(lista, valor){
    //PRE: Recibe una lista de objetos y el valor de una propiedad en string.
    //POST: No devuelve nada, solo saca del storage el/los objetos con propiedad que contenga ese valor.
    console.log(lista, valor)
    const objeto_eliminar = lista.find(objeto => {
        for (let propiedad in objeto) {
          if (objeto[propiedad] === valor) {
            return true
          }
        }
        return false
      })
    
    if (objeto_eliminar) {
        console.log("toy en el if")
        const indice = lista.indexOf(objeto_eliminar)
        lista.splice(indice, 1)
        for(let i=0; i<localStorage.length; i++){
            let clave = localStorage.key(i)
            let valor = localStorage.getItem(clave)

            if(valor == JSON.stringify(objeto_eliminar)){
                localStorage.removeItem(clave)
            }
        }
    }
}

function quitar_elemento(lista_de_arrays){
    //PRE: Recibe una lista que tiene 2 elementos y son los arrays globales.
    //POST: No devuelve nada, pero ejecuta cambios en los arrays y en el storage.

    let elemento_eliminar_dom = document.querySelector(".nueva_combo")
    let elemento_eliminar = elemento_eliminar_dom.value
    let valor_capturado_mod_1 = document.querySelector(".combobox_opcion_mod_1")
    let tipo_opcion = devolver_valor_section_1_modificar(valor_capturado_mod_1)
    let lista
    

    if(tipo_opcion == "PROD"){
        lista = lista_de_arrays[1]

    } else if(tipo_opcion == 'LOTES'){
        lista = lista_de_arrays[0]

    }

    eliminar_elemento_storage(lista, elemento_eliminar)
    let lista_filtrada = eliminar_producto(lista, elemento_eliminar)

    const detener_boton = document.getElementById("boton_eliminar")
    detener_boton.removeEventListener("click",  function() {lista_filtrada = quitar_elemento([array_lotes, array_productos])})
}

function evento_eliminar_objeto(lista_f){
    //PRE: Recibe una lista vacia.
    //POST: Devuelve la lista cargada una vez realizado el evento.

    const boton_eliminar = document.getElementById("boton_eliminar")
    boton_eliminar.addEventListener("click", function() {lista_filtrada = quitar_elemento([array_lotes, array_productos])})

    return lista_f
}

function cargar_elemento(lista_lotes, lista_productos){
    //PRE: Recibe el array global de lotes y productos.
    //POST: No devuelve nada, pero realiza cambios en el storage y en los arrays globales.

    let valor_cap_dom = document.querySelector(".combobox_opcion_mod_1")
    let resultado_dom = devolver_valor_section_1_modificar(valor_cap_dom)

    if(resultado_dom == "PROD"){
        let objeto_agregado = cargar_producto_nuevo()
        console.log(objeto_agregado)
        lista_productos.push(objeto_agregado)
        cargar_storage([objeto_agregado], localStorage.length+1)

    }else if(resultado_dom == "LOTES"){
        let objeto_agregado = cargar_lote_nuevo()
        lista_lotes.push(objeto_agregado)
        cargar_storage([objeto_agregado], localStorage.length+1)
    }

    let boton_ingreso_dom = document.getElementById("boton_cargar_ingreso")
    boton_ingreso_dom.removeEventListener("click", function() {cargar_elemento(array_lotes, array_productos)})
}

function evento_cargar_elemento(){
    //PRE: No recibe nada.
    //POST: No devuelve nada, pero ejecuta el evento de cambios en el storage.
    let boton_ingreso_dom = document.getElementById("boton_cargar_ingreso")
    boton_ingreso_dom.addEventListener("click", function() {cargar_elemento(array_lotes, array_productos)})
}

function realizar_operaciones_modificar(lista_lotes, lista_productos){
    //PRE: Recibe los 2 arrays globales.
    //POST: Devuelve una lista con ambos arrays.
    const boton_selec = document.getElementById("guardar_seleccion")
    boton_selec.addEventListener("click", desplegar_contenedor_2_modificar)
    
    return [lista_lotes, lista_productos]
}
let lista_filtrada = []
recargar_arrays_globales(array_lotes, array_productos)
realizar_operaciones_modificar(array_lotes, array_productos)