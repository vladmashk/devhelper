import React from 'react';
import "./TextAreas.css"

function TextAreas(props) {
    return (
        <div id="textAreas">
            <span>Input:</span>
            <textarea value={props.input} onChange={e => props.setInput(e.target.value)}/>
            <span>Output:</span>
            <textarea value={props.output} onChange={() => {}}/>
        </div>
    );
}

export default TextAreas;