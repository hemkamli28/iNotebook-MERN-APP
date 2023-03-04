import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
export default function Alert(props) {
    const [symbol, setSymbol] = useState("fa-check");

    useEffect(() => {
        if (props.alert && props.alert.type) {
            switch(props.alert.type) {
                case 'danger':
                    setSymbol("fa-xmark");
                    break;
                case 'success':
                    setSymbol("fa-check");
                    break;
                default:
                    setSymbol("fa-info-circle");
                    break;
            }
        }
    }, [props.alert]);
    
    return (
        props.alert ? 
        <div className={`alert alert-${props.alert.type} alert-white rounded`}>
        <div className="icon">
            <i className={`fa ${symbol}`}></i>
        </div>
        {props.alert.msg}
    </div>:null
    )
}
