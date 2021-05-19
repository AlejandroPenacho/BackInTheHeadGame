export var standardPlayerConfig = {
    size : 70,
    maxSpeed : 200,
    jumpSpeed : 600,
    left : {
        color : "orange",
        position : [200,500],
        keybinding : {
            jump : "s",
            left : "z",
            right : "c",
            kick : "b"          
        }
    },
    right : {
        color : "cyan",
        position : [800,500],
        keybinding : {
            jump : "ArrowUp",
            left : "ArrowLeft",
            right : "ArrowRight",
            kick : "l"     
        }        
    }
}

export var standardBallConfig = {
    initialPosition : [500, 200],
    size : 50,
    dragCoefficient : 0.00003
}

export var standardGameConfig;

export var standardSceneConfig;
