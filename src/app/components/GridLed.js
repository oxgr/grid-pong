import GridButton from "./GridButton.js"

export default class GridLed {

    static ROWS = 8
    static COLS = 8

    constructor( p ) {
        this.p = p

        this.buttons = []
        this.array = []

        for ( const i of Array( GridLed.ROWS ).keys() ) {

            this.array[ i ] = []

            for ( const j of Array( GridLed.COLS ).keys() ) {

                const button = new GridButton( p, i, j, (this.p.width / GridLed.ROWS) * 0.5 )
                this.array[ i ][ j ] = button
                this.buttons.push( button )

            }

        }

    }

    update( array ) {
        this.iterate( button => button.brightness = array[ button.row ][ button.col ] )
        return this
    }

    randomise() {
        this.iterate( button => button.randomise() )
        return this
    }

    iterate( fn ) {
        this.buttons.forEach( button => fn( button ) )
        return this
    }

    plainArray() {
        return this.array.map( row => row.map( button => button.brightness ))
    }

    set( bri, row, col ) {
        this.array[ row ][ col ].brightness = bri
    }

    draw() {

        this.p.rectMode( this.p.CENTER )
        const pad = this.p.width * 0.05, pad2 = pad * 2, padHalf = pad * 0.5
        const centerX = this.p.width * 0.5
        const centerY = this.p.height * 0.5

        // p.noStroke()
        this.p.fill( '#ddd' )
        this.p.rect( centerX, centerY, this.p.width - pad , this.p.height - pad, padHalf  )

        const margin = pad * 2
        const spacing = ( (this.p.width - margin ) / GridLed.ROWS )
        const originX = margin
        const originY = margin


        function getPos( row, col ) {

            const x = originX + ( col * spacing )
            const y = originY + ( row * spacing )

            return { x, y }

        }

        for ( const row of this.array ) {
            // console.log(row);
            for ( const button of row ) {
                // console.log( button );
                const { x, y } = getPos( button.row, button.col )
                button.draw( x, y )
            }
        }

    }

}