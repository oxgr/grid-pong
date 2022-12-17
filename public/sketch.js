// import { io } from 'socket.io'
import * as Socket from 'socket.io'

let count

export function setup() {

    count = 1

    const port = 3000
    const url = `http://localhost:${port}`
    const socket = Socket.io( url )

    let led = [ [ 0, 1 ], [ 2, 3 ] ]

    socket.emit( 'led', led )

    createCanvas( 400, 400 )
    background( 'pink' )

}

export function draw() {

    // console.log(count++)

}

export function fn( p ) {

    p.setup = setup
    p.draw = draw

}