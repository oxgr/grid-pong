import GridLed from "./GridLed.js"

class Model {

    led

}

export default function GridView( p ) {

    const model = new Model()

    p.setup = () => {

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

        model.led.draw()

    }

}