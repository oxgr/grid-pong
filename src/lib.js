import LocalServer from './Server.js'
import monomeGrid from 'monome-grid'

export async function run() {

    const server = new LocalServer()

    const grid = await monomeGrid()
    grid.key( onKey )

    let led = initLed( 8, 8 )

    // call refresh() function 60 times per second
    setInterval( () => refresh( led, grid ), 1000 / 60);

}

function initLed( rows, cols ) {

    const LED_MIN = 0
    const LED_MAX = 15

    let led = []
    for ( let y = 0; y < rows; y++ ) {
        
        led[ y ] = [];

        for ( let x = 0; x < cols; x++ )
            led[ y ][ x ] = Math.floor( ( x / rows ) * LED_MAX );
    }

    return led

}

/**
 * Key handler for incoming messages coming from grid
 * 
 * @param {Number} x horizontal position (0-15)
 * @param {Number} y vertical position (0-7)
 * @param {Number} s state (1 = key down, 0 = key up) 
 */
function onKey( x, y, s ) {

    console.log(`[KEY]: ${x}, ${y}, ${s}`)

}

function refresh( led, grid ) {

    grid.refresh( led )

}