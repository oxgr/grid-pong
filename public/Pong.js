// Reference for types / autocomplete
/// <reference path="../node_modules/@types/p5/global.d.ts" />

import * as Socket from 'socket.io'
import { GridKey } from 'Controller'
import p5Sketch from './Sketch.js'

class Model {
    
}

export default function Pong( p ) {

    // const pong = new Pong( p )
    const model = new Model() 

    p.setup = () => {



    }

    p.draw = () => {



    }

}

export default class Pong extends p5Sketch {

    constructor( p ) {
        this.p = p
    }
    
    port = 3000
    url = `http://localhost:${this.port}`
    socket = Socket.io( this.url )

    setup( p ) {

        return () => {

            // console.error( {model:this.model} )

            setupSocketHandlers( socket )

            let led = [ [ 0, 1 ], [ 2, 3 ] ]

            socket.emit( 'led', led )

            p.createCanvas( 400, 400 )
            p.background( 'pink' )

        }

    }

    draw() {

        circle( mouseX, mouseY, 10 )

        // let _ = 

        // console.log(count++)

    }

    keyPressed( e ) {

        switch ( e.key ) {

            case 'w':
                emitKey( 'TOP_LEFT', 1 )
                break

            case 's':
                emitKey( 'BTM_LEFT', 1 )
                break

            case 'ArrowLeft':
                emitKey( 'TOP_RIGHT', 1 )
                break

            case 'ArrowRight':
                emitKey( 'BTM_RIGHT', 1 )
                break


        }

        return false

    }

    keyReleased( e ) {

        switch ( e.key ) {

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

        }

    }

    emitKey( pos, s ) {
        socket.emit(
            'key',
            new GridKey(
                GridKey[ pos ].x,
                GridKey[ pos ].y,
                s
            )
        )
    }

    mouseClicked( e ) {

        console.log( e )

    }

    setupSocketHandlers( socket ) {

        socket.on( 'key', ( msg ) => {
            console.log( msg )
        } )

        socket.on( 'led', ( msg ) => {
            console.log( msg )
        } )

    }
        
}