export class GridKey {

    static TOP_LEFT = { x: 0, y: 0 }
    static BTM_LEFT = { x: 0, y: 7 }
    static TOP_RIGHT = { x: 7, y: 0 }
    static BTM_RIGHT = { x: 7, y: 7 }
    
    constructor( x, y, s ) {
        this.x = x
        this.y = y
        this.s = s
    }

}