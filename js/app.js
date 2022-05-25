// variables
const carrito = document.querySelector('#carrito');
const contenedorCarritoBtn = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarritos = [];


cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carritos
    carrito.addEventListener('click', eliminaCurso);

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarritos = []; // reiniciamos el array
        limpiarHTML();

    }); //('click',vaciarCarrito)

}
cargarEventListeners();
// Funciones

function agregarCurso(e) {
    e.preventDefault(); // impedimos que suba por defecto el html

    if (e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    
    }

};

function eliminaCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulosCarritos por el data-id 
    articulosCarritos = articulosCarritos.filter(curso => curso.id !== cursoId);

    carritoHTML();
    }
}

//eliminacurso
function leerDatos(e){
   
    if (e.target.classList.contains('borar-curso')) {
        
    }
}

//Lee el contenido del Html del producto pulsado y lo trae
function leerDatosCurso(curso){    
// Creando Ojtetos y lo que se va a mostrar
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    }
//Reviasa si un elemento exite
const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
if (existe) {

    const cursos = articulosCarritos.map(curso => {
        if (curso.id === infoCurso.id)  {
            curso.cantidad++;
            return curso; //Retorna el objeto actualizado
        } else {
            return curso; // Retorna los objetos que nos son duplicados
        }
    });
    articulosCarritos =[...cursos];
    
} else{
    // Agregar al acrrito mediante un ArrayObject y spread Operator
articulosCarritos = [...articulosCarritos, infoCurso]; 
    
}



console.log(articulosCarritos);

carritoHTML();
}

// Mostar la imagen del carrito de compras
function carritoHTML(){

  limpiarHTML();

    // con el foreach recorremos todo y generamos el html 
    articulosCarritos.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width=100>

        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;
        //agrega el Carrito en el tbody
        contenedorCarritoBtn.appendChild(row);
    });
};
function limpiarHTML (){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma rapida mientras hay un hijo comprobando hijo
    while (contenedorCarritoBtn.firstChild){
        contenedorCarritoBtn.removeChild(contenedorCarritoBtn.firstChild);
    }
}
