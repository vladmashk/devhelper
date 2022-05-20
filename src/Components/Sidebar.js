import React, {useState} from 'react';
import "./Sidebar.css"
import Setting from "./Setting.js";

function Sidebar(props) {

    const [settings, setSettings] = useState({
        separator: ",",
        quoteType: "double",
        outputNewlines: true
    })

    const [sepOnNL, setSepOnNL] = useState(true)

    function sepNl(e) {
        if (e.target.checked) {
            setSettings(s => ({...s, separator: "\n"}))
            setSepOnNL(false)
        } else {
            setSepOnNL(true)
        }
    }

    return (
        <div id="sidebar">
            <Setting label="Input separator: ">
                {sepOnNL && <input type="text" value={settings.separator} onChange={e => setSettings(s => ({...s, separator: e.target.value}))} maxLength={1} size={1}/>}
                <label> Separate on newlines: </label><input type="checkbox" defaultChecked={false} onChange={sepNl}/>
            </Setting>
            {sepOnNL && <span className="setting">Don't worry about newlines in input</span>}
            <Setting label="Output quotes type: ">
                <select value={settings.quoteType} onChange={e => setSettings(s => ({...s, quoteType: e.target.value}))}>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                </select>
            </Setting>
            <Setting label="Newlines in output: ">
                <select value={settings.outputNewlines ? "true" : ""} onChange={e => setSettings(s => ({...s, outputNewlines: !!e.target.value}))}>
                    <option value="true">Yes</option>
                    <option value="">No</option>
                </select>
            </Setting>
            <p>Line 3</p>
            <button onClick={() => props.convert(settings)}>Convert</button>
        </div>
    );
}

export default Sidebar;