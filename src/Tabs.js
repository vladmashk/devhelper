import React from 'react';
import {tabs} from "./App.js";
import './Tabs.css'

function Tabs(props) {
    return (
        <div id="tabs">
            <span className="tab" onClick={() => props.setShownTab(tabs.LIST_HELPER)}>List helper</span>
        </div>
    );
}

export default Tabs;