//case/switch on action.type call a seperate function depending of the type it is

//function receives actions and routes them to their proper handlers
const receiver = (action) => {
    switch(action.type) {
        case ('advance'):
            advance(action);
            break;
        case ('discussion'):
            discussion(action);
            break;
        case ('journal'):
            journal(action);
            break;
        case ('join'):
            join(action);
            break;
    }
}

export default receiver;