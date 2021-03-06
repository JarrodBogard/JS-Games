// import platform from "../.images/platform.png"

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = .5
let scrollOffset = 0

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        },
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30,
        this.height= 30
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity

        } else this.velocity.y = 0 
    }
}

class Platform {
    constructor({ x, y }) {
        this.position = {
            // x: 200,
            // y: 700
            x,
            y
        },

        this.width = 200,
        this.height = 20
    }

    draw() {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
// const platform = new Platform()
const platforms = [new Platform({x: 500, y: 700}), new Platform({x: 200, y: 400})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    platforms.forEach(platform => {
        platform.draw()
    })

    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            platforms.forEach(platform => {
                scrollOffset += 5
                platform.position.x -= 5
            })
        } else if(keys.left.pressed) {
            platforms.forEach(platform => {
                scrollOffset -= 5
                platform.position.x += 5
            })
        }
    } 

    console.log(scrollOffset)

    // platform collision detection //
    platforms.forEach(platform => {
        if(player.position.y + player.height <=
            platform.position.y &&
            player.position.y + player.height + 
            player.velocity.y >= platform.
            position.y && 
            player.position.x + player.width >= 
            platform.position.x && 
            player.position.x <= 
            platform.position.x + platform.width 
         ) {
            player.velocity.y = 0
        }
    })

    if(scrollOffset >= 2000) {
        console.log("You Win!")
    }
}

animate()

window.addEventListener("keydown", ({ key }) => {
    switch(key) {
        case "w":
            player.velocity.y -= 20
            console.log("up")
            break
        case "d":
            keys.right.pressed = true
            console.log("right")
            break
        case "a":
            keys.left.pressed = true
            console.log("left")
            break
        case "s":
            console.log("down")
            break
    }
})

window.addEventListener("keyup", ({ key }) => {
    switch(key) {
        case "w":
            console.log("up")
            break
        case "d":
            keys.right.pressed = false
            console.log("right")
            break
        case "a":
            keys.left.pressed = false
            console.log("left")
            break
        case "s":
            console.log("down")
            break
    }
})

