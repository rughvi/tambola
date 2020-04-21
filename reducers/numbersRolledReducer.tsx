const initialState={
    numbersRolled:[]
}

export default function ticketsReducer(state=initialState, action){
    switch(action.type){
        case 'UPDATENUMBERSROLLED':
            return Object.assign({}, state, {numbersRolled : action.numbersRolled});
            break;
        default:
            return state;
    }
}