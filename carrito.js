const vehiculos = [
    {id: 1, imagen: "./Imagenes/Suzuki Fun.jfif", nombre: "Suzuki Fun", descripcion: "Gris, año: 2005", precio: 450300},
    {id: 2, imagen: "./Imagenes/Fox.jfif", nombre: "Volkswagen Fox", descripcion: "Gris, año: 2015", precio: 1030050},
    {id: 3, imagen: "./Imagenes/Onix.jfif", nombre: "Chevrolet Onix", descripcion: "Blanco, año: 2021", precio: 1230000},
];

localStorage.setItem("vehiculos",JSON.stringify(vehiculos));  //Lo cargo a localStorage y lo paso a singify


const camionetas = [
    {id: 4, imagen: "./Imagenes/Ford Ranger.jfif", nombre: "Ford Ranger", descripcion: "Azul, año: 2012", precio: 2300000},
    {id: 5, imagen: "./Imagenes/Ram.jfif", nombre: "Dodge Ram", descripcion: "Roja, año: 2018", precio: 4450300},
    {id: 6, imagen: "./Imagenes/Hilux.jfif", nombre: "Toyota Hilux", descripcion: "Azul, año: 2015", precio: 3450300}   
];

localStorage.setItem("camionetas",JSON.stringify(camionetas));

const motocicletas = [
    {id: 7, imagen: "./Imagenes/motoUno.jfif", nombre: "Honda 300", descripcion: "Roja, año: 2019", precio: 659874},
    {id: 8, imagen: "./Imagenes/motoDos.jfif", nombre: "Suzuki 250", descripcion: "Blanca, año: 2015", precio: 325479},
    {id: 9, imagen: "./Imagenes/motoTres.jfif", nombre: "Honda Wave", descripcion: "Roja, año: 2021", precio: 210300}   
];

localStorage.setItem("motos",JSON.stringify(motos));


class Carro{

    //Añado productos al carro
    comprarVehiculos(e){
        if(e.target.classList.contains('agregar-carro')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosVehiculos(vehiculos);
        }
    }

}