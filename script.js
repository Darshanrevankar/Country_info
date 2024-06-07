const search_form = document.getElementById("search_form");
const search_bar = document.getElementById("search_bar");
const container = document.getElementById("container");
const products_preview = document.getElementById("products_preview");

async function fetchApiData() {
    const url = "https://restcountries.com/v3.1/all";
    const response = await fetch(url);
    const data = await response.json();
    data.forEach((val) => {
        createCard(val);
    });
    addClickEventToCards();
}

fetchApiData();

function createCard(data) {
    const products_container = document.createElement("div");
    products_container.classList.add("products_container");
    products_container.innerHTML = `
        <div class="product" data-name="${data.name.common}">
            <img src="${data.flags.svg}" alt="${data.name.common} flag" />
            <h1>${data.name.common}</h1>
        </div>`;
    container.appendChild(products_container);
    createPreview(data);
}

function createPreview(data) {
    const previewBox = document.createElement("div");
    previewBox.classList.add("preview");
    previewBox.setAttribute("data-target", data.name.common);
    previewBox.innerHTML = `
        <i class="fas fa-times"></i>
        <h3>${data.name.common}</h3>
        <img src="${data.flags.svg}" alt="${data.name.common} flag" />
        <p>Capital: ${data.capital ? data.capital[0] : 'N/A'}</p>
        <p>Region: ${data.region}</p>
        <p>Population: ${data.population.toLocaleString()}</p>
        <p>Area: ${data.area.toLocaleString()} km²</p>
    `;
    products_preview.appendChild(previewBox);

    previewBox.querySelector('.fa-times').addEventListener('click', () => {
        previewBox.classList.remove('active');
        products_preview.style.display = 'none';
    });
}

function addClickEventToCards() {
    document.querySelectorAll('.products_container .product').forEach(product => {
        product.onclick = () => {
            products_preview.style.display = 'flex';
            let name = product.getAttribute('data-name');
            document.querySelectorAll('.products_preview .preview').forEach(preview => {
                let target = preview.getAttribute('data-target');
                if (name === target) {
                    preview.classList.add('active');
                } else {
                    preview.classList.remove('active');
                }
            });
        };
    });
}

search_form.addEventListener("input", (e) => {
    const searchitem = e.target.value;
    const cards = document.querySelectorAll(".products_container");
    cards.forEach((val) => {
        if (val.innerText.toLowerCase().includes(searchitem.toLowerCase())) {
            val.style.display = "block";
        } else {
            val.style.display = "none";
        }
    });
});
