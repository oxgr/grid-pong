import * as Socket from 'socket.io'
import { GridKey } from 'Controller'

import Model from './Model.js'
import Board from './Board.js'
import GridLed from './GridLed.js'
import Ball from './Ball.js'
import Wall from './Wall.js'
// import p5 from 'p5'

class SketchModel extends Model {

    port
    url
    socket

    boards
    walls

    led

    global

    /**
     * 0: stop
     * 1: play
     */
    state

    blur

}

function run( p ) {

    const model = Sketch.model

    p.setup = () => {

        const halfWidth = window.innerWidth * 0.5
        p.createCanvas( halfWidth, halfWidth )
        p.background( 'pink' )
        p.drawingContext.willReadFrequently = true

        console.log( p );

        model.port = 3000
        model.url = `http://localhost:${model.port}`
        model.socket = Socket.io( model.url )
        setupSocketHandlers( model.socket )

        model.global = {
            trails: 100,
        }

        model.state = 1

        model.walls = {
            top: new Wall( p, 'top' ),
            bottom: new Wall( p, 'bottom' ),
            left: new Wall( p, 'left' ),
            right: new Wall( p, 'right' ),
        }

        model.boards = {
            left: new Board( p, 'left' ),
            right: new Board( p, 'right' )
        }

        model.ball = new Ball( p, ( p.width / GridLed.COLS ) * 1.2 )

        model.led = new GridLed( p )

        model.circleSize = 10
        model.resetDuration = 5000

        model.blur = {
            enable: false,
            value: 1
        }

        /*********** */

        model.update = ( event ) => {

            const source = event.target.controller_.binding.target.obj_.opts.source

            model.setNested( source, event.value )

        }

        model.addParam( {
            source: 'ball.speed',
            min: 0,
            max: 10,
            step: 0.1,
        })

        model.addParam( {
            source: 'ball.chaos',
            min: 0,
            max: 5,
            step: 0.1,
        })

        model.addParam( {
            source: 'global.trails',
            min: 0,
            max: 255,
            step: 1,
        })

        model.addParam( {
            source: 'blur.enable',
        })

        model.addParam( {
            source: 'blur.value',
            min: 0,
            max: 4,
            step: 0.1,
        })

        

    }

    p.draw = () => {

        p.background

        const led = sampleSketchToLed( p ).plainArray()
        model.socket.emit( 'led', led )

    }

    p.keyPressed = ( event ) => {
    }

    p.keyReleased = ( event ) => {
    }

    p.mouseClicked = ( event ) => {
    }

    function emitKey( pos, s ) {
        model.socket.emit(
            'key',
            new GridKey(
                GridKey[ pos ].x,
                GridKey[ pos ].y,
                s
            )
        )
    }

    function setupSocketHandlers( socket ) {

        model.socket.on( 'key', msg => {
            console.log( msg )
        } )

        // model.socket.on( 'led', msg => {
        //     console.log( msg )
        // } )
    }

    function sampleSketchToLed( p ) {

        const widthEighth = p.width * 0.125
        const heightEighth = p.width * 0.125
        const pixelBlock = widthEighth * heightEighth

        const c = p.get( 0, 0, p.width, p.height )
        const res = 8
        const density = res / GridLed.ROWS
        if( model.blur.enable ) c.filter( 'blur', model.blur.value )
        c.resize( res, res )
        // c.resize( p.width, p.height )
        // p.image( c, 0, 0 )
        c.loadPixels()
        // console.log( c );

        for ( const row of Array( GridLed.ROWS ).keys() ) {
            for ( const col of Array( GridLed.COLS ).keys() ) {

                let x = col, y = row, d = density; // set these to the coordinates
                let off = ( y * c.width + x ) * d * 4;
                let comp = [
                    c.pixels[ off ],
                    c.pixels[ off + 1 ],
                    c.pixels[ off + 2 ],
                    // c.pixels[off + 3]
                ];

                let avg = comp.reduce( ( p, c ) => p + c ) / comp.length
                const map = Math.floor( avg * 0.0625 )

                model.led.set( map, row, col )

            }

        }

        return model.led

    }

}

export default class Sketch {

    /**
     * Properties are static because they need to be:
     * - editable from inside scoped p5 function i.e. run()
     * - accessible from outside the scope in main by Gui
     * */
    static model = new SketchModel()

    static run = run

}






