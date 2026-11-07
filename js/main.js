// Lógica de la página principal: leer filtros y mostrar publicaciones.

const grid = document.getElementById("pets-grid");
const contador = document.getElementById("results-count");
const inputTexto = document.getElementById("filtro-texto");
const selectTipo = document.getElementById("filtro-tipo");
const selectEstado = document.getElementById("filtro-estado");

// Evita que texto escrito por usuarios se interprete como HTML (seguridad)
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function crearTarjeta(pet) {
  const emoji = pet.tipo === "perro" ? "🐶" : "🐱";
  const foto = pet.foto
    ? `<img src="${escapar(pet.foto)}" alt="Foto de ${escapar(pet.nombre)}">`
    : emoji;

  return `
    <article class="pet-card">
      <div class="pet-photo">
        ${foto}
        <span class="badge badge-${pet.estado}">${pet.estado}</span>
      </div>
      <div class="pet-info">
        <h3>${escapar(pet.nombre)}</h3>
        <p class="pet-zona">📍 ${escapar(pet.zona)}</p>
        <p class="pet-desc">${escapar(pet.descripcion)}</p>
      </div>
    </article>
  `;
}

async function mostrarPublicaciones() {
  const filtros = {
    texto: inputTexto.value,
    tipo: selectTipo.value,
    estado: selectEstado.value
  };

  const pets = await obtenerPublicaciones(filtros);
  contador.textContent = `${pets.length} publicación(es) encontrada(s)`;

  if (pets.length === 0) {
    grid.innerHTML = '<p class="empty-message">No se encontraron publicaciones.</p>';
    return;
  }
  grid.innerHTML = pets.map(crearTarjeta).join("");
}

// Cada vez que cambia un filtro, se vuelve a buscar
inputTexto.addEventListener("input", mostrarPublicaciones);
selectTipo.addEventListener("change", mostrarPublicaciones);
selectEstado.addEventListener("change", mostrarPublicaciones);

// Carga inicial
mostrarPublicaciones();
