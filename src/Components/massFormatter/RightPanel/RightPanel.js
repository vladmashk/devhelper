import React, {useEffect, useState} from 'react';
import "./RightPanel.css";
import Setting from "../../Setting.js";
import InputActionTab from './InputActionTab';

export const outputSeparation = {
    NO_NEWLINES: "noNewlines",
    NEWLINES: "newlines",
    ROWS: "rows"
}

export const outputCase = {
    NO: "no",
    UPPER_CASE: "upperCase",
    LOWER_CASE: "lowerCase"
}

function RightPanel(props) {

    const [inputSeparator, setInputSeparator] = useState(",")

    const [inputRegex, setInputRegex] = useState(false)

    const [outputSeparator, setOutputSeparator] = useState(", ")

    const [ignoreNewlines, setIgnoreNewlines] = useState(true)

    const [extractRegex, setExtractRegex] = useState("\\w+,")

    const [quoteType, setQuoteType] = useState("double")

    const [outputNewlines, setOutputNewlines] = useState(outputSeparation.NO_NEWLINES);

    const [outputChangeCase, setOutputChangeCase] = useState(outputCase.NO);

    const [rows, setRows] = useState(5)

    const [activeInputActionTab, setActiveInputActionTab] = useState("Separate")

    useEffect(() => {
        convert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSeparator, inputRegex, outputSeparator, quoteType, outputNewlines, rows, extractRegex, outputChangeCase, activeInputActionTab, props.input, props.macro])

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

    function changeExtractRegex(e) {
        setExtractRegex(e.target.value)
    }

    function clear() {
        props.setInput("")
    }

    function changeQuoteType(e) {
        setQuoteType(e.target.value)
    }

    function separationRadioChange(e) {
        setOutputNewlines(e.target.value)
    }

    function changeCaseRadioChange(e) {
        setOutputChangeCase(e.target.value)
    }

    function changeOutputSeparator(e) {
        setOutputSeparator(e.target.value)
    }

    function convert() {
        props.convert({inputSeparator, inputRegex, extractRegex, quoteType, outputNewlines, rows, outputChangeCase, outputSeparator, activeInputActionTab})
    }

    function copy() {
        window.navigator.clipboard.writeText(props.output)
    }

    return (
        <div id="sidebar">
            <div className="settingsGroup">
                <button onClick={clear}>Clear input</button>

                <div className='inputActionTabs'>
                    <InputActionTab name="Separate" activeTab={activeInputActionTab} setActiveTab={setActiveInputActionTab}/>
                    <InputActionTab name="Extract" activeTab={activeInputActionTab} setActiveTab={setActiveInputActionTab}/>
                </div>

                <div style={activeInputActionTab === "Separate" ? undefined : {display: 'none'}}>
                    {ignoreNewlines && 
                    <Setting label="Input separator: " style={{display: "flex", alignItems: "center"}}>
                        <input className="shortInput" type="text" value={inputSeparator} onChange={changeInputSeparator}/>
                        <label className='regex'>regex<input type='checkbox' checked={inputRegex} onChange={changeInputRegex}/></label>
                    </Setting>
                    }
                    <Setting label="Separate on newlines:">
                        <input type="checkbox" defaultChecked={false} onChange={separateOnNewlines}/>
                    </Setting>
                </div>

                <div style={activeInputActionTab === "Extract" ? undefined : {display: 'none'}}>
                    <Setting label="Extract items matching regex:">
                        <br/>
                        <input value={extractRegex} onChange={changeExtractRegex} style={{fontSize: "1em"}}/>
                        <br/>
                        <div style={{fontSize: "0.8em"}}>
                            If present, the first capturing group will be extracted.
                            Others can be used through the macro box (see question mark).
                        </div>
                    </Setting>
                </div>
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
                    <input id="noNewlines" type="radio" name="newlines" value={outputSeparation.NO_NEWLINES} onChange={separationRadioChange} defaultChecked={true}/>
                    <label htmlFor="noNewlines">No newlines between items</label>
                </Setting>
                <Setting>
                    <input id="newlines" type="radio" name="newlines" value={outputSeparation.NEWLINES} onChange={separationRadioChange}/>
                    <label htmlFor="newlines">Newlines between items</label>
                </Setting>
                <Setting>
                    <input id="rows" type="radio" name="newlines" value={outputSeparation.ROWS} onChange={separationRadioChange}/>
                    <label htmlFor="rows">Items in rows of </label>
                    <input type="number" value={rows} onChange={e => setRows(parseInt(e.target.value))} min={2} max={100} className='numberInput'/>
                </Setting>
                <Setting label="Change case"></Setting>
                <Setting>
                    <input id="noChangeCase" type="radio" name="changeCase" value={outputCase.NO} onChange={changeCaseRadioChange} defaultChecked={true}/>
                    <label htmlFor="noChangeCase">No</label>
                </Setting>
                <Setting>
                    <input id="upChangeCase" type="radio" name="changeCase" value={outputCase.UPPER_CASE} onChange={changeCaseRadioChange}/>
                    <label htmlFor="upChangeCase">All upper case</label>
                </Setting>
                <Setting>
                    <input id="loChangeCase" type="radio" name="changeCase" value={outputCase.LOWER_CASE} onChange={changeCaseRadioChange}/>
                    <label htmlFor="loChangeCase">All lower case</label>
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