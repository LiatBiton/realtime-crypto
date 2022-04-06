import React, { useState } from 'react';
import "./index.scss";

export function MessageModal({ symbol, closeModal }){

    return (
        <section className="modal-container">
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>x</button>
                <h2><span className="bold">{symbol[0]}</span> has just crossed the limit!</h2>
                <h3>Current price is : {symbol[7]}</h3>
            </div>
        </section>
    )
    
}