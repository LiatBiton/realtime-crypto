import { omit } from "lodash"
import { getAlerts } from '../../services/alerts.service';

const buildInitialStore = () => ({
    alertPreferences: getAlerts()
});

export function alertReducer(state = buildInitialStore(), action) {
    switch (action.type) {
        case 'SET_ALERT':
            return {
                ...state,
                alertPreferences : {
                    ...state.alertPreferences,
                    [action.symbol]: action.alert
                }
            }
        case 'CLEAR_ALERT':
            return omit(state, `alertPreferences.${action.symbol}`)
        default:
            return state;
    }
}