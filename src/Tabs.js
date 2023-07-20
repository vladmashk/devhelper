import React from 'react';
import {tabs} from "./App.js";
import './Tabs.css'

function Tabs(props) {
    return (
        <div id="tabs">
            <span className="tab" onClick={() => props.setShownTab(tabs.MASS_FORMATTER)}>Mass Formatter</span>
        </div>
    );
}

export default Tabs;