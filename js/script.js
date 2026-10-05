const btnMenu = document.querySelector(".btn-abrir-menu");
const menu = document.querySelector(".menu-mobile");
const overlay = document.querySelector(".overlay-menu")


btnMenu.addEventListener('click',() => {
    menu.classList.add('abrir');
})

menu.addEventListener('click',() => {
    menu.classList.remove('abrir');
})

overlay.addEventListener('click',() => {
    menu.classList.remove('abrir');
})


// =========================
// CARROSSEL DE TECNOLOGIAS
// =========================

const tecnologias = document.querySelectorAll(".especialidades-box");
const dots = document.querySelectorAll(".carousel-dots .dot");

let slideAtual = 0;
let intervalo;

function mostrarSlide(index) {
    tecnologias.forEach((tecnologia, i) => {
        tecnologia.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

    slideAtual = index;
}

function proximoSlide() {
    slideAtual++;

    if (slideAtual >= tecnologias.length) {
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);
}

function iniciarCarrossel() {
    clearInterval(intervalo);

    intervalo = setInterval(() => {
        proximoSlide();
    }, 4500);
}

// Clique nas bolinhas
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        mostrarSlide(index);
        iniciarCarrossel();
    });
});

// Swipe no celular
const carouselTecnologias = document.querySelector(
    "section.especialidades .flex"
);

let inicioToque = 0;

carouselTecnologias.addEventListener("touchstart", (event) => {
    inicioToque = event.changedTouches[0].clientX;
});

carouselTecnologias.addEventListener("touchend", (event) => {
    const fimToque = event.changedTouches[0].clientX;
    const distancia = inicioToque - fimToque;

    // Ignora movimentos muito pequenos
    if (Math.abs(distancia) < 50) {
        return;
    }

    // Swipe para esquerda -> próximo
    if (distancia > 0) {
        slideAtual++;

        if (slideAtual >= tecnologias.length) {
            slideAtual = 0;
        }
    }

    // Swipe para direita -> anterior
    else {
        slideAtual--;

        if (slideAtual < 0) {
            slideAtual = tecnologias.length - 1;
        }
    }

    mostrarSlide(slideAtual);
    iniciarCarrossel();
});

mostrarSlide(0);
iniciarCarrossel();