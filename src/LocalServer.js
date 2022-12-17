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

        setupRoutes( this.app )

        this.bs = setupBrowserSync()

        this.io = ( ( server ) => {

            const io = new Server( server, {
                cors: {
                    origin: '*'
                }
            } )

            io.on( 'connection', newConnection )

            function newConnection( socket ) {

                console.log( `New connection @ ${socket.id}` )
                socket = LocalServer.initSocket( socket )

            }

            return io

        } )( this.server )

        function setupRoutes( app ) {
            app.use( express.static( 'public' ) )
            app.use( '/node_modules', express.static( './node_modules' ) )

            // app.get( '/', ( req, res ) => {
            //     res.sendFile( path.resolve('./public/index.html') )
            // })

        }

        function setupSocket( server ) {



        }

        function setupBrowserSync() {
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

    static initSocket( socket ) {

        socket.on( 'led', ( led ) => {

            console.log( led );

        } )

        return socket

    }

    initMainSocket() {
        this.mainSocket.on( 'led', ( led ) => {

            console.log( led );

        } )

    }

    clearMainSocket() {

        this.mainSocket = undefined;

    }

}