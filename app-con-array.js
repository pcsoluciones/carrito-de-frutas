const carrito = document.getElementById('carrito')
const template = document.getElementById('template')
const fragment = document.createDocumentFragment()
const btnBotones = document.querySelectorAll('.card .btn')

const carritoArray = [];   // ahora se convierte en un array

const agregarAlCarrito = (e) => {
    const producto = {
        titulo : e.target.dataset.fruta,
        id : e.target.dataset.fruta,
        cantidad : 1
    }

    const indice = carritoArray.findIndex( (item) => item.id === producto.id );
    console.log(indice)

    if (indice === -1){
        // en caso no exista se agrega el producto
        carritoArray.push(producto)
    } else {
        // en caso si exista, se aumenta la cantidad
        carritoArray[indice].cantidad ++
    }
    console.log(carritoArray)

    pintarCarrito(carritoArray);   // se pasa como parametro el array
};

const pintarCarrito = (array) => {
    carrito.textContent = "";

    array.forEach(item => {  
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

