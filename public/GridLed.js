import GridButton from "./GridButton.js"

export default class GridLed {

    static ROWS = 8
    static COLS = 8

    constructor( p ) {
        this.p = p

        this.array = []
        for ( const i of Array( GridLed.ROWS ).keys() ) {

            this.array[ i ] = []

            for ( const j of Array( GridLed.COLS ).keys() ) {

                this.array[ i ][ j ] = new GridButton( p, i, j, (this.p.width / GridLed.ROWS) * 0.5 )

            }

        }

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