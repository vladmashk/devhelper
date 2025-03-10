import "./Macro.css";
import {ActionDispatch, useState} from "react";
import {DevHelperAction} from "../types.ts";

export default function Macro({macro, dispatch}: {
    macro: string,
    dispatch: ActionDispatch<[action: DevHelperAction]>
}) {

    const [explanationShown, setExplanationShown] = useState(false);

    return (
        <div className="macro">
            <label className="labeledInput">
                Macro
                <textarea value={macro} onChange={e => dispatch({type: "changeMacro", macro: e.target.value})}/>
            </label>
            <button onClick={() => setExplanationShown(es => !es)}>
                Help
            </button>
            {explanationShown && (
                <div className="macroExplanation">
                    For advanced formatting.<br/>
                    Use <code>%</code> as replacement character. For example, entering <code>&lt;span&gt;%&lt;/span&gt;</code> will
                    surround every item from the input with span tags in the output.<br/>
                    Use <code>\i</code> for a zero-based index. Use <code>\k</code> for a one-based index.
                    Use a backslash to escape the percent symbol and backslashes.
                </div>
            )}
        </div>
    );
}
