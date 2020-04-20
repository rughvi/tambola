const initialState={}

export default function ticketsReducer(state=initialState, action){
    switch(action.type){
        case 'GETTICKETS':
            return Object.assign({}, state, {tickets : action.tickets});
            break;
        default:
            return state;
    }
}