import 'p5'
import { setup, draw, fn } from './sketch.js'

main()

function main() {

    // const MODE = 'instance'
    const MODE = 'global'

    switch ( MODE ) {

        case 'instance':
            new p5( fn, document.getElementById( 'canvas' ) )
            break

        case 'global':
            window.setup = setup
            window.draw = draw
            break

    }

}
