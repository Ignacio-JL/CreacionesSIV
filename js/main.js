class Producto{
    constructor(id, nombre, material, precio, src, tMin, tMax){
        this.id = id;
        this.nombre = nombre;
        this.material = material;
        this.precio = precio;
        this.src = src;
        this.tMin = tMin;
        this.tMax = tMax;
    }
    mostrarPrecio = () =>{
        alert("el precio de este producto es: " + this.precio);
    }
}
const productos = [];

function cargaManualProductos(){
    
        productos.push(new Producto(1, "Short Camuflado", "Rustico", 349, "../img/products/ShortCamuf.png", 6, 16));
        productos.push(new Producto(2, "Short Combinado", "Rustico", 299, "../img/products/ShortNiño.png", 6, 16));
        productos.push(new Producto(3, "Remera Estampada", "Jersey Estampado", 309, "../img/products/Remera2.png", 4, 16));
        productos.push(new Producto(4, "Buzo Niño", "Rustico c/Lanilla", 529, "../img/products/BuzoNiño.png", 4, 16));
        productos.push(new Producto(5, "Campera Niño", "Rustico c/Lanilla", 589, "../img/products/CamperaNiño.png", 4, 16));
        productos.push(new Producto(6, "Short Nena", "Fibrana Poplin", 269, "../img/products/ShortNena.png", 4, 16));
        productos.push(new Producto(7, "Babucha Nena", "Fibrana Poplin", 449, "../img/products/PantNena.png", 4, 16));
        productos.push(new Producto(8, "Chomba Bebe", "Jersey Algodon", 299, "../img/products/ChombaBebe.png", 2, 5));
        productos.push(new Producto(9, "Short Bebe", "Rustico", 249, "../img/products/ShortNbb.png", 2, 6));
        sessionStorage.setItem("Productos", JSON.stringify(productos));
    
}

function mostrarProductos(lista){
    $('#tienda').html(''); //Evita recargar nuevamente la lista cuando se llame a eventos ordenar y filtrar
    let nodo = '';
    for(prod of lista){
        
        nodo +=    `<article class="productosTienda" id="niños">
                    <img src="${prod.src}" alt="${prod.nombre}">
                    <h3 class="tituloVitrinaTienda">${prod.nombre}</h3>
                    <ul class="textInfo">
                        <li>$ ${prod.precio}</li>
                        <li>${prod.material}</li>
                        <li>Talles ${prod.tMin} al ${prod.tMax}</li>
                    </ul>
                    </article>`;
        
    }
//jQuery
    $('#tienda').append(nodo);
    
}

const ordenarArrayPorNombre = () =>{productos.sort((a, b) =>{
    if(a.nombre > b.nombre){
        return 1;
    }
    if(a.nombre < b.nombre){
        return -1;
    }
    return 0;
});}



//Inicio
cargaManualProductos();
mostrarProductos(productos);


$('#ordenar').on("click", function (e){
    if(document.getElementById('orden').value == 'original'){
        e.preventDefault();
        mostrarProductos(JSON.parse(sessionStorage.getItem("Productos")));
    }
    if(document.getElementById('orden').value == 'alf'){
        e.preventDefault();
        ordenarArrayPorNombre();
        mostrarProductos(productos);
    }
})

$('#btnRango').on("click", (e) =>{
    if($('#filtrar').val() == 'menor'){

        if($('#rango').val() > 249){
            e.preventDefault();
            const productFilter = productos.filter(elemento => elemento.precio < document.getElementById('rango').value);
            mostrarProductos(productFilter);
    
        }
        else{
            alert('Ingrese un valor superior al precio minimo ($249)');
        }
        
    }

    if($('#filtrar').val() == 'mayor'){
        e.preventDefault();
            const productFilter = productos.filter(elemento => elemento.precio > document.getElementById('rango').value);
            mostrarProductos(productFilter);
    }
})

//Animacion
$(".options").on('click', function(){
    $(this).css('background-color','rgb(18, 18, 18)').slideUp().delay(100).slideDown();
    
});