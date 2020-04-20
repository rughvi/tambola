/* eslint-disable prettier/prettier */
import TicketsManager from '../managers/ticketsManager';
import RollManager from '../managers/rollManager';

export const getTicketsAction = (name:string) => {
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
                        number.isPressedNumberRolled = numbersRolled.indexOf(number.value) > -1;
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