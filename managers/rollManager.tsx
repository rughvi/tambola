/* eslint-disable prettier/prettier */
import NumbersRolledRepository from '../dbRepositories/numbersRolledRepository';
import {Observable} from 'rxjs';
import DBContext from '../dbRepositories/dbContext';

export default class RollManager{
    private _numbersRolledRepository: NumbersRolledRepository;
    constructor(){
        this._numbersRolledRepository = new NumbersRolledRepository();
    }

    getRolledNumbers(){
        return new Promise((resolve,reject) =>{
            this._numbersRolledRepository.getNumbersRolled()
                .then(result =>{
                    let data=[]
                    for(key in result){
                        data.push(result[key]);
                    }
                    resolve(data);
                })
                .catch(error =>{
                    reject(error);
                })
        }) ;
    }

    addRolledNumber(value:number){
        return this._numbersRolledRepository.addRolledNumber(value);
    }

    getNumbersRolled(){
        return new Observable(subscriber => {
           let numbersRolledRef = DBContext.Instance.DB.ref('/numbersRolled/');
           numbersRolledRef.on('value', (snapshot) =>{
               let result = snapshot.val();

               let data=[];
                for(key in result){
                    data.push(result[key]);
                }
                subscriber.next(data);
           });
        });
    }

    getNextRollNumber(){
        return (Math.floor(Math.random() * 100)) + 1;
    }
}