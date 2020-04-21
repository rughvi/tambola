/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import RollManager from '../managers/rollManager';
import { Observable } from 'rxjs';

export const numberRolledListenerAction = () => {
    return(dispatch) =>{
        let rollManager = new RollManager();
        rollManager.getNumbersRolled().subscribe(value => {
            dispatch({
                type:'UPDATENUMBERSROLLED',
                numbersRolled:value
            });
        });
        
    }
}