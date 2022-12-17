import { io } from 'socket.io'

export function setup() {

    const port = 3000
    const url = `http://localhost:${port}`
    const socket = io( url )

    createCanvas( 400, 400 )
    background( 'pink' )

}   

export function draw() {

}

export function fn ( p ) {

    p.setup = setup
    p.draw = draw

}