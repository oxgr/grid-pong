export default class Ball {

    constructor( p, size = 30 ) {

        this.p = p

        this.size = size
        // this.x = this.p.width * 0.5
        // this.y = this.p.height * 0.5

        this.speed = 5

        this.chaos = 1

        this.pos = this.p.createVector(
            this.p.width * 0.5,
            this.p.height * 0.5
        )

        this.dir = this.p.createVector( Math.random() - 0.5, Math.random() - 0.5 ).normalize()
        this.vel = this.p.createVector( this.dir.x * this.speed, this.dir.y * this.speed )

    }   

    move() {

        this.vel.set( this.dir.x * this.speed, this.dir.y * this.speed )
        this.pos.add( this.vel )

    }

    draw() {

        this.p.circle( this.pos.x, this.pos.y, this.size )

    }

    reset() {
        this.pos.set(
            this.p.width * 0.5,
            this.p.height * 0.5
        )
        this.dir.set(
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize()

        // this.resetting = true
    }

    // checkCollision() {

    //     if ( this.pos.y < 0 ) return 'top'
    //     if ( this.pos.y > this.p.height ) return 'bottom'
    //     if ( this.pos.x < 0 ) return 'left'
    //     if ( this.pos.x > this.p.width ) return 'right'

    //     return false

    // }

    bounce( wall ) {

        this.dir.reflect( wall.normal )
        this.dir.rotate( (Math.random() - 0.5 ) * this.chaos )

    }

}