/* eslint-disable prettier/prettier */
import TicketsManager from '../managers/ticketsManager';
import RollManager from '../managers/rollManager';

export const getTickets = (name:string) => {
    return(dispatch) =>{
        let ticketsManager = new TicketsManager();
        let rollManager = new RollManager();

        Promise.all([ticketsManager.getTickets(name), rollManager.getRolledNumbers()])
            .then(result =>{
                let tickets = result[0];
                let numbersRolled = result[1];
                for(ticketsKey in tickets){
                    for(numbersKey in tickets[ticketsKey].numbers){
                        let number = tickets[ticketsKey].numbers[numbersKey];
                        number.isPressedNumberRolled = number.isPressed && numbersRolled.indexOf(number.value) > -1;
                    }
                }
                dispatch({
                    type:'GETTICKETS',
                    tickets:tickets
                });
            })
            .catch(error =>{
                console.log('getTicketsAction ' + error);
            })
    }
}

export const setTicketPressed = (name:string, ticketIndex:number, id:number, isPressed:boolean, isPressedNumberRolled:boolean) =>{
    return(dispatch) =>{
        let ticketsManager = new TicketsManager();

        ticketsManager.setTicketPressed(name, ticketIndex, id, isPressed)
            .then(result =>{                
                dispatch({
                    type:'UPDATETICKETPRESSED',
                    ticket:{
                        ticketIndex:ticketIndex,
                        id:id,
                        isPressed:isPressed,
                        isPressedNumberRolled: isPressedNumberRolled
                    }
                });
            })
            .catch(error =>{
                console.log(error);
            });
    }
}