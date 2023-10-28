// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Evenlist

cargarEventListeners ();
function cargarEventListeners () {
    // Cuando agregamos un curso presionando el boton "Agregar al carrito"
    
    listaCursos.addEventListener('click',  agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML();  //limpiamos el html
    } )
};

//Funciones

function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
       const cursoSelecionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSelecionado);
    }    
}

//Eliminar curso del carrito

function eliminarCurso(e) {
   
    if( e.target.classList.contains('borrar-curso') ){

        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de aritucloCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso =>  curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}


//lee el contenido del HTML al que le dimos click y extrae la informacion del curso como un objeto
function leerDatosCurso (curso){
    // console.log(curso);

    //crear el objeto con el contenido del curso selecionado actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    
    //revisa si un elemento ya existe en el carrito
     const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id );

    if(existe){
        // actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id ) {
                curso.cantidad ++
                return curso; //retorno el objeto actualizado
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}


//Muestra el Carrito de compras en el html
function carritoHTML () {

    //limpiar el carrito HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="100" > </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${curso.cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>    
        `;

        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//funcion elimina los cursos del tbody generado para el carrito HTML

function limpiarHTML () {
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



