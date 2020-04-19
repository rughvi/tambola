/* eslint-disable prettier/prettier */
import TicketsRepository from '../dbRepositories/ticketsRepository';

export default class TicketsManager{
    private _ticketsRepository: TicketsRepository;

    constructor(){
        this._ticketsRepository = new TicketsRepository();
    }

    getTickets(name:string){
        return new Promise((resolve, reject) =>{
            this._ticketsRepository.getTickets(name)
                .then(result => {
                    let tickets = [];
                    for(let i=0; i<result.tickets.length; i++){
                        tickets.push({
                            title:'Ticket' + (i+1),
                            numbers: result.tickets[i].map((v,i) => {return {id:1, value:v.value, isPressed:v.isPressed}})
                        });
                    }
                    resolve(tickets);
                })
                .catch(error =>{
                    reject(error);
                });
        });
    }
}