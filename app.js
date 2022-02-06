const carrito = document.getElementById('carrito')
const template = document.getElementById('template')
const fragment = document.createDocumentFragment()
const btnBotones = document.querySelectorAll('.card .btn')

//console.log(carrito)
//console.log(btnBotones)

const carritoObjeto = {};

const agregarAlCarrito = (e) => {
    //console.log(e.target.dataset.fruta);
    const producto = {
        titulo : e.target.dataset.fruta,
        id : e.target.dataset.fruta,
        cantidad : 1
    }

    //consultar si ya existe el producto para aumentar la cantidad
    if (carritoObjeto.hasOwnProperty(producto.titulo)){
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1;
    }

    carritoObjeto[producto.titulo] = producto;
    //console.log(carritoObjeto);
    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent = "";
    //console.log('pintar carrito', producto)
    //console.log(carritoObjeto);
    Object.values(carritoObjeto).forEach(item => {  //convierte un objeto a array para recorrerlo
        // ahora clonamos el template para poder utilizarlo
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector('.lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;

        // para evitar el reflow utilizamos el fragment
        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
};

btnBotones.forEach( (btn) => btn.addEventListener("click", agregarAlCarrito) );

