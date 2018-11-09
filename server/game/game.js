//function handles start of games
const start = require('./modules/start');

//function handles data sent from the clients
const receiver = require('./modules/receiver');

//function handles end of games
const end = require('./modules/end');

//define variables that will be needed throughout functions
let game_socket;
let code;
let gameId;

exports.begin = async (facilitatorId) => {
    //enables socket connections 
    const io = require('socket.io')(process.env.PORT || 5000, {
        path: `game${facilitatorId}`, //use facilitator Id to make a unique path
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000, //we can set these to the proper numbers later
        pingTimeout: 5000,
        cookie: false,
    });
    try {
        const data = await start(facilitatorId);
        //split up returned data for readability 
        code = data.code;
        gameId = data.gameId;
        //start socket here
        let link = await
            //unique namespace for connection
            io.of(`/${code}`)
                //on connection do this:
                .on('connection', socket => {
                    socket.emit('start', { message: 'Connected to server.', code });
                    //set listener for players joining
                    socket.on('join', action => {
                        receiver(action, gameId, socket);
                    })
                    //set listener for game actions
                    socket.on('moves', action => {
                        receiver(action, gameId, socket);
                    })
                    //on disconnect send a message
                    socket.on('disconnect', () => {
                        socket.emit('disconnected from server');
                    })
                    game_socket = socket;
                })
    }
    catch (err) {
        console.log('Error in game start', err);
    }
}

exports.end = async () => {
    try {
        //may require more than just calling the end function
        end(game_socket, gameId, link, io, code);
    }
    catch (err) {
        console.log('Error ending game', err);
    }
}