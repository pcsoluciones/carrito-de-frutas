const carrito = document.getElementById('carrito')
const template = document.getElementById('template')
const footer = document.getElementById("footer")
const templateFooter = document.getElementById("templateFooter")
const fragment = document.createDocumentFragment()
//const btnBotones = document.querySelectorAll('.card .btn')

const btnAumentar = (e) => {
    //console.log("Me diste click", e.target.dataset.id)
    carritoArray = carritoArray.map(item => {
        if(item.id === e.target.dataset.id){
            item.cantidad ++
        }
        return item
    })
    pintarCarrito()
}

const btnDisminuir = (e) => {
    //console.log("me diste click quitar ", e.target.dataset.id)
    carritoArray = carritoArray.filter( (item) => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0){
                item.cantidad --
                if(item.cantidad === 0) return
                return item     // si no es igual a cero devuelvo el item para modificar carritoArray
            }
        } else {
            return item     // devuelve el item sin modificar
        }
    })
    pintarCarrito()
}

const pintarFooter = () => {
    //console.log("Pintar footer")
    footer.textContent = ""

    const total = carritoArray.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0    //con parámetro cero devuelve un numero
    )
    //console.log(total)
    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector('span').textContent = total
    if (total > 0){
        footer.appendChild(clone)
    }
}


document.addEventListener("click", (e) => {
    //console.log(e.target.matches(".card .btn-outline-primary"))
    if (e.target.matches(".card .btn-outline-primary")){
        //console.log("Ejecutar agregar al carro")
        agregarAlCarrito(e)
    }

    // console.log(e.target.matches(".list-group-item .btn-success"))  // True cuando exista el elemento boton
    if (e.target.matches(".list-group-item .btn-success")){
        btnAumentar(e)
    }

    if (e.target.matches("#carrito .list-group-item .btn-danger")){
        btnDisminuir(e)
    }
})

let carritoArray = []; 

const agregarAlCarrito = (e) => {
    const producto = {
        titulo : e.target.dataset.fruta,
        id : e.target.dataset.fruta,
        cantidad : 1,
        precio: parseInt(e.target.dataset.precio)
    }
    //console.log(producto)

    const indice = carritoArray.findIndex( (item) => item.id === producto.id );
    // console.log(indice)

    if (indice === -1){
        // en caso no exista se agrega el producto
        carritoArray.push(producto)
    } else {
        // en caso si exista, se aumenta la cantidad
        carritoArray[indice].cantidad ++
    }
    //console.log(carritoArray)

    pintarCarrito();   // se pasa como parametro el array
};

const pintarCarrito = () => {
    carrito.textContent = "";

    carritoArray.forEach(item => {  
        // ahora clonamos el template para poder utilizarlo
        const clone = template.content.cloneNode(true);
        clone.querySelector('.text-white .lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;

        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad
        clone.querySelector(".btn-danger").dataset.id = item.id  //creo un data set en fotma dinámica
        clone.querySelector(".btn-success").dataset.id = item.id  //creo un data set en fotma dinámica

        // para evitar el reflow utilizamos el fragment
        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
    pintarFooter()

};

btnBotones.forEach( (btn) => btn.addEventListener("click", agregarAlCarrito) );

