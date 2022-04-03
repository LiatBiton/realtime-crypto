import { storeAlert, removeAlert } from '../../services/alerts.service';

export function addAlert(symbol, alert){
    return (dispatch) => {
        const action = {
            type: 'SET_ALERT',
            symbol,
            alert
        };
        dispatch(action);
        storeAlert(symbol, alert);
    }
}

export function updateAlert(symbol, alert){
    return (dispatch) => {
        const { topRange, topPercent, bottomRange, bottomPercent } = alert;
        let type = '';

        if ((!topRange || topRange == 0) &&
            (!topPercent || topPercent == 0) && 
            (!bottomRange || bottomRange == 0) && 
            (!bottomPercent || bottomPercent == 0)) {
            type = 'CLEAR_ALERT'
            removeAlert(symbol);
        } else {
            type = 'SET_ALERT'
            storeAlert(symbol, alert);
        }
        
        const action = { 
            type,
            symbol,
            alert
        };
        dispatch(action)
    }
}
