import GridLed from "./GridLed.js"
import * as Socket from 'socket.io'

class Model {

    led
    socket

}

export default function GridView( p ) {

    const model = new Model()

    p.setup = () => {

        model.port = 3000
        model.url = `http://localhost:${model.port}`
        model.socket = Socket.io( model.url )

        setupSocketHandlers( model.socket )

        const halfWidth = window.innerWidth * 0.5
        
        p.createCanvas( halfWidth, halfWidth )
        p.rectMode( p.CENTER )

        model.led = new GridLed( p )

        console.log( model.led );
        
    }

    p.draw = () => {

        const pad = 20, pad2 = pad * 2, padHalf = pad * 0.5
        const centerX = p.width * 0.5
        const centerY = p.height * 0.5

        // p.noStroke()
        p.fill( '#ddd' )
        p.rect( centerX, centerY, p.width - pad , p.height - pad, padHalf  )

        // model.led.randomise()
        model.led.draw()

    }

    function setupSocketHandlers( socket ) {

        // socket.on( 'key', msg => {
        //     console.log( msg )
        // } )

        socket.on( 'led', msg => {
            console.log( msg )
            model.led.update( msg )
        } )
    }

}