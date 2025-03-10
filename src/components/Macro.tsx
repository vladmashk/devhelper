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
                <ul className="macroExplanation">
                    <li>
                        Use <code>%</code> as replacement character.
                        For example, <code>&lt;li&gt;%&lt;/li&gt;</code> will surround every item with li
                        tags.
                    </li>
                    <li>
                        Use <code>\i</code> for a zero-based index, <code>\k</code> for a one-based index.
                    </li>
                    <li>
                        Use <code>%1</code>, <code>%2</code>, ... for captured groups in Extract mode.
                    </li>
                    <li>
                        Use a backslash to escape the percent symbol and backslashes.
                    </li>
                </ul>
            )}
        </div>
    );
}
