export default class View {

    constructor( grid, rows, cols, steps ) {

        this.grid = grid
        this.rows = rows
        this.cols = cols

        this.ledSteps = steps
        this.ledMin = 0
        this.ledMax = 0 + steps - 1

        this.led = this.initLed(
            this.rows,
            this.cols,
            this.ledMin,
            this.ledMax
        )
        this.ledLast = this.led

    }

    /**
     * 
     * @param {Array<Array>} led 
     */
    update( led ) {

        this.led = led
        this.refresh()

    }

    refresh() {

        this.grid.refresh( this.led )

    }

    initLed( rows, cols, min, max ) {
    
        let led = []

        for ( let y = 0; y < rows; y++ ) {
            
            led[ y ] = [];
    
            for ( let x = 0; x < cols; x++ )
                led[ y ][ x ] = Math.floor( ( x / rows ) * max );

        }
    
        return led
    
    }

    set led( led ) {

        this.ledLast = this.led

    }

    startLoop( fps = 60 ) {

        const ms = 1000 / fps

        // call refresh() function 60 times per second
        this.loop = setInterval( () => this.refresh( this.led ), ms );

    }

    stopLoop() {

        clearInterval( this.loop )
        this.loop = null

    }

}

export class GridLed {

    constructor() {

        

    }

}