import React from 'react';
import './Presets.css'
import {macroChar} from "./MassFormatter.js";

function Presets(props) {



    function alphabetLower() {
        props.setInput("a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z")
    }

    function alphabetUpper() {
        props.setInput("A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z")
    }

    function decimals() {
        props.setInput("0, 1, 2, 3, 4, 5, 6, 7, 8, 9")
    }

    return (
        <div className="presets">
            <span className="preset">Presets</span>
            <button className="preset" onClick={alphabetLower}>Alphabet - lower case</button>
            <button className="preset" onClick={alphabetUpper}>Alphabet - upper case</button>
            <button className="preset" onClick={decimals}>Decimals</button>
            <br/>
            <span className="preset">Macro</span>
            <input className="full-width" type="text" value={props.macro} onChange={e => props.setMacro(e.target.value)}/>
            <span className="help">
                Use {macroChar} as insertion char. For example: using '{`<span>${macroChar}</span>`}' will surround every
                item from the input with span tags in the output. If there is a {macroChar} character in the macro that
                shouldn't be replaced, escape it with a backslash: \{macroChar}. Leave blank if not necessary.
            </span>
        </div>
    );
}

export default Presets;
