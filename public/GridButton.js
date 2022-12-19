export default class GridButton {

    static MIN_BRI = 0
    static MAX_BRI = 15

    constructor( p, row, col, size ) {

        this.p = p
        this.brightness = Math.floor( Math.random() * GridButton.MAX_BRI )
        this.row = row
        this.col = col
        this.size = size

    }

    draw( x, y ) {

        const normed = this.p.norm( this.brightness, GridButton.MIN_BRI, GridButton.MAX_BRI )
        const briMap = this.p.lerp( 220, 255, normed )
        const satMap = this.p.lerp( 200, 50, normed )

        this.p.colorMode( this.p.HSB, 255 )
        this.p.fill( 30, 100, briMap )
        this.p.stroke( 'grey' )
        // this.p.fill( briMap )
        // this.p.fill( 'red' )
        this.p.rectMode( this.p.CENTER )
        this.p.rect( x, y, this.size, this.size, this.size * 0.25 )

    }

}   