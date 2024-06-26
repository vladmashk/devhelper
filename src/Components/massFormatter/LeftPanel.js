import React from 'react';
import './LeftPanel.css'
import {macroChar} from "./MassFormatter.js";
import M from "../../util/M.js";

function LeftPanel(props) {

    function alphabetLower() {
        props.setInput("a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z")
    }

    function decimals() {
        props.setInput("0, 1, 2, 3, 4, 5, 6, 7, 8, 9")
    }

    return (
        <div className="presets">
            <span className="preset">Presets</span>
            <button className="preset" onClick={alphabetLower}>Alphabet</button>
            <button className="preset" onClick={decimals}>Decimals</button>
            <br/>
            <span className="preset">Macro</span>
            <input className="full-width" type="text" value={props.macro} onChange={e => props.setMacro(e.target.value)}/>
            <div className='helpIcon'>
                ?
                <div className="help">
                    Use <M>{macroChar}</M> as replacement character. For example: entering <M>{`<span>${macroChar}</span>`}</M> will
                    surround every item from the input with span tags in the output. Leave macro blank if not necessary. 
                    Use <M>\i</M> for a zero-based index. Use <M>\k</M> for a one-based index. Use <M>$1</M>, <M>$2</M> and so on 
                    for captured groups if using Extract mode. Use <M>\n</M> for newlines. Use a backslash to escape a character. 
                </div>
            </div>
            
        </div>
    );
}

export default LeftPanel;
