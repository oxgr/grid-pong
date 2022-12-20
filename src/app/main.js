import p5 from 'p5'
import Pong from './sketches/pong.js'
import GridView from './sketches/gridView.js'
import Gui from './components/Gui.js'

await main()

async function main() {

    const mainView = new p5( Pong.run, document.getElementById( 'sketch' ) )
    const gridView = new p5( GridView, document.getElementById( 'view' ) )

    // Wait 0.1 seconds while p5 setup() instantiates model variables
    await sleep(100)

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

}

async function sleep( ms = 1000 ) {
    return new Promise( r => setTimeout( r, ms ) )
}