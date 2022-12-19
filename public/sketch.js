// Reference for types / autocomplete
/// <reference path="../node_modules/@types/p5/global.d.ts" />

export default class Sketch {

    setup() {}
    draw() {}

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

            const newFunc = Function( 'e', body )

            console.log( {newFunc} )

            return newFunc
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

            // p.setup = () => {
            //     p.createCanvas( 400, 400 )
            //     p.background( 'pink' )
            // }
            // p.keyPressed = ( e ) => {
            //     console.log( e )
            //     this.socket.emit( 'key', e.key )
            // }

            
            // p.setup = this.setup

            // p.setup = instancifyFunc( this.setup, 'p' )

            // for ( const [ name, func ] of Object.entries( funcs ) ) {
                
            for ( const name of props ) {
                
                if ( skips.find( skip => skip === name ) ) continue
                
                // p[ name ] = instancifyFunc( this[ name ], 'p' )
                p[ name ] = this[ name ]

            }

            this.convertPropsToGlobal( this )
            // this.convertPropsToGlobal( p )
            console.log( p );

        }


    }

    /**
     * Set every exported function into the global/window scope
     */
    global() {

        // Convert sketch method names into global functions.

        const skips = [
            'constructor',
            'instance',
            'global'
        ]

        const props = Object
            .getOwnPropertyNames( this.constructor.prototype )
            .filter( 
                prop => !skips.some( 
                    skip => skip === prop 
                )
            )

        for ( const prop of props ) {
            if ( prop === 'constructor' || prop === 'instance' ) continue
            window[ prop ] = this[ prop ]
        }

        this.convertModelToGlobal()

    }

    /**
     * Convert model properties into global variables
     */
    convertPropsToGlobal( obj ) {
        for ( const prop of Object.getOwnPropertyNames( obj ) ) {
            console.log( prop );
            window[ prop ] = obj[ prop ]
        }
    }

    convertModelToGlobal() {
        this.convertPropsToGlobal( this.model )
    }

}