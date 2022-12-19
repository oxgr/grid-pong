// Reference for types / autocomplete
// /* /// <reference path="../node_modules/@types/p5/global.d.ts" /> */

import * as Socket from 'socket.io'
import { GridKey } from 'Controller'
import Board from './Board.js'
import GridLed from './GridLed.js'
import Ball from './Ball.js'
import Wall from './Wall.js'

class Model {

    port
    url
    socket

    boards
    walls

}

export default function Pong( p ) {

    // const pong = new Pong( p )
    const model = new Model()


    p.setup = () => {

        model.port = 3000
        model.url = `http://localhost:${model.port}`
        model.socket = Socket.io( model.url )
        setupSocketHandlers( model.socket )

        console.log( window );

        const halfWidth = window.innerWidth * 0.5

        p.createCanvas( halfWidth, halfWidth )
        p.background( 'pink' )

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

        model.ball = new Ball( p )



    }

    p.draw = () => {

        p.fill( 'black' )
        // p.noStroke()
        p.rect( 0, 0, p.width, p.height )

        p.stroke( 'black' )
        p.circle( p.mouseX, p.mouseY, 10 )

        model.boards.left.draw()
        model.boards.right.draw()

        const collidedWall =
            Object.values( model.boards )
                .find( board => board.collidedWith( model.ball ) ) ??
            Object.values( model.walls )
                .find( wall => wall.collidedWith( model.ball ) )

        if ( collidedWall ) {
            model.ball.bounce( collidedWall )
        }

        model.ball.move()
        model.ball.draw()

        // const led = sampleSketchToLed( p )
        // model.socket.emit( 'led', led )

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
                const led = sampleSketchToLed( p ).plainArray()
                model.socket.emit( 'led', led )
                // model.socket.emit( 'led', randomLed() )
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
        console.log( event )
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

    function randomLed() {
        return new GridLed( p ).randomise().plainArray()
    }

    function sampleSketchToLed( p ) {

        const led = new GridLed( p )

        const widthEighth = p.width * 0.125
        const heightEighth = p.width * 0.125
        const pixelBlock = widthEighth * heightEighth

        // console.log( avg )
        
        // p.loadPixels()
        

        for ( const row of Array( GridLed.ROWS ).keys() ) {
            for ( const col of Array( GridLed.COLS ).keys() ) {

                const x = row * heightEighth
                const y = col * widthEighth

                const c = p.get( x, y, widthEighth, heightEighth )
                c.loadPixels()
                const sum = c.pixels.reduce( ( prev, curr ) => prev + curr )
                const avg = Math.floor( sum / c.pixels.length )
                const map = Math.floor( avg * 0.0625 )

                led.set( map, row, col )

                // const blockCount = ( row * col ) + col
                // const start = pixelBlock * blockCount
                // let sum = 0
                // for ( let i = start, j = 0, count = 0; count < pixelBlock; i++ ) {
                    
                //     const pixel = p.pixels[ i ]
                // }
            }

        }

        // console.log( led );

        return led

    }

}
        
            
        

        

