// Reference for types / autocomplete
/// <reference path="../node_modules/@types/p5/global.d.ts" />

import * as Socket from 'socket.io'

class Model {
    
    // socket = ( () => {
    //     const port = 3000
    //     const url = `http://localhost:${port}`
    //     return Socket.io( url )
    // } )()

    port = 3000
    url = `http://localhost:${this.port}`
    socket = Socket.io( this.url )

    count = 1

}

export default class Sketch {

    model = new Model()

    setup() {

        // console.error( {model:this.model} )


        // let led = [ [ 0, 1 ], [ 2, 3 ] ]

        // socket.emit( 'led', led )
        // socket.on( 'key', ( msg ) => {
        //     console.log( msg )
        // } )

        createCanvas( 400, 400 )
        background( 'pink' )

    }

    draw() {

        circle( mouseX, mouseY, 10 )

        // let _ = 

        // console.log(count++)

    }

    keyPressed( e ) {

        console.log( e.key )

    }

    mouseClicked( e ) {

        console.log( e )

    }

    /**
     * Not yet working!
     * @returns A function to be passed into a p5 constructor for instance mode.
     */
    instance() {

        function getGlobalFuncs( func ) {
            const funcs = func
                .toString()
                .match( /(?<=\s+)\w+(?=\()/gm )
            // .filter( e => e !== func?.name )

            return funcs ?? []
        }

        function prefixGlobalFuncs( body, funcs, prefix ) {
            for ( const funcName of funcs ) {
                body = body.replace( funcName, `${prefix}.${funcName}` )
            }
            // console.log ( body )
            return body
        }

        function instancifyFunc( func, prefix ) {

            const funcs = getGlobalFuncs( func )

            let body = func.toString().match( /(?<=\{)(.|\n)+(?=\})/g )[ 0 ]
            body = prefixGlobalFuncs( body, funcs, prefix )
            // body = prefixGlobalVars( body, globalVars, prefix)\

            console.log( body )

            return Function( 'e', body )
        }

        console.log( this.constructor.prototype )

        const funcs = {}
        const proto = this.constructor.prototype
        const props = Object.getOwnPropertyNames( proto )

        const skips = [
            'constructor',
            'instance',
            'global'
        ]

        return ( p ) => {


            // p.setup = function () {
            //     p.createCanvas( 400, 400 )
            //     p.background( 'pink' )
            // }

            // p.setup = instancifyFunc( this.setup, 'p' )

            // for ( const [ name, func ] of Object.entries( funcs ) ) {
                
            for ( const name of props ) {
                
                if ( skips.find( skip => skip === name ) ) continue
                
                p[ name ] = instancifyFunc( this[ name ], 'p' )

            }

            // console.log( funcs.setup.toString() )
            // console.log( p.setup.toString() )

            this.convertPropsToGlobal( this.model )

        }


    }

    /**
     * Set every exported function into the global/window scope
     */
    global() {

        // Convert sketch method names into global functions.
        for ( const prop of Object.getOwnPropertyNames( this.constructor.prototype ) ) {
            if ( prop === 'constructor' || prop === 'instance' ) continue
            window[ prop ] = this[ prop ]
        }

        this.convertPropsToGlobal( this.model )

    }

    // Convert model properties into global variables
    convertPropsToGlobal( obj ) {
        for ( const prop of Object.getOwnPropertyNames( obj ) ) {
            window[ prop ] = obj[ prop ]
        }
    }

}