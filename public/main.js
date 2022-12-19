import 'p5'
import Pong from './pong.js'

main()

function main() {

    const pong = new p5( Pong, document.getElementById( 'canvas' ) )

    // const pong = new Pong()

    // const MODE = 
    //     'instance'
    //     // 'global'

    // switch ( MODE ) {

    //     case 'instance':
    //         new p5( pong.instanceTest(), document.getElementById( 'canvas' ) )
    //         break

    //     case 'global':
    //         pong.global()
    //         break

    // }

}
