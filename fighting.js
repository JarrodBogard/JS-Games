const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

// 16:9 aspect ratio //
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = .7

// class Sprite {
//     constructor({position}) {
//         this.position = position 
//         this.height = 150
//         this.width = 50
//     }

//     draw() {

//     }

//     update() {
//         this.draw()
//     }
// }

// class Fighter {
//     constructor({position, velocity, color = "red", offset}) {
//         this.position = position
//         this.velocity = velocity 
//         this.height = 150
//         this.width = 50
//         this.lastKey
//         this.attackBox = {
//             position: {
//                 x: this.position.x,
//                 y: this.position.y
//             },
//             width: 100,
//             height: 50,
//             offset
//             // offset: offset 
//         }
//         this.color = color
//         this.isAttacking
//         this.health = 100
//     }

//     draw() {
//         // sprite box //

//         // c.fillStyle = "red"
//         c.fillStyle = this.color
//         c.fillRect(this.position.x, this.position.y, this.width, this.height)

//         // attack box //
//         if(this.isAttacking) {
//             c.fillStyle = "green"
//             c.fillRect(
//                 this.attackBox.position.x, 
//                 this.attackBox.position.y, 
//                 this.attackBox.width, 
//                 this.attackBox.height
//             )
//         }

//     }

//     update() {
//         this.draw()
//         this.attackBox.position.x = this.position.x + this.attackBox.offset.x
//         this.attackBox.position.y = this.position.y
//         // this.position.y += this.position.y + 10
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y

//         if(this.position.y + this.height + this.velocity.y >= canvas.height) {
//             this.velocity.y = 0
//         } else {
//             this.velocity.y += gravity
//         }
//     }

//     attack() {
//         this.isAttacking = true
//         setTimeout(() => {
//             this.isAttacking = false
//         }, 100)
//     }
// }

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png"
}
)
const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/samuraiMack/idle.png",
    scale: 2.5,
    framesMax: 8,
    offset: {
        x: 215,
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: "./img/samuraiMack/idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "./img/samuraiMack/run.png",
            framesMax: 8,
            // image: new Image()
        },   
        jump: {
            imageSrc: "./img/samuraiMack/jump.png",
            framesMax: 2,
            // image: new Image()
        },   
        fall: {
            imageSrc: "./img/samuraiMack/fall.png",
            framesMax: 2,
            // image: new Image()
        },   
        attack1: {
            imageSrc: "./img/samuraiMack/attack1.png",
            framesMax: 6,
            // image: new Image()
        },   
        takeHit: {
            imageSrc: "./img/samuraiMack/takeHit.png",
            framesMax: 4,
            // image: new Image()
        },   
        death: {
            imageSrc: "./img/samuraiMack/death.png",
            framesMax: 6,
            // image: new Image()
        },   
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50,
        },
        width: 158.5,
        height: 50  
    } 
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/kenji/idle.png",
    scale: 2.5,
    framesMax: 4,
    offset: {
        x: 215,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: "./img/kenji/idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "./img/kenji/run.png",
            framesMax: 8,
            // image: new Image()
        },   
        jump: {
            imageSrc: "./img/kenji/jump.png",
            framesMax: 2,
            // image: new Image()
        },   
        fall: {
            imageSrc: "./img/kenji/fall.png",
            framesMax: 2,
            // image: new Image()
        },   
        attack1: {
            imageSrc: "./img/kenji/attack1.png",
            framesMax: 4,
            // image: new Image()
        },
        takeHit: {
            imageSrc: "./img/kenji/takeHit.png",
            framesMax: 3,
            // image: new Image()
        },
        death: {
            imageSrc: "./img/kenji/death.png",
            framesMax: 7,
            // image: new Image()
        },  
    },  
    attackBox: {
        offset: {
            x: -173.5,
            y: 50,
        },
        width: 170,
        height: 50  
    }    
})

