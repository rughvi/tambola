import DBContext from './dbContext';

export default class TicketsRepository{
    db: Firebase.database.Database;
    
    constructor(){
        let dbContext = new DBContext();
        this.db = dbContext.DB;
        console.log('ticketsRepository ctr');
    }

    getTickets(name:String){
        let usersRef = this.db.collection('users');
        let dataRef = usersRef.where('', '==', name);
    }
}