// Reference for types / autocomplete
// /* /// <reference path="../node_modules/@types/p5/global.d.ts" /> */

import * as Socket from 'socket.io'
import { GridKey } from 'Controller'
import Board from './Board.js'
import GridLed from './GridLed.js'
import Ball from './Ball.js'
import Wall from './Wall.js'
// import p5 from 'p5'

class Model {

    port
    url
    socket

    boards
    walls

    led

    global

    params = {}
    update = () => {}

    addParam ( opts ) {
        // const fields = source.split( '.' )
        const value = this.getNested( opts.source )
        this.setNested( 'params.' + opts.source + '.value', value )
        this.setNested( 'params.' + opts.source + '.opts', opts )
    }

    getNested( fields) {
        fields = fields.split('.');

        let cur = this,
        last = fields.pop();

        fields.forEach( (field) => cur = cur[field] );

        return cur[last];
    }

    setNested( fields, val) {

        fields = fields.split('.');

        let cur = this,
        last = fields.pop();

        fields.forEach( (field) => {
            cur[field] = cur[ field ] ?? {}
            cur = cur[field]
         } )

        cur[last] = val;

        // return fields.length === 0 ? obj : setNested()
        return this;
    }

}

export default class Pong {

    static model = new Model()

    static run = run

}

export function run( p ) {

    const model = Pong.model

    p.setup = () => {

        model.port = 3000
        model.url = `http://localhost:${model.port}`
        model.socket = Socket.io( model.url )
        setupSocketHandlers( model.socket )

        // console.log( window );

        const halfWidth = window.innerWidth * 0.5

        p.createCanvas( halfWidth, halfWidth )
        p.background( 'pink' )
        p.drawingContext.willReadFrequently = true

        console.log( p );

        model.global = {
            trails: 100
        }

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

        // console.log( p );

        model.params = {}

        model.addParam( {
            source: 'ball.speed',
            min: 0,
            max: 10,
            step: 0.1,
        })

        model.addParam( {
            source: 'global.trails',
            min: 0,
            max: 255,
            step: 1,
        })
        
        // model.params = {
        //     ball: {
        //         speed: {
        //             value: model.ball.speed,
        //             opts: {
        //                 min: 0,
        //                 max: 10,
        //                 step: 0.1,
        //                 source: 'ball.speed',
        //             }
        //         },
        //     },
        //     global: {
        //         trails: {
        //             value: model.global.trails,
        //             opts: {
        //                 min: 0,
        //                 max: 255,
        //                 step: 1,
        //                 source: 'global.trails',
        //             }
        //         },
                
        //     },
        // }

        model.update = ( event ) => {

            const source = event.target.controller_.binding.target.obj_.opts.source

            model.setNested( source, event.value )

        }

    }

    p.draw = () => {

        // p.fill( 'black' )
        p.fill( 0, 0, 0, model.global.trails )
        p.noStroke()
        p.rect( 0, 0, p.width, p.height )

        model.boards.left.draw()
        model.boards.right.draw()

        const collidedWall =
            Object.values( model.boards )
                .find( board => board.collidedWith( model.ball ) ) ??
            Object.values( model.walls )
                .find( wall => wall.collidedWith( model.ball ) )

        if ( collidedWall ) {
            // console.log( 'Collided with', collidedWall.side, collidedWall.constructor?.name )


            if ( ( collidedWall.side === 'left' ||
                collidedWall.side === 'right' ) &&
                !( collidedWall instanceof Board ) ) {
                model.ball.reset()
            } else {

                model.ball.bounce( collidedWall )
            }


        }

        model.ball.move()
        model.ball.draw()

        if ( p.frameCount % 6 === 0 ) {
            const led = sampleSketchToLed( p ).plainArray()
            model.socket.emit( 'led', led )
        }

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

        const widthEighth = p.width * 0.125
        const heightEighth = p.width * 0.125
        const pixelBlock = widthEighth * heightEighth

        const c = p.get( 0, 0, p.width, p.height )
        const res = 8
        const density = res / GridLed.ROWS
        // c.filter( 'blur', 1 )
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






