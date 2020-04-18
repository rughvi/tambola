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
            console.log('userref ' + userRef);

            userRef.on('value', (snapshot) =>{
                console.log('snapshot' + snapshot);
                let data = snapshot.val() ? snapshot.val() : {};
                resolve(data);
            }, error =>{
                reject(error);
            });
        });
    }
}