const keys = {
    // player keys //
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    // enemy keys //
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

// let lastKey

// const rectangularCollision = ({ rectangle1, rectangle2}) => {
//     return (
//         rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
//         rectangle2.position.x &&
//         rectangle1.attackBox.position.x <= 
//         rectangle2.position.x + rectangle2.width &&
//         rectangle1.attackBox.position.y + rectangle1.attackBox.height >= 
//         rectangle2.position.y &&
//         rectangle1.attackBox.position.y <= 
//         rectangle2.position.y + rectangle2.height
//         )
// }

// let timer = 60
// let timerId

// const determineWinner = ({player, enemy, timerId}) => {
//     clearTimeout(timerId)
//     document.querySelector("#display-text").style.display = "flex"
//     if(player.health === enemy.health) {
//         document.querySelector("#display-text").innerHTML = "Tie"
//     } else if(player.health > enemy.health) {
//         document.querySelector("#display-text").innerHTML = "Player 1 Wins!"
//     } else if(enemy.health > player.health) {
//         document.querySelector("#display-text").innerHTML = "Player 2 Wins!"
//     }    
// }

// const decreaseTimer = () => {
//     if(timer > 0) {
//         timerId = setTimeout(decreaseTimer, 1000)
//         timer--
//         document.querySelector("#timer").innerHTML = timer
//     }    

//     if(timer === 0) {
//         determineWinner({player, enemy, timerId})
        // document.querySelector("#display-text").style.display = "flex"
        // if(player.health === enemy.health) {
        //     document.querySelector("#display-text").innerHTML = "Tie"
        //     // document.querySelector("#display-text").style.display = "flex"
        //     console.log("tie")
        // } else if(player.health > enemy.health) {
        //     document.querySelector("#display-text").innerHTML = "Player 1 Wins!"
        //     // document.querySelector("#display-text").style.display = "flex"
        // } else if(enemy.health > player.health) {
        //     document.querySelector("#display-text").innerHTML = "Player 2 Wins!"
        //     // document.querySelector("#display-text").style.display = "flex"
        // }
    // }
// }

decreaseTimer()


// recursive, infinte loop //
const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = "rgba(255, 255, 255, 0.15)"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    // player movement //
    player.velocity.x = 0

    // player.switchSprite("idle")
    // player.image = player.sprites.idle.image
    if(keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5
        player.switchSprite("run")
        // player.image = player.sprites.run.image
    } else if(keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5
        player.switchSprite("run")
        // player.image = player.sprites.run.image
    } else {
        player.switchSprite("idle")
    }

    if(player.velocity.y < 0) {
        player.switchSprite("jump")
        // player.image = player.sprites.jump.image
        // player.framesMax = player.sprites.jump.framesMax
    } else if(player.velocity.y > 0) {
        player.switchSprite("fall")
    }

    // if(player.velocity.y > 0) {
    //     player.switchSprite("fall")
    // }
    
    // enemy movement //
    enemy.velocity.x = 0

    if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5
        enemy.switchSprite("run")
    } else if(keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5
        enemy.switchSprite("run")
    } else {
        enemy.switchSprite("idle")
    }

    if(enemy.velocity.y < 0) {
        enemy.switchSprite("jump")
    } else if(enemy.velocity.y > 0) {
        enemy.switchSprite("fall")
    }

    // collision detection //
    if(
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && 
        player.framesCurrent === 4
    )   {
        enemy.takeHit()
        player.isAttacking = false
        // enemy.health -= 20
        // document.querySelector("#enemy-health").style.width = enemy.health + "%"
        gsap.to("#enemy-health", {
            width: enemy.health + "%"
        })
        // console.log("player is attacking")
    }

    if(player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    if(
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && 
        enemy.framesCurrent === 2
    )   {
        player.takeHit()
        enemy.isAttacking = false
        // player.health -= 20
        // document.querySelector("#player-health").style.width = player.health + "%"
        gsap.to("#player-health", {
            width: player.health + "%"
        })
        // console.log("enemy is attacking")
    }

    if(enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }
    // if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    //     player.attackBox.position.x <= enemy.position.x + enemy.width &&
    //     player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    //     player.attackBox.position.y <= enemy.position.y + enemy.height &&
    //     player.isAttacking
    //     ) {
    //         player.isAttacking = false
    //         console.log("go")
    // }

    // end game based on health condition//
    if(enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener("keydown", ({key}) => {
    if(!player.dead) {
        switch(key) {
            case "d":
                keys.d.pressed = true
                // lastKey = "d"
                player.lastKey = "d"
                // player.velocity.x = 1
                break
            case "a":
                keys.a.pressed = true
                lastKey = "a"
                player.lastKey = "a"
                // player.velocity.x = -1
                break
            case "w":
               player.velocity.y = -20
                break
            case " ":
                player.attack()
                // player.isAttacking = true
                break
        }
    }

    if(!enemy.dead) {
        switch(key) {
            case "ArrowRight":
                keys.ArrowRight.pressed = true
                enemy.lastKey = "ArrowRight"
                // lastKey = "ArrowRight"
                // player.velocity.x = 1
                break
            case "ArrowLeft":
                keys.ArrowLeft.pressed = true
                enemy.lastKey = "ArrowLeft"
                // lastKey = "ArrowLeft"
                // player.velocity.x = -1
                break
            case "ArrowUp":
               enemy.velocity.y = -20
                break
            case "ArrowDown":
                enemy.attack()
            //    enemy.isAttacking = true
                break
        }
    }
    // console.log(key)
}
)
window.addEventListener("keyup", ({key}) => {
    switch(key) {
        case "d":
            keys.d.pressed = false
            // player.velocity.x = 0
            break
        case "a":
            keys.a.pressed = false
            // player.velocity.x = 0
            break

        case "ArrowRight":
            keys.ArrowRight.pressed = false
            // player.velocity.x = 0
            break
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            // player.velocity.x = 0
            break
    } 
    // console.log(key)
})