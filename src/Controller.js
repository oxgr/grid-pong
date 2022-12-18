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

export class GridKey {

    constructor( x, y, s ) {

        this.x = x
        this.y = y
        this.s = s
    }

    static TOP_LEFT = { x: 0, y: 0 }
    static BTM_LEFT = { x: 0, y: 7 }
    static TOP_RIGHT = { x: 7, y: 0 }
    static BTM_RIGHT = { x: 7, y: 7 }

}