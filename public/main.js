import 'p5'
// import * as p5 from '/node_modules/p5/lib/p5.js'
import { sketch } from './sketch.js'

// console.log( p5.Color )

new p5( sketch, document.getElementById( 'canvas' ) )