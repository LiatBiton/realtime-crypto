import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { addSymbol } from '../../services/liveData.service'
import "./index.scss";

export function AddCmp({ addOptions, onAdd, isLoading = false }){
    const [symbol, setSymbol] = useState('');

    const onAddSymbol = () => {
        addSymbol(symbol)
        onAdd();
        setSymbol("");
    }

    return (
        <section className='add-section'>
            <Autocomplete
                id="combo-box"
                className="combo"
                options={addOptions}
                value={symbol}
                inputValue={symbol}
                onChange={(e, newValue) => setSymbol(newValue)}
                renderInput={(params) => <TextField {...params} label="Select symbol"/>}
                isOptionEqualToValue={(option, value) => 
                    value === "" || option === value
                }
                />
            <LoadingButton
                className="add-btn"
                onClick={onAddSymbol}
                loading={isLoading}
                variant="contained">
                Add
            </LoadingButton>
        </section>
    )
}

