import "./Macro.css";
import {ActionDispatch} from "react";
import {DevHelperAction} from "../types.ts";

export default function Macro({macro, dispatch}: {
    macro: string,
    dispatch: ActionDispatch<[action: DevHelperAction]>
}) {

    return (
        <div className="macro">
            <label className="labeledInput">
                Macro
                <input value={macro} onChange={e => dispatch({type: "changeMacro", macro: e.target.value})}/>
            </label>
            <div className="macroExplanation">
                Use <code>%</code> as replacement character. For example: entering <code>&lt;span&gt;%&lt;/span&gt;</code> will
                surround every item from the input with span tags in the output.<br/>
                Use <code>\i</code> for a zero-based index. Use <code>\k</code> for a one-based index.
                Use a backslash to escape the percent symbol and backslashes.
            </div>
        </div>
    );
}
