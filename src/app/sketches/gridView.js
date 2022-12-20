import GridLed from "../components/GridLed.js"
import * as Socket from 'socket.io-client'
import Model from "../components/Model.js"

class GridModel extends Model{

    led
    socket

}

export default function GridView( p ) {

    const model = new GridModel()

    p.setup = () => {

        model.port = 3000
        model.url = `http://localhost:${model.port}`
        model.socket = Socket.io( model.url )

        setupSocketHandlers( model.socket )

        const halfWidth = window.innerWidth * 0.5
        
        p.createCanvas( halfWidth, halfWidth )

        model.led = new GridLed( p )

        console.log( model.led );
        
    }

    p.draw = () => {

        // model.led.randomise()
        model.led.draw()

    }

    function setupSocketHandlers( socket ) {

        // socket.on( 'key', msg => {
        //     console.log( msg )
        // } )

        socket.on( 'led', msg => {
            // console.log( msg )
            model.led.update( msg )
        } )
    }

}