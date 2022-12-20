import 'p5'
import Pong from './pong.js'
import GridView from './gridView.js'
import Gui from './gui.js'

await main()

async function sleep( ms = 1000 ) {
    return new Promise( r => setTimeout( r, ms ) )
}

async function main() {

    // const pong = new Pong()

    // sconst pong = 
    const mainView = new p5( Pong.run, document.getElementById( 'sketch' ) )
    const gridView = new p5( GridView, document.getElementById( 'view' ) )

    console.log( Pong.model )
    await sleep(100)
    console.log( Pong.model )

    const gui = new Gui( {
        'Pong': {
            params: Pong.model.params,
            update: Pong.model.update
        },
        'Grid': {
            params: {},
            update: () => {}
        }
    }) 


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
