/* eslint-disable prettier/prettier */
const initialState={}

export default function ticketsReducer(state=initialState, action){
    switch(action.type){
        case 'GETTICKETS':
            return Object.assign({}, state, {tickets : action.tickets});
            break;
            case 'UPDATETICKETPRESSED':                
                let stateTickets = Object.assign({}, state.tickets);
                //update ticket number pressed and ticket number rolled pressed
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
                //check if row or full house claim
                let claim = {};
                let topRowFull:boolean;
                let middleRowFull:boolean;
                let bottomRowFull: boolean;
                let houseFull:boolean;
                for(ticketKey in stateTickets){
                    if(ticketKey == action.ticket.ticketIndex){
                        if((0 <= action.ticket.id) && (action.ticket.id <=4)){
                            topRowFull = stateTickets[ticketsKey].numbers[0].isPressedNumberRolled && 
                                            stateTickets[ticketsKey].numbers[1].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[2].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[3].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[4].isPressedNumberRolled;
                        }
                        if((5 <= action.ticket.id) && (action.ticket.id <=9)){
                            middleRowFull = stateTickets[ticketsKey].numbers[5].isPressedNumberRolled && 
                                            stateTickets[ticketsKey].numbers[6].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[7].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[8].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[9].isPressedNumberRolled;
                        }
                        if((10 <= action.ticket.id) && (action.ticket.id <=14)){
                            bottomRowFull = stateTickets[ticketsKey].numbers[10].isPressedNumberRolled && 
                                            stateTickets[ticketsKey].numbers[11].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[12].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[13].isPressedNumberRolled &&
                                            stateTickets[ticketsKey].numbers[14].isPressedNumberRolled;
                        }
                        houseFull = topRowFull && middleRowFull && bottomRowFull;
                        claim = {
                            houseFull : houseFull,
                            ticketIndex : action.ticket.ticketIndex,
                            topRowFull : topRowFull,
                            middleRowFull : middleRowFull,
                            bottomRowFull : bottomRowFull  
                        }
                    }
                }

                let tickets = [];
                for(ticketKey in stateTickets){
                    tickets.push(stateTickets[ticketKey]);
                }
                return Object.assign({}, state, {tickets : tickets, claim:claim});
                break;
        default:
            return state;
    }
}