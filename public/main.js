import 'p5'
import Pong from './pong.js'
import GridView from './gridView.js'

main()

function main() {

    const pong = new p5( Pong, document.getElementById( 'sketch' ) )
    const view = new p5( GridView, document.getElementById( 'view' ) )

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
