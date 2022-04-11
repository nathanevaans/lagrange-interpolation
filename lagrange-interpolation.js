class Point {
    constructor(x, y, colour = 'black') {
        this.x = x - (CANVAS_SIDE / 2)
        this.y = (CANVAS_SIDE / 2) - y
        this.colour = colour
        // this.show()
    }

    show() {
        ctx.beginPath();
        ctx.arc(this.x + (CANVAS_SIDE / 2), (CANVAS_SIDE / 2) - this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour
        ctx.fill();
    }
}

// CANVAS
const CANVAS_SIDE = 800
const canvas = document.getElementById('canvas')
canvas.width = CANVAS_SIDE
canvas.height = CANVAS_SIDE
const ctx = canvas.getContext('2d')

// MOUSE EVENTS
canvas.onclick = (event) => {
    // pointsMap.add(new Point(event.clientX, event.clientY))
    const p = new Point(event.clientX, event.clientY)
    if(!pointsMap.has(p.x)) { pointsMap.set(p.x, p)}

    const polynomial = generatePolynomial()
    draw(polynomial)
}

// LAGRANGE INTERPOLATION
pointsMap = new Map()
const generatePolynomial = () => {
    const pointsArray = [...pointsMap.values()]
    return (x) => {
        let temp1 = 0
        for (let i = 0; i < pointsArray.length; i++) {
            let temp2 = 1
            for (let j = 0; j < pointsArray.length; j++) {
                if (i !== j) temp2 *= (x - pointsArray[j].x) / (pointsArray[i].x - pointsArray[j].x)
            }
            temp1 += (pointsArray[i].y * temp2)
        }
        return temp1
    }
}

// PRINT AXIS
const showAxes = () => {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.moveTo(0, CANVAS_SIDE / 2)
    ctx.lineTo(CANVAS_SIDE, CANVAS_SIDE / 2)
    ctx.moveTo(CANVAS_SIDE / 2, 0)
    ctx.lineTo(CANVAS_SIDE / 2, CANVAS_SIDE)
    ctx.stroke()
}
const showPoints = () => pointsMap.forEach(p => p.show())
const plotFunction = (f) => {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'green'
    for (let i = - CANVAS_SIDE / 2; i < CANVAS_SIDE / 2; i++) {
        if (i === -CANVAS_SIDE / 2) {
            ctx.moveTo(0, CANVAS_SIDE / 2)
        } else {
            const y = f(i)
            ctx.lineTo(i + (CANVAS_SIDE / 2), (CANVAS_SIDE / 2) - y)
        }
    }
    ctx.stroke()
}
const draw = (f) => {
    ctx.clearRect(0, 0, CANVAS_SIDE, CANVAS_SIDE)
    showAxes()
    showPoints()
    plotFunction(f)
}

showAxes()

