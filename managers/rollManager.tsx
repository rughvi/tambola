/* eslint-disable prettier/prettier */
import NumbersRolledRepository from '../dbRepositories/numbersRolledRepository';

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
}