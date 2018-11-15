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
let link;

exports.begin = async (facilitatorId, io) => {    
    try {
        const data = await start(facilitatorId);
        //split up returned data for readability 
        code = data.code;
        gameId = data.gameId;
        //start socket here
        link = await
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
                        console.log('received');
                        receiver(action, gameId, socket);
                    })
                    socket.on('end', action => {
                        socket.broadcast.emit('end', {done: true})
                    })
                    game_socket = socket;
                })
    }
    catch (err) {
        console.log('Error in game start', err);
    }
    console.log('game created');
    return({code, gameId});
}

exports.end = async (facilitatorId, io) => {
    try {
        setTimeout(() => {
            end(game_socket, gameId, link, io, code);
        }, 3000)
    }
    catch (err) {
        console.log('Error ending game', err);
    }
}