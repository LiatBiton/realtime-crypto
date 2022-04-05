import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { addSymbol } from '../../services/liveData.service'
import "./index.scss";

export function AddCmp({ addOptions, onAdd, isLoading = false }){
    const [symbol, setSymbol] = useState('');
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const onAddSymbol = () => {
        addSymbol(symbol)
        onAdd();
        setSymbol("");
    }

    return (
        <section className='add-section'>
            <Autocomplete
                disablePortal
                id="combo-box"
                className="combo"
                value={symbol}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    setSymbol(newValue)
                  }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Select symbol"/>}
                isOptionEqualToValue={(option, value) => 
                    value === "" || option === value
                }
                options={addOptions}
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

