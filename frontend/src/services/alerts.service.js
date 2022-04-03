import { storageService } from './async-storage.service'

const STORAGE_KEY = 'alertsDB'

export const getAlerts = () => {
    const alerts = storageService.query(STORAGE_KEY);
    if (!alerts || alerts.length === 0) {
        return {}
    } else {
        return alerts;
    }
}

export function removeAlert(symbol) {
    const alerts = getAlerts();
    delete alerts[symbol]
    storageService.save(STORAGE_KEY, alerts);
}

export function storeAlert(symbol, alert) {
    const alerts = getAlerts();
    alerts[symbol] = alert
    storageService.save(STORAGE_KEY, alerts)
}
