import React, { useState } from 'react';
import { connect } from "react-redux";
import { addAlert } from '../../store/alert/alert.action';
import TextField from '@mui/material/TextField';

import "./index.scss";

export function _DetailsModal({ symbol, closeModal, addAlert }){

    const [currSymbol, setCurrSymbol] = useState(symbol[0])
    const [topRange, setTopRange] = useState('');
    const [topPercent, setTopPercent] = useState('');
    const [bottomRange, setBottomRange] = useState('');
    const [bottomPercent, setBottomPercent] = useState('');
    const [alertType, setAlertType] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault()
        addAlert(currSymbol, { topRange, topPercent, bottomRange, bottomPercent, alertType });
        closeModal()
    }

    return (
        <section className="modal-container">
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>x</button>
                <div className="modal-text">
                    <h1 className="modal-header">Please notify me when {symbol[0]}:</h1>
                        <section className="ranges">
                                <div className="range">
                                <TextField
                                    id="outlined-number"
                                    label="Goes up to"
                                    type="number"
                                    name="top-range"
                                    onChange={(ev)=>setTopRange(ev.target.value)}
                                />
                                <div className="second-row">
                                <TextField
                                    id="outlined-number"
                                    label="In Percent"
                                    type="number"
                                    min="0" max="1" step="0.01" 
                                    name="top-range-percent"
                                    onChange={(ev)=>setTopPercent(ev.target.value)}
                                />
                                </div>
                                </div>
                                <div className="range">
                                    <TextField
                                    id="outlined-number"
                                    label="Goes lower than"
                                    type="number"
                                    name="bottom-range"
                                    onChange={(ev)=>setBottomRange(ev.target.value)}
                                />
                                <div className="second-row">
                                <TextField
                                    id="outlined-number"
                                    label="In Percent"
                                    type="number"
                                    min="0" max="1" step="0.01" 
                                    name="bottom-range-percent"
                                    onChange={(ev)=>setBottomPercent(ev.target.value)}
                                />
                                </div>
                                </div>
                        </section>
                        <section className="alerts">
                            <p>How would you like us to alert you?</p>
                            <div className="radio-btns">
                                <div>
                                <input onChange={()=>setAlertType("voice")} type="radio" id="voice" name="alert" value="voice"/>
                                <label htmlFor="voice">Voice alert</label>
                                </div>

                                <div>
                                <input onChange={()=>setAlertType("message")} type="radio" id="message" name="alert" value="message"/>
                                <label htmlFor="message">Message alert</label>
                                </div>

                                <div>
                                <input onChange={()=>setAlertType("transfer")} type="radio" id="transfer" name="alert" value="transfer"/>
                                <label htmlFor="transfer">Transfer window alert</label>
                                </div>
                            </div>
                        </section>
                        <button onClick={(ev)=> onSubmit(ev)} className="save-btn">Save</button>
                </div>
            </div>
        </section>
    )
}

function mapStateToProps(state) {
    return {
        alerts: state.alertModule.alertPreferences
    }
}

const mapDispatchToProps = {
    addAlert
}

export const DetailsModal = connect(mapStateToProps, mapDispatchToProps)(_DetailsModal);
