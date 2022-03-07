// TABLA CREADA CON DOM

const productos = [
    { tipo: "Tipo:", estado: "Estado", kilometros: "KM", modelo: "Modelo:", color: "Color:", año: "Año:", precio: "Precio:", },
    { tipo: "Camioneta", estado: "Bueno", kilometros: "165.359", modelo: "Ford Ranger", color: "Azul", año: 2012, precio: "$ 2.300.000"},
    { tipo: "Automovil", estado: "Bueno", kilometros: "98.366", modelo: "Volkswagen Fox", color: "Gris", año: 2015, precio: "$ 1.030.050"},
    { tipo: "Automovil", estado: "Excelente", kilometros: "9.364", modelo: "Chevrolet Onix", color: "Blanco", año: 2021, precio: "$ 1.230.000"},
    { tipo: "Automovil", estado: "Optimo", kilometros: "187.364", modelo: "Suzuki Fun", color: "Gris", año: 2005, precio: "$ 450.300"},
    { tipo: "Camioneta", estado: "Muy bueno", kilometros: "65.214", modelo: "Dodge Ram", color: "Rojo", año: 2018, precio: "$ 4.450.300"},
    { tipo: "Camioneta", estado: "Bueno", kilometros: "76.325", modelo: "Toyota Hiulux", color: "Azul", año: 2015, precio: "$ 3.450.300"},
    { tipo: "Motocicleta", estado: "Excelente", kilometros: "5.325", modelo: "Honda 300", color: "Roja", año: 2019, precio: "$ 659.874"},
    { tipo: "Motocicleta", estado: "Bueno", kilometros: "49.358", modelo: "Suzuki 250", color: "Blanca", año: 2015, precio: "$ 325.479"},
    { tipo: "Motocicleta", estado: "Excelente", kilometros: "2.354", modelo: "Honda Wave", color: "Roja", año: 2021, precio: "$ 210.300"}
];

localStorage.setItem("productos",JSON.stringify(productos));   //Convierto el objeto en cadena de texto



let tablaVehiculos = document.createElement("table");           //Creo la tabla
tablaVehiculos.style.font = "25px";                             //Le doy tamaño d eletra
tablaVehiculos.setAttribute("class", "table table-striped");    //Le agrego class a tablaVehiculos

let tablaBody = document.createElement("tbody");                //Creo el body de la tabla

for (const producto of productos) {

    let fila = document.createElement("tr");                  //Creo la fila (tr)

    let celdaUno = document.createElement("td");              //Creo la celdaUno (td)
    celdaUno.innerHTML = `<b>${producto.tipo}</b>`;           //Le incorporo el tipo
    fila.appendChild(celdaUno);                               //Asigno celdaUno a fila

    let celdaDos = document.createElement("td");              //Creo la celda 2
    celdaDos.innerHTML = `<b>${producto.modelo}</b>`;         //Le incorporo el modelo
    fila.appendChild(celdaDos);                               //Asigno celdaDos a fila   

    let celdaTres = document.createElement("td");             //Creo la celda 3
    celdaTres.innerHTML = `<b>${producto.año}</b>`;           //Le incorporo el año
    fila.appendChild(celdaTres);                              //Asigno celdaTres a fila    

    let celdaCuatro = document.createElement("td");           //Creo la celda 4
    celdaCuatro.innerHTML = `<b> ${producto.precio}</b>`;    //Le incorporo el precio
    fila.appendChild(celdaCuatro);                            //Asigno celdaCuatro a fila

    let celdaCinco = document.createElement("td");           
    celdaCinco.innerHTML = `<b> ${producto.kilometros}</b>`;    
    fila.appendChild(celdaCinco);

    let celdaSeis = document.createElement("td");           
    celdaSeis.innerHTML = `<b> ${producto.estado}</b>`;    
    fila.appendChild(celdaSeis);
                            
    tablaBody.appendChild(fila);                              //Asigno fila a tablaBody
}

tablaVehiculos.appendChild(tablaBody);                                  //Asigno tablaBody a tablaVehiculos
document.getElementById("seccionDos").appendChild(tablaVehiculos);      //Asigno la tablaVehiculos a la seccionDos del html



