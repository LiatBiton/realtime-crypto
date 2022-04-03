import axios from 'axios';
import { storageService } from './async-storage.service'

const STORAGE_KEY = 'symbolsDB'

export function getAllSymbols() {
    return axios.get(`api/symbols`).then(({ data }) => data)
}

export async function getData() {
    const symbols = storageService.query(STORAGE_KEY);
    let symbolsArray = symbols;

    if(!symbols || !symbols.length){
        const allData = await getAllSymbols()
        if (!allData) return []

        symbolsArray = allData;
        storageService.save(STORAGE_KEY, allData)
    }

    return axios.post('api/get_full_data', { symbols: symbolsArray })
        .then(({ data }) => data)
}

export function removeSymbol(symbolsToRemove){
    const symbols = storageService.query(STORAGE_KEY);
    const newSymbols = symbols.filter(element => !symbolsToRemove.includes(element)); 
    storageService.save(STORAGE_KEY, newSymbols)
}

export function addSymbol(symbol){
    const symbols = storageService.query(STORAGE_KEY);
    symbols.unshift(symbol)
    storageService.save(STORAGE_KEY, symbols)
}
