/* eslint-disable prettier/prettier */
import DBContext from './dbContext';
import Firebase from "firebase";

export default class TicketsRepository{
    private _dbContext: DBContext;
    private _db: Firebase.database.Database;
    
    constructor(){
        this._dbContext = DBContext.Instance;
        this._db = this._dbContext.DB;
    }

    getTickets(name:string): Promise{
        return new Promise<string>((resolve, reject) =>{
            let userRef = this._db.ref('/users/' + name);
            userRef.on('value', (snapshot) =>{
                let data = snapshot.val() ? snapshot.val() : [];
                resolve(data);
            }, error =>{
                reject(error);
            });
        });
    }    
}