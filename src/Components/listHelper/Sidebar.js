import React, {useState} from 'react';
import "./Sidebar.css"
import Setting from "../Setting.js";

export const outputType = {
    NO_NEWLINES: "noNewlines",
    NEWLINES: "newlines",
    ROWS: "rows"
}

function Sidebar(props) {

    const [inputSeparator, setInputSeparator] = useState(",")

    const [outputSeparator, setOutputSeparator] = useState(",")

    const [ignoreNewlines, setIgnoreNewlines] = useState(true)

    const [quoteType, setQuoteType] = useState("double")

    const [outputNewlines, setOutputNewlines] = useState(outputType.NO_NEWLINES)

    const [rows, setRows] = useState(5)

    function separateOnNewlines(e) {
        if (e.target.checked) {
            setInputSeparator("\n")
            setIgnoreNewlines(false)
        } else {
            setIgnoreNewlines(true)
        }
    }

    function radioChange(e) {
        setOutputNewlines(e.target.value)
    }

    return (
        <div id="sidebar">
            <div className="settingsGroup">
                <Setting label="Input separator: ">
                    {ignoreNewlines && <input className="shortInput" type="text" value={inputSeparator} onChange={e => setInputSeparator(e.target.value)} maxLength={1} size={1}/>}
                    <label> Separate on newlines: </label><input type="checkbox" defaultChecked={false} onChange={separateOnNewlines}/>
                </Setting>
                {ignoreNewlines && <span className="setting">Don't worry about newlines in input</span>}
            </div>
            <div className="settingsGroup">
                <Setting label="Output quotes type: ">
                    <select value={quoteType} onChange={e => setQuoteType(e.target.value)}>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="none">None</option>
                    </select>
                </Setting>
                <Setting>
                    <input id="noNewlines" type="radio" name="newlines" value={outputType.NO_NEWLINES} onChange={radioChange} defaultChecked={true}/>
                    <label htmlFor="noNewlines">No newlines in output</label>
                </Setting>
                <Setting>
                    <input id="newlines" type="radio" name="newlines" value={outputType.NEWLINES} onChange={radioChange}/>
                    <label htmlFor="newlines">Newlines in output</label>
                </Setting>
                <Setting>
                    <input id="rows" type="radio" name="newlines" value={outputType.ROWS} onChange={radioChange}/>
                    <label htmlFor="rows">Output in rows of </label>
                    <input type="number" value={rows} onChange={e => setRows(parseInt(e.target.value))} min={2} max={100}/>
                </Setting>
                <Setting label="Output separator: ">
                    <input className="shortInput" type="text" value={outputSeparator} onChange={e => setOutputSeparator(e.target.value)} maxLength={1}/>
                </Setting>
                <button onClick={() => props.convert({inputSeparator, quoteType, outputNewlines, rows, outputSeparator})}>Convert</button>
            </div>
        </div>
    );
}

export default Sidebar;