import React, {useEffect, useState} from 'react';
import "./RightPanel.css"
import Setting from "../Setting.js";

export const outputType = {
    NO_NEWLINES: "noNewlines",
    NEWLINES: "newlines",
    ROWS: "rows"
}

function RightPanel(props) {

    const [inputSeparator, setInputSeparator] = useState(",")

    const [inputRegex, setInputRegex] = useState(false)

    const [outputSeparator, setOutputSeparator] = useState(", ")

    const [ignoreNewlines, setIgnoreNewlines] = useState(true)

    const [quoteType, setQuoteType] = useState("double")

    const [outputNewlines, setOutputNewlines] = useState(outputType.NO_NEWLINES)

    const [rows, setRows] = useState(5)

    useEffect(() => {
        convert()
    }, [inputSeparator, inputRegex, outputSeparator, quoteType, outputNewlines, rows, props.input, props.macro])

    function changeInputSeparator(e) {
        setInputSeparator(e.target.value)
    }

    function changeInputRegex(e) {
        setInputRegex(e.target.checked)
    }

    function separateOnNewlines(e) {
        if (e.target.checked) {
            setInputSeparator("\n")
            setIgnoreNewlines(false)
        } else {
            setInputSeparator(",")
            setIgnoreNewlines(true)
        }
    }

    function clear() {
        props.setInput("")
    }

    function changeQuoteType(e) {
        setQuoteType(e.target.value)
    }

    function radioChange(e) {
        setOutputNewlines(e.target.value)
    }

    function changeOutputSeparator(e) {
        setOutputSeparator(e.target.value)
    }

    function convert() {
        props.convert({inputSeparator, inputRegex, quoteType, outputNewlines, rows, outputSeparator})
    }

    function copy() {
        window.navigator.clipboard.writeText(props.output)
    }

    return (
        <div id="sidebar">
            <div className="settingsGroup">
                {ignoreNewlines && 
                <Setting label="Input separator: " style={{display: "flex", alignItems: "center"}}>
                    <input className="shortInput" type="text" value={inputSeparator} onChange={changeInputSeparator}/>
                    <label className='regex'>regex<input type='checkbox' value={inputRegex} onChange={changeInputRegex}/></label>
                </Setting>
                }
                <Setting label="Separate on newlines:">
                    <input type="checkbox" defaultChecked={false} onChange={separateOnNewlines}/>
                </Setting>
                <button onClick={clear}>Clear input</button>
            </div>
            <div className="settingsGroup">
                <Setting label="Output quotes type: ">
                    <select value={quoteType} onChange={changeQuoteType}>
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
                    <input type="number" value={rows} onChange={e => setRows(parseInt(e.target.value))} min={2} max={100} className='numberInput'/>
                </Setting>
                <Setting label="Output separator: ">
                    <input className="shortInput" type="text" value={outputSeparator} onChange={changeOutputSeparator}/>
                </Setting>
                <button onClick={copy}>Copy output to clipboard</button>
            </div>
        </div>
    );
}

export default RightPanel;