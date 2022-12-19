import GridLed from './GridLed.js'
import Wall from './Wall.js'

export default class Board extends Wall {

    /**
     * 
     * @param {p5.} p 
     * @param {*} x 
     * @param {*} y 
     */
    constructor( p, side ) {

        super( p, side )
        
        this.step = this.p.height * 0.125

        this.w = this.p.width / GridLed.COLS
        this.h = (this.p.height / GridLed.ROWS) * 3

        this.side = side

        const x = this.side === 'left' ? 0 : p.width - this.w
        // const y = ( p.height * 0.5 ) - ( this.h * 0.5 )
        const y = Math.floor( Math.random() * 6 * this.step )

        this.pos = this.p.createVector( x, y )
        if ( this.side === 'left' ) this.bounds.set( this.pos.x + this.w, this.w, 0 )
        if ( this.side === 'right' ) this.bounds.set( this.pos.x, 0 )

        console.log( this );

    }

    draw() {
        // this.p.noStroke()
        this.p.fill( 'white' )
        this.p.rect( this.pos.x, this.pos.y, this.w, this.h, 5 )
    }

    move( dir, step = this.step ) {

        switch( dir ) {
            case 'up':
                this.pos.y -= step
                break

            case 'down':
                this.pos.y += step
                break
        }

    }

    collidedWith( ball ) {
        const result = super.collidedWith( ball )

        if (result && 
            ball.pos.y > this.pos.y &&
            ball.pos.y < this.pos.y + this.h) return this

            return false


    }

}