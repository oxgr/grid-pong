import * as Socket from 'socket.io-client'

import { GridKey } from '../components/GridKey.js'
import Model from '../components/Model.js'
import Board from '../components/Board.js'
import GridLed from '../components/GridLed.js'
import Ball from '../components/Ball.js'
import Wall from '../components/Wall.js'
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

        drawBackground( p )

        model.boards.left.draw()
        model.boards.right.draw()

        switch ( model.state ) {

            case 0:
                p.fill( 150)
                p.stroke( 'white' )
                p.strokeWeight( 25 )

                const 
                    sizeLo = 20,
                    sizeHi = 200,
                    rate = 2

                // model.circleSize = model.circleSize < sizeHi ? model.circleSize + rate : sizeLo
                // model.circleSize += rate
                
                p.circle( 
                    model.ball.pos.x,
                    model.ball.pos.y,
                    // p.width * 0.5, 
                    // p.height * 0.5, 
                    model.circleSize)

                model.circleSize += rate

                if ( model.circleSize > sizeHi ) {
                    model.state = 1
                }
                
                break

            case 1:

                // TODO: Add countdown
                model.state = 2

                model.ball.reset()
                break

            case 2:
                model.ball.move()
                model.ball.draw()

                const collidedWall = checkCollision()

                if ( collidedWall ) model.state = collisionHandler( collidedWall )

                if ( model.state === 0 ) model.circleSize = 20
                break
        }

        const led = sampleSketchToLed( p ).plainArray()
        model.socket.emit( 'led', led )

    }

    p.keyPressed = ( event ) => {

        const emitKeyMap = {
            'w': 'TOP_LEFT',
            's': 'BTM_LEFT',
            'ArrowLeft': 'TOP_RIGHT',
            'ArrowRight': 'BTM_RIGHT',
        }

        // if ( Object.entries( emitKeyMap ).some( k => k === event.key))
        //     emitKey( emitKeyMap[ event.key ], 1 )

        switch ( event.key ) {

            case 'w':
                emitKey( emitKeyMap[ 'w' ], 1 )
                model.boards.left.move( 'up' )
                break

            case 's':
                emitKey( emitKeyMap[ 's' ], 1 )
                model.boards.left.move( 'down' )
                break

            case 'ArrowRight':
                emitKey( emitKeyMap[ 'ArrowRight' ], 1 )
                model.boards.right.move( 'up' )
                break

            case 'ArrowLeft':
                emitKey( emitKeyMap[ 'ArrowLeft' ], 1 )
                model.boards.right.move( 'down' )
                break

            case ' ':
                // model.socket.emit( 'led', randomLed() )
                console.log( model )
                break


        }

        return false

    }

    p.keyReleased = ( event ) => {

        // console.log( event )

        switch ( event.key ) {

            case 'w':
                emitKey( 'TOP_LEFT', 0 )
                break

            case 's':
                emitKey( 'BTM_LEFT', 0 )
                break

            case 'ArrowLeft':
                emitKey( 'TOP_RIGHT', 0 )
                break

            case 'ArrowRight':
                emitKey( 'BTM_RIGHT', 0 )
                break

                return false
        }
    }

    p.mouseClicked = ( event ) => {
        // console.log( event )
    }

    function drawBackground() {

        // p.fill( 'black' )
        p.fill( 0, 0, 0, model.global.trails )
        p.noStroke()
        p.rect( 0, 0, p.width, p.height )        

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

    function checkCollision() {

        return Object.values( model.boards )
            .find( board => board.collidedWith( model.ball ) ) ??
        Object.values( model.walls )
            .find( wall => wall.collidedWith( model.ball ) )

    }

    function collisionHandler( collidedWall ) {
        
        // console.log( 'Collided with', collidedWall.side, collidedWall.constructor?.name )

        if ( ( collidedWall.side === 'left' ||
            collidedWall.side === 'right' ) &&
            !( collidedWall instanceof Board ) ) {

            return 0        

        } else {

            model.ball.bounce( collidedWall )

        }

        return model.state
    }

    function randomLed() {
        return new GridLed( p ).randomise().plainArray()
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






