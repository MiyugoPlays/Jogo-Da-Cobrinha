const telinha = document.querySelector("canvas")
const ctx = telinha.getContext("2d")

const tamanho = 30

const cobra = [
    { x:300, y: 300 },
    { x:330, y: 300 }
]

const numeroAleatorio = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const posicaoAleatoria = () => {
    const numero = numeroAleatorio(0, telinha.width - tamanho)
    return Math.round(numero / 30) * 30
}

const comida = {
    x: posicaoAleatoria(),
    y: posicaoAleatoria(),
    cor: "yellow"
}

let direcao, loopID

const desenharComida = () => {
    const { x, y, cor } = comida
    ctx.fillStyle = cor
    ctx.fillRect(x, y, tamanho, tamanho)
}

const desenharCobra = () => {
    ctx.fillStyle = "green"
    cobra.forEach((posicao, index) => {

        if (index == cobra.length - 1) {
            ctx.fillStyle = "darkgreen"
        }


        ctx.fillRect(posicao.x, posicao.y, tamanho, tamanho)
    })
}

const moveCobra = () => {
    if (!direcao) return

    const cabeca = cobra[cobra.length -1]

    if(direcao == "direita"){
        cobra.push({ x: cabeca.x + tamanho, y: cabeca.y })
    }

    if(direcao == "esquerda"){
        cobra.push({ x: cabeca.x - tamanho, y: cabeca.y })
    }

    if(direcao == "baixo"){
        cobra.push({ x: cabeca.x, y: cabeca.y + tamanho })
    }

    if(direcao == "cima"){
        cobra.push({ x: cabeca.x, y: cabeca.y - tamanho })
    }

    cobra.shift()
}

const desenharGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30;i < telinha.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }

}

const checarSeComeu = () => {
    const cabeca = cobra[cobra.length -1]

    if (cabeca.x == comida.x && cabeca.y == comida.y){
        cobra.push(cabeca)

        let x = posicaoAleatoria()
        let y = posicaoAleatoria()
        
        white ()
    }
}

const jogoLoop = () => {
    clearInterval(loopID)

    ctx.clearRect(0, 0, 600, 600)
    desenharGrid()
    desenharComida()
    moveCobra()
    desenharCobra()
    checarSeComeu()

    loopID = setTimeout(() =>{
        jogoLoop()
    }, 300)    
}

jogoLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight"){
        direcao = "direita"
    }

    if (key == "ArrowLeft"){
        direcao = "esquerda"
    }

    if (key == "ArrowDown"){
        direcao = "baixo"
    }

    if (key == "ArrowUp"){
        direcao = "cima"
    }
    
})

