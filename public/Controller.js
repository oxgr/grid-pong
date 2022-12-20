export default class Controller {

    grid

    last
    current

    constructor( grid ) {

        this.grid = grid

        grid.key = this.onKey

    }

    /**
     * Key handler for incoming messages coming from grid
     * 
     * @param {Number} x horizontal position (0-15)
     * @param {Number} y vertical position (0-7)
     * @param {Number} s state (1 = key down, 0 = key up) 
     */
    onKey( x, y, s ) {

        console.log( `[KEY]: ${x}, ${y}, ${s}` )

    }

}