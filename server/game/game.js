//function handles start of games
const start = require('./modules/start');

//function handles data sent from the clients
const receiver = require('./modules/receiver');

//function handles end of games
const end = require('./modules/end');

exports.game = async (facilitatorId, socketInput) => {
    //enables socket connections (not sure what we will need in the 2nd parentheses)
    const io = require('socket.io')(socketInput);
    try {
        const data = await start(facilitatorId);
        //split up returned data for readability 
        let code = data.code;
        let gameId = data.gameId;
        //start socket here
        const link = await 
        //unique namespace for connection
        io.of(`/${code}`)
        //on connection do this:
        .on('connection', socket => {
            socket.emit('start', { message: 'Connected to server.', code });
            //set listener for players joining
            socket.on('join', data => {
                const response = await receiver(data, gameId);
                socket.emit('join', response);
            })
            //set listener for game actions
            socket.on('moves', data => {
                const response = await receiver(data);
                socket.emit('moves', response);
            })
            //on disconnect send a message
            socket.on('disconnect', () => {
                socket.emit('disconnected from server');
            })
        })
    }
    catch (err) {
        console.log('Error in game', err);
    }
}

exports.end = async () => {
    try {
        //may require more than just calling the end function
        end();
    } 
    catch(err) {
        console.log('Error ending game', err);
    }
}