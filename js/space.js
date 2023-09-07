function realizarBusqueda() {
    const valorBuscado = document.getElementById("inputBuscar").value;
    const apiUrl = `https://images-api.nasa.gov/search?q=${valorBuscado}`;
    const contenedor = document.getElementById("contenedor");

    // Limpiar el contenedor antes de mostrar nuevos resultados
    contenedor.innerHTML = '';

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            mostrarResultados(data, contenedor);
        })
        .catch((error) => console.error(error));
}

function mostrarResultados(data, contenedor) {
    // Recorrer los resultados y crear elementos para cada uno
    data.collection.items.forEach((item) => {
        const imageUrl = item.links[0].href;
        const title = item.data[0].title;
        const description = item.data[0].description;
        const date = item.data[0].date_created;

        const imageDiv = document.createElement("div");
        imageDiv.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Fecha: ${date}</p>
      `;

        contenedor.appendChild(imageDiv);
    });
}

document.getElementById("btnBuscar").addEventListener("click", realizarBusqueda);
