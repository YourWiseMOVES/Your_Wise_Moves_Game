/**  Function Should:
 * take in a chat message
 * update the messages table
 * tell all clients to update messages
*/

const pool = require('../../modules/pool');

//the structure for what a chat message will look like
const sampleMessage = {
    message: '',
    type: '',
}

const chat =  async (message, gameId, socket, config) => {
    try {
        await pool.query(`INSERT INTO "chat" ("text", "type", "game_id") VALUES ($1, $2, $3);`,
            [message.message, message.type, gameId]
        ) //update the chat table
        socket.broadcast.emit('chat', {done: true});
        socket.emit('chat', {done: true});
    }   
    catch (err) {
        console.log('Error in chat handler', err);
    }
}


module.exports = chat;