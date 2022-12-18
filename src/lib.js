// @ts-check
import LocalServer from './LocalServer.js'
import monomeGrid from 'monome-grid'
import Controller from './Controller.js'
import View from './View.js'

export async function run() {

    

    const server = new LocalServer()

    console.log( '\n------------\n')

    const 
        ROWS = 8, 
        COLS = 8,
        // Number of different brightnesses a LED can be set to ( 0-15 )
        STEPS = 16

    // const grid = await monomeGrid()

    // Temporary empty grid object for testing without hardware
    const grid = {
        refresh: ( led ) => { console.log( `[GRID]: refresh() called with led: ${led}`);},
        key: () => {}
    }

    const view = new View( grid, ROWS, COLS, STEPS )
    const controller = new Controller( grid )

    controller.grid.key( { 
        x: 4,
        y: 6,
        s: 1
    })

    // view.startLoop()

}