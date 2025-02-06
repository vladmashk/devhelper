import "./Presets.css";
import {ActionDispatch} from "react";
import {DevHelperAction} from "../types.ts";

const alphabet = "a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z";

const decimals = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9";

export default function Presets({dispatch}: {dispatch: ActionDispatch<[action: DevHelperAction]>}) {
    return (
        <div className="presets">
            <div>Presets</div>
            <button onClick={() => dispatch({type: "changeInput", input: alphabet})}>
                Alphabet
            </button>
            <button onClick={() => dispatch({type: "changeInput", input: decimals})}>
                Decimals
            </button>
        </div>
    );
}
