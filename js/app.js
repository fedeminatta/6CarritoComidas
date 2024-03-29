// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
let articulosCarrito = [];
const btnSun = document.querySelector('#sun');
const rootStyle = document.documentElement.style;
const cardImg = document.querySelector('.card img');
// Listeners
cargarEventListeners();

function cargarEventListeners() {
	// Dispara cuando se presiona "Agregar Carrito"
	listaCursos.addEventListener('click', agregarCurso);

	// Cuando se elimina un curso del carrito
	carrito.addEventListener('click', eliminarCurso);

	// Muestra los cursos del localStorage
	document.addEventListener('DOMContentLoaded', () => {
		articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

		carritoHTML();
	});
}

// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
	e.preventDefault();
	// Delegation para agregar-carrito
	if (e.target.classList.contains('agregar-carrito')) {
		const curso = e.target.parentElement.parentElement;
		// Enviamos el curso seleccionado para tomar sus datos
		leerDatosCurso(curso);
	}
}

// Lee los datos del curso
function leerDatosCurso(curso) {
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
		const cursos = articulosCarrito.map((curso) => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso;
			} else {
				return curso;
			}
		});
		articulosCarrito = [...cursos];
	} else {
		articulosCarrito = [...articulosCarrito, infoCurso];
	}

	// console.log(articulosCarrito)

	// console.log(articulosCarrito)
	carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('borrar-curso')) {
		// e.target.parentElement.parentElement.remove();
		const cursoId = e.target.getAttribute('data-id');

		// Eliminar del arreglo del carrito
		articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

		carritoHTML();
	}
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
	// limpia el html
	vaciarCarrito();

	// recorre el carrito y genera el html
	articulosCarrito.forEach((curso) => {
		const row = document.createElement('tr');
		row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
		// Agrega el HTML del carrito en el tbody
		contenedorCarrito.appendChild(row);
	});

	// Agregar el carrito de compras al Storage
	sincronizarStorage();
}

function sincronizarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
	// forma lenta
	// contenedorCarrito.innerHTML = '';

	// forma rapida (recomendada)
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}

// eventos del modo oscuro
btnSun.addEventListener('click', darkMode);

//
function darkMode() {
	if (btnSun.classList.contains('fa-moon')) {
		btnSun.classList.remove('fa-moon');
		btnSun.classList.add('fa-sun');
		rootStyle.setProperty('--bg-primary', '#191919');
		rootStyle.setProperty('--bg-secundary', '#202020');
		rootStyle.setProperty('--text', '#fff');
		rootStyle.setProperty('--shadow', '#131313');
		rootStyle.setProperty('--bg-card', '#191919');
	} else if (btnSun.classList.contains('fa-sun')) {
		btnSun.classList.remove('fa-sun');
		btnSun.classList.add('fa-moon');
		rootStyle.setProperty('--bg-primary', '#fff');
		rootStyle.setProperty('--bg-secundary', '#f8f8f8');
		rootStyle.setProperty('--text', '#000');
		rootStyle.setProperty('--shadow', '#cacaca');
		rootStyle.setProperty('--bg-card', '#fff');
	}
}
