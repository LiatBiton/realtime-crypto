import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import "./index.scss";

export function TransferModal({ symbol, closeModal }){

    const [count, setCount] = useState('');
    const [rate, setRate] = useState('');
    const [alignment, setAlignment] = useState('buy');

    const theme = createTheme({
        palette: {
          primary: {
            main: '#ffffff',
          },
          secondary: {
            main: '#ffffff',
          },
        },
      });

    const onSaveTransfer = () => {
        console.log('symbol:', symbol, 'count:', count, 'rate:', rate)
        closeModal()
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);   
    };


    return (
        <section className="modal-container">
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>x</button>
                <h2 className="header-transfer-modal"><span className="bold">{symbol[0]}</span> has just crossed the limit!</h2>
                <h3 className="modal-second-header">Current price is : {symbol[7]}</h3>

                <section className="alerts">
                    <p>What action would you like to do?</p>
                    <div className='inputs'>
                        <div className="toggle">
                        <ThemeProvider theme={theme}>
                            <ToggleButtonGroup
                            color="secondary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            >
                                <ToggleButton value="web">Buy</ToggleButton>
                                <ToggleButton value="android">Sell</ToggleButton>
                            </ToggleButtonGroup>
                        </ThemeProvider>
                        </div>
                        <div className="margin">
                            <TextField
                                id="outlined-number"
                                label="Rate"
                                type="number"
                                name="rate"
                                min="0"
                                max="1"
                                inputProps={{
                                    step:"0.01"
                                }}
                                id="rate"
                                onChange={(ev)=>setCount(ev.target.value)}
                            />
                        </div>

                        <div className="margin">
                            <TextField
                                id="outlined-number"
                                label="Count"
                                type="number"
                                name="count"
                                min="0"
                                max="1"
                                step="1"
                                id="count"
                                onChange={(ev)=>setRate(ev.target.value)}
                            />
                        </div>
                    </div>
                </section>  
            
                <div className="actions">
                    <button onClick={()=> onSaveTransfer()} className="save-btn transfer-modal-save">Save</button>
                    <button onClick={closeModal} className="save-btn">Cancel</button>
                </div>
            </div>
        </section>
    )
    
}

