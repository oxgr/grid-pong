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

    draw() {

        const margin = 20
        const spacing = ( (this.p.width - (margin * 2) ) / GridLed.ROWS )
        const originX = margin * 2
        const originY = margin * 2

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