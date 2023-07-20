import React from 'react';
import "./TextAreas.css"

function TextAreas(props) {
    return (
        <div id="textAreas">
            <span>Input:</span>
            <textarea value={props.input} onChange={e => props.setInput(e.target.value)} spellCheck={false} autoComplete="false"/>
            <span>Output:</span>
            <textarea value={props.output} onChange={() => {}} readOnly={true}/>
        </div>
    );
}

export default TextAreas;