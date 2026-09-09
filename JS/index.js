//Declareção de Variavel
let indice = 0
let images = [
    "IMG/bolo1.png",
    "IMG/bolo2.png",
    "IMG/bolo3.png",
]

//Funçao para trocar a imagem
function trocar(){
    let img = document.getElementById("img")
    img.src = images[indice]
}

// Lógica para trocar de imagem
setInterval(function() {
    trocar()
    indice++

    if (indice >= images.length){
        indice = 0
    }

}, 5000)

trocar()