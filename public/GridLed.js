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

        const margin = 30
        const spacing = ( (this.p.width - margin ) / GridLed.ROWS )
        const originX = margin
        const originY = margin

        function getPos( row, col ) {

            const x = originX + ( row * spacing )
            const y = originY + ( col * spacing )

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