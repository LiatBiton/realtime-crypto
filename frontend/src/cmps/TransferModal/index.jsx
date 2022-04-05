import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./index.scss";

export function TransferModal({ symbol, closeModal }){

    const [count, setCount] = useState('');
    const [rate, setRate] = useState('');
    const [alignment, setAlignment] = useState('buy');

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
                <h2 className="header-transfer-modal"><span className="pink">{symbol[0]}</span> has just crossed the limit!</h2>
                <h3>Current price is : {symbol[7]}</h3>

                <section className="alerts">
                    <p>What action would you like to do?</p>
                    <div className='inputs'>
                        <ToggleButtonGroup
                        color='warning'
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        >
                            <ToggleButton value="web">Buy</ToggleButton>
                            <ToggleButton value="android">Sell</ToggleButton>
                        </ToggleButtonGroup>
                        <div className="margin">
                            <label htmlFor="rate">Rate:</label>
                            <input className="input-transfer-modal" type="number" min="0" max="1" step="0.01" id="rate" name="rate" onChange={(ev)=>setCount(ev.target.value)}/>
                        </div>

                        <div className="margin">
                            <label htmlFor="count">Count:</label>
                            <input className="input-transfer-modal" type="number" min="0" step="1" id="count" name="count" onChange={(ev)=>setRate(ev.target.value)}/>
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

