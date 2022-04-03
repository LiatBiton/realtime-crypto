import React, { useState } from 'react';
import { connect } from "react-redux";
import { addAlert } from '../../store/alert/alert.action';
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
                <h1>Please notify me when {symbol[0]}:</h1>
                <form onSubmit={onSubmit}>
                    <section className="ranges">
                        <div className="range">
                            <label htmlFor="top-range">Goes up to:</label>
                            <input type="number" id="top-range" name="top-range" onChange={(ev)=>setTopRange(ev.target.value)}/>
                            <label htmlFor="top-range-percent">In Percent</label>
                            <input type="number" min="0" max="1" step="0.01" id="top-range-percent" name="top-range-percent" onChange={(ev)=>setTopPercent(ev.target.value)}/>
                        </div>
                        <div className="range">
                            <label htmlFor="bottom-range">Goes lower than:</label>
                            <input type="number" id="bottom-range" name="bottom-range" onChange={(ev)=>setBottomRange(ev.target.value)}/>
                            <label htmlFor="bottom-range-percent">In Percent</label>
                            <input type="number" min="0" max="1" step="0.01" id="bottom-range-percent" name="bottom-range-percent" onChange={(ev)=>setBottomPercent(ev.target.value)}/>
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
                            <input onChange={()=>setAlertType("transfer")} type="radio" id="transfer" name="alert" value="transfer" disabled={true}/>
                            <label htmlFor="transfer">Transfer window alert (Coming soon...)</label>
                            </div>
                        </div>
                    </section>
                    <button type="submit">Save</button>
                </form>
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
