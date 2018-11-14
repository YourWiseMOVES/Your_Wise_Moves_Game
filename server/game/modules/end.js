/**  Function Should:
 * Run on game ending by facilitator
 * set up event listener for emails from users that dispatches them their results
 * clear all data with cascading delete
 * close socket connections after all users have responded to the results prompt
*/

const receiver = require('./receiver');
const pool = require('../../modules/pool');

const end = async (socket, gameId, link, io, code) => {
    try {
        //set up event listener to collect emails to dispatch accumulated journal data via email
        socket.on('email', action => {
            receiver(action, gameId, socket);
        })
        //cascading delete on all temporary game data
        await pool.query(`DELETE FROM "game" WHERE "id"=$1;`, [gameId]);
        try {
            const connectedNameSpaceSockets = Object.keys(link.connected); // Get Object with Connected SocketIds as properties
            connectedNameSpaceSockets.forEach(socketId => {
                link.connected[socketId].disconnect(); // Disconnect Each socket
            });
            link.removeAllListeners(); // Remove all Listeners for the event emitter
            delete io.nsps[`/${code}`]; //delete the namespace
        }
        catch (err) {
            console.log('Error disconnection sockets', err);
        }
    }
    catch (err) {
        console.log('Error ending game', err);
    }
    console.log('Game ended successfully');
}


module.exports = end;