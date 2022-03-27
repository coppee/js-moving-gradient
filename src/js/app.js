import {GlowParticle} from "./glowParticle.js";

const COLORS = [
    {r: 0, g: 120, b: 162}, // blue 1
    // {r: 0, g: 167, b: 228}, // blue 2
    {r: 0, g: 187, b: 177}, // aqua
    {r: 143, g: 202, b: 47}, // green
    {r: 255, g: 210, b: 0}, // yellow
    {r: 244, g: 74, b: 150}, // pink
]

class App {
    constructor() {
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1

        this.totalParticles = 15
        this.particles = []
        this.maxRadius = 900
        this.minRadius = 400

        this.init()
    }

    init() {
        window.addEventListener('resize', this.resize.bind(this), false)
        this.resize()

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)

        this.ctx.globalCompositeOperation = 'saturation'

        this.createParticles()
    }

    createParticles() {
        let curColor = 0
        this.particles = []

        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor]
            )

            if (++curColor >= COLORS.length) {
                curColor = 0;
            }

            this.particles[i] = item
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i]
            item.animate(this.ctx, this.stageWidth, this.stageHeight)
        }
    }
}

window.onload = () => {
    new App()
}
