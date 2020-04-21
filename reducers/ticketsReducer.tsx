/* eslint-disable prettier/prettier */
const initialState={}

export default function ticketsReducer(state=initialState, action){
    switch(action.type){
        case 'GETTICKETS':
            return Object.assign({}, state, {tickets : action.tickets});
            break;
            case 'UPDATETICKETPRESSED':                
                let stateTickets = Object.assign({}, state.tickets);
                for(ticketKey in stateTickets){
                    if(ticketKey == action.ticket.ticketIndex){
                        for(numbersKey in stateTickets[ticketsKey].numbers){
                            if(numbersKey == action.ticket.id){
                                stateTickets[ticketsKey].numbers[numbersKey].isPressed = action.ticket.isPressed;
                                stateTickets[ticketsKey].numbers[numbersKey].isPressedNumberRolled = action.ticket.isPressedNumberRolled;
                            }
                        }
                    }
                }

                let tickets = [];
                for(ticketKey in stateTickets){
                    tickets.push(stateTickets[ticketKey]);
                }
                return Object.assign({}, state, {tickets : tickets});
                break;
        default:
            return state;
    }
}