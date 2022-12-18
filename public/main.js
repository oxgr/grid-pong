import 'p5'
import Sketch from './sketch.js'

main()

function main() {

    const sketch = new Sketch() 

    const MODE = 
        // 'instance'
        'global'

    switch ( MODE ) {

        case 'instance':
            new p5( sketch.instance(), document.getElementById( 'canvas' ) )
            break

        case 'global':
            sketch.global()
            break

    }

}
