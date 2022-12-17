import express from 'express'
import { Server } from 'socket.io'
import path from 'path'

export default class LocalServer {

    constructor() {

        this.app = express()
        this.port = process.env.PORT || 3000
        this.server = this.app.listen( this.port )
        console.log( `Server runnning on localhost:${3000}` )

        setupRoutes( this.app )
        setupSocket( this.server )

        function setupRoutes( app ) {

            app.use( express.static( 'public' ) )
            app.use( '/node_modules', express.static( './node_modules' ) )

            // app.get( '/', ( req, res ) => {
            //     res.sendFile( path.resolve('./public/index.html') )
            // })

        }

        function setupSocket( server ) {

            const io = new Server( server )

            io.on( 'connection', newConnection )

            function newConnection( socket ) {

                console.log( `New connection @ ${socket.id}` )

            }

        }

    }

}