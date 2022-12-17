// @ts-check
import LocalServer from './LocalServer.js'
import monomeGrid from 'monome-grid'
import Controller from './Controller.js'
import View from './View.js'

export async function run() {

    const server = new LocalServer()

    const 
        ROWS = 8, 
        COLS = 8,
        // Number of different brightnesses a LED can be set to ( 0-15 )
        STEPS = 16

    // const grid = await monomeGrid()

    // Temporary empty grid object for testing
    const grid = {
        refresh: () => {},
        key: () => {}
    }

    const view = new View( grid, ROWS, COLS, STEPS )
    const controller = new Controller( grid )

    // view.startLoop()

}