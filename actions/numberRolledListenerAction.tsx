/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import NumbersRolledRepository from '../dbRepositories/numbersRolledRepository';

export const numberRolledListenerAction = () => {
    console.log('number rolled list action 1');
    return(dispatch) =>{
        console.log('number rolled list action 2');
        let numbersRolledRepository = new NumbersRolledRepository();
        numbersRolledRepository.numbersRolledListener();    
    }
}