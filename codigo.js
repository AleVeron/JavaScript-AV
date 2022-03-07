//METODO READY

$(document).ready(function() {
    obtenerValorDolar();
    obtenerPrecioDolar();
    obtenerValorEuro();
    mostrarCarro();
});


let coches;
//GETJSON
const URLJSON = "coches.json";
$.getJSON(URLJSON, function(respuesta, estado) {
    if (estado == "success") {
        coches = respuesta.vehiculos;
        mostrarVehiculos(coches);
    }
});


//FUNCION MUESTRA OCULTA

$("#Info").hide();

$("#mostrarInfo").click(function() {
    $("#Info").fadeToggle(500, function() {
        if ($("#mostrarInfo").html() == "Informacion") {
            $("#mostrarInfo").html("Menos Informacion");
        } else {
            $("#mostrarInfo").html("Informacion");
        }
    });
});



//OBTENER VALUES DEL FORM

let capturarProducto = $("#formulario").submit(capturarForm); //SIMPLIFICADO CON JQUERYS

function capturarForm(e) {
    e.preventDefault();
    let mPago = $("#formaPago").val();
    let valCompra = $("#ValorCompra").val();
    console.log(mPago);
    console.log(valCompra);
    let valorDelDescuento = obtenerDescuento(mPago);
    let precioConDescuento = finalConDescuento(valCompra, valorDelDescuento);
    Swal.fire("El precio del vehiculo es: $" + valCompra + "\n Se agrega un descuento del: " + valorDelDescuento + "% \n El precio del vehiculo final es: $" + precioConDescuento);
}


//SIMULADOR DE DESCUENTOS

function obtenerDescuento(modoDePago) { //Funcion para aplicar el descuento
    let descuento;
    switch (modoDePago) {
        case "debito":
            descuento = 10;
            break;
        case "efectivo":
            descuento = 15;
            break;
        case "dolares":
            descuento = 18;
            break;
        case "euros":
            descuento = 20;
            break;
        default:
            descuento = 5;
            break;
    }
    return descuento;

}

function finalConDescuento(total, descuentos) {
    let porcentajeDescuento = (total * descuentos) / 100;
    let valorFinalConDescuento = total - porcentajeDescuento;
    return valorFinalConDescuento;
}


//For OF vehiculos , renderizado

const mostrarVehiculos = (coches) => {

    $("#vehiculosCards").html("");                          //Limpio el html

    for (vehiculo of coches) { //Recorro todos los productos
        $("#vehiculosCards").append(
            `
            <div class="card articles" style="width: 18rem;"data-aos="flip-up">
                <img src="${vehiculo.imagen}" style="width: 18rem; height:13rem; class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${vehiculo.nombre}</h5>
                    <p class="card-text">${vehiculo.descripcion}</p>
                    <p class="card-text"> Precio $ ${vehiculo.precio}</p>
                    <button class='btn btn-primary enviar' id='${vehiculo.id}'>Agregar</button>
                </div>
            </div>
            `);

    }
}


//Evento click al boton con clase enviar

$("#vehiculosCards").on("click", e=>{
    if(e.target.classList.contains("enviar")){
        agrerar(e.target.getAttribute("id"));             
    }
});

//Evento click al boton con clase quitar

$("#carro").on("click", e=>{
    if(e.target.classList.contains("quitar")){
        quitar(e.target.getAttribute("id"));}
});


//Evento para limpiar carro de compras

$("#clearStorage").on("click", e=>{
    localStorage.clear();
    mostrarCarro();  
});


function quitar(id) {
    let carritoBorrar = JSON.parse(localStorage.getItem("carrito"));
    let productoIndice = carritoBorrar.findIndex(e=>e.id==id);
    carritoBorrar.splice(productoIndice,1);
    localStorage.setItem("carrito",JSON.stringify(carritoBorrar));
    mostrarCarro();
}

function agrerar(id){
    let productoAgregar = coches.find(e=>e.id==id);     
    let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    carrito.push(productoAgregar);    
    localStorage.setItem("carrito",JSON.stringify(carrito));
    Swal.fire(
        `Agregaste ${productoAgregar.nombre}`
    );  
    mostrarCarro();
}
 

$("#carro").on("click", e=>{
    if(e.target.classList.contains("comprar")){
        comprar(e.target.getAttribute("id"));}  
});


function comprar(id) {
    let carritoComprar = JSON.parse(localStorage.getItem("carrito"));
    let productoIndice = carritoComprar.findIndex(e=>e.id==id);
    carritoComprar.splice(productoIndice,1);
    localStorage.setItem("carrito",JSON.stringify(carritoComprar));
    Swal.fire(
        `Compra finalizada!`
    ); 
    mostrarCarro();
}



//CARRO DE COMPRAS

function mostrarCarro() {
    
    $("#carro").html("");       //Limpio html
    let vehiculoStorage = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    for (vehiculo of vehiculoStorage) { //Recorro todos los productos
        $("#carro").append(
            `
            <div class="card articles" style="width: 18rem;"data-aos="fade-down">
                <img src="${vehiculo.imagen}" style="width: 18rem; height:13rem; class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${vehiculo.nombre}</h5>
                    <p class="card-text">${vehiculo.descripcion}</p>
                    <p class="card-text"> Precio $ ${vehiculo.precio}</p>
                    <button class='btn btn-primary comprar' id='${vehiculo.id}'>Comprar</button>
                    <button class='btn btn-primary quitar' id='${vehiculo.id}'>Quitar</button>
                </div>
            </div>
            `
            );
}
}

//OBTENER DOLAR ACTUALIZADO

let dolarVenta;

const obtenerValorDolar = () => {
    const APIURL = "https://api-dolar-argentina.herokuapp.com/api/dolaroficial";
    $.ajax({
        method: "GET",
        url: APIURL,
        success: function(data) {
            dolarVenta = data.venta;
        }
    });
}

//VALOR EURO EN FOOTER

let euroFooter;

const obtenerValorEuro = () => {
    const APIURL = "https://api-dolar-argentina.herokuapp.com/api/euro/nacion";
    $.ajax({
        method: "GET",
        url: APIURL,
        success: function(info) {
            $(".footer__h2").prepend(`<p align="center">Euro compra:$ <b>${info.compra}</b> Euro venta:$ <b>${info.venta}</b><p>`);
            euroFooter = info.venta;
        }
    });
}

//VALOR DOLAR EN FOOTER

let dolarFooter;

const obtenerPrecioDolar = () => {
    const APIURL = "https://api-dolar-argentina.herokuapp.com/api/dolaroficial";
    $.ajax({
        method: "GET",
        url: APIURL,
        success: function(preci) {
            $(".footer__h2").prepend(`<p align="center">Dolar compra:$ <b>${preci.compra}</b> Dolar venta:$ <b>${preci.venta}</b><p>`);
            dolarFooter = preci.venta;
        }
    });
}


//FILTRO DE PRODUCTOS


$('#Motos').on("click",(e)=>{
    let tipo = e.target.id;
    let filtroMoto = coches.filter(e => e.tipo == "moto");
    mostrarVehiculos(filtroMoto);
});

$('#Camionetas').on("click",(e)=>{
    let tipo = e.target.id;
    let filtroCamioneta = coches.filter(e => e.tipo == "camioneta");
    mostrarVehiculos(filtroCamioneta);
});

$('#Autos').on("click",(e)=>{
    let tipo = e.target.id;
    let filtroAuto = coches.filter(e => e.tipo == "automovil");
    mostrarVehiculos(filtroAuto);    
});

