// import { Pane } from '/node_modules/tweakpane/dist/tweakpane.js'
import { Pane } from 'tweakpane'

export default class Gui {

    constructor( paramsObj ) {

        this.pane = new Pane()

        for ( const [ name, obj ] of Object.entries( paramsObj ) ) {

            console.log( 'top:', { name, obj } )
            const folder = this.pane.addFolder( {
                title: name
            } )
            folder.on( 'change', obj.update )
            this.addRecursive( folder, obj.params )  
        }
 
    }

    addRecursive( container, params ) {

        for ( const [ key, val ] of Object.entries( params ) ) {

            // console.log( 'called recurs with:', { key, val } )
            // console.log( { key, val, type: typeof val, hasVal: val.value } )

            if ( !!!val.opts ) {
                const subContainer = container.addFolder( { title: key } )
                this.addRecursive( subContainer, val )
                continue
            }

            const opts = { ...params[ key ].opts, label: params[ key ].opts.label ?? key}
            // console.log( opts )
            container.addInput( params[ key ], 'value', opts )

        }

    }

}