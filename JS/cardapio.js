const fade = document
    .getElementById("fade")

const modal = document
    .getElementById("modal")

function abrir() {
    fade.classList.remove("hide")
    fade.classList.add("fade")

    modal.classList.remove("hide")
    modal.classList.add("modal")
}

function fechar() {
    fade.classList.add("hide")
    fade.classList.remove("fade")

    modal.classList.add("hide")
    modal.classList.remove("modal")
}
}