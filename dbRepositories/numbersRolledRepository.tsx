/* eslint-disable prettier/prettier */
import DBContext from './dbContext';
import Firebase from "firebase";

export default class NumbersRolledRepository{
    private _dbContext: DBContext;
    private _db: Firebase.database.Database;
    
    constructor(){
        this._dbContext = DBContext.Instance;
        this._db = this._dbContext.DB;
    }

    getNumbersRolled():Promise{
        return new Promise((resolve, reject) =>{
            let numbersRolledRef = this._db.ref('/numbersRolled/');
            numbersRolledRef.on('value', (snapshot) => {
                let data = snapshot.val() ? snapshot.val() :[];
                resolve(data);
            },error =>{
                reject(error);
            });
        });
    }

    addRolledNumber(value:number): Promise{
        return new Promise((resolve, reject) =>{
            let numbersRolledRef = this._db.ref('/numbersRolled/');
            numbersRolledRef.push(value, error =>{
                if(error){
                    reject(error);
                }
                else{
                    resolve(true);
                }
            });
        });
    }
}