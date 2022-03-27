import {GlowParticle} from "./glowParticle.js";
import { rgb } from "./app.types"

const COLORS: rgb[] = [
    {r: 0, g: 120, b: 162}, // blue 1
    // {r: 0, g: 167, b: 228}, // blue 2
    {r: 0, g: 187, b: 177}, // aqua
    {r: 143, g: 202, b: 47}, // green
    {r: 255, g: 210, b: 0}, // yellow
    {r: 244, g: 74, b: 150}, // pink
]

class App {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null
    private pixelRatio: number
    private totalParticles: number
    private particles: any[]
    private maxRadius: number
    private minRadius: number
    private stageWidth: number
    private stageHeight: number

    constructor() {
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 15
        this.particles = []
        this.maxRadius = 900
        this.minRadius = 400

        this.stageWidth = 1
        this.stageHeight = 1

        this.init()
    }

    private init() {
        window.addEventListener('resize', this.resize.bind(this), false)
        this.resize()

        window.requestAnimationFrame(this.animate.bind(this))
    }

    private resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        if(this.ctx) {
            this.ctx.scale(this.pixelRatio, this.pixelRatio)
            this.ctx.globalCompositeOperation = 'saturation'
        }

        this.createParticles()
    }

    private createParticles() {
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

    private animate() {
        window.requestAnimationFrame(this.animate.bind(this))
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

            for (let i = 0; i < this.totalParticles; i++) {
                const item: GlowParticle = this.particles[i]
                item.animate(this.ctx, this.stageWidth, this.stageHeight)
            }
        }
    }
}

window.onload = () => {
    new App()
}
