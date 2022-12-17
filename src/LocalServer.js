import express from 'express'
import { Server, Socket } from 'socket.io'
import browserSync from 'browser-sync'
import path from 'path'

export default class LocalServer {

    app
    port
    server

    bs

    io
    mainSocket

    constructor() {

        this.app = express()
        this.port = process.env.PORT || 3000
        this.server = this.app.listen( this.port )
        console.log( `Server runnning on localhost:${3000}` )
        
        LocalServer.setupRoutes( this.app )

        this.bs = LocalServer.setupBrowserSync()

        this.io = LocalServer.setupSocket( this.server )

    }

    static setupRoutes( app ) {
        app.use( express.static( 'public' ) )
        app.use( '/node_modules', express.static( './node_modules' ) )

        // app.get( '/', ( req, res ) => {
        //     res.sendFile( path.resolve('./public/index.html') )
        // })

    }

    static setupSocket( server ) {

        const io = new Server( server, {
            cors: {
                origin: '*'
            }
        } )

        io.on( 'connection', ( socket ) => {

            console.log( `New connection @ ${socket.id}` )

            socket.on( 'led', ( led ) => {

                console.log( `[IO]: led - ${led}` );
    
            } )

            socket = LocalServer.initSocket( socket )

        })

        return io

    }

    static initSocket( socket ) {

        socket.on( 'led', ( led ) => {

            console.log( led );

        } )

        return socket

    }

    static setupBrowserSync() {

        const bs = browserSync.create()

        bs.init( {
            // watch: true,
            files: [ 'public/*' ],
            // server: 'public'
            // server: {
            //     baseDir: 'public'
            // }
            proxy: 'localhost:3000',
            port: 4000,
            open: false,
        } )

        return bs
        
    }

}