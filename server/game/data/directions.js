const directions = gameState => {
    switch (gameState[0]) {
        case '0':
            if (gameState[1] === '0') {
                return (
                    `Ground Rules: The questions and activities on the cards can generate good conversation amongst the group. Discuss 
                    any ground rules needed to keep the discussion on task and a safe place for all participants.
                    `
                )
            } else if (gameState[1] === '1') {
                return (
                    `Pick an area that you want to make change or stimulate some movement. We will call that your intention.`
                )
            }
        case '1':
            if (gameState[1] === '0') {
                return (
                    `
                        MOVEMENT: Brush yourself off with your hands to release attachments, imitating a metal too, to chip away the past.

                        DESCRIPTION: Observe where and who you are at this moment. What can you let go? Metal is the element energy you draw
                        upon, a refined and pure element, to chip away everything that is not useful.
                    `
                );
            }
        case '2':
            if (gameState[1] === '0') {
                return (
                    `
                    MOVEMENT: Put one hand on your heart and the other on your stomach. As you breathe in slowly swing your hands open. 
                    As your breathe out, slowly swing your hands back to your body. Imagine water flowing into you. Repeat movement for
                    5 breaths with eyes closed.

                    DESCRIPTION: Release resistance, broaden your perspective and increase your creativity. Where do you limit yourself? Open to inspiration.
                    Water is the element energy you draw upon to connect with the formless and open to the flow of life.
                `
                );
            }
        case '3':
        case '4':
        case '5':
        case '6':
    }
}

const subDirections = secondDigit => {

}


module.exports = directions;