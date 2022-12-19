import Ball from "./Ball.js";

export default class Wall {

    constructor( p, side ) {

        this.p = p
        this.side = side

        let nx, ny, px, py

        switch ( this.side ) {

            case 'top':
                nx = 0
                ny = 1
                px = 0
                py = 0
                break

            case 'bottom':
                nx = 0
                ny = -1
                px = 0
                py = this.p.height
                break

            case 'left':
                nx = 1
                ny = 0
                px = 0
                py = 0
                break

            case 'right':
                nx = -1
                ny = 0
                px = this.p.width
                py = 0
                break

        }

        this.normal = this.p.createVector( nx, ny )
        this.bounds = this.p.createVector( px, py )
        this.ghost = this.p.createVector()

    }

    /**
     * 
     * @param {Ball} ball 
     */
    collidedWith( ball ) {
        this.ghost.set( ball.pos )
        this.ghost.add( ball.d )

        if (
            ( this.side === 'top' && this.ghost.y < this.bounds.y ) ||
            ( this.side === 'bottom' && this.ghost.y > this.bounds.y ) ||
            ( this.side === 'left' && this.ghost.x < this.bounds.x ) ||
            ( this.side === 'right' && this.ghost.x > this.bounds.x )
        ) {
            // console.log( `Collided with ${this.side}` );
            return this
        }

        return false

    }

}