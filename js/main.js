class Producto{
    constructor(id, nombre, material, precio, src, tMin, tMax, tTotal){
        this.id = id;
        this.nombre = nombre;
        this.material = material;
        this.precio = precio;
        this.src = src;
        this.tMin = tMin;
        this.tMax = tMax;
        this.tTotal = tTotal;
    }
    
}

let productos = [];

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
                        <div class="reset">
                            <span class="textInfo">Pack $${prod.tTotal * prod.precio}</span><button class="btn btn-primary" id="addCarrito" type="submit">Agregar al carrito</button>
                        </div>
                        </article>`;
            
        }

        $('#tienda').append(nodo);
        sessionStorage.setItem("Productos", JSON.stringify(productos));

}

//AJAX
const url = "/js/stock.json";
const cargarArray = () => {
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            result.forEach(prod => {
                productos.push(new Producto(prod.id, prod.name, prod.material, prod.price, prod.imgUrl, prod.sizeMin, prod.sizeMax, prod.sizeTotal));
            });
            
        })
        .catch((error) => console.log(error));
}
const promiseProductos = new Promise((resolve, reject) => {
    setTimeout(() =>{
        resolve(productos);
    },400);
    setTimeout(() => {
        reject("error de promesa")
    }, 1000);
});



cargarArray();
promiseProductos
    .then(response => mostrarProductos(response))
    .catch( error => console.log(error));




const ordenarArrayPorNombre = () =>{productos.sort((a, b) =>{
    if(a.nombre > b.nombre){
        return 1;
    }
    if(a.nombre < b.nombre){
        return -1;
    }
    return 0;
});}


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

//FAQ
function changeArrow(btnIcon){
    if(btnIcon.children().hasClass("fa-chevron-down")){
        btnIcon.children().removeClass("fa-chevron-down");
        btnIcon.children().addClass("fa-chevron-up");
    }
    else{
        btnIcon.children().removeClass("fa-chevron-up");
        btnIcon.children().addClass("fa-chevron-down");
    }
}


$('#arrow1').on('click', function (){
    $('#faq1').toggle(200);
    changeArrow($(this));
});

$('#arrow2').on('click', function (){
    $('#faq2').toggle(200);
    changeArrow($(this));
});

$('#arrow3').on('click', function (){
    $('#faq3').toggle(200);
    changeArrow($(this));
});

$('#arrow4').on('click', function (){
    $('#faq4').toggle(200);
    changeArrow($(this));
});

$('#arrow5').on('click', function (){
    $('#faq5').toggle(200);
    changeArrow($(this));
});